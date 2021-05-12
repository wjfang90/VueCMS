<template>
  <div class="photoinfo-container">
    <h3>{{ photoInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoInfo.add_time }}</span>
      <span>点击：{{ photoInfo.click }}次</span>
    </p>

    <hr />

    <!-- 缩略图区域 -->
    <vue-preview :slides="thumbnailList" class="thumbs"></vue-preview>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoInfo.info"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      photoInfo: {}, //图片信息
      photoId: this.$route.params.photoId, //参数，photoId名称 在router.js中对应
      thumbnailList: [], //缩略图
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbnailList();
  },
  methods: {
    getPhotoInfo() {
      let url = "http://localhost:9001/PhotoInfo";
      let param = { photoId: this.photoId };

      this.axios
        .get(url, param)
        .then((res) => {
          if (res.status == 200) {
            // console.log("图片明细加载成功");
            this.photoInfo = res.data;
          } else {
            Toast("图片明细加载失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getThumbnailList() {
      let url = "http://localhost:9001/PhotoThumbnailList";
      let param = { photoId: this.photoId };

      this.axios
        .get(url, param)
        .then((res) => {
          if (res.status == 200) {
            // console.log("缩略图加载成功");
            this.thumbnailList = res.data.rows;
          } else {
            Toast("缩略图加载失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.photoinfo-container {
  padding: 3px;
  margin-bottom: 20px;
}

.photoinfo-container h3 {
  color: #26a2ff;
  font-size: 15px;
  text-align: center;
  margin: 15px 0;
}

.photoinfo-container .subtitle {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.photoinfo-container .content {
  font-size: 13px;
  line-height: 30px;
}

/*缩略图 */
.thumbs .my-gallery {
  display: flex;
  flex-wrap: wrap;
}
.thumbs .my-gallery figure {
  width: 30%;
  margin: 5px;
}
.thumbs .my-gallery figure img {
  width: 100%;
  box-shadow: 0 0 8px #999;
  border-radius: 5px;
}
</style>
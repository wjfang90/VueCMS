<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div class="mui-slider">
      <div
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="(item, index) in photoCates"
            :key="index"
            @click="getPhotoListByCate(item.id)"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link
        v-for="item in photoList"
        :key="item.id"
        :to="'/Home/PhotoInfo/' + item.id"
        tag="li"
      >
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.info }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 1. 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.min.js";

import "../../mock/mock.js";

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      photoCates: [],
      photoList: [],
    };
  },
  created() {
    this.getPhotoCateList();
    this.getPhotoListByCate(0);
  },
  mounted() {
    // 2. 初始化滑动控件，js组件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getPhotoCateList() {
      let url = "PhotoCateList";
      this.axios
        .get(url)
        .then((res) => {
          if (res.status == 200) {
            // console.log("加载图片分类成功");
            this.photoCates = res.data.rows;

            let cateAll = { id: 0, title: "全部" };
            this.photoCates.unshift(cateAll);
          } else {
            Toast("加载图片分类失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPhotoListByCate(categoryId) {
      let url = "PhotoList";
      let params = { cateId: categoryId };

      this.axios
        .get(url, params)
        .then((res) => {
          if (res.status == 200) {
            // console.log("加载图片列表成功");
            this.photoList = res.data.rows;
          } else {
            Toast("加载图片列表失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
/*解决图片滑动显示报错信息 */
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}

.photo-list li {
  background-color: #ccc;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #999;
  position: relative;
}

.photo-list li img {
  width: 100%;
  vertical-align: middle;
}

.photo-list li img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.photo-list li .info {
  color: white;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  max-height: 84px;
}

.photo-list li .info .info-title {
  font-size: 14px;
}

.photo-list li .info .info-body {
  font-size: 13px;
}
</style>
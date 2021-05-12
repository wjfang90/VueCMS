<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ NewsInfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ NewsInfo.add_time }}</span>
      <span>点击量：{{ NewsInfo.click }}次</span>
    </p>

    <hr />

    <!-- 内容区域 -->
    <div class="content" v-html="NewsInfo.content"></div>
    
    <!-- 评论子组件区域 -->
    <comment :newsid="this.id"></comment>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from '../subComponents/comments.vue';

export default {
  data() {
    return {
      NewsInfo: {},
      id: this.$route.params.id,
    };
  },
  components:{
    comment
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      let url = "http://localhost:9001/NewsInfo";
      let params = { id: this.id };

      this.axios
        .get(url, params)
        .then((res) => {
          if (res.status == 200) {
            this.NewsInfo = res.data;

            // console.log("获取新闻详细成功");
          } else {
            Toast("获取新闻详细失败");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.newsinfo-container {
  padding: 0 5px;
}

.newsinfo-container .title {
  font-size: 16px;
  text-align: center;
  margin: 15px 0;
  color: red;
}

.newsinfo-container .subtitle {
  font-size: 13px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}

.newsinfo-container .content img {
  width: 100%;
}
</style>
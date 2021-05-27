<template>
  <div>
    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for="item in newsList"
        :key="item.id"
      >
        <router-link :to="'/Home/NewsInfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <p class="mui-ellipsis">
              <span>发表时间：{{ item.add_time }}</span>
              <span>点击量：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      newsList: [],
      pageIndex: 1,
      pageSize: 10,
    };
  },
  created() {
    // this.getNewsList();
    this.getNewsListByMock();
  },
  methods: {
    getNewsList() {
      /**
             注意：cli3和cli2的区别：
            1. 静态资源文件目录由static变为public
            2. 把.json文件放到public目录下
             */
      let url = "/data/NewsList.json";

      let _this = this;

      this.axios
        .get(url)
        .then(function (res) {
          if (res.status == 200) {
            // let start = (this.pageIndex - 1) * this.pageSize;
            // let end = start + this.pageSize;

            // let resPaged= res.data.slice(start, end);
            // this.newsList = this.newsList.concat(resPaged);

            // res.data.forEach((item) => {
            //   item.img_url = item.img_url;
            // });

            _this.newsList = res.data; //在axios 的回调函数中访问vue 对象 ，不能直接用this
          } else {
            console.log(res);
            Toast("获取新闻数据失败");
          }
        })
        .catch(function (error) {
          console.log(error);
          Toast("获取新闻数据失败");
        });
    },
    getNewsListByMock() {
      let url = "NewsList";
      let params = { pageIndex: this.pageIndex };
      
      this.axios
        .get(url, params)
        .then((res) => {

          if (res.status == 200) {
            this.newsList = res.data.rows; //在axios 回调函数使用箭头函数可以this访问到vue中的数据
          } else {
            console.log(res);
            Toast("获取新闻数据失败");
          }
        })
        .catch(function (error) {
          console.log(error);
          Toast("获取新闻数据失败");
        });
    },
  },
};
</script>

<style scoped>
.mui-table-view li h3 {
  font-size: 14px;
}

.mui-table-view li .mui-ellipsis {
  font-size: 12px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
</style>
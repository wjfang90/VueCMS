<template>
  <div class="home-container" >
    <!--轮播图-->
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item> <img src="../../images/swipe/1.jpg" /></mt-swipe-item>
      <mt-swipe-item> <img src="../../images/swipe/2.jpg" /></mt-swipe-item>
      <mt-swipe-item> <img src="../../images/swipe/3.jpg" /></mt-swipe-item>
    </mt-swipe> -->
    <swipe :imageurls="imageUrls"></swipe>

    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/Home/NewsList">
          <img src="../../images/menu/menu1.png" alt="" />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/Home/PhotoList">
          <img src="../../images/menu/menu2.png" alt="" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/Home/GoodsList">
          <img src="../../images/menu/menu3.png" alt="" />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu/menu4.png" alt="" />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu/menu5.png" alt="" />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu/menu6.png" alt="" />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import swipe from "../subComponents/Swipe.vue";
export default {
  data() {
    return {
      imageUrls: [
        "../../images/swipe/1.jpg",
        // "../../images/swipe/2.jpg",
        // "../../images/swipe/3.jpg"
      ],
    };
  },
  methods: {
    getSwipes(){
      let url='http://localhost:9001/GetSwipes'
      this.axios
      .get(url)
      .then(res=>{
        if(res.status==200){
          this.imageUrls=res.data.rows;
        }else{
          console.log('轮播图加载失败');
        }
      }).catch(error=>{
          console.log(error);
      })
    }

  },
  components: {
    swipe,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home-container .mint-swipe {
  height: 200px;
}

/* .mint-swipe-item img {
  width: 100%;
  height: 100%;
} */

.mui-grid-view,
.mui-grid-9 {
  background-color: #fff !important;
  border: none !important;
}
.mui-grid-view img,
.mui-grid-9 img {
  width: 62px;
  height: 61px;
}

.mui-grid-view .mui-table-view-cell {
  border: none !important;
  padding: 10px 15px !important;
}

.mui-grid-view .mui-media-body,
.mui-grid-9 .mui-media-body {
  font-size: 13px !important;
}
</style>

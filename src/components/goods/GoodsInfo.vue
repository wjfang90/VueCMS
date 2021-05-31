<template>
  <div class="goodsInfoContainer">
    <!-- 商品轮播图区域 -->
    <swipe :imageurls="ImageUrls" :isfullwidth="false"></swipe>

    <!--加入购物车小球动画-->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @after-leave="addToCarDisabled = false"
    >
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ GoodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ GoodsInfo.market_price }}</del
            >&nbsp;&nbsp;销售价：<span class="now_price"
              >￥{{ GoodsInfo.sell_price }}</span
            >
          </p>
          <p>
            购买数量：<numbox
              @getcount="getSelectedCount"
              :max="GoodsInfo.stock_quantity"
            ></numbox>
          </p>
          <p class="buy">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button
              type="danger"
              size="small"
              @click="addToShopCar"
              :disabled="addToCarDisabled"
              >加入购物车</mt-button
            >
            <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsInfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsInfo 页面zhong 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ GoodsInfo.goods_no }}</p>
          <p>库存情况：{{ GoodsInfo.stock_quantity }}件</p>
          <p>上架时间：{{ GoodsInfo.add_time }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button
          type="primary"
          size="large"
          plain
          @click="goodsInfoDesc(GoodsId)"
          >图文介绍</mt-button
        >
        <mt-button type="danger" size="large" plain @click="goComment(GoodsId)"
          >商品评论</mt-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
//导入轮播图组件
import Swipe from "../subComponents/Swipe.vue";
// 导入 数字选择框 组件
import numbox from "../subComponents/GoodsInfoNumber.vue";

export default {
  data() {
    return {
      GoodsId: this.$route.params.goodsId,
      GoodsInfo: {},
      ImageUrls: [],
      ballFlag: false,
      addToCarDisabled: false,
      selectedCount: 1,
    };
  },
  components: {
    Swipe,
    numbox,
  },
  created() {
    this.getGoodsInfo();
    this.getSwiper();
  },
  methods: {
    //获取轮播图数据
    getSwiper() {
      let url = "GoodsInfoSwipes";
      var params = { goodsId: this.GoodsId };
      this.axios
        .get(url, params)
        .then((res) => {
          if (res.status == 200) {
            this.ImageUrls = res.data.rows;
          } else {
            Toast("加载商品Swiper成功");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取商品信息
    getGoodsInfo() {
      let url = "GoodsInfo";
      var params = { goodsId: this.GoodsId };

      this.axios
        .get(url, params)
        .then((res) => {
          if (res.status == 200) {
            this.GoodsInfo = res.data;
          } else {
            Toast("加载商品信息成功");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //加入购物车
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;

      //保存数据到 store
      var goodsInfo = {
        GoodsId: this.GoodsId,
        Title: this.GoodsInfo.title,
        Count: this.selectedCount,
        ImgUrl: this.GoodsInfo.img_url,
        Price: this.GoodsInfo.sell_price,
        StockQuantity: this.GoodsInfo.stock_quantity,
        Selected: true,
      };
      console.log(goodsInfo);
      this.$store.commit("addToShoppingCar", goodsInfo);
    },
    //获取商品数量组件中的数据
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = parseInt(count);
      // console.log("父组件拿到的数量值为： " + this.selectedCount);
    },
    //商品介绍
    goodsInfoDesc(goodsId) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({
        name: "GoodsInfoDesc",
        params: { GoodsId: goodsId },
      });
    },
    //商品评论
    goComment(goodsId) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ path: "/Home/GoodsComment/" + goodsId });
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
      this.addToCarDisabled = true;
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置
      let ballPosition = this.$refs.ball.getBoundingClientRect();

      //bottom  Tabbar 中购物车徽标的位置
      let badge = document.getElementById("badge");
      let badgePosition = badge.getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";

      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
  },
};
</script>

<style scoped>
.goodsInfoContainer {
  background-color: #eee;
  overflow: hidden;
}

.goodsInfoContainer .now_price {
  color: red;
  font-size: 16px;
  font-weight: bold;
}

.goodsInfoContainer .buy button {
  margin-right: 10px;
}

.goodsInfoContainer .mui-card-footer {
  display: block;
}

.goodsInfoContainer .mui-card-footer button {
  margin: 15px 0;
}

.goodsInfoContainer .ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 390px;
  left: 146px;
}
</style>
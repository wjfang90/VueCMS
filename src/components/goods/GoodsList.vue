<template>
  <div class="goods-list">
    <div
      class="goods-item"
      v-for="item in goodsList"
      :key="item.id"
      @click="gotoDetails(item.id)"
    >
      <img :src="item.img_url" alt="" />
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" class="get-more" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      goodsList: [],
      pageIndex: 1,
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      let url = "http://localhost:9001/GoodsList";
      this.axios
        .get(url)
        .then((res) => {
          if (res.status == 200) {
            // console.log("获取商品列表成功");

            this.goodsList = this.goodsList.concat(res.data.rows);
          } else {
            Toast("获取商品列表失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    gotoDetails(goodsId) {
      //使用router 编程式导航到明细页
      //   this.$router.push("/Home/GoodsInfo/" + goodsId); //使用path字符串跳转
      //   this.$router.push({ path: "/Home/GoodsInfo/" + goodsId }); // 对象
      this.$router.push({ name: "GoodsInfo", params: { goodsId: goodsId } }); // 命名的路由 注意：如果提供了 path，params 会被忽略

      // this.$router.push({ path: "/Home/GoodsInfo/" + goodsId, query: { goodsId: goodsId } }); // 带查询参数，变成 /register?goodsId=123
    },
    getMore() {
      this.pageIndex++;
      this.getGoodsList();
    },
  },
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  background-color: #efeff4;
}

.goods-list .goods-item {
  width: 49%;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px #ccc;
  margin: 4px 0;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 293px;
}

.goods-list .goods-item img {
  width: 100%;
}

.goods-list .goods-item .title {
  font-size: 14px;
}
.goods-list .goods-item .info {
  background-color: #eee;
}

.goods-list .goods-item .info p {
  margin: 0;
  padding: 5px;
}

.goods-list .goods-item .info .price .now {
  color: red;
  font-weight: bold;
  font-size: 16px;
}

.goods-list .goods-item .info .price .old {
  text-decoration: line-through;
  font-size: 12px;
  margin-left: 10px;
}

.goods-list .goods-item .info .sell {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.goods-list .get-more{
    margin-bottom: 10px;
}
</style>
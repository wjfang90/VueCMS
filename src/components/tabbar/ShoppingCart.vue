<template>
  <div class="shopcar-container">
    <div
      class="goods-list"
      v-for="(item, index) in ShoppingCarList"
      :key="index"
    >
      <!-- 商品列表项区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              @change="
                updateSelected({
                  GoodsId: item.GoodsId,
                  Selected: item.Selected,
                })
              "
              v-model="item.Selected"
            ></mt-switch>
            <img :src="item.ImgUrl" />
            <div class="info">
              <h1>{{ item.Title }}</h1>
              <p>
                <span class="price">￥{{ item.Price }}</span>
                <!-- <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox> -->
                <numbox
                  :id="item.GoodsId"
                  :max="item.StockQuantity"
                  :count="item.Count"
                ></numbox>
                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                <a href="#" @click.prevent="remove(item.GoodsId, index)"
                  >删除</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品 <span class="red">{{$store.getters.shoppingCarSelectedCount}}</span> 件， 总价
              <span class="red">￥{{$store.getters.shoppingCarSelectedAmount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <!-- <p>{{ $store.getters.getGoodsSelected }}</p> -->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import numbox from "../subComponents/ShoppingCarNumber.vue";
import { localeData } from "moment";

export default {
  data() {
    return {
      ShoppingCarList: [],
    };
  },
  created() {
    this.getShoppingCarList();
  },
  components: {
    numbox,
  },
  methods: {
    //加载购物车商品数据
    getShoppingCarList() {
      var storeShoppingCar = localStorage.getItem("shoppingCar") || "[]";
      this.ShoppingCarList = JSON.parse(storeShoppingCar);

      /*
      let url = "ShoppingCarGoodsList";

      let ids = [];
      this.$store.state.shoppingCar.forEach((item) => ids.push(item.GoodsId));

      var params = { ids: ids.join(",") };
      // console.log(params);
      this.axios
        .get(url, params)
        .then((res) => {
          if (res.status == 200) {
            // this.ShoppingCarList.push(res.data.rows[0]);
            // console.log("获取购物车数据成功");

            res.data.rows.forEach((item) => {
              var goodsInfo = {
                GoodsId: item.id,
                Count: 1,
                ImgUrl:item.img_url,
                Price: item.sell_price,
                Title:item.title,
                StockQuantity:item.stock_quantity
              };
              this.$store.commit("addToShoppingCar", goodsInfo);
            });

            var storeShoppingCar = localStorage.getItem("shoppingCar") || "[]";

            this.ShoppingCarList = JSON.parse(storeShoppingCar);
          } else {
            Toast("获取购物车数据失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
         */
    },
    //修改购物车中的选中状态
    updateSelected(selectItem) {
      this.$store.commit("UpdateSelected", selectItem);
    },
    //获取number组件选中的值
    getSelectCount(count) {
      // console.log('父组件中 getSelectCount='+count);
    },
    //删除购物车中商品
    remove(goodsId, index) {
      this.ShoppingCarList.splice(index, 1);
      this.$store.commit("RemoveSelected", goodsId);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
}

.shopcar-container .goods-list .mui-card-content-inner {
  display: flex;
  align-items: center;
}

.shopcar-container .goods-list img {
  width: 60px;
  margin: 5px;
}

.shopcar-container .goods-list h1 {
  font-size: 13px;
}

.shopcar-container .goods-list .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  margin: 5px;
}

.shopcar-container .goods-list .info .mui-numbox {
  height: 20px;
  min-width: 60%;
  max-width: 100%;
}

.shopcar-container .goods-list .info .price {
  color: red;
  font-weight: bold;
  font-size: 12px;
}

.shopcar-container .jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shopcar-container .jiesuan .red {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
</style>

<template>
  <div class="goodsinfo-desc-container">
    <h3>{{ info.title }}</h3>
    <hr />
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      info: {},
      GoodsId: this.$route.params.goodsId,
    };
  },
  created() {
    this.getGoddsInfoDesc();
  },
  methods: {
    getGoddsInfoDesc() {
      let url = "GoodsInfoDesc";
      var param = { GoodsId: this.GoodsId };
      this.axios
        .get(url, param)
        .then((res) => {
           if (res.status == 200) {
              this.info=res.data;
          } else {
            Toast("加载商品描述成功");
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
.goodsinfo-desc-container {
  padding: 4px;
  margin-bottom: 15px;
}

.goodsinfo-desc-container h3 {
  font-size: 16px;
  color: #226aff;
  text-align: center;
  margin: 15px 0;
}
.goodsinfo-desc-container .content img {
  width: 100%;
}
</style>
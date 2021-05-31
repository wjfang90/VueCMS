<template>
  <!-- 问题： 我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值 -->
  <!-- 我们可以 使用 watch 属性监听，来 监听 父组件传递过来的 max 值，不管 watch 会被触发几次，但是，最后一次，肯定是一个 合法的 max 数值 -->
  <div :id="'numbox_' + this.id" class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      :id="'num_' + this.id"
      class="mui-input-numbox"
      type="number"
      :value="count"
      @change="countChanged"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      currentVaule: this.count,
    };
  },
  props: {
    id: Number, //使用商品id标识，防止一个页面引用多个组件，获取numberbox 时，不能设置多个numberbox的最大值
    count: Number, //当前数量
    max: Number,
  },
  mounted() {
    // 初始化数字选择框组件
    // mui(".mui-numbox").numbox();
    mui("#numbox_" + this.id)
      .numbox()
      .setOption("max", this.max);
    // console.log("mounted max=" + this.max);
  },
  watch: {
    max: function (newValue, oldValue) {
      // console.log("old value=" + oldValue);
      //   console.log("watch new value=" + newValue);
      //   console.log("watch max=" + this.max);
      // 使用 JS API 设置 numbox 的最大值
        mui("#numbox_" + this.id).numbox().setOption("max", this.max);
    },
    deep: true, //深度
    immediate: true, //立即以表达式的当前值触发回调
  },
  methods: {
    // 每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
    countChanged() {
      //调用父组件中的getcount事件
      // console.log('countChanged value='+this.currentVaule);
      this.currentVaule = this.$refs.numbox.value;
     
     if(this.currentVaule>this.max)
        this.currentVaule =this.max;

      //更新购物车中选中商品数量
      this.$store.commit("UpdateSelectedCount", {
        GoodsId: this.id,
        Count: parseInt(this.currentVaule),
      });
    },
  },
};
</script>
<style scoped>
</style>
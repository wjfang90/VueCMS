<template>
  <div>
    <!--轮播图-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in imageurls" :key="item">
        <img :src="item" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: {
    imageurls: Array,
  },
  created() {
    console.log(this.imageurls);
  },
};
</script>

<style scoped>
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}
</style>
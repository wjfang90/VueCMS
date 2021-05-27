<template>
  <div>
    <!--轮播图-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in imageurls" :key="index">
        <img :src="item.src" :class="{'img-full-width':isfullwidth}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: {
    imageurls: Array,
    isfullwidth:Boolean,
  },
};
</script>

<style scoped>
.mint-swipe{
  height: 200px;  
}
.mint-swipe-item{
  text-align: center;
}
.mint-swipe-item img {  
  height: 100%;
}
.img-full-width{
  width: 100%;
}
</style>
<template>
  <div>
    <commentbox :dataid="this.GoodsId"></commentbox>
  </div>
</template>

<script>
import commentbox from "../subComponents/comments.vue";
export default {
  data() {
    return {
      GoodsId: this.$route.params.goodsId,
    };
  },created(){
  },
  components: {
    commentbox
  },
};
</script>

<style scoped>
</style>
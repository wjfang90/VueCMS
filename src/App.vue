<template>
  <div class="app-container">
    <!--header -->
    <mt-header fixed title="vue cms">
      <router-link slot="left" to="/">
        <mt-button icon="back" @click="goback">返回</mt-button>
      </router-link>
    </mt-header>

    <!--content -->
    <transition>
      <router-view></router-view>
    </transition>

    <!--bottom  Tabbar-->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-fang" to="/Home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-fang" to="/Member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-fang" to="/ShoppingCart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-fang" to="/Search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
  components: {},
};
</script>

<style scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 65px;
  overflow-x: hidden;
}

/*修复图片列表向上滚动时，header区域显示图片背景的问题 */
.mint-header {
  z-index: 99 !important;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

/*解决图片列表中 顶部滑动菜单 与 tabbar 冲突，tabbar不能切换的问题*/

.mui-bar-tab {
  padding: 5px 0px;
}
.mui-bar-tab .mui-tab-item-fang {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 65px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-fang .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mui-bar .mui-icon {
  padding-bottom: 3px;
}
</style>

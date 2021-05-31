// import { from } from 'core-js/core/array'
import Vue from 'vue'
import App from './App.vue'

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'http://localhost:9001';
axios.defaults.withCredentials = true;//允许跨域携带cookie信息


import VueRouter from 'vue-router'; //导入vue-router
Vue.use(VueRouter);//手动安装vue-router

//导入并安装状态管理Vuex
import Vuex from 'vuex';
Vue.use(Vuex);

import router from './router.js';//导入router.js

import MintUi from 'mint-ui';
// import { Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui';
import 'mint-ui/lib/style.css'; //导入 mint-ui 样式

// Vue.component(Header.name,Header);//导入Mint-ui 中的header
// Vue.component(Swipe.name, Swipe); //导入首页轮播图
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);//首页-新闻明细评论

// Vue.use(Lazyload);//首页-图片分享中 懒加载 按需导入loading图片不显示，要全部导入才会显示
Vue.use(MintUi);

import './lib/mui/css/mui.css';// 导入 MUI 的样式
import './lib/mui/css/icons-extra.css';// 导入扩展图标样式，购物车图标

// 安装 图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


// 导入格式化时间的插件
import moment from 'moment';

//引入mock模块
import './mock/mock.js';


//定义全局时间格式化过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'yyyy-MM-dd HH:mm:ss') {
  return moment(dataStr).format(pattern);
});


//购物车数量使用store 和localStorage 处理
var shoppingCarStr = localStorage.getItem('shoppingCar') || '[]';
// vuex创建 store
var store = new Vuex.Store({
  state: {
    shoppingCar: JSON.parse(shoppingCarStr),
  },
  mutations: {
    //加入购物车
    addToShoppingCar(state, goodsInfo) {

      var isContains = false;
      state.shoppingCar.some(item => {
        if (item.GoodsId == goodsInfo.GoodsId) {
          //如果购物车中有该商品，只修改商品数量
          item.Count = parseInt(item.Count) + parseInt(goodsInfo.Count);
          isContains = true;
          return true;
        }
      });

      //如果购物车中没有该商品，添加到购物车对象
      if (!isContains) {
        state.shoppingCar.push(goodsInfo);
      }

      //保存到本地存储
      localStorage.setItem('shoppingCar', JSON.stringify(state.shoppingCar));
    },
    //修改购物车中商品选中状态
    UpdateSelected(state, selectItem) {
      state.shoppingCar.some(item => {
        if (item.GoodsId == selectItem.GoodsId) {
          item.Selected = selectItem.Selected;
          return true;
        }
      });

      //保存到本地存储
      localStorage.setItem('shoppingCar', JSON.stringify(state.shoppingCar));
    },
    //修改购物车选中商品数量
    UpdateSelectedCount(state, selectItem) {
      state.shoppingCar.some(item => {
        if (item.GoodsId == selectItem.GoodsId) {
          item.Count = parseInt(selectItem.Count);
          return true;
        }
      });

      //保存到本地存储
      localStorage.setItem('shoppingCar', JSON.stringify(state.shoppingCar));
    },
    //删除购物车选中商品
    RemoveSelected(state, goodsId) {
      console.log();
      state.shoppingCar.some((item, index) => {
        if (item.GoodsId == goodsId) {
          state.shoppingCar.splice(index, 1);
          return true;
        }
      });

      //保存到本地存储
      localStorage.setItem('shoppingCar', JSON.stringify(state.shoppingCar));
    }
  },
  getters: {
    //tarbar 中购物车的数量
    shoppingCarCount: function (state) {
      var count = 0;
      state.shoppingCar.forEach(item => count += parseInt(item.Count));
      return count;
    },
    //购物车中选中商品总数量
    shoppingCarSelectedCount: function (state) {
      var count = 0;
      state.shoppingCar.forEach(item => {
        if (item.Selected)
          count += parseInt(item.Count);
      });
      return count;
    },
    //购物车中选中总金额
    shoppingCarSelectedAmount: function (state) {
      var selectAmount = 0;
      state.shoppingCar.forEach(item => {
        if (item.Selected)
          selectAmount += parseInt(item.Price) * parseInt(item.Count);
      });
      return selectAmount;
    }
  }
});

Vue.config.productionTip = false

var vm = new Vue({
  render: h => h(App),
  router,
  store //store添加到vue配置
}).$mount('#app');

// function getFileByPath(fpath) {
//   return new Promise(function (resolve, reject) {
// var fs = require('fs');

//     fs.readFileSync(fpath, 'utf-8', (err, dataStr) => {

//       if (err) return reject(err)
//       resolve(dataStr)

//     })
//   })
// }

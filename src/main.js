// import { from } from 'core-js/core/array'
import Vue from 'vue'
import App from './App.vue'

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);

axios.defaults.baseURL = 'http://localhost:9001';
axios.defaults.withCredentials = true;//允许跨域携带cookie信息


import VueRouter from 'vue-router'; //导入vue-router
Vue.use(VueRouter);//手动安装vue-router

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


//定义全局时间格式化过滤器
Vue.filter('dateFormat',function(dataStr, pattern='yyyy-MM-dd HH:mm:ss'){
  return moment(dataStr).format(pattern);
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app');



//引入mock模块
import './mock/mock.js';

// function getFileByPath(fpath) {
//   return new Promise(function (resolve, reject) {
// var fs = require('fs');
    
//     fs.readFileSync(fpath, 'utf-8', (err, dataStr) => {

//       if (err) return reject(err)
//       resolve(dataStr)

//     })
//   })
// }

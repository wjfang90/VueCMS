import VueRouter from 'vue-router';

import home from './components/tabbar/Home.vue';
import Member from './components/tabbar/Member.vue';
import ShoppingCart from './components/tabbar/ShoppingCart.vue';
import Search from './components/tabbar/Search.vue';


import newslist from './components/news/NewsList.vue';
import newsInfo from './components/news/NewsInfo.vue';

import photoList from './components/photos/PhotoList.vue';
import photoInfo from './components/photos/PhotoInfo.vue';

import goodsList from './components/goods/GoodsList.vue';
import goodsInfo from './components/goods/GoodsInfo.vue';
import goodsInfoDesc from './components/goods/GoodsInfoDesc.vue';
import goodsComment from './components/goods/GoodsComment.vue';

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/Home', component: home },
        { path: '/Member', component: Member },
        { path: '/ShoppingCart', component: ShoppingCart },
        { path: '/Search', component: Search },

        { path: '/Home/NewsList', component: newslist },
        { path: '/Home/NewsInfo/:id', component: newsInfo },

        { path: '/Home/PhotoList', component: photoList },
        { path: '/Home/PhotoInfo/:photoId', component: photoInfo },

        { path: '/Home/GoodsList', component: goodsList },
        { path: '/Home/GoodsInfo/:goodsId', component: goodsInfo ,name:'GoodsInfo'},
        { path: '/Home/GoodsInfoDesc/:goodsId', component: goodsInfoDesc ,name:'GoodsInfoDesc'},
        { path: '/Home/GoodsComment/:goodsId', component: goodsComment },

    ],
    linkActiveClass: 'mui-active'//设置router 当前访问path的样式名
});

export default router;
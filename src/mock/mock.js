import Mock from 'mockjs';

const urls = {

    homeSwipes:"http://localhost:9001/HomeSwipes",

    newsList: 'http://localhost:9001/NewsList',
    newsInfo: 'http://localhost:9001/NewsInfo',

    newsCommentList: 'http://localhost:9001/NewsCommentList',
    postComment: 'http://localhost:9001/PostComment',

    photoCateList: 'http://localhost:9001/PhotoCateList',
    photoList: 'http://localhost:9001/PhotoList',
    photoInfo: 'http://localhost:9001/PhotoInfo',
    photoThumbnailList: 'http://localhost:9001/PhotoThumbnailList',

    goodsList: 'http://localhost:9001/GoodsList',
    goodsInfo: 'http://localhost:9001/GoodsInfo',

};

let homeSwipesTmp={
    total:10,
    'rows|5':[
        {
            'size|1': ['250x250', '240x400', '300x250']
        }
    ]
}

let newsListTmp = {
    total: 100,
    'rows|20': [{
        'id|+1': 1,
        title: '@ctitle(10,30)',
        content: '@cparagraph',
        "click|0-100": 0,
        add_time: '@datetime',
        img_url: "/images/newslist/@integer(1,3).jpg"
    }]
};

let newsInfoTmp = {
    'id|1-100': 1,
    title: '@ctitle(10,30)',
    content: '@cparagraph(50,300)',
    "click|0-100": 0,
    add_time: '@datetime',
    img_url: "/images/newslist/@integer(1,3).jpg"
};

let newsCommentsListTmp = {
    total: 100,
    'rows|20': [{
        'id|+1': 1,
        user_name: '@cname',
        content: '@cparagraph',
        add_time: '@datetime'
    }]
};

let photoCateListTmp = {
    total: 10,
    'rows|10': [{
        'id|5-10': 1,
        title: '@ctitle(4,4)'
    }]
};

let photoListTmp = {
    total: 100,
    'rows|20': [
        {
            'id|+1': 1,
            title: '@ctitle',
            'size|1': ['250x250', '240x400', '300x250'],
            // img_url: "@image(@size, @color, @ctitle)",
            img_url: "/images/photos/@integer(1,18).jpg",
            info: "@cparagraph(20,100)"
        }
    ]
};

let photoInfoTmp = {
    'id|+1': 1,
    title: '@ctitle',
    // 'size|1': ['250x250', '240x400', '300x250'],
    // img_url: "@image(@size, @color, @ctitle)",
    info: "@cparagraph(20,100)",
    "click|0-100": 0,
    add_time: '@datetime'
};

let photoThumbnailListTmp = {
    total: 10,
    'rows|10': [
        {
            'id|+1': 1,
            title: '@ctitle',
            alt: "@title",
            w: 200, //width
            h: 160, //height
            size: "@w@string('x',1,1)@h",
            src: "@image(@size, @color, @ctitle)",//预览时大图的url
            // "src": "/images/photos/@integer(1,18).jpg",
            msrc: '@src' //小图的url
        }
    ]
};

let goodsListTmp = {
    total: 50,
    'rows|20': [
        {
            'id|+1': 1,
            title: '@ctitle(20,40)',
            sell_price: "@integer(100000,10000000)",
            market_price: "@integer(@sell_price,20000000)",
            img_url: "/images/goods/@integer(1,11).jpg",
            info: "@cparagraph(20,100)",
            stock_quantity: "@integer(20,100)",
            add_time: '@datetime'
        }
    ]
};

let goodsInfoTmp = {
    'id|+1': 1,
    goods_no:"@datetime('yyyyMMdd')@integer(10000,90000)",
    title: '@ctitle(20,40)',
    sell_price: "@integer(100000,10000000)",
    market_price: "@integer(@sell_price,20000000)",
    // img_url: "/images/goods/@integer(1,11).jpg",
    info: "@cparagraph(20,100)",
    stock_quantity: "@integer(20,100)",
    add_time: '@datetime'
};

Mock.mock(urls.swipes,)

Mock.mock(urls.newsList, newsListTmp);
Mock.mock(urls.newsInfo, newsInfoTmp);

Mock.mock(urls.newsCommentList, newsCommentsListTmp);
Mock.mock(urls.postComment, function (options) {
    return options;
});

Mock.mock(urls.photoCateList, photoCateListTmp);
Mock.mock(urls.photoList, photoListTmp);
Mock.mock(urls.photoInfo, photoInfoTmp);
Mock.mock(urls.photoThumbnailList, photoThumbnailListTmp);

Mock.mock(urls.goodsList, goodsListTmp);
Mock.mock(urls.goodsInfo,goodsInfoTmp);

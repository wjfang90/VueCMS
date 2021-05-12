module.exports = {
    pages: {
        index: {
            entry: "./src/main.js",
            // 模板来源
            template: 'public/index.html',
            filename: "index.html",
            title: 'vue cms'
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: '9001',
        // proxy: {
        //     '/': {
        // //            target:'http://192.168.4.179:9001/api',
        //     },
        // }
    },

}
const loader = require("sass-loader");

module.exports = {
  outputDir: "dist/vuecli3",
  indexPath: "index.html",
  publicPath: "/vuecli3/",
  runtimeCompiler: true,
  // chainWebpack: (config) => {
  //     config.resolve.symlinks(true) // 修复热更新失效
  //   },
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
//   configureWebpack: {
//     plugins: [
//       [
//         "import",
//         { libraryName: "ant-design-vue", libraryDirectory: "es", style: true },
//       ],
//     ],
//   },

  devServer: {
    hot: true,
    proxy: {
      "/api": {
        target: "http://openapi.tuling123.com/openapi/api/v2", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      "/node": {
        target: "http://localhost:8111", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/node": "", //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      "/Express": {
        target: "http://localhost:8110", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/Express": "", //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
    },
  },
};

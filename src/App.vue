<template>
  <div id="app">
    <div id="nav">
      <div v-for="item in menu" :key="item.name">
        <router-link :to="item.path">{{item.name}}</router-link>
      </div>
    </div>
      <router-view class="view"/>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  },
  data() {
    return {
      menu: [
        {
          path: '/',
          name: 'Home'
        },
        {
          path: '/about',
          name: 'About',
        },
        {
          path: '/first',
          name: 'First',
        },
        {
          path: '/eCharts',
          name: 'eCharts',
        },
        {
          path: '/aplayer',
          name: 'aplayer',
        },
        {
          path: '/lucktask',
          name: '抽奖',
        },
        {
          path: '/es6',
          name: 'es6',
        },
        {
          path: '/viserLine',
          name: 'viser线形图',
        },
        {
          path: '/iviewTheme',
          name: 'iview主题定制',
        },
        {
          path: '/css',
          name: 'css动画',
        },
        {
          path: '/animate',
          name: '3D动画',
        },
        {
          path: '/code',
          name: '移动端验证码',
        },
        {
          path: '/pinYin',
          name: '拼音插件',
        },
        {
          path: '/drag',
          name: '拖拽',
        },
        {
          path: '/ol',
          name: 'openLayer',
        },
        {
          path: '/cesium',
          name: 'cesium',
        },
        {
          path: '/live2d',
          name: 'live2d',
        },
        {
          path: '/threejs',
          name: 'three.js',
        },
        {
          path: '/vueProperty',
          name: '深入浅出vue.js',
        },
        {
          path: '/position',
          name: '测试定位优先级',
        },
        {
          path: '/color-picker',
          name: 'color-picker',
        },
        {
          path: '/json',
          name: 'json'
        },
        {
          path: '/gif',
          name: 'gif'
        },
        {
          path: '/layer',
          name: 'layer'
        }
      ]
    }
  },
  mounted() {
    // setTimeout(() => {
    //       window.L2Dwidget.init({
    //       pluginRootPath: 'live2dw/',
    //       pluginJsPath: 'lib/',
    //       pluginModelPath: 'live2d-widget-model-z16/assets/',
    //       tagMode: false,
    //       debug: false,
    //       model: { jsonPath: '../live2dw/live2d-widget-model-z16/assets/z16.model.json' },
    //       display: { position: 'right', width: 100, height: 200 },
    //       mobile: { show: true },
    //       log: false
    //       })
    //   })
  },
};
</script>

<style>
* {
  box-sizing: content-box !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  /* padding: 20px; */
}
#nav {
  width: 150px;
  border-right: 1px solid #cccccc;
  margin: 0 10px; 
  height: 100vh;
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.view {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
}
</style>

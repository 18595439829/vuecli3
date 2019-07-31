<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/first">First</router-link> |
      <router-link to="/eCharts">eCharts</router-link> |
      <router-link to="/aplayer">aplayer</router-link> |
      <router-link to="/lucktask">抽奖</router-link> |
      <router-link to="/es6">es6</router-link> |
      <router-link to="/viserLine">viser线形图</router-link> |
      <router-link to="/iviewTheme">iview主题定制</router-link> |
      <router-link to="/animate">css动画</router-link> |
      <router-link to="/code">移动端验证码</router-link>
      <router-link to="/pinYin">拼音插件</router-link> |
      <router-link to="/drag">拖拽</router-link> |
      <router-link to="/ol">openLayer</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    sessionStorage.setItem('aaa', 'aaa');
    console.log(new Date());
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* padding: 20px; */
}
#nav {
  text-align: center;
  border-bottom: #2c3e50 1px solid;
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

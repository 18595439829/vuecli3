<template>
  <div :class="$style['container']">
    <div>
      第二章:Object的变化侦测
    </div>
    <div>
      <Button @click="doDefineProperty">doDefineProperty</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chapter2",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    doDefineProperty() {
      let obj = {
        name: "张三",
        age: "25"
      };
      let isMan = undefined;
      Object.defineProperty(obj, "isMan", {
        configurable: true,
        enumerable: true,
        get: function() {
            console.log('get')
          return isMan;
        },
        set: function(v) {
            console.log('set')
            isMan = v;
        }
      });
      let keys = Object.keys(obj);
      obj.isMan = false;
      console.log(obj, keys);
    }
  }
};
</script>

<style lang="less" module>
.container {
}
</style>

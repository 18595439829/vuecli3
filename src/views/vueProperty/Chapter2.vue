<template>
  <div :class="$style['container']">
    <div>
      第二章:Object的变化侦测
    </div>
    <div>
      <Button @click="doDefineProperty">doDefineProperty</Button>
      <Button @click="toNewObj">defineObjPro</Button>
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
          console.log("get");
          return isMan;
        },
        set: function(v) {
          console.log("set");
          isMan = v;
        }
      });
      let keys = Object.keys(obj);
      obj.isMan = false;
      console.log(obj, keys);
    },
    toNewObj() {
      let obj = {
        name: "李四",
        age: "30"
      };
      let newObj = this.defineObjPro(obj);
      newObj.age = '18';
      console.log(newObj.name, newObj.age);
    },
    defineObjPro(obj) {
      Object.keys(obj).forEach(key => {
        let val = obj[key];
        Object.defineProperty(obj, key, {
          configurable: true,
          enumerable: true,
          get: function() {
            console.log("get", key);
            return val;
          },
          set: function(v) {
            console.log("set", key);
            val = v;
          }
        });
      });
      return obj;
    }
  }
};
</script>

<style lang="less" module>
.container {
}
</style>

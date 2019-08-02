<template>
  <div :class="$style['container']">
    <Tree :data="treeData" show-checkbox></Tree>
  </div>
</template>
<script>
export default {
  name: "MapArray",
  data() {
    return {
      arrAll: [
        {
          id: "1",
          pid: "-1",
          name: "动物"
        },
        {
          id: "1-1",
          pid: "1",
          name: "哺乳动物"
        },
        {
          id: "1-1-1",
          pid: "1-1",
          name: "猫科"
        },
        {
          id: "1-1-1-1",
          pid: "1-1-1",
          name: "老虎"
        },
        {
          id: "1-1-1-2",
          pid: "1-1-1",
          name: "狮子"
        },
        {
          id: "1-1-2",
          pid: "1-1",
          name: "犬科"
        },
        {
          id: "1-1-2-1",
          pid: "1-1-2",
          name: "狗"
        },
        {
          id: "1-1-2-2",
          pid: "1-1-2",
          name: "狼"
        },
        {
          id: "1-2",
          pid: "1",
          name: "鸟"
        },
        {
          id: "1-2-1",
          pid: "1-2",
          name: "家禽"
        },
        {
          id: "1-2-1-1",
          pid: "1-2-1",
          name: "鸡"
        },
        {
          id: "1-2-1-2",
          pid: "1-2-1",
          name: "鸭"
        },
        {
          id: "1-2-2",
          pid: "1-2",
          name: "野生"
        },
        {
          id: "1-2-2-1",
          pid: "1-2-2",
          name: "麻雀"
        },
        {
          id: "1-2-2-2",
          pid: "1-2-2",
          name: "乌鸦"
        },
        {
          id: "2",
          pid: "-1",
          name: "植物"
        },
        {
          id: "2-1",
          pid: "2",
          name: "树"
        },
        {
          id: "2-1-1",
          pid: "2-1",
          name: "杨树"
        },
        {
          id: "2-1-2",
          pid: "2-1",
          name: "柳树"
        },
        {
          id: "2-2",
          pid: "2",
          name: "花"
        },
        {
          id: "2-2-1",
          pid: "2-2",
          name: "月季"
        },
        {
          id: "2-2-2",
          pid: "2-2",
          name: "牡丹"
        }
      ],
      arrChecked: [],
      treeData: [],
    };
  },
  created() {
      this.treeData = this.initTree(this.arrAll)
  },    
  methods: {
    initTree(data) {
      let obj = {};
      let arr = [];
      data.forEach(item => {
        item.title = item.name;
        obj[item.id] = item;
      });
      data.forEach(item => {
        let hasChild = obj[item.pid];
        if (hasChild) {
          if (!hasChild.children) {
            hasChild.children = [];
          }
          hasChild.children.push(item);
        } else {
          arr.push(item);
        }
      });
      console.log(arr);
      return arr;
    }
  }
};
</script>
<style lang="less" module>
.container {
  margin: 0;
  padding: 0;
}
</style>

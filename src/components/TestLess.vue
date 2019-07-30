<template>
  <div :class="$style['container']">
    <div :class="$style['box']"></div>
    <div>
      <div>
        <Button @click="setTheme('red')">红色主题</Button>
        <Button @click="setTheme('green')">绿色主题</Button>
      </div>
      <div :class="$style['theme']">
        <h3 :class="$style['theme_title']">标题</h3>
        <div :class="$style['theme_content']">
          <p>第一行第一行第一行第一行第一行</p>
          <p>第二行第二行第二行第二行第二行</p>
          <p>第三行第三行第三行第三行第三行</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import treeJson from "@/test/TreeList.json";
export default {
  name: "TestLess",
  data() {
    return {
      treeJson,
      treeData: [
        {
          title: "系统管理",
          parentName: "",
          pid: 0,
          id: 1
        },
        {
          title: "菜单管理",
          parentName: "系统管理",
          pid: 1,
          id: 11
        },
        {
          title: "菜单新增",
          parentName: "菜单管理",
          pid: 11,
          id: 111
        },
        {
          title: "菜单编辑",
          parentName: "菜单管理",
          pid: 11,
          id: 112
        },
        {
          title: "菜单删除",
          parentName: "菜单管理",
          pid: 11,
          id: 113
        },
        {
          title: "角色管理",
          parentName: "系统管理",
          pid: 1,
          id: 22
        },
        {
          title: "角色新增",
          parentName: "角色管理",
          pid: 22,
          id: 221
        },
        {
          title: "角色编辑",
          parentName: "角色管理",
          pid: 22,
          id: 222
        },
        {
          title: "角色删除",
          parentName: "角色管理",
          pid: 22,
          id: 223
        },
        {
          title: "用户管理",
          parentName: "系统管理",
          pid: 1,
          id: 33
        },
        {
          title: "用户新增",
          parentName: "用户管理",
          pid: 33,
          id: 331
        },
        {
          title: "用户编辑",
          parentName: "用户管理",
          pid: 33,
          id: 332
        },
        {
          title: "用户删除",
          parentName: "用户管理",
          pid: 33,
          id: 333
        }
      ]
    };
  },
  mounted() {
    console.log(this.jsonToTree(this.treeJson, 'id', 'pid'));
  },
  methods: {
    setTheme(color) {
      if (color === "red") {
        document.documentElement.style.setProperty("--main-color", "#ff0000");
        document.documentElement.style.setProperty("--main-filter", "100%");
      } else {
        document.documentElement.style.setProperty("--main-color", "#0000ff");
        document.documentElement.style.setProperty("--main-filter", "50%");
      }
    },
    // jsonData: 数组对象
    // id: 每条数据的id
    // pid: 每条数据的父节点对应字段
    /*
      [
        {
          name: '测试',
          id: '1001',
          pid: '-1',
        }
      ] 
    */
    jsonToTree(jsonData, id, pid) {
      let result = [],
        temp = {};
      for (let i = 0; i < jsonData.length; i++) {
        temp[jsonData[i][id]] = jsonData[i]; // 以id作为索引存储元素，可以无需遍历直接定位元素
      }
      for (let j = 0; j < jsonData.length; j++) {
        let currentElement = jsonData[j];
        let tempCurrentElementParent = temp[currentElement[pid]]; // 临时变量里面的当前元素的父元素
        if (tempCurrentElementParent) {
          // 如果存在父元素
          if (!tempCurrentElementParent["children"]) {
            // 如果父元素没有chindren键
            tempCurrentElementParent["children"] = []; // 设上父元素的children键
          }
          tempCurrentElementParent["children"].push(currentElement); // 给父元素加上当前元素作为子元素
        } else {
          // 不存在父元素，意味着当前元素是一级元素
          result.push(currentElement);
        }
      }
      return result;
    }
  }
};
</script>
<style lang="less" module>
@base: #f938ab;

:root {
  --main-color: #ff0000;
  --main-BG: let(--main-color);
  --main-fliter: 100%;
}
.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow: @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  width: 100px;
  height: 100px;
  border: 1px solid;
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div {
    .box-shadow(0 0 5px, 30%);
  }
}
.theme {
  color: let(--main-color);
  .theme_title {
    border: 1px solid let(--main-color);
    background-color: invert(#ff0000);
    color: let(--main-color);
    filter: invert(let(--main-fliter));
  }
}
</style>


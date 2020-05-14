<template>
  <div>
    <Button @click="add">add</Button>
    <Button @click="show">显示</Button>
    <Button @click="hide">隐藏</Button>
    <Button @click="cbClass">调用Class内部方法</Button>
    <div ref="text"></div>
    <Button @click="start">进度条开始</Button>
    <Button @click="finish">进度条完成</Button>
    <div :class="$style['clips']">
      <div :class="$style['clip1']"></div>
      <div :class="$style['clip2']"></div>
      <div :class="$style['clip3']"></div>
      <div :class="$style['clip4']"></div>
      <div :class="$style['clip5']"></div>
    </div>
    <Button @click="deleteArr">多维数组删除</Button>
  </div>
</template>

<script>
import Text from "./TextClass.js";
import {deleteItem} from './arraysDelete.js';

export default {
  name: "es6-class",
  data() {
    return {
      // newText: null,
    };
  },
  mounted() {
    this.newText = new Text("我是newText", this.$refs.text);
  },
  methods: {
    add() {
      this.newText.add("函数add" + Math.ceil(Math.random() * 100));
    },
    show() {
      this.newText.show();
    },
    hide() {
      this.newText.hide();
    },
    cbClass() {
      this.newText.cbClass();
    },
    start() {
      this.$progress.start();
    },
    finish() {
      this.$progress.finish();
    },
    deleteArr() {
      const arr = [
        1,
        2,
        [
          4,
          5,
          [
            { 
              id: 1, 
              name: "aaa",
              children: [
                6,
                7,
                [
                  {
                    id: 1-1,
                    name: 'aaa-111',
                  }
                ]
              ] 
            },
            {
              id: 2,
              name: "bbb",
            },
          ],
        ],
      ];
      deleteItem(arr, 'id', 1);
      console.log(arr);
    },
  },
};
</script>

<style lang="less" module>
.clips {
  display: flex;
  @width: 100px;
  @height: 100px;

  .clip {
    margin-right: 10px;
    cursor: pointer;
    width: @width;
    height: @height;
    background-color: #5a6dfb;
  }
  .clip1 {
    .clip;
    clip-path: polygon(
      0 0,
      25% 0,
      100% 75%,
      100% 100%,
      0 0
    ); //多边形切割 polygon(x轴点位 y轴点位, x轴点位 y轴点位 ...)
  }
  .clip2 {
    .clip;
    clip-path: circle(
      40% at 50% 50%
    ); //圆形切割 circle(圆角程度 at 圆角圆心x 圆角圆心y )
  }
  .clip3 {
    .clip;
    clip-path: ellipse(
      30% 50% at 50% 50%
    ); //椭圆切割 ellipse(x轴圆角程度 y轴圆角程度 at 圆角圆心x 圆角圆心y )
  }
  .clip4 {
    .clip;
    clip-path: inset(
      10% 20% 20% 10% round 20% 30% 40% 50%
    ); // 圆角切割 inset(上内边距 右内边距 下内边距 左内边距 round 左上圆角程度 右上圆角程度 右下圆角程度 左下圆角程度)
  }
  .clip5 {
    .clip;
    clip-path: ellipse(30% 50% at 50% 50%);
  }
}
</style>

<template>
  <div :class="$style['container']">
    <draggable
    v-show="isRemove"
      :list="myArray1"
      group="list"
      :class="$style[('drag-group', 'drag-group-remove')]"
    >
      <div v-for="element in myArray1" :key="element.id">
        <img :src="KAOLA" alt="" />
        {{ element.name }}
      </div>
    </draggable>
    <div v-show="isRemove" ref="remove" :class="$style['remove']">拖拽到此处删除</div>
    <draggable :list="myArray" group="list" :class="$style['drag-group']" @change="change">
      <div v-for="element in myArray" :key="element.id" @mousedown="mousedown">
        <img :src="KAOLA" alt="" />
        {{ element.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import KAOLA from "@/assets/img/Koala.jpg";

export default {
  name: "TheDrag",
  components: {
    draggable,
  },
  data() {
    return {
      KAOLA,
      myArray: [
        {
          id: "001",
          name: "一号宇宙飞船",
        },
        {
          id: "002",
          name: "二哥洛溪",
        },
        {
          id: "003",
          name: "三沙发公开课",
        },
        {
          id: "004",
          name: "四更省道加深入",
        },
        {
          id: "005",
          name: "五电费124卡立方",
        },
        {
          id: "006",
          name: "六fsf地方",
        },
      ],
      myArray1: [
        {
          id: "007",
          name: "七号宇宙飞船",
        },
      ],
      elementId: null,
      isRemove: false
    };
  },
  computed: {
    removeEleBoundary() {
      return this.$refs.remove.getBoundingClientRect();
    },
  },
  methods: {
    mousedown() {
      this.isRemove = true
      document.body.addEventListener('mouseup', this.change)
    },
    change() {
      console.log('change')
      this.isRemove = false
    }
  },
};
</script>

<style lang="less" module>
.container {
  .drag-group {
    display: flex;
    & > div {
      width: 100px;
      height: 100px;
      box-shadow: 0px 0px 3px #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 50px;
    }
  }
  .remove {
    width: 100%;
    height: 50px;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    border: 1px dashed #dddddd;
    position: fixed;
    top: 48px;
    pointer-events: none;
  }
  .drag-group-remove {
    .remove;
    opacity: 0;
    pointer-events: auto;
    overflow: hidden;
  }
}
</style>

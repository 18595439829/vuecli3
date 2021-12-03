<template>
  <div :class="$style['container']" @mousedown="mousedown" @mouseup="mouseup">
    <draggable
      v-if="canRemove"
      v-show="isRemove"
      :list="myArray1"
      group="list"
      :class="[$style['drag-group'], $style['drag-group-remove']]"
    >
      <div v-for="element in myArray1" :key="element.dragId">
        <!-- {{ element.dragId }} -->
      </div>
    </draggable>
    <div
      v-if="canRemove"
      v-show="isRemove"
      ref="remove"
      :class="$style['remove']"
    >
      {{ placeholder }}
    </div>
    <draggable
      :list="myArray"
      group="list"
      :class="$style['drag-group']"
      :move="move"
      @end="end"
      @change="change"
    >
      <slot />
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "BaseDrag",
  components: {
    draggable,
  },
  model: {
    prop: "list",
    event: "change",
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    canRemove: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      myArray1: [
        {
          dragId: Math.random(),
        },
      ],
      isRemove: false,
      placeholder: "拖拽到此处删除",
    };
  },
  computed: {
    myArray() {
      return this.list.map((item) => {
        item.dragId = Math.random();
        return item;
      });
    }
  },
  methods: {
    mousedown(e) {
      if (!this.canRemove) {
        return;
      }
      this.isRemove = true;
    },
    mouseup () {
        if (!this.canRemove) {
        return;
      }
      this.isRemove = false;
    },
    end() {
      if (!this.canRemove) {
        return;
      }
      this.isRemove = false;
    },
    move(e) {
      if (!this.canRemove) {
        return;
      }
      if (e.to.className.indexOf("drag-group-remove") !== -1) {
        this.placeholder = "松开鼠标,即可移除";
      } else {
        this.placeholder = "拖拽到此处删除";
      }
    },
    change() {
      this.$emit("change", this.myArray);
    },
  },
};
</script>

<style lang="less" module>
.container {
  position: relative;
  .drag-group {
    display: flex;
    width: 100%;
    position: absolute;
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
    box-sizing: border-box;
    position: absolute;
    top: 0;
    pointer-events: none;
    z-index: 1;
  }
  .drag-group-remove {
    .remove;
    opacity: 0;
    pointer-events: auto;
    overflow: hidden;
  }
}
</style>

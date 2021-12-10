<template>
  <div
    :class="$style['container']"
    @mousedown="mousedown"
    @mouseup="mouseup"
  >
    <draggable
      v-if="canRemove"
      v-show="isRemove"
      :list="myArray1"
      group="list"
      :class="[$style['drag-group'], $style['drag-group-remove']]"
    >
      <div
        v-for="element in myArray1"
        :key="element.dragId"
      >
        <!-- {{ element.dragId }} -->
      </div>
    </draggable>
    <div
      v-if="canRemove"
      v-show="isRemove"
      ref="remove"
      :class="['can-remove',$style['remove']]"
    >
      {{ placeholder }}
    </div>
    <draggable
      ref="draggable"
      :list="myArray"
      group="list"
      :class="$style['drag-group']"
      :move="move"
      @end="end"
      @change="change"
    >
      <slot class="draggable-item" />
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'BaseDrag',
  components: {
    draggable
  },
  model: {
    prop: 'list',
    event: 'change'
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    canRemove: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      myArray1: [
        {
          dragId: Math.random()
        }
      ],
      isRemove: false,
      placeholder: '拖拽到此处删除'
    }
  },
  computed: {
    myArray () {
      return this.list.map((item) => {
        item.dragId = Math.random()
        return item
      })
    }
  },
  methods: {
    mousedown (e) {
      if (!this.canRemove || !this.$refs.draggable.$el.contains(e.target) || e.target === this.$refs.draggable.$el) {
        return
      }
      this.isRemove = true
    },
    mouseup () {
      if (!this.canRemove) {
        return
      }
      this.isRemove = false
    },
    end () {
      if (!this.canRemove) {
        return
      }
      this.isRemove = false
    },
    move (e) {
      if (!this.canRemove) {
        return
      }
      if (e.to.className.indexOf('drag-group-remove') !== -1) {
        this.placeholder = '松开鼠标,即可移除'
      } else {
        this.placeholder = '拖拽到此处删除'
      }
    },
    change () {
      this.$emit('change', this.myArray)
    }
  }
}
</script>

<style lang="less" module>
.container {
  width: 100%;
  height: 100%;
  .drag-group {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
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
    pointer-events: none;
    position: absolute;
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

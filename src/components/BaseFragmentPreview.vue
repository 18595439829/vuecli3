<template>
  <div :class="$style['container']">
    <div :class="$style['form']" :contenteditable="true">
      <draggable v-model="list">
        <transition-group ref="form">
          <div
            v-for="item in list"
            :key="item.id"
            :id="item.id"
            :class="$style['form-item']"
          >
            <div
              :class="$style['img']"
              :contenteditable="false"
            >
              <img src="@/assets/img/点选_03.png" alt="" />
            </div>
            <div :contenteditable="true" :class="$style['content']" @click="enter(item, $event)">{{ item.content }}</div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div>
      <Button @click="output">输出</Button>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "BaseFragmentPreview",
  components: {
    draggable
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    enter(item, event) {
      let selection = window.getSelection ? window.getSelection() : document.selection
      let range = selection.createRange ? selection.createRange() : selection.getRangeAt(0)
      console.log(item, event, range)
    },
    output() {
      console.log(this.$refs.form.$el.children)
      let children = Array.from(this.$refs.form.$el.children);
      let list = children.map((item) => {
        return {
          id: item.id,
          content: item.innerText.replace(/\n/gm, ""),
        };
      });
      this.list = list
      console.log(children, list);
    },
  },
};
</script>
<style lang="less" module>
.container {
  display: flex;
  .form {
    margin-right: 20px;
    &:focus-visible {
        outline: none;
      }
    .form-item {
      position: relative;
      &:focus-visible {
        outline: none;
      }
      &:hover {
        .img {
          visibility: visible;
        }
      }
      .img {
        cursor: move;
        user-select: none;
        visibility: hidden;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        img {
          width: 40px;
          height: 20px;
          user-select: none;
        }
      }
      .content {
        margin-left: 40px;
      }
    }
  }
}
</style>

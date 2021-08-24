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
            <div :contenteditable="true" :class="$style['content']" @keypress.enter="enter(item, $event)">
              {{ item.content }}
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <button @click="output">输出</button>
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
  created() {
    this.list = this.data
  },
  methods: {
    enter(item, event) {
      console.log(item, event)
    },
    output() {
      console.log(this.$refs.form.$el.children)
      let children = Array.from(this.$refs.form.$el.children);
      let list = children.map((item) => {
        return {
          id: item.id,
          content: item.innerText,
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
  .form {
    .form-item {
      display: flex;
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
        img {
          height: 20px;
          user-select: none;
        }
      }
    }
  }
}
</style>

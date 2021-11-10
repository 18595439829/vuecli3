<template>
  <div :class="$style['container']">
    <div :class="$style['tab']" @click="tabClick">
      <div
        v-for="tab in tabList"
        :data-id="tab.id"
        :key="tab.id"
        :selected="tabComp === tab.component"
      >
        {{ tab.name }}
      </div>
    </div>
    <component :is="tabComp" :class="$style['view']"/>
  </div>
</template>

<script>
import TheDragSort from "@/views/drag/TheDragSort.vue";
import TheMoveable from "@/views/drag/TheMoveable.vue";
import TheClip from "@/views/drag/TheClip.vue";
import TheCroppr from '@/views/drag/TheCropper.vue'

export default {
  name: "TheDrag",
  components: {},
  data() {
    return {
      tabList: [
        {
          id: "drag-sort",
          name: "DragSort",
          component: TheDragSort,
        },
        {
          id: "moveable",
          name: "moveable",
          component: TheMoveable,
        },
        {
          id: "clipable",
          name: "clipable",
          component: TheClip,
        },
        {
          id: "cropper",
          name: "cropper",
          component: TheCroppr,
        },
      ],
      tabComp: null,
    };
  },
  created() {
    this.tabComp = this.tabList[3].component;
  },
  methods: {
    tabClick(e) {
      let tabComp = this.tabList.find(
        (item) => item.id === e.target.dataset.id
      );
      this.tabComp =
        tabComp && tabComp.component
          ? tabComp.component
          : this.tabList[0].component;
    },
  },
};
</script>

<style lang="less" module>
.container {
  .tab {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 1px #ccc;
    margin: 12px 0;
    color: #333;
    & > div {
      margin-right: 16px;
      cursor: pointer;
      &[selected] {
        color: #3360ff;
      }
    }
  }
  .view {
    width: 100%;
    height: calc(100vh - 48px);
  }
}
</style>

<template>
  <div :class="$style['container']">
    <div :class="$style['list']">
      <div
        :class="$style['item']"
        v-for="item in componentList"
        :key="item.name"
      >
        <div :class="$style['title']">{{ item.name }}</div>
        <component
          v-model="color"
          :class="$style['comp']"
          :is="item.component"
          :disableAlpha="true"
          :disableFields="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  Compact,
  Grayscale,
  Twitter,
  Material,
  Slider,
  Swatches,
  Photoshop,
  Sketch,
  Chrome,
} from "vue-color";

export default {
  name: "TheIndex",
  components: {
    Compact,
    Grayscale,
    Twitter,
    Material,
    Slider,
    Swatches,
    Photoshop,
    Sketch,
    Chrome,
  },
  data() {
    return {
      color: "",
      componentList: [
        {
          name: "Compact",
          component: Compact,
        },
        {
          name: "Grayscale",
          component: Grayscale,
        },
        {
          name: "Twitter",
          component: Twitter,
        },
        {
          name: "Material",
          component: Material,
        },
        {
          name: "Slider",
          component: Slider,
        },
        {
          name: "Swatches",
          component: Swatches,
        },
        {
          name: "Photoshop",
          component: Photoshop,
        },
        {
          name: "Chrome",
          component: Chrome,
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
/deep/ .vc-chrome-color-wrap {
    display: none;
}
</style>
<style lang="less" module>
.container {
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      //   width: 200px;
      //   height: 200px;
      border: 1px solid #3360ff;
      border-radius: 6px;
      box-shadow: 0px 2px 4px #cccccc;
      margin: 10px 10px 10px 0;
      .title {
        padding: 12px;
        font-size: 16px;
      }
      .comp {
      }
    }
  }
}
</style>

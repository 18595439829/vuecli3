<template>
  <div :class="$style['container']">
    <div :class="$style['list']">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="[$style['item'], item.checked ? $style['checked'] : '']"
        @click="check(index)"
      >
        <img :class="$style['icon']" :src="item.icon" alt="">
        <span :class="$style['text']">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Point from '@/assets/img/点选_03.png';
import Square from '@/assets/img/框选_05.png';
import Polygon from '@/assets/img/自定义_07.png';
import TheMap from '@/common/map/TheMap.js';
import TheDraw from '@/components/home/tools/pitch-on/draw.js';

export default {
  data() {
    return {
      map: null,
      Draw: null,
      list: [
        {
          icon: Point,
          name: '点选',
          checked: false,
        },
        {
          icon: Square,
          name: '框选',
          checked: false,
        },
        {
          icon: Polygon,
          name: '自定义轮廓',
          checked: false,
        },
      ],
    };
  },
  created() {
    console.log(TheMap);
    this.map = TheMap.getInstance().getMap();
    this.Draw = TheDraw.getInstance(this.map);
  },
  methods: {
    check(index) {
      console.log(index);
      this.list.forEach((item, i) => {
        const obj = item;
        if (i === index) {
          if (obj.checked) {
            obj.checked = false;
            this.Draw.remove();
          } else {
            obj.checked = true;
            this.Draw.add(i);
          }
        } else {
          obj.checked = false;
        }
      });
    },
  },
};
</script>

<style lang="less" module>
@import '~@/css/main.less';
.container {
  background-color: #ffffff;
  border-radius: 3px;
  .list {
    display: flex;
    box-sizing: border-box;
    margin: 8px;
    .item {
      width: 66px;
      height: 60px;
      padding: 2px;
      border: @border;
      margin-right: -1px;
    //   border-right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    //   &:nth-last-child(1) {
    //     border-right: @border;
    //   }
      .icon {
        height: 34px;
        margin-bottom: 4px;
      }

      .text {
        color: #666666;
        font-size: 12px;
        transform: scale(11/12);
      }
    }
    .checked {
      border: 1px solid #0077d8;
      z-index: 1;
    }
  }
}
</style>

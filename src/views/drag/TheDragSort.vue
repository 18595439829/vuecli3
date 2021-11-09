<template>
  <div :class="$style['container']">
    <draggable v-model="myArray">
      <transition-group>
        <div v-for="element in myArray" :key="element.id">
          {{ element.name }}
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "TheDrag",
  components: {
    draggable,
  },
  data() {
    return {
      myArray: [
        {
          id: '001',
          name: '一号宇宙飞船'
        },
        {
          id: '002',
          name: '二哥洛溪'
        },
        {
          id: '003',
          name: '三沙发公开课'
        },
        {
          id: '004',
          name: '四更省道加深入'
        },
        {
          id: '005',
          name: '五电费124卡立方'
        },
        {
          id: '006',
          name: '六fsf地方'
        }
      ]
    };
  },
  methods: {},
};
</script>

<style lang="less" module>
.container {
}
</style>

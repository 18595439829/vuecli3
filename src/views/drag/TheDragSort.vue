<template>
  <div :class="$style['container']">
    <BaseDrag v-model="list" :canRemove="true" :class="$style['drag']">
      <div v-for="element in list" :key="element.id" >
        <img :src="KAOLA" alt="" />
        {{ element.name }}
      </div>
    </BaseDrag>
  </div>
</template>

<script>
import BaseDrag from '@/components/BaseDrag.vue'
import KAOLA from "@/assets/img/Koala.jpg";

export default {
  name: 'TheDragSort',
  components: {
    BaseDrag
  },
  data() {
    return {
      KAOLA,
      list: [
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
      ]
    };
  },
  methods: {},
};
</script>

<style lang="less" module>
 .container {
   .drag {
     width: 50vw;
   }
 }
</style>

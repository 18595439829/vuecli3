<template>
  <div :class="$style['container']">
    TheFirstComp
    <TheSecondComp>
        <template v-slot:third="{data}">
            {{data.name}}
        </template>
    </TheSecondComp>
  </div>
</template>

<script>
import TheSecondComp from '@/components/slot/TheSecondComp.vue'
export default {
  name: 'TheFirstComp',
  components: {
      TheSecondComp
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style lang="less" module>
 .container {
 }
</style>

<template>
  <div :class="$style['container']">
    TheSecondComp
    <TheThirdComp>
      <template v-slot:third="{data}">
            <slot name="third" :data="{name: data.name}" />
        </template>
    </TheThirdComp>
  </div>
</template>

<script>
import TheThirdComp from '@/components/slot/TheThirdComp.vue'
export default {
  name: 'TheSecondComp',
  components: {
    TheThirdComp
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

<template>
  <div :class="$style['container']">
    TheFirstComp
    <TheSecondComp>
      <template v-slot:third="{ data }">
        {{ data.name }}
      </template>
    </TheSecondComp>

  </div>
</template>

<script>
import TheSecondComp from "@/components/slot/TheSecondComp.vue";

export default {
  name: "TheFirstComp",
  components: {
    TheSecondComp,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less">
.string {
    color: green;
  }

  .number {
    color: darkorange;
  }

  .boolean {
    color: blue;
  }

  .null {
    color: magenta;
  }

  .key {
    color: red;
  }
</style>
<style lang="less" module>
.container {
  .json {
    outline: 1px solid #ccc;
    padding: 5px;
    margin: 5px;
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>

<template>
  <div :class="$style['container']">
    <BaseFreeEdit
      :edit="freeEditData.edit"
      :isBorder="freeEditData.isBorder"
      :isTemplateEdit="freeEditData.isTemplateEdit"
      :preview="freeEditData.preview"
      :scale="freeEditData.scale"
      :value="freeEditData.value"
    />
  </div>
</template>

<script>
import { freeEditData } from "@/test/free-edit.js";
import BaseFreeEdit from "@/components/free/free-editor.vue";

export default {
  name: "TheFreeEdit",
  components: {
    BaseFreeEdit,
  },
  data() {
    return {
      freeEditData,
    };
  },
  methods: {},
};
</script>

<style lang="less" module>
.container {
}
</style>

<template>
  <div :class="$style['container']">
    <div :class="$style['form']" @click="formClick" :contenteditable="true" ref="form">
      <div
        v-for="item in list"
        :key="item.id"
        :id="item.id"
        :class="$style['form-item']"
      >
        {{ item.content }}
      </div>
    </div>
    <button @click="output">输出</button>
  </div>
</template>

<script>
export default {
  name: "BaseFragmentPreview",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    list() {
      return this.data;
    },
  },
  methods: {
    formClick(e) {
      let current = this.list.find((item) => item.id === e.target.id);
      this.$set(current, "isEdit", true);
    },
    output() {
        console.log(this.$refs.form,this.list)
    }
  },
};
</script>

<style lang="less" module>
.container {
    .form {
        .form-item {
            &:focus-visible {
                outline: none;
            }
        }
    }
}
</style>

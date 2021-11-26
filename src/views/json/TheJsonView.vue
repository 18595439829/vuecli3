<template>
  <div :class="$style['container']">
    <pre :class="$style['json']" v-html="jsonHtml"></pre>
    <div :class="$style['json-view']">
        <jsonView  :data="json" :deep="1" icon-style="triangle" theme="vs-code"/>
    </div>
  </div>
</template>

<script>
import {syntaxHighlight, json } from "@/common/json.js";
import jsonView from 'vue-json-views'
export default {
  name: 'TheJsonView',
  components: {
      jsonView
  },
  data() {
    return {
        json
    };
  },
  computed: {
      jsonHtml() {
          return syntaxHighlight(this.json)
      }
  },
  methods: {
  },
};
</script>

<style lang="less" module>
 .container {
     .json-view {
         width: 1000px;
     }
 }
</style>

<template>
  <div :class="$style['container']">
    <div ref="editor" contenteditable="true" @keydown="keydown" @compositionupdate="compositionstart">
    </div>
  </div>
</template>

<script>
import editorJson from '@/common/editorJson.js'
export default {
  name: 'BaseEditor',
  data() {
    return {

    };
  },
  mounted() {
      this.init()
  },
  methods: {
      init() {
        //   let html = ""
        //  editorJson.forEach(json => {
        //      let dom = ''
        //      if (json.text) {

        //      }
        //      if (json.isPause) {
        //          dom
        //      }
        //      html += dom
        //  })
        this.$refs.editor.innerHTML = '南京<span data-symbol="change4">长</span>江大桥'
      },
      keydown(e) {
        // 65-90: a-z; 48-57:小键盘0-9; 96-111: 数字键盘,108数字键盘enter; 186-222:符号键,小键盘的-+,[]\;',./
        if ((!e.metaKey && !e.ctrlKey && !e.altKey) && ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 111 && e.keyCode !== 108) || (e.keyCode >= 186 && e.keyCode <= 222)) ) {
          e.preventDefault()
        }
        console.log(e, e.keyCode, (e.metaKey || e.ctrlKey), e.keyCode === 86 && (e.metaKey || e.ctrlKey))
      },
      compositionstart(e) {
        e.preventDefault()
        e.data = ''
      }
  },
};
</script>

<style lang="less" module>
 .container {
 }
</style>

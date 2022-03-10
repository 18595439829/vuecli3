<template>
  <div :class="$style['container']">
    <div>
      <Button @click="addPause">添加停顿</Button>
      <Button @click="addBold">加粗</Button>
      <Button @click="addPolyphone">添加多音字</Button>
    </div>
    <div
      ref="editor"
      contenteditable="true"
      :class="$style['editor']"
      @keydown="keydown"
      @compositionupdate="compositionstart"
    ></div>
  </div>
</template>

<script>
import editorJson from "@/common/editorJson.js";
import KaoLa from "@/assets/img/Koala.jpg";
export default {
  name: "BaseEditor",
  data() {
    return {
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let html = "";
      editorJson.forEach((json) => {
        let dom = "";
        if (json.text) {
          if (json.selected) {
            dom = `<span data-symbol="${json.selected}" data-map="${JSON.stringify(json.map)}">${json.text}</span>`
          } else {
            dom = json.text
          }
        }
        if (json.isPause) {
          dom += `<img src="${KaoLa}" data-pause="${json.duration}" />`;
        }
        html += dom;
      });
      this.$refs.editor.innerHTML = html;
    },
    keydown(e) {
      // 65-90: a-z; 48-57:小键盘0-9; 96-111: 数字键盘,108数字键盘enter; 186-222:符号键,小键盘的-+,[]\;',./
      if (
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        ((e.keyCode >= 65 && e.keyCode <= 90) ||
          (e.keyCode >= 48 && e.keyCode <= 57) ||
          (e.keyCode >= 96 && e.keyCode <= 111 && e.keyCode !== 108) ||
          (e.keyCode >= 186 && e.keyCode <= 222))
      ) {
        e.preventDefault();
      }
      console.log(
        e,
        e.keyCode,
        e.metaKey || e.ctrlKey,
        e.keyCode === 86 && (e.metaKey || e.ctrlKey)
      );
    },
    compositionstart(e) {
      e.preventDefault();
      e.data = "";
    },
    addPause() {
      let img = `<img src=${KaoLa} data-time='300' style="width: 10px; height: 10px;"/>`;
      document.execCommand("insertHtml", false, img);
    },
    addBold() {
      document.execCommand("bold", false);
    },
    addPolyphone() {
      let text = window.getSelection().toString();
      if (!text.length) {
        return;
      }
      document.execCommand("delete", false);
      document.execCommand(
        "insertHtml",
        false,
        `<span data-polyphone="123">${text}</span>`
      );
    },
  },
};
</script>

<style lang="less" module>
.container {
  .editor {
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>

<template>
  <div :class="$style['container']">
    <div :class="$style['box']"></div>
    <div>
      <div>
        <Button @click="setTheme('red')">红色主题</Button>
        <Button @click="setTheme('green')">绿色主题</Button>
      </div>
      <div :class="$style['theme']">
        <h3 :class="$style['theme_title']">标题</h3>
        <div :class="$style['theme_content']">
          <p>第一行第一行第一行第一行第一行</p>
          <p>第二行第二行第二行第二行第二行</p>
          <p>第三行第三行第三行第三行第三行</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TestLess",
  methods: {
    setTheme(color) {
      if (color === "red") {
        document.documentElement.style.setProperty("--main-color", "#ff0000");
        document.documentElement.style.setProperty("--main-filter", "100%");
      } else {
        document.documentElement.style.setProperty("--main-color", "#0000ff");
        document.documentElement.style.setProperty("--main-filter", "50%");
      }
    }
  }
};
</script>
<style lang="less" module>
@base: #f938ab;

:root {
  --main-color: #ff0000;
  --main-BG: var(--main-color);
  --main-fliter: 100%;
}
.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
    width: 100px;
    height: 100px;
    border: 1px solid;
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}
.theme {
    color: var(--main-color);
    .theme_title {
      border: 1px solid var(--main-color);
      background-color: invert(#ff0000);
      color: var(--main-color);
      filter: invert(var(--main-fliter));
    }
  }
</style>


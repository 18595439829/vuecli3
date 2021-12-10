<template>
  <div :class="$style['container']">
    <span>测试h3</span>
    <div :class="$style['box']">
      <img :src="Kaola" alt="" />
    </div>
    <div :class="$style['colors']">
      <div v-for="item in 5" :key="item"></div>
    </div>
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
import Kaola from "@/assets/img/Koala.jpg";
export default {
  name: "Stylus",
  data() {
    return {
      Kaola
    };
  },
  mounted() {
    this.setRandomColor();
  },
  methods: {
    setTheme(color) {
      if (color === "red") {
        document.documentElement.style.setProperty("--main-color", "#ff0000");
        document.documentElement.style.setProperty("--main-filter", "100%");
      } else {
        document.documentElement.style.setProperty("--main-color", "#0000ff");
        document.documentElement.style.setProperty("--main-filter", "50%");
      }
      this.mockSetTimeOut(() => {
        console.log('1s后', 'mockSetTimeOut');
      }, 1000)
      let id = 0;
      this.mockSetInterval(() => {
        id += 1;
        console.log(`${id}s后`, 'mockSetInterval');
      }, 1000)
    },
    randomColor() {
      let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
      let color = "";
      for (var i = 0; i < 6; i++) {
        color += arr[Math.floor(Math.random() * 16)];
      }
      return `#${color}`;
    },
    setRandomColor() {
      setInterval(() => {
        document.documentElement.style.setProperty("--main-color", this.randomColor());
      }, 1000);
    },
    mockSetTimeOut(cb,time = 0) {
      let t = 0;
      let timer = () => {
        t += 1;
        if ((t * (1000 / 60)) > time) {
          cb();
          cancelAnimationFrame(timer);
        } else {
          requestAnimationFrame(timer);
        }
      }
      requestAnimationFrame(timer);
    },
    mockSetInterval(cb,time = 0) {
      let t = 0;
      let timer = () => {
        t += 1;
        requestAnimationFrame(timer);
        if ((t * (1000 / 60)) > time) {
          t = 0;
          cb();
        }
      };
      requestAnimationFrame(timer);
    }
  }
};
</script>
<style lang="stylus" module>
$fontSize = 16px;
color = red;
colorArr = #0000ff #00ff00 #ff0000 #00ffff #ffff00;

setColor(i) {
  return colorArr[i - 1];
}

:root {
  --main-color: #ff0000;
  --main-BG: var(--main-color);
  --main-fliter: 100%;
}

.container {
  $ > span {
    font-size: $fontSize;
    color: color;
  }

  .box {
    width: 100px;
    height: 100px;
    border: (@height / 10) solid black;
    margin: (@height / 10);
    transition: all 1s;
    background-color: invert(#0000ff);

    img {
      width: 100%;
    }

    &:hover {
      width: 200px;
      height: 200px;
    }
  }

  .theme {
    color: var(--main-color);
    transition: all 1s liner;
    .theme_title {
      // border: 1px solid var(--main-color);
      background-color: invert(#ff0000);
      color: var(--main-color);
      filter: invert(var(--main-fliter));
    }
  }
}

.colors {
  display: flex;

  & > div {
    width: 50px;
    height: @width;
    margin: 0 10px;
    border: 1px solid black;
  }

  for row in 1 2 3 4 5 {
    div:nth-child({row}) {
      background-color: setColor(row);
      height: 10px * row;
    }
  }
}
</style>

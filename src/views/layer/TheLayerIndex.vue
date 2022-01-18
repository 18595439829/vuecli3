<template>
  <div ref="container" :class="$style['container']">
    <div :class="$style['canvas']">
      <TheLayerElement
        :class="$style['element']"
        :style="{ transform: `scale(${scale})` }"
        @layer-select="layerSelect"
      />
    </div>
    <div ref="moveable" :class="$style['moveable']" :style="{...selectLayerStyle, transform: `scale(${scale})`}">
    </div>
  </div>
</template>

<script>
import TheLayerElement from "@/views/layer/TheLayerElement.vue";
import Moveable from '@/common/moveable.js'

export default {
  name: "TheLayerIndex",
  components: {
    TheLayerElement,
  },
  data() {
    return {
      scale: 0.5,
      ctrlDown: false,
      selectLayerStyle: {}
    };
  },
  created() {
    this.setElementScale();
  },
  methods: {
    setElementScale() {
      let speed = 0.1;
      document.body.addEventListener(
        "keydown",
        (e) => {
          this.ctrlDown = e.ctrlKey || e.metaKey;
          if (this.ctrlDown) {
            if (e.keyCode === 107 || e.keyCode === 187) {
              // 放大
              e.preventDefault();
              this.scale += speed;
            }
            if (e.keyCode === 109 || e.keyCode === 189) {
              // 缩小
              e.preventDefault();
              this.scale -= speed;
            }
            if (this.scale <= 0.1) {
              this.scale = 0.1;
            }
          }
        },
        false
      );
      document.body.addEventListener("keyup", (e) => {
        this.ctrlDown = e.ctrlKey || e.metaKey;
      });
      document.body.addEventListener(
        "mousewheel",
        (e) => {
          if (this.ctrlDown) {
            e.preventDefault();
            if (e.wheelDeltaY > 0) {
              // 放大
              this.scale += speed;
            } else {
              // 缩小
              this.scale -= speed;
            }
            if (this.scale <= 0.1) {
              this.scale = 0.1;
            }
          }
        },
        { passive: false, capture: false }
      );
    },
    init() {
      this.moveable = new Moveable(this.$refs.container ,{
        target: this.$refs.moveable 
      })
    },
    layerSelect({type, data}) {
      switch(type) {
        case 'background': 
        this.selectLayerStyle = {
          width: '1920px',
          height: '1080px',
          backgroundColor: data.color,
          backgroundImage: `url(${data.url})`,
          backgroundSize: '110%',
          backgroundOrigin: 'center',
          filter: data.isBlur ? 'blur(20px)' : ''
        }
        this.$nextTick(() => {
          this.init()
        })
      }
    }
  },
};
</script>

<style lang="less" module>
.container {
  .canvas {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    .element {
      transform: scale(0.5);
    }
  }
}
</style>

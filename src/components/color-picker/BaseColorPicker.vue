<template>
  <div ref="container" :class="$style['container']">
    <div ref="slot" @click="action">
      <slot ></slot>
    </div>
    <div v-show="isShowpicker"  :class="$style['color-picker']" :style="{transform: `translateY(${translateY}px)`}">
      <div :class="$style['title']">
        <span>
          {{ title }}
        </span>
        <div
          v-if="isShowFull"
          :selected="color === ''"
          :class="$style['empty']"
          @click="empty"
        >
          <div :class="$style['icon']">
            <div :class="$style['diagonal']"></div>
          </div>
          无填充
        </div>
      </div>
      <Chrome
        :class="$style['picker']"
        v-model="color"
        :disableAlpha="true"
        :disableFields="true"
      />
      <div :class="$style['color-input']">
        <div :class="$style['label']">RGB</div>
        <div :class="$style['input']">
          <input
            v-model="inputValue"
            type="text"
            @keyup.enter="inputBlur"
            @blur="inputBlur"
          />
        </div>
      </div>
      <div v-if="isBord" :class="$style['color-list']">
        <div :class="$style['list-title']">文档颜色</div>
        <div :class="$style['list']" @click="colorClick">
          <div
            v-for="item in list"
            :key="item"
            :id="item"
            :class="$style['list-item']"
            :style="{ backgroundColor: item }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'BaseColorPicker',
  components: {
    Chrome
  },
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '颜色'
    },
    data: {
      type: [String, Object],
      required: true
    },
    isBord: {
      // 是否显示文档颜色
      type: Boolean,
      required: false,
      default: false
    },
    isShowFull: {
      // 是否显示无填充
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      inputValue: '',
      isShowpicker: false,
      list: ['#ffffff', '#666666', '#000000'],
      translateY: 0
    }
  },
  computed: {
    color: {
      get () {
        return this.data
      },
      set (v) {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.$emit('change', v.hex)
        }, 50)
      }
    }
  },
  watch: {
    color: {
      handler (v) {
        this.inputValue = v
      },
      immediate: true
    },
    isShowpicker (v) {
      if (v) {
        this.translateY = this.$refs.slot.offsetHeight + 5
      }
    }
  },
  created () {
    window.addEventListener('click', this.close)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.close)
  },
  methods: {
    action () {
      this.isShowpicker = !this.isShowpicker
    },
    empty () {
      this.$emit('change', '')
    },
    colorClick (e) {
      this.$emit('change', e.target.id)
    },
    inputBlur () {
      const reg = /^#{0-9|a-f|A-F}6^/
      if (!reg.test(this.inputValue)) {
        this.inputValue = this.color
        return
      }
      this.$emit('change', this.inputValue)
    },
    close (e) {
      if (e.target !== this.$refs.container && !this.$refs.container.contains(e.target)) {
        this.isShowpicker = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .vc-chrome {
  width: 202px !important;
  box-shadow: none !important;
}
/deep/ .vc-chrome-saturation-wrap {
  border-radius: 6px;
}
/deep/ .vc-chrome-color-wrap {
  display: none;
}
/deep/ .vc-chrome-body {
  padding: 10px 0;
  border-radius: 5px;
}
/deep/ .vc-chrome-hue-wrap .vc-hue {
  border-radius: 5px;
}
</style>
<style lang="less" module>
.container {
  position: relative;
  left: 0;
  top: 0;
  z-index: 1;
  .color-picker {
    position: absolute;
    left: 0;
    top: 0;
    width: 242px;
    background: #ffffff;
    box-shadow: 0px 10px 80px 10px rgba(1, 3, 10, 0.1);
    border-radius: 8px;
    padding-bottom: 10px;
    .title {
      padding: 12px 20px 0 20px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      .empty {
        width: 72px;
        height: 24px;
        font-weight: normal;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
        &[selected] {
          background: rgba(51, 96, 255, 0.1);
          border: 1px solid #3360ff;
        }
        .icon {
          width: 14px;
          height: 14px;
          border: 1px solid #333;
          .diagonal {
            width: 17px;
            border-bottom: 1px solid #ff0000;
            transform: rotate(-45deg) translate(-6px, 2px);
          }
        }
      }
    }
    .picker {
      padding: 0 20px;
    }
    .color-input {
      padding: 0 20px;
      font-size: 12px;
      color: #333;
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .label {
        margin-right: 10px;
      }
      .input {
        background: #f8f9fb;
        border-radius: 4px;
        input {
          height: 28px;
          background: #f8f9fb;
          border-radius: 4px;
          border: none;
          outline: none;
          padding: 0 4px;
        }
      }
    }
    .color-list {
      box-shadow: 0px -1px 0px #e5e5e5;
      padding: 16px 20px 16px 20px;
      .list-title {
        font-weight: 500;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .list {
        display: flex;
        .list-item {
          width: 22px;
          height: 22px;
          border-radius: 4px;
          border: 1px solid #e1e1e1;
          box-sizing: border-box;
          margin-right: 8px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

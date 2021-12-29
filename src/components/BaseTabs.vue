<template>
  <div :class="$style['container']">
    <div
      ref="content"
      :class="$style['content']"
      :style="{
        transform: `translateX(${translateX}px)`,
        padding: `0 ${scrollButton ? scrollOptions.arrowWidth : 24}px`,
      }"
    >
      <div
        v-for="item in list"
        :key="item.id"
        :class="$style['tabs-item']"
        :selected="selectedId === item.id"
        @click="tabClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <template v-if="scrollButton">
      <div
        :class="$style['arrow-left']"
        :style="{ width: `${scrollOptions.arrowWidth}px` }"
      >
        <svg
          :class="$style['icon']"
          aria-hidden="true"
          @click="change('left')"
        >
          <use xlink:href="#icon-youjiantou-cu" />
        </svg>
      </div>
      <div
        :class="$style['arrow-right']"
        :style="{ width: `${scrollOptions.arrowWidth}px` }"
      >
        <svg
          :class="$style['icon']"
          aria-hidden="true"
          @click="change('right')"
        >
          <use xlink:href="#icon-youjiantou-cu" />
        </svg>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',
  model: {
    prop: 'id',
    event: 'change'
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    normalize: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      scrollButton: false,
      translateX: 0,
      scrollOptions: {
        arrowWidth: 50,
        step: 200
      }
    }
  },
  computed: {
    selectedId () {
      return this.id
    },
    list () {
      return this.data.map((item) => {
        if (this.normalize.id) {
          item.id = item[this.normalize.id]
        }
        if (this.normalize.name) {
          item.id = item[this.normalize.id]
          item.name = item[this.normalize.name]
        }
        return item
      })
    }
  },
  mounted () {
    this.checkScroll()
    window.addEventListener('resize', this.checkScroll)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.checkScroll)
  },
  methods: {
    tabClick (item) {
      this.$emit('change', item.id)
    },
    scroll (e) {
      e.preventDefault()
    },
    change (type) {
      const { scrollWidth, clientWidth } = this.$refs.content
      const maxTranslateX =
        scrollWidth - clientWidth + this.scrollOptions.arrowWidth
      switch (type) {
        case 'right':
          this.translateX =
            this.translateX - this.scrollOptions.step >= -maxTranslateX
              ? this.translateX - this.scrollOptions.step
              : -maxTranslateX
          break
        case 'left':
          this.translateX =
            this.translateX + this.scrollOptions.step <= 0
              ? this.translateX + this.scrollOptions.step
              : 0
      }
    },
    checkScroll () {
      const { scrollWidth, clientWidth } = this.$refs.content
      if (scrollWidth > clientWidth) {
        this.scrollButton = true
      } else {
        this.scrollButton = false
      }
    }
  }
}
</script>

<style lang="less" module>
.container {
  position: relative;
  overflow: hidden;
  background: #fff;
  .content {
    display: flex;
    flex-wrap: nowrap;
    -ms-overflow-style: none;
    transition: all 0.2s linear;
    padding: 0 24px;
    // overflow: -moz-scrollbars-none;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    // overflow-x: auto;
  }
  .tabs-item {
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    padding: 16px 0;
    color: #000000cc;
    margin-right: 32px;
    white-space: nowrap;
    &[selected] {
      color: #0056ff;
      border-bottom: 2px solid #0056ff;
    }
  }
  .icon {
    @width: 28px;
    width: @width;
    height: @width;
    fill: #000000cc;
    overflow: hidden;
    padding: 2px;
    cursor: pointer;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
  .arrow {
    position: absolute;
    top: 50%;
    background: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .arrow-left {
    .arrow;
    left: 0;
    transform: translateY(-50%) rotate(180deg);
  }
  .arrow-right {
    .arrow;
    right: 0;
    transform: translateY(-50%);
  }
}
</style>

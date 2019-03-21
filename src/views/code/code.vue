<template>
  <div>
    <div class="codeNum">
      <span>{{code[0]}}</span>
      <span>{{code[1]}}</span>
      <span>{{code[2]}}</span>
      <span>{{code[3]}}</span>
      <span>{{code[4]}}</span>
      <span>{{code[5]}}</span>
      <input type="text"
             maxlength="6"
             v-model="code">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: []
    }
  },
  methods: {
    delNum() {
      // 删除
      let oEvent = window.event
      if (oEvent.keyCode === 8) {
        if (this.photoNum.length > 0) {
          this.disInputs[this.photoNum.length - 1].value = ''
        }
      }
    },
    getNum() {
      // 输入
      for (var i = 0; i < this.photoNum.length; i++) {
        this.disInputs[i].value = this.photoNum.charAt(i)
      }
    }
  }
}
</script>

<style lang="less">
.codeNum {
  height: 2rem;
  width: 73%;
  margin: 0 auto;
  position: relative;
  text-align: left;
  > span {
    border-bottom: 1px solid #ff566b;
    display: inline-block;
    width: 1rem;
    height: 1.5rem;
    margin-left: 0.5rem;
    text-align: center;
    vertical-align: middle;
    &:first-child {
      margin-left: 0;
    }
  }
  > input {
    position: absolute;
    width: 100%;
    letter-spacing: 1.3rem;
    padding-left: 0.3rem;
    color: #fff;
    opacity: 0.5;
    left: 0;
    height: 100%;
  }
}
</style>


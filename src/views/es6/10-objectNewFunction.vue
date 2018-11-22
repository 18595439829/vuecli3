<template>
  <div>
    <p>{{target1}}</p>
    <Input v-model="inputNum" @on-enter="compareNum(inputNum)"></Input> <Button @click="begin">开始</Button>{{text}}
  </div>
</template>
<script>
export default {
  name: 'es6-10',
  data() {
    return {
      target1: { a: 1 },
      source1: { b: 2 },
      source2: { c: 3 },
      text: '',
      inputNum: '',
      number: 0
    }
  },
  methods: {
    objAsign() {
      let target = { a: 1 }
      this.target1 = Object.assign(target, this.source1, this.source2)
    },
    begin() {
      this.number = this.randomNum()
    },
    // 取0~1000随机数
    randomNum() {
      return Math.floor(Math.random() * 1000)
    },
    // 比较大小函数
    compareNum(num) {
      if (Number(num) > this.number) {
        this.text = '大'
      } else if (Number(num) < this.number) {
        this.text = '小'
      } else {
        this.text = '正确'
      }
    }
  },
  mounted() {
    this.objAsign()
  }
}
</script>
<style>
</style>

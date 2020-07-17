<template>
  <div :class="$style['container']">
    <p>{{ target1 }}</p>
    <Input v-model="inputNum" @on-enter="compareNum(inputNum)"></Input>
    <Button @click="begin">开始</Button>{{ text }}
    <div :class="$style['content']">
      测试堆栈方法
      <Input v-model="stackValue" ></Input> {{stack && stack.get()}}
      <Button @click="push">添加</Button><Button @click="remove">移除</Button>{{ text }}
    </div>
    <div  :class="$style['content']">
      正则表达式
      <Input v-model="reg1Value" ></Input>
      <div>{{reg1}}</div>
      <Input v-model="reg2Value" ></Input>
      <div>{{reg2}}</div>
    </div>
  </div>
</template>
<script>
import Stack from "@/common/stack.js";

export default {
  name: "es6-10",
  data() {
    return {
      target1: { a: 1 },
      source1: { b: 2 },
      source2: { c: 3 },
      text: "",
      inputNum: "",
      number: 0,
      stackValue: '',
      stack: null,
      reg1Value: '',
      reg2Value: '',
    };
  },
  computed: {
    reg1() {
      return this.reg1Value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    reg2() {
      return this.reg2Value.replace(/\$\s?|(,*)/g, '');
    }
  },
  methods: {
    objAsign() {
      let target = { a: 1 };
      this.target1 = Object.assign(target, this.source1, this.source2);
    },
    begin() {
      this.number = this.randomNum();
    },
    // 取0~1000随机数
    randomNum() {
      return Math.floor(Math.random() * 1000);
    },
    // 比较大小函数
    compareNum(num) {
      if (Number(num) > this.number) {
        this.text = "大";
      } else if (Number(num) < this.number) {
        this.text = "小";
      } else {
        this.text = "正确";
      }
    },
    push() {
      if (!this.stack) {
        this.stack = new Stack();
      }
      this.stack.push(this.stackValue)
    },
    remove() {
      if (!this.stack) {
        this.stack = new Stack();
        return;
      }
      this.stack.remove()
    },
  },
  mounted() {
    this.objAsign();
  },
};
</script>
<style lang="less" module>
.container {
  .content {
    margin: 10px 0;
    padding: 10px;
    box-shadow: 0px 0px 5px black;
  }
}
</style>

<template>
  <div>
      <Button @click="add">add</Button>
      <Button @click="show">显示</Button>
      <Button @click="hide">隐藏</Button>
      <Button @click="cbClass">调用Class内部方法</Button>
      <div ref="text"></div>
  </div>
</template>

<script>
import Text from './TextClass.js';

export default {
    name: 'es6-class',
    data() {
        return {
            // newText: null,
        }
    },
    mounted() {
        this.newText = new Text('我是newText', this.$refs.text);
        console.log(this.newText.text);
    },
    methods: {
        add() { 
            this.newText.add('函数add' + Math.ceil(Math.random() * 100));
        },
        show() {
            this.newText.show();
        },
        hide() {
            this.newText.hide();
        },
        cbClass() {
            this.newText.cbClass();
        }
    }
}
</script>

<style>

</style>
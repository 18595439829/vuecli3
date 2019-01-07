<template>
  <div>
    <div>
      {{'君不见黄河之水天上来,奔流到海不复回,饕餮' | pinyin}}
    </div>
    <div>
      <Input v-model="inputValue" style="width: 200px"></Input>
      <Button @click="inputClick(0)">值为0</Button>
      <Button @click="inputClick(123)">值为123</Button>
    </div>
    <div class="bgImg">
    </div>
    <img class="gifImg" src="../../assets/img/v2-851d2017438535faab750f803f7ae7ec_b.gif" alt="">
  </div>
</template>
<script>
import pinYin from 'pinyin'
import { clearTimeout } from 'timers';
export default {
  name: 'chinese',
  data() {
    return {
      punctuation: [
        ',',
        '.',
        '/',
        '"',
        ';',
        '，',
        '。',
        '；',
        '：',
        '？',
        '“',
        '”',
        '、'
      ],
      inputValue: '',
      timer: null
    }
  },
  filters: {
    pinyin(value) {
      let punctuation = [
        ',',
        '.',
        '/',
        '"',
        ';',
        '，',
        '。',
        '；',
        '：',
        '？',
        '“',
        '”',
        '、'
      ]
      if (value) {
        let strArray = []
        let str = ''
        for (let item of value) {
          let pinyin = null
          if (punctuation.indexOf(item) > -1) {
            str = `${str} ${item}`
          } else {
            let pinyin = pinYin(item, { style: pinYin.STYLE_TONE })
            str = `${str} ${item} (${pinyin})`
          }
        }
        return str
      } else {
        return ''
      }
    }
  },
  methods: {
    inputClick(num) {
      // this.inputValue = num
      clearTimeout(this.timer)
      setTimeout( () => {
        this.inputValue += 2
        this.timer = setTimeout ( () => {
          this.inputClick(0)
        },2000)
      },500)
      console.log(this.inputValue)
    }
  }
}
</script>
<style>
.bgImg {
  width: 200px;
  height: 200px;
  background: url('../../assets/img/Koala.jpg');
  background-size:200px 200px;
  background-repeat:no-repeat;
  transition: all 1s;
}
.bgImg:hover{
  width: 300px;
  height: 300px;
  background: url('../../assets/img/Jellyfish.jpg');
  background-size:300px 300px;
  /* background-position: -100px -100px; */
  background-repeat:no-repeat;
  transition: all 1s;
}
.gifImg{
  transition: all 0.5s;
}
.gifImg:hover{
  transform: rotateY(180deg);
  transition: all 0.5s;
}
</style>

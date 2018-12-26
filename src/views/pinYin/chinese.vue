<template>
  <div>
    <div>
      {{'君不见黄河之水天上来,奔流到海不复回,饕餮' | pinyin}}
    </div>
  </div>
</template>
<script>
import pinYin from 'pinyin'
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
      ]
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
  }
}
</script>

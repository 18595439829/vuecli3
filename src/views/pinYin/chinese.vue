<template>
  <div>
    <div>
      {{'你好,世界,埠,斛' | pinyin}}
    </div>
  </div>
</template>
<script>
import pinYin from 'pinyin'
export default {
  name: 'chinese',
  filters: {
    pinyin(value) {
      if (value) {
        let pinyinArray = pinYin(value, { style: pinYin.STYLE_TONE })
        let str = ''
        pinyinArray.forEach(item => {
           str = `${str}  ${item} `
        });
        return `${value}(${str})` 
      } else {
        return ''
      }
    }
  }
}
</script>

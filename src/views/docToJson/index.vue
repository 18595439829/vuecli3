<template>
  <div :class="$style['container']">TheDocToJson</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TheDocToJson',
  data() {
    return {}
  },
  created() {
    this.getDoc()
  },
  methods: {
    getDoc() {
      let reader = new FileReader()
      reader.onload = (e) => {
        console.log(e, reader.result)
        let result = reader.result.match(/<w:p>[\s\S]*?<\/w:p>/gi).map((p) => {
          return p.match(/(<w:numId \s* \/>)|/).map((number) => {
            console.log(number)
            return {
              value: number,
              type: 'number'
            }
          })
        })
        console.log(result)
      }
      axios.get('/static/result/word/document.xml').then((res) => {
        console.log(res)
        let blob = new Blob([res.data])
        reader.readAsText(blob)
      })
    },
  },
}
</script>

<style lang="less" module>
.container {
}
</style>

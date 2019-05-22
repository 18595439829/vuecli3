<template>
  <div>
    <Button @click="syncNumber">sync</Button>
    <Button @click="asyncNumber">async</Button>
  </div>
</template>
<script>
export default {
  name: 'async',
  data() {
    class Point {
      constructor(x, y) {
        this.x = x
        this.y = y
      }
      toString() {
        return `今天是${this.x}号,这周是第${this.y}周`
      }
    }
    let thisWeek = new Point(25, 4)
    let nextWeek = new Point(1, 1)
    return {
      firstWeek: thisWeek,
      secondWeek: nextWeek
    }
  },
  methods: {
    numberFunction(num) {
      if (num < 5) {
        setTimeout(() => {
          console.log(`幸运数字${num}`)
        }, 1000)
      } else {
        console.log(`幸运数字${num}`)
      }
    },
    syncNumber() {
      this.numberFunction(1)
      this.numberFunction(8)
      console.log(this.firstWeek.toString())
    },
    asyncNumber: async function() {
      let f1 = await this.numberFunction(1)
      let f2 = await this.numberFunction(8)
      console.log(this.secondWeek)
    }
  }
}
</script>

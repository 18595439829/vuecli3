<template>
  <div>
    <div ref="echart"
         style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      option: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 50, name: '完成率' }]
          }
        ]
      }
    }
  },
  mounted() {
    if (this.option && typeof this.option === 'object') {
      console.log('aaa', this.$refs.echart)
      this.$eCharts.init(this.$refs.echart).setOption(this.option, true)
    }
  }
}
</script>
<style>
</style>

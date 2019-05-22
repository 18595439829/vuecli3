<template>
  <div>
    <div>
      <Button @click="gaugeClick">仪表盘</Button>
      <Button @click="pieClick">饼图</Button>
      <Button @click="huanClick">环形图</Button>
      <Button @click="barClick">简单条形图</Button>
      <Button @click="duiDieClick">堆叠条形图</Button>
    </div>
    <div ref="echart"
         style="width: 600px;height:400px;margin:20px"></div>
    <table-page :selectDefault="selectDefault"
                :options="options"
                :selectChange="selectChange"
                :pageChange="pageChange"
                :sizeChange="sizeChange"
                :total="100"
                :columns="columns1"
                :data="data"></table-page>
  </div>
</template>
<script>
import tablePage from '../components/tablePage'
export default {
  components: {
    tablePage
  },
  data() {
    return {
      //  仪表盘
      optionGauge: {
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
      },
      // 饼图
      optionPie: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      // 环形图
      optionHuan: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      },
      // 简单条形图
      optionBar: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      },
      // 堆叠条形图
      optionDuiDie: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          bottom: 'bottom',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          // bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      selectDefault: 'name',
      options: [
        {
          value: 'name',
          label: 'name'
        },
        {
          value: 'age',
          label: 'age'
        },
        {
          value: 'address',
          label: 'address'
        },
        {
          value: 'date',
          label: 'date'
        }
      ],
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [],
      data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ],
      pageNum: 1,
      pageSize: 10
    }
  },
  methods: {
    pageChange(page) {
      console.log('页码', page)
      console.log('假装掉接口', this.pageNum, this.pageSize)
    },
    sizeChange(size) {
      console.log('每页多少条', size)
      console.log('假装掉接口', this.pageNum, this.pageSize)
    },
    selectChange(value) {
      if (value.value === 'London') {
        this.data1 = [
          {
            name: 'London',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          }
        ]
      } else {
        this.data1 = this.data
      }
      console.log(value)
    },
    // 仪表盘
    gaugeClick() {
      this.eChartInit(this.optionGauge)
    },
    // 饼图
    pieClick() {
      this.eChartInit(this.optionPie)
    },
    // 环形图
    huanClick() {
      this.eChartInit(this.optionHuan)
    },
    // 简单条形图
    barClick() {
      this.eChartInit(this.optionBar)
    },
    // 堆叠条形图
    duiDieClick() {
      this.eChartInit(this.optionDuiDie)
    },
    // 初始化echart表数据
    eChartInit(option) {
      if (option && typeof option === 'object') {
        this.$eCharts.init(this.$refs.echart).setOption(option, true)
      }
    }
  },
  mounted() {
    this.$eCharts.init(this.$refs.echart).on('click', function(params) {
      console.log(params)
    })
  }
}
</script>
<style>
</style>

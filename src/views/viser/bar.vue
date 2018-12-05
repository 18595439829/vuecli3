<template>
  <div>
    <div class="bar">
      <div class="barNormal flex">
        <v-chart :forceFit="true"
                 :height="barNormal.height"
                 :data="barNormal.data"
                 :scale="barNormal.scale">
          <v-tooltip :on-change="barTipChange" />
          <v-axis />
          <v-bar position="year*sales" />
        </v-chart>
      </div>
      <div class="barPile flex">
        <v-chart ref="barPile"
                 :forceFit="true"
                 :height="barPile.height"
                 :data="barPile.data"
                 :on-click="barPileClick">
          <v-coord type="rect"
                   direction="LB" />
          <v-tooltip />
          <v-legend />
          <v-axis dataKey="State"
                  :label="barPile.label" />
          <v-stack-bar position="State*人口数量"
                       color="年龄段" />
        </v-chart>
      </div>
    </div>
    <Button type="primary"
            @click="sumClick">点击更改分组数据</Button>
    <div class="bar">
      <div class="flex">
        <v-chart :forceFit="true"
                 :height="barGroup.height"
                 :data="barGroup.data">
          <v-tooltip />
          <v-axis />
          <v-legend />
          <v-bar position="月份*月均降雨量"
                 color="name"
                 :adjust="barGroup.adjust" />
        </v-chart>
      </div>
    </div>
  </div>
</template>

<script>
import DataSet from '@antv/data-set'
export default {
  data() {
    return {
      barNormal: {
        data: [
          { year: '1951 年', sales: 38 },
          { year: '1952 年', sales: 52 },
          { year: '1956 年', sales: 61 },
          { year: '1957 年', sales: 145 },
          { year: '1958 年', sales: 48 },
          { year: '1959 年', sales: 38 },
          { year: '1960 年', sales: 38 },
          { year: '1962 年', sales: 38 }
        ],
        scale: [
          {
            dataKey: 'sales',
            tickInterval: 20
          }
        ],
        height: 400
      },
      barPile: {
        sourceData: [
          { State: 'WY', 小于5岁: 25635, '5至13岁': 1890, '14至17岁': 9314 },
          { State: 'DC', 小于5岁: 30352, '5至13岁': 20439, '14至17岁': 10225 },
          { State: 'VT', 小于5岁: 38253, '5至13岁': 42538, '14至17岁': 15757 },
          { State: 'ND', 小于5岁: 51896, '5至13岁': 67358, '14至17岁': 18794 },
          { State: 'AK', 小于5岁: 72083, '5至13岁': 85640, '14至17岁': 22153 }
        ],
        data: null,
        label: { offset: 12 },
        height: 400,
        fields: ['小于5岁', '5至13岁', '14至17岁']
      },
      barGroup: {
        sourceData: [
          {
            name: 'London',
            'Jan.': 18.9,
            'Feb.': 28.8,
            'Mar.': 39.3,
            'Apr.': 81.4,
            May: 47,
            'Jun.': 20.3,
            'Jul.': 24,
            'Aug.': 35.6
          },
          {
            name: 'Berlin',
            'Jan.': 12.4,
            'Feb.': 23.2,
            'Mar.': 34.5,
            'Apr.': 99.7,
            May: 52.6,
            'Jun.': 35.5,
            'Jul.': 37.4,
            'Aug.': 42.4
          }
        ],
        data: null,
        height: 400,
        adjust: [
          {
            type: 'dodge',
            marginRatio: 1 / 32
          }
        ]
      },
      pi: 0,
      num: 0
    }
  },
  methods: {
    getBarPileData() {
      let dv = new DataSet.View().source(this.barPile.sourceData)
      dv.transform({
        type: 'fold',
        fields: ['小于5岁', '5至13岁', '14至17岁'],
        key: '年龄段',
        value: '人口数量',
        retains: ['State']
      })
      this.barPile.data = dv.rows
    },
    getBarGroupData(sourceData) {
      let dv = new DataSet.View().source(sourceData)
      console.log('BarGroup', new DataSet, dv)
      dv.transform({
        type: 'fold',
        fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
        key: '月份',
        value: '月均降雨量'
      })
      this.barGroup.data = dv.rows
    },
    barPileClick(env, chart) {
      console.log(env, chart)
    },
    barTipChange(env, chart) {
      // console.log(env, chart)
    },
    sumClick() {
      let sourceData = [
        { name: '北京', 'Jan.': 43.9, 'Feb.': 11.8, 'Mar.': 123.3, 'Apr.': 81.4, 'May': 52, 'Jun.': 200.3, 'Jul.': 53, 'Aug.': 27.6 },
    { name: '上海', 'Jan.': 21.4, 'Feb.': 32.2, 'Mar.': 34.5, 'Apr.': 99.7, 'May': 122.6, 'Jun.': 66.5, 'Jul.': 63.4, 'Aug.': 73.4 }
      ]
      this.getBarGroupData(sourceData)
    },
    PI() {
      // this.pi = this.pi + (-1) ** (this.num + 1) * (4 / (2 * this.num - 1))
      this.num++
      // console.log('pi', this.pi)
      // if ( this.pi > 3.1415926  &&  this.pi < 3.1415927) {
      if (this.num > 25101) {
        console.log(this.num)
        // return
      } else {
        this.PI()
      }
    }
  },
  mounted() {
    this.getBarPileData()
    this.getBarGroupData(this.barGroup.sourceData)
  }
}
</script>
<style>
.bar {
  display: flex;
}
.bar .flex {
  flex: 1;
}
</style>


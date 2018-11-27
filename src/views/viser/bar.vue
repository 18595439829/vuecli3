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
    <Button type="primary" @click="sumClick">点击运算</Button>
    <div class="lessStyle">
      <div class="lessColor"></div>
      <div class="banner">啦啦啦啦啦</div>
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
      pi: 0,
      num: 0
    }
  },
  methods: {
    getBarPileData() {
      const dv = new DataSet.View().source(this.barPile.sourceData)
      dv.transform({
        type: 'fold',
        fields: ['小于5岁', '5至13岁', '14至17岁'],
        key: '年龄段',
        value: '人口数量',
        retains: ['State']
      })
      this.barPile.data = dv.rows
    },
    barPileClick(env, chart) {
      console.log(env, chart)
    },
    barTipChange(env, chart) {
      console.log(env, chart)
    },
    sumClick() {
      this.PI()
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
<style lang="less">
@base: #f04615;
@width: 0.5;
@my-selector: banner;

.text3d(@color) {
  color: @color;
  text-shadow: 1px 1px 0px darken(@color, 5%),
               2px 2px 0px darken(@color, 10%),
               3px 3px 0px darken(@color, 15%),
               4px 4px 0px darken(@color, 20%),
               4px 4px 2px #000;
}

.lessStyle {
  text-align: center;
  .lessColor {
    width: percentage(@width); // returns `50%`
    height: 100px;
    color: saturate(@base, 5%);
    background-color: spin(lighten(@base, 25%), 8);
  }
  .@{my-selector} {
    font-size: 32pt;
    .text3d(#0982c1);
  }
}
</style>


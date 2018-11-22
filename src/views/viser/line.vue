<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" >
      <v-tooltip />
      <v-axis />
      <v-line position="year*value" />
      <v-point position="year*value" shape="circle" />
    </v-chart>
  </div>
</template>

<script>
const data = [
  { year: '1991', value: 3 , text: '一'},
  { year: '1992', value: 4 , text: '二'},
  { year: '1993', value: 3.5 , text: '三'},
  { year: '1994', value: 5 , text: '四'},
  { year: '1995', value: 4.9 , text: '五'},
  { year: '1996', value: 6 , text: '六'},
  { year: '1997', value: 7 , text: '七'},
  { year: '1998', value: 9 , text: '八'},
  { year: '1999', value: 13 , text: '九'},
];

const scale = [{
  dataKey: 'text',
  min: 0,
},{
  dataKey: 'year',
  min: 0,
  max: 1,
}];

export default {
  data() {
    return {
      data,
      scale,
      height: 400,
    };
  }
};
</script>

<template>
  <div>
    <div>
      <Button @click="gaugeClick">仪表盘</Button>
      <Button @click="pieClick">饼图</Button>
      <Button @click="huanClick">环形图</Button>
      <Button @click="barClick">简单条形图</Button>
      <Button @click="duiDieClick">堆叠条形图</Button>
    </div>
    <div ref="echart" style="width: 600px;height:400px;margin:20px"></div>
    <table-page
      :selectDefault="selectDefault"
      :options="options"
      :selectChange="selectChange"
      :pageChange="pageChange"
      :sizeChange="sizeChange"
      :total="100"
      :columns="columns1"
      :data="data"
    ></table-page>
  </div>
</template>
<script>
import tablePage from "../components/tablePage";
import '@/common/test.js';
export default {
  components: {
    tablePage,
  },
  data() {
    return {
      //  仪表盘
      optionGauge: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }],
          },
        ],
      },
      // 饼图
      optionPie: {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      // 环形图
      optionHuan: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      },
      // 简单条形图
      optionBar: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      },
      // 堆叠条形图
      optionDuiDie: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          bottom: "bottom",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        grid: {
          left: "3%",
          right: "4%",
          // bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight",
              },
            },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight",
              },
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight",
              },
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight",
              },
            },
            data: [150, 212, 201, 154, 190, 330, 410],
          },
          {
            name: "搜索引擎",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight",
              },
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
      selectDefault: "name",
      options: [
        {
          value: "name",
          label: "name",
        },
        {
          value: "age",
          label: "age",
        },
        {
          value: "address",
          label: "address",
        },
        {
          value: "date",
          label: "date",
        },
      ],
      columns1: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Age",
          key: "age",
        },
        {
          title: "Address",
          key: "address",
        },
      ],
      data1: [],
      data: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
      ],
      pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    pageChange(page) {
      console.log("页码", page);
      console.log("假装掉接口", this.pageNum, this.pageSize);
    },
    sizeChange(size) {
      console.log("每页多少条", size);
      console.log("假装掉接口", this.pageNum, this.pageSize);
    },
    selectChange(value) {
      if (value.value === "London") {
        this.data1 = [
          {
            name: "London",
            age: 18,
            address: "New York No. 1 Lake Park",
            date: "2016-10-03",
          },
        ];
      } else {
        this.data1 = this.data;
      }
      console.log(value);
    },
    // 仪表盘
    gaugeClick() {
      // this.eChartInit(this.optionGauge)
      this.$eCharts.init(this.$refs.echart).setOption(
        ({
          bmap: {
            center: [116.46, 39.92],
            zoom: 10,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: {
                    color: "#031628",
                  },
                },
                {
                  featureType: "land",
                  elementType: "geometry",
                  stylers: {
                    color: "#000102",
                  },
                },
                {
                  featureType: "highway",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "arterial",
                  elementType: "geometry.fill",
                  stylers: {
                    color: "#000000",
                  },
                },
                {
                  featureType: "arterial",
                  elementType: "geometry.stroke",
                  stylers: {
                    color: "#0b3d51",
                  },
                },
                {
                  featureType: "local",
                  elementType: "geometry",
                  stylers: {
                    color: "#000000",
                  },
                },
                {
                  featureType: "railway",
                  elementType: "geometry.fill",
                  stylers: {
                    color: "#000000",
                  },
                },
                {
                  featureType: "railway",
                  elementType: "geometry.stroke",
                  stylers: {
                    color: "#08304b",
                  },
                },
                {
                  featureType: "subway",
                  elementType: "geometry",
                  stylers: {
                    lightness: -70,
                  },
                },
                {
                  featureType: "building",
                  elementType: "geometry.fill",
                  stylers: {
                    color: "#000000",
                  },
                },
                {
                  featureType: "all",
                  elementType: "labels.text.fill",
                  stylers: {
                    color: "#857f7f",
                  },
                },
                {
                  featureType: "all",
                  elementType: "labels.text.stroke",
                  stylers: {
                    color: "#000000",
                  },
                },
                {
                  featureType: "building",
                  elementType: "geometry",
                  stylers: {
                    color: "#022338",
                  },
                },
                {
                  featureType: "green",
                  elementType: "geometry",
                  stylers: {
                    color: "#062032",
                  },
                },
                {
                  featureType: "boundary",
                  elementType: "all",
                  stylers: {
                    color: "#465b6c",
                  },
                },
                {
                  featureType: "manmade",
                  elementType: "all",
                  stylers: {
                    color: "#022338",
                  },
                },
                {
                  featureType: "label",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
              ],
            },
          },
          series: [
            {
              type: "lines",
              coordinateSystem: "bmap",
              polyline: true,
              data: [
                1164383,
                401471,
                -11,
                -13,
                1,
                -49,
                -26,
                -14,
                99,
                -170,
                4,
                -36,
                87,
                -2,
                16,
                -141,
                -2,
                -15,
                -47,
                -6,
                -168,
                -9,
                -2,
                22,
                -74,
                -4,
                -138,
                10,
                12,
                -152,
                9,
                -55,
                -17,
                -111,
                13,
                -176,
                -20,
                -38,
                1,
                -57,
                31,
                -54,
                28,
                -85,
                -5,
                -126,
                -13,
                -62,
                1,
                -34,
                -84,
                1,
                -3,
                -218,
                15,
                6,
                78,
                2,
                4,
                -52,
                70,
                1,
                7,
                -142,
                99,
                2,
                21,
                -5,
                229,
                -150,
                16,
                -23,
                0,
                -180,
                168,
                1,
                -4,
                -257,
                82,
                0,
                33,
                -22,
                78,
                20,
              ],
              silent: true,
              lineStyle: {
                // color: '#c23531',
                // color: 'rgb(200, 35, 45)',
                opacity: 0.2,
                width: 1,
              },
              progressiveThreshold: 500,
              progressive: 200,
            },
            {
              type: "lines",
              coordinateSystem: "bmap",
              polyline: true,
              data: [
                1164383,
                401471,
                -11,
                -13,
                1,
                -49,
                -26,
                -14,
                99,
                -170,
                4,
                -36,
                87,
                -2,
                16,
                -141,
                -2,
                -15,
                -47,
                -6,
                -168,
                -9,
                -2,
                22,
                -74,
                -4,
                -138,
                10,
                12,
                -152,
                9,
                -55,
                -17,
                -111,
                13,
                -176,
                -20,
                -38,
                1,
                -57,
                31,
                -54,
                28,
                -85,
                -5,
                -126,
                -13,
                -62,
                1,
                -34,
                -84,
                1,
                -3,
                -218,
                15,
                6,
                78,
                2,
                4,
                -52,
                70,
                1,
                7,
                -142,
                99,
                2,
                21,
                -5,
                229,
                -150,
                16,
                -23,
                0,
                -180,
                168,
                1,
                -4,
                -257,
                82,
                0,
                33,
                -22,
                78,
                20,
              ],
              lineStyle: {
                width: 0,
              },
              effect: {
                constantSpeed: 20,
                show: true,
                trailLength: 0.1,
                symbolSize: 1.5,
              },
              zlevel: 1,
            },
          ],
        })
      );
    },
    // 饼图
    pieClick() {
      this.eChartInit(this.optionPie);
    },
    // 环形图
    huanClick() {
      this.eChartInit(this.optionHuan);
    },
    // 简单条形图
    barClick() {
      this.eChartInit(this.optionBar);
    },
    // 堆叠条形图
    duiDieClick() {
      this.eChartInit(this.optionDuiDie);
    },
    // 初始化echart表数据
    eChartInit(option) {
      if (option && typeof option === "object") {
        this.$eCharts.init(this.$refs.echart).setOption(option, true);
      }
    },
  },
  mounted() {
    this.$eCharts.init(this.$refs.echart).on("click", function(params) {
      console.log(params);
    });
  },
};
</script>
<style></style>

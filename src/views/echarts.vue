<template>
  <div>
    <div ref="echart"
         style="width: 600px;height:400px;"></div>
    <table-page :selectDefault="selectDefault" :options="options" :selectChange="selectChange" :pageChange="pageChange" :sizeChange="sizeChange"  :total="100" :columns="columns1" :data="data1"></table-page>
  </div>
</template>
<script>
import tablePage from "../components/tablePage";
export default {
  components: {
    tablePage
  },
  data() {
    return {
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }]
          }
        ]
      },
      selectDefault: "Sydney",
      options: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [],
      data: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      pageNum: 1,
      pageSize: 10
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
      if (value.value === 'London') {
        this.data1 = [
           {
          name: "London",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        }
        ]
      } else {
        this.data1 = this.data
      }
      console.log(value)
    }
  },
  mounted() {
    if (this.option && typeof this.option === "object") {
      console.log("aaa", this.$refs.echart);
      this.$eCharts.init(this.$refs.echart).setOption(this.option, true);
    }
  }
};
</script>
<style>
</style>

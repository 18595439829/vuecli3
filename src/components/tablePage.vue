<template>
    <div>
        <Select v-model="selectValue" multiple  @on-change="selectChange" :label-in-value="true">
            <Option v-for="item in options" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
        <Table :columns="columns1" :data="data"></Table>
        <Page :total="total" show-sizer @on-change="pageChange" @on-page-size-change="sizeChange"/>
    </div>
</template>
<script>
export default {
  data() {
    return {
        selectValue: this.selectDefault,
        columns1: this.columns
    };
  },
  props: [ "selectDefault","options", "total", "columns", "data", "pageChange", "sizeChange"],
  methods: {
     selectChange(v) {
         let arr = []
         for (let i = 0; i < v.length; i ++) {
             let obj = {}
             obj['title'] = v[i].label
             obj['key'] = v[i].value
            arr.push(obj)
         }
         this.columns1 = arr
     }
  }
};
</script>

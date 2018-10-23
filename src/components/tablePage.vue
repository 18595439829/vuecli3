<template>
    <div>
        <Select v-model="selectValue"  @on-change="selectChange" :label-in-value="true">
            <Option v-for="item in options" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" show-sizer @on-change="pageChange" @on-page-size-change="sizeChange"/>
    </div>
</template>
<script>
export default {
  data() {
    return {
        selectValue: this.selectDefault
    };
  },
  props: [ "selectDefault","selectChange","options", "total", "columns", "data", "pageChange", "sizeChange"],
  methods: {
     
  }
};
</script>

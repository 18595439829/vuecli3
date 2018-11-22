<template>
  <div>
    <Switch>
      <Icon type="md-checkmark"
            slot="open"></Icon>
      <Icon type="md-close"
            slot="close"></Icon>
    </Switch>
    <Button @click="btnClick">点击</Button>
    <DatePicker type="datetimerange"
                :options="options3"
                placeholder="Select date"
                style="width: 200px"></DatePicker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      switch1: false,
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  methods: {
    change(status) {
      this.$Message.info('开关状态：' + status)
    },
    btnClick() {
      this.switch1 = !this.switch1
    }
  }
}
</script>
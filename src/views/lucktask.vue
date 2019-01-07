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
    <Form ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          inline>
      <FormItem prop="user">
        <Input type="text"
               v-model="formInline.user"
               @on-change="inputChange"
               @on-enter="handleSubmit('formInline')"
               placeholder="Username">
        <Icon type="ios-person-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary"
                @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>
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
      },
      formInline: {
        user: ''
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }
        ]
      },
      timer: null
    }
  },
  methods: {
    change(status) {
      this.$Message.info('开关状态：' + status)
    },
    btnClick() {
      this.switch1 = !this.switch1
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    inputChange() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        console.log(this.formInline.user)
      }, 500)
    }
  }
}
</script>
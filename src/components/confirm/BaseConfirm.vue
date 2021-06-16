<template>
  <div class="confirm-modal" v-show="isShow">
    <div class="confirm">
      <div class="confirm-title">
        <div>
          {{ title }}
        </div>
        <div>x</div>
      </div>
      <div class="confirm-content">
        {{ content }}
      </div>
      <div class="confirm-footer">
        <button @click="onCancel">取消</button>
        <button @click="onOk">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseConfirm",
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    content: {
      type: String,
      required: false,
      default: "",
    },
    onOk: {
      type: Function,
      required: false,
      default: () => {
        return () => {
          console.log("ok");
        };
      },
    },
    onCancel: {
      type: Function,
      required: false,
      default: () => {
        return () => {
          console.log("cancel");
          this.isShow = false
        };
      },
    },
  },
  data() {
      return {
          isShow: true,
      }
  }
};
</script>

<style lang="less">
.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.45);
}
.confirm {
  margin: 0 auto;
  margin-top: 100px;
  .confirm-title {
    display: flex;
    justify-content: space-between;
  }
  .confirm-content {
  }
  .confirm-footer {
    text-align: right;
  }
}
</style>
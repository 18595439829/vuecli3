<template>
  <div :class="$style['container']">
    <button @click="getCamera">点击</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TheHttp',
  data() {
    return {
    };
  },
  methods: {
    getCamera() {
      axios.post(
          "https://service-4f7hbhda-1258344699.gz.apigw.tencentcs.com/release/sendto_demo_apis",
          {
            module: "cms",
            action: "ImageRecognition",
            uid: "100003360055",
            payload: {
              FileUrl:
                "https://bda-demo-default-1254418846.cos.ap-guangzhou.myqcloud.com/d4.jpg",
            },
          }
        ).then(res => {
          console.log(res)
        });
    }
  },
};
</script>

<style lang="less" module>
 .container {
 }
</style>

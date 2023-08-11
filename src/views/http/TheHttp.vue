<template>
  <div :class="$style['container']">
    <video ref="video" src="https://nos-creative-video-test.nos-jd.163yun.com/202203251108383ee3d0e4299a4407874f81874aa6c105?download=1648177718744.mp4&Signature=AzR0bhywzsBQAVdIDJMuttM06NNVyxE5c%2FUyvcaU3m8%3D&Expires=4105134518&NOSAccessKeyId=a2b368da8d27405fbe0e771bf7ab2cf9" controls :class="$style['video']"></video>
    <div>
      <Button @click="captureClick">拍照</Button>
    </div>
    <canvas ref="canvas" width="480" height="320"></canvas>
    <JsonView
      :class="$style['json-view']"
      :data="jsonData"
      :deep="1"
      icon-style="triangle"
      theme="vs-code"
    ></JsonView>
    <Button @click="getCamera">检测</Button>
    <Button @click="uploadWx">微信上传图片</Button>
  </div>
</template>

<script>
import JsonView from "vue-json-views";
import Qs from "qs";
import axios from "axios";
import PEOPLE from "@/../public/people.png";

const instance = axios.create({
  baseURL: "/bda",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
let wx;
export default {
  name: "TheHttp",
  components: {
    JsonView,
  },
  data() {
    return {
      PEOPLE,
      access_token: "",
      jsonData: {},
    };
  },
  created() {
    // if (
    //   navigator.mediaDevices.getUserMedia ||
    //   navigator.getUserMedia ||
    //   navigator.webkitGetUserMedia ||
    //   navigator.mozGetUserMedia
    // ) {
    //   //调用用户媒体设备, 访问摄像头
    //   this.getUserMedia(
    //     { video: { width: 480, height: 320, facingMode: "user" } },
    //     this.success,
    //     this.error
    //   );
    // } else {
    //   alert("不支持访问用户媒体");
    // }
    // this.getAccessToken();
  },
  mounted() {
    wx = require("weixin-js-sdk");
    setTimeout(() => {
      wx.config({
        appid: "wxc60594de2f17db0f",
        noncestr: "d886bfab-f9c5-439b-8092-4d05e80518bf",
        signature: "268ED889BF393A87BFE737A0CDE2CCC255FCDE47",
        timestamp: "1651046148",
        jsApiList: [
          "checkJsApi",
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone",
        ],
        openTagList: ["wx-open-launch-weapp"],
        success: function () {
          alert("配置成功");
        },
        fail: function () {
          alert("配置失败");
        },
      });
      console.log(wx);
    }, 1000);
  },
  methods: {
    uploadWx() {
      wx.chooseImage({
        sourceType: ["album"],
        success({ tempFiles }) {
          console.log(tempFiles);
        },
      });
    },
    captureClick() {
      let width = this.$refs.video.offsetWidth || 480;
      let height = this.$refs.video.offsetHeight || 320;
      let context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.video, 0, 0, width, height);
      // this.PEOPLE = context.toDataUrl("image/png");
      let dataURL = this.$refs.canvas.toDataURL("image/jpeg", 0.1);
      // return dataURL
      this.PEOPLE = dataURL.replace("data:image/jpeg;base64,", "");
    },
    //访问用户媒体设备的兼容方法
    getUserMedia(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(success)
          .catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error);
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    },
    getAccessToken() {
      const API_KEY = "HncGnV0HduO72W5MNAEYNp3E";
      const Secret_Key = "BowIMVjbOkgYzgo9oxGPzbFmFWoIa5i2";
      instance
        .post(
          `/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${Secret_Key}`
        )
        .then((res) => {
          this.access_token = res.data.access_token;
        });
    },
    getCamera() {
      let image = this.PEOPLE;
      let data = {
        image,
        type: "gender,is_human",
      };
      instance
        .post(
          `/rest/2.0/image-classify/v1/body_attr?access_token=${this.access_token}`,
          Qs.stringify(data)
        )
        .then((res) => {
          console.log(res);
          this.jsonData = res.data;
        });
    },
    success(stream) {
      //兼容webkit核心浏览器
      let CompatibleURL = window.URL || window.webkitURL;
      //将视频流设置为video元素的源
      console.log(stream);

      //video.src = CompatibleURL.createObjectURL(stream);
      this.$refs.video.srcObject = stream;
      this.$refs.video.play();
    },
    error(error) {
      console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
    },
  },
};
</script>

<style lang="less" module>
.container {
  .video {
    max-width: 480px;
    max-height: 320px;
  }
}
</style>

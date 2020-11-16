let baseURL = 'http://10.131.21.183:7030'
const stringify = (data) => {
  let str = '';
  Object.keys(data).forEach(key => {
    if (str) {
      str = `${str}&${key}=${data[key]}`
    } else {
      str = `${key}=${data[key]}`
    }
  }) 
  return str
}
const Axios = {
  get:(url,data) => {
    return new Promise((resolve,reject) => {
      $.ajax({
        type: "GET",
        async: true,
        url: `${baseURL}${url}`,
        data: stringify(data.params),
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        // jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: (json) => {
          console.log(json)
          resolve({
            data: json
          })
        },
        error: (error) => {
          reject(error);
        }
      });
    })
  },
  post:(url,data) => {
    return new Promise((resolve,reject) => {
      $.ajax({
        type: "POST",
        async: true,
        url: `${baseURL}${url}`,
        data: $.param(data),
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: (json) => {
          resolve({
            data: json
          })
        },
        error: (error) => {
          reject(error);
        }
      });
    })
  }
}
new Vue({
  el: "#app",
  data: {
    title: "2",
    isStart: false,
    isWarning: false,
    isSuccess: false,
    isWarningText: "",
    gateData: [],
    messageData: [
      {
        id: 1,
        label: "闸前水位(m)",
        code: "waterLevel",
        value: "--",
      },
      {
        id: 2,
        label: "系统压力(MPa)",
        code: "systemPress",
        value: "--",
      },
      {
        id: 3,
        label: "溢流阀状态",
        code: "overflowValveRun",
        value: "--",
      },
      {
        id: 4,
        label: "电机状态",
        code: "motorFail",
        value: "--",
      },
      {
        id: 5,
        label: "系统运行",
        code: "systemFail",
        value: "--",
      },
      {
        id: 6,
        label: "电机运行",
        code: "motorRun",
        value: "--",
      },
    ],
    isConfirm: false, // 升降坝确认弹窗
    actionText: "",
    id: "2c93940c679cb40701679cdaef1a0000", // 闸站的id
    gateId: [], // 点击升降坝的数据
  },
  created() {
    let arr = new Array(10).fill(0);
    arr.forEach((item, index) => {
      this.gateData.push({
        id: index + 1,
        name: index + 1,
        status: [1, 0, -1][index % 3],
        top: 0,
        isUp: false,
        isStop: false,
        isDown: false,
      });
    });
    this.getGateStatus();
    this.getMessageData();
  },
  methods: {
    getGateStatus() {
      let params = {
        id: this.id,
      };
      Axios.get("/acs/dam/getDeviceStatus", { params }).then((res) => {
        if (res.data.flag) {
          this.isStart = res.data.data.motorRun;
          this.gateData = res.data.data.dams.map((item, index) => {
            return {
              id: index + 1,
              id: index + 1,
              status: item,
              top: 0,
              isUp: false,
              isStop: false,
              isDown: false,
            };
          });
          this.messageData.forEach((item) => {
            if (
              item.code === "overflowValveRun" &&
              (res.data.data[item.code] || res.data.data[item.code] === false)
            ) {
              // 溢流阀
              item.value = res.data.data[item.code] ? "正常" : "故障";
            }
            if (
              item.code === "motorRun" &&
              (res.data.data[item.code] || res.data.data[item.code] === false)
            ) {
              // 电机运行
              item.value = res.data.data[item.code] ? "正常" : "故障";
            }
            if (
              item.code === "systemFail" &&
              (res.data.data[item.code] || res.data.data[item.code] === false)
            ) {
              // 系统运行
              item.value = res.data.data[item.code] ? "正常" : "故障";
            }
            if (
              item.code === "motorFail" &&
              (res.data.data[item.code] || res.data.data[item.code] === false)
            ) {
              // 电机状态
              item.value = res.data.data[item.code] ? "正常" : "故障";
            }
          });
        }
      });
    },
    getMessageData() {
      let params = { id: this.id };
      Axios.get("/acs/dam/getWaterLevelPress", { params }).then((res) => {
        this.messageData.forEach((item) => {
          if (
            item.code === "waterLevel" &&
            (`${res.data.data[item.code]}`)
          ) {
            // 水位
            item.value = `${res.data.data[item.code]}`;
          }
          if (
            item.code === "systemPress" &&
            (`${res.data.data[item.code]}`)
          ) {
            // 系统压力
            item.value = `${res.data.data[item.code]}`;
          }
        });
      });
    },
    start() {
      // if (!this.isStart) {
      //   this.showWarning("请先启动电机!", false);
      //   return;
      // }
      let params = {
        id: this.id,
        start: !this.isStart,
      };
      Axios.get("/acs/dam/ctrlBoot", {
        params,
      }).then((res) => {
        this.showWarning("电机启动", true);
      });
    },
    exit() {
      let params = {
        id: "123",
      };
      Axios.post("/url", params).then((res) => {
        console.log("退出远控");
      });
    },
    gateUp(item) {
      this.actionText = "升坝";
      this.isConfirm = true;
      this.gateId = item
    },
    gateStop(item) {
      let gateId = item.map(i => i.id);
      if(item.length === 1) {
        item[0].isStop = true;
        item[0].isUp = false;
        item[0].isDown = false;
        setTimeout(() => {
          item[0].isStop = false;
        }, 1000)
      }
      let params = {
        id: this.id,
        damNum: gateId,
        liftDown: 0,
      };
      Axios.post("/acs/dam/ctrlLiftDown",  params ).then((res) => {
        if(res.data.flag) {
          this.showWarning("操作成功", true);
        }
      });
    },
    gateDown(item) {
      this.actionText = "降坝";
      this.isConfirm = true;
      this.gateId = item;
    },
    cancel() {
      this.isConfirm = false;
    },
    ok() {
      let gateId = this.gateId.map(item => item.id)
      console.log(gateId);
      let params = {
        id: this.id,
        damNum: gateId,
        liftDown: 1,
      };
      if (this.actionText === "升坝") {
        // 升坝
        if(this.gateId.length === 1) {
          this.gateId[0].isUp = true;
          this.gateId[0].isStop = false;
          this.gateId[0].isDown = false;
          this.gateId[0].top = -50;
          setTimeout(() => {
            this.gateId[0].isUp = false;
          }, 30000)
        } else {
          this.gateId.forEach(item=> {
            item.top = -50;
          })
        }
        params.liftDown = 1
        Axios.post("/acs/dam/ctrlLiftDown",  params ).then((res) => {
          if(res.data.flag) {
            this.showWarning("操作成功", true);
          }
        });
      } else {
        // 降坝
        if(this.gateId.length === 1) {
          this.gateId[0].isDown = true;
          this.gateId[0].isUp = false;
          this.gateId[0].isStop = false;
          this.gateId[0].top = 0;
          setTimeout(() => {
            this.gateId[0].isDown = false;
          }, 30000)
        } else {
          this.gateId.forEach(item=> {
            item.top = 0;
          })
        }
        params.liftDown = -1
        Axios.post("/acs/dam/ctrlLiftDown",  params ).then((res) => {
          console.log(res);
          if(res.data.flag) {
            this.showWarning("操作成功", true);
          }
        });
      }
      this.isConfirm = false;
    },
    showWarning(text, type) {
      this.isSuccess = type;
      this.isWarningText = text;
      this.isWarning = true;
      setTimeout(() => {
        this.isWarning = false;
      }, 2000);
    },
  },
});

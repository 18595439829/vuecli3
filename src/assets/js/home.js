import homeChild from './homeChild'
export default {
  data: {
    num: 111
  },
  btnClick () {
    homeChild.conlog(1,2)
  },
  getSearchString(key, Url) {
    // 获取URL中?之后的字符
    let str = Url
    str = str.substring(0, str.length)
    console.log(1, str)
    // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
    let arrStr = str.split('?')
    console.log('arrStr', arrStr)
    str = arrStr[1]
    let arr = str.split('&')
    console.log(2, arr)
    let obj = new Object()
  
    // 将每一个数组元素以=分隔并赋给obj对象
    for (let i = 0; i < arr.length; i++) {
      let tmp_arr = arr[i].split('=')
      obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1])
    }
    console.log(3, obj)
    return obj[key]
  }
}
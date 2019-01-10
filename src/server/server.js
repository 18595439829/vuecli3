var http = require('http')
let getSearchString = function(key, Url) {
  // 获取URL中?之后的字符
  let str = Url
  str = str.substring(0, str.length)
  // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
  let arrStr = str.split('?')
  str = arrStr[1]
  let arr = str.split('&')
  let obj = new Object()

  // 将每一个数组元素以=分隔并赋给obj对象
  for (let i = 0; i < arr.length; i++) {
    let tmp_arr = arr[i].split('=')
    obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1])
  }
  return obj[key]
}
http
  .createServer(function(req, res) {
    console.log(req.url)

    let date = new Date()
    let name = getSearchString('name', req.url)
    let password = getSearchString('password', req.url)
    if (name === 'admin' && password === '123456') {
      res.writeHead(200, { 'Content-type': 'text/blain' })
      let dataObj = {
        text: 'Hello NodeJs',
        time: date,
        author: 'yangtuo'
      }
      res.write(JSON.stringify(dataObj))
      res.end()
    } else {
      res.writeHead(200, { 'Content-type': 'text/blain' })
      let dataObj = {
        text: '用户名或密码不对',
        time: date,
        author: 'yangtuo'
      }
      res.write(JSON.stringify(dataObj))
      res.end()
    }
  })
  .listen(8111)

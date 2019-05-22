var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())

app.get('/', function(req, res) {
  console.log(req.method, req.url)
  // 输出 JSON 格式
  var response = {
    textGET: '登陆成功'
  }
  console.log(response)
  res.end(JSON.stringify(response))
})

app.post('/', function(req, res) {
  console.log(req.method, req.body)
  // 输出 JSON 格式
  var response = {
    textPOST: '登陆成功'
  }
  console.log(response)
  res.end(JSON.stringify(response))
})

var server = app.listen(8110, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})

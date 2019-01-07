var http = require('http')

http
  .createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/blain' })
    let dataObj = {
      text: 'Hello NodeJs',
      time: '2018-01-07',
      author: 'yangtuo'
    }
    res.write(JSON.stringify(dataObj))
    res.end()
  })
  .listen(8111)

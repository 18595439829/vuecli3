var fs = require('fs')
fs.readFile('./file/text', (err, file) => {
  console.log(err, file)
})
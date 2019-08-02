var fs = require('fs')
fs.readFile('./file/text.txt', (err, file) => {
  console.log(err, file)
})
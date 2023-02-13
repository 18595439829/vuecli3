var admZip = require('adm-zip');
var zip = new admZip('./test.docx');
//将该docx解压到指定文件夹result下
zip.extractAllTo("./result", true);
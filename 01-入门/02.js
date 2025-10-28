const fs = require('fs')
// 写入文件内容
fs.writeFile('./text.txt', 'hello', error => {
  if (error) {
    console.log(error);
  }else {
    console.log('success');
  }
})

// 读取文件
fs.readFile('./text.txt', (error, data) => {
  if (error) {
    console.log(error);
  } else {
    // data 是buffer 16进制的数据流对象
    // toString 转换成字符串
    console.log(data.toString());
  }
})


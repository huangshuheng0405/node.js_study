const { error } = require('console')
const fs = require('fs')
// 引入path模块对象
const path = require('path')
// 调用path.join() 配合 __dirname 组成目标文件的绝对路径
console.log(__dirname)
fs.readFile(path.join(__dirname, '../text.txt'), (error, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data.toString())
  }
})
// 初始路径: d:\Node.js\入门\03 (__dirname)
// + '../text.txt' (向上一级 + 文件名)
// = d:\Node.js\入门\text.txt (最终路径)
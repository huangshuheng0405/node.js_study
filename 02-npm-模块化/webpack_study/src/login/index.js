//  体验webpack打包过程

// 准备项目和源代码
import { checkPhone, checkCode } from '../utils/check.js'
console.log(checkPhone('17850967571'))
console.log(checkCode('12345'))

// 准备webpack打包环境   npm i webpack webpack-cli --save-dev

// 运行自定义命令打包观察效果




// 把 type:"commonjs" 删掉 用webpack默认块处理方式
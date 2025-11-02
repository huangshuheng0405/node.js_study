//  体验webpack打包过程

// 准备项目和源代码
import { checkPhone, checkCode } from '../utils/check.js'
console.log(checkPhone('17850967571'))
console.log(checkCode('12345'))

// 准备webpack打包环境   npm i webpack webpack-cli --save-dev

// 运行自定义命令打包观察效果

// 把 type:"commonjs" 删掉 用webpack默认块处理方式

// document.querySelector('.btn').addEventListener('click', () => {
//   const phone = document.querySelector('.login-form [name=mobile]').value
//   const code = document.querySelector('.login-form [name=code]').value

//   if (!checkPhone(phone)) {
//     console.log('手机号长度必须是11位')
//     return
//   }

//   if (!checkCode(code)) {
//     console.log('验证码长度必须是6位')
//     return
//   }

//   console.log('提交到服务器')
// })


// 准备css代码
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// npm i css-loader style-loader --save-dev

// 准备webpack配置文件  webpack.config.js


// 单独提取css文件  npm i mini-css-extract-plugin --save-dev
// 修改webpack配置文件 使用 MiniCssExtractPlugin 提取css到单独文件

// 优化压缩css  npm i css-minimizer-webpack-plugin --save-dev
// 修改webpack配置文件 使用 CssMinimizerPlugin 压缩css文件


// 打包less  npm i less less-loader --save-dev
// 修改webpack配置文件 添加 less-loader 规则
import './index.less'
// 图片成功运行到index.html中了

// 打包图片  webpack5内置了图片资源模块类型 asset/resource
import imgObj from './assets/logo.png'
const imgEl = document.createElement('img')
imgEl.src = imgObj
document.querySelector('.login-wrap').appendChild(imgEl)


// 使用封装的 axios 发送登录请求

import myAxios from '../utils/request.js'
import { myAlert } from '../utils/alert.js'
document.querySelector('.btn').addEventListener('click', () => {
  const phone = document.querySelector('.login-form [name=mobile]').value
  const code = document.querySelector('.login-form [name=code]').value

  if (!checkPhone(phone)) {
    myAlert(false, '手机号长度必须是11位')
    return
  }

  if (!checkCode(code)) {
    myAlert(false, '验证码长度必须是6位')
    return
  }

  console.log('提交到服务器')
  myAxios({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile: phone,
      code: code
    }
  }).then(result => {
    myAlert(true, '登录成功')
  }).catch(error => {
    myAlert(false, error.response.data.message || '登录失败') 
  })
})
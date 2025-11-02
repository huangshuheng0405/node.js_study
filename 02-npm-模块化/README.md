# Node.js 模块系统：CommonJS vs ES Module

## 两种模块系统的主要区别

### 1. 语法差异

#### CommonJS 导入导出方式：

1. **默认导出方式**

```javascript
// 导出
module.exports = {
  url: baseURL,
  arraySum: getArraySum,
}

// 导入
const obj = require('./utils.js')
```

2. **exports 导出方式**

```javascript
// 导出
exports.url = baseURL
exports.arraySum = getArraySum

// 导入
const { url, arraySum } = require('./utils.js')
```

3. **混合导出方式**

```javascript
// 导出
exports.url = baseURL
module.exports = {
  url: baseURL,
  arraySum: getArraySum,
}

// 导入（两种方式都可以）
const obj = require('./utils.js')
const { url, arraySum } = require('./utils.js')
```

#### ES Module 导入导出方式：

1. **命名导出方式**

```javascript
// 导出
export const baseURL = 'http://example.com'
export const getArraySum = (arr) => arr.reduce((sum, item) => (sum += item), 0)

// 导入
import { baseURL, getArraySum } from './utils.js'
```

2. **默认导出方式**

```javascript
// 导出
export default {
  url: baseURL,
  arraySum: getArraySum,
}

// 导入
import obj from './utils.js'
```

3. **混合导出方式**

```javascript
// 导出
export const baseURL = 'http://example.com'
export default {
  arraySum: getArraySum,
}

// 导入
import defaultObj, { baseURL } from './utils.js'
```

4. **重命名导入导出**

```javascript
// 导出时重命名
export { baseURL as apiURL }

// 导入时重命名
import { baseURL as apiURL } from './utils.js'
```

5. **整体导入**

```javascript
// 导入模块的所有导出
import * as utils from './utils.js'
```

### 2. 加载机制

- **CommonJS**:

  - 同步加载
  - 运行时加载
  - 加载的是模块的拷贝

- **ES Module**:
  - 异步加载
  - 编译时加载（静态分析）
  - 加载的是模块的引用

### 3. 使用场景

- **CommonJS**:

  - 主要用于 Node.js 服务端
  - 适用于服务器端的模块依赖管理

- **ES Module**:
  - 浏览器端和现代 Node.js 都支持
  - 适用于前端工程化项目

### 4. 项目配置

#### package.json 的 type 字段

- **"commonjs"**（默认值）:

  - `.js`文件使用 CommonJS 规范
  - `.mjs`文件强制使用 ES Module
  - `.cjs`文件强制使用 CommonJS

- **"module"**:
  - `.js`文件使用 ES Module 规范
  - `.mjs`文件强制使用 ES Module
  - `.cjs`文件强制使用 CommonJS

#### 文件扩展名优先级

无论 package.json 中的 type 设置如何：

- `.mjs`后缀的文件**始终**以 ES Module 方式加载
- `.cjs`后缀的文件**始终**以 CommonJS 方式加载
- `.js`后缀的文件会根据 package.json 中的 type 字段决定使用哪种模块系统

### 5. 特殊情况

在使用构建工具（如 Webpack）的项目中：

- 源代码可以直接使用 ES Module 语法
- 无需考虑 package.json 中的 type 设置
- 构建工具会处理模块系统的转换

## 代码示例

### CommonJS 示例

```javascript
// utils.js
const baseURL = 'http://hmajax.itheima.net'
const getArraySum = (arr) => arr.reduce((sum, item) => (sum += item), 0)

module.exports = {
  url: baseURL,
  arraySum: getArraySum,
}

// index.js
const obj = require('./utils.js')
const result = obj.arraySum([1, 2, 3, 4, 5])
```

### ES Module 示例

```javascript
// utils.js
export const baseURL = 'http://hmajax.itheima.net'
export const getArraySum = (arr) => arr.reduce((sum, item) => (sum += item), 0)

// index.js
import { baseURL, getArraySum } from './utils.js'
const result = getArraySum([10, 20, 30])
```

## 项目实践详细总结

### 基础模块化示例 - CommonJS 与 ES Module 实战

1. **01-导入（CommonJS 基础）**

   ```javascript
   // 导出示例（utils.js）
   const baseURL = 'http://hmajax.itheima.net'
   module.exports = {
     url: baseURL,
     arraySum: (arr) => arr.reduce((sum, item) => (sum += item), 0),
   }

   // 导入示例（index.js）
   const obj = require('./utils.js')
   ```

   - CommonJS 是 Node.js 原生支持的模块系统
   - 同步加载，运行时加载
   - 适合服务器端模块依赖管理

2. **02-ECMA 导入（ES Module 默认导出）**

   ```javascript
   // 导出示例（utils.js）
   export default {
     url: baseURL,
     arraySum: getArraySum,
   }

   // 导入示例（index.js）
   import obj from './utils.js'
   ```

   - 需要在 package.json 中设置`"type": "module"`
   - 支持静态分析，编译时就确定依赖关系
   - 更适合浏览器环境和代码分割

3. **03-命名导入（ES Module 命名导出）**

   ```javascript
   // 导出示例（utils.js）
   export const baseURL = 'http://hmajax.itheima.net'
   export const getArraySum = (arr) => arr.reduce((sum, item) => (sum += item), 0)

   // 导入示例（index.js）
   import { baseURL, getArraySum } from './utils.js'
   ```

   - 支持精确导入需要的内容
   - 有利于代码压缩和摇树优化
   - 可以使用 as 关键字重命名导入项

4. **04-导入 utils（工具库封装）**

   ```javascript
   // 工具函数封装（lib/arr.js）
   const getArraySum = (arr) => arr.reduce((sum, item) => (sum += item), 0)
   module.exports = { getArraySum }

   // 统一导出（index.js）
   const { getArraySum } = require('./lib/arr.js')
   module.exports = { getArraySum }
   ```

   - 项目结构组织示例
     - lib/：存放具体功能实现
     - index.js：统一导出接口
     - package.json：定义包信息
   - 功能模块化设计原则
     - 单一职责
     - 高内聚低耦合
     - 接口统一管理

### NPM 包管理详解

5. **05-使用软件包（NPM 基础）**

   ```javascript
   // 使用第三方包示例（server.js）
   const dayjs = require('dayjs')
   const nowDateStr = dayjs().format('YYYY-MM-DD')
   ```

   - NPM 包管理基础操作
     ```bash
     npm init -y              # 初始化package.json
     npm install dayjs        # 安装特定包
     npm install             # 安装所有依赖
     ```
   - package.json 核心字段
     ```json
     {
       "name": "项目名",
       "version": "版本号",
       "dependencies": {
         "dayjs": "^1.11.18"
       }
     }
     ```

6. **06-安装软件包（依赖管理）**

   ```javascript
   // 多包使用示例
   const dayjs = require('dayjs')
   const _ = require('lodash')
   ```

   - 依赖类型
     - dependencies：生产环境依赖
     - devDependencies：开发环境依赖
   - 版本号规则
     - ^1.2.3：自动更新次版本和修订版本
     - ~1.2.3：只自动更新修订版本
     - 1.2.3：锁定特定版本
   - node_modules 结构
     - 包文件存放位置
     - 依赖关系树
     - 扁平化处理

7. **07-nodemon 全局软件包（开发工具）**
   ```bash
   npm install nodemon -g    # 全局安装
   nodemon server.js         # 运行并监听文件变化
   ```
   - 全局包特点
     - 安装在系统级别
     - 提供命令行工具
     - 适用于开发工具类包
   - nodemon 功能
     - 监听文件变化
     - 自动重启服务
     - 支持多种文件类型
   - 常用配置
     ```json
     {
       "scripts": {
         "dev": "nodemon server.js"
       }
     }
     ```

### Web 服务开发实践

8. **09-14 系列（Express 应用）**

   1. **基础 Web 服务（09）**

   ```javascript
   const express = require('express')
   const server = express()

   server.get('/', (req, res) => {
     res.send('你好，欢迎使用 Express')
   })

   server.listen(3000, () => {
     console.log('Web 服务已启动')
   })
   ```

   - Express 基础概念
     - 路由处理
     - 请求和响应对象
     - 中间件机制

   2. **接口开发（10-12）**

   ```javascript
   server.get('/api/province', (req, res) => {
     fs.readFile(path.join(__dirname, 'data/province.json'), (err, data) => {
       res.send(data.toString())
     })
   })
   ```

   - RESTful API 设计
   - 错误处理
   - JSON 数据交互

   3. **跨域处理（13）**

   ```javascript
   const cors = require('cors')
   server.use(cors())
   ```

   - CORS 中间件使用
   - 跨域安全策略
   - 前后端分离实践

   4. **静态资源服务（14）**

   ```javascript
   server.use(express.static(path.join(__dirname, 'public')))
   ```

   - 静态文件服务
   - 资源路径配置
   - 前端资源组织

### Webpack 工程化详解

**webpack_study 项目配置**

1. **基础配置（webpack.config.js）**

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/login/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './login/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: path.resolve(__dirname, 'dist/login/index.html'),
    }),
  ],
}
```

- 核心概念
  - entry：入口文件配置
  - output：输出配置
  - plugins：插件配置
  - module：模块处理规则

2. **Babel 配置（.babelrc）**

```json
{
  "presets": ["@babel/preset-env"]
}
```

- 转译功能
  - ES6+语法转换
  - 兼容性处理
  - 按需加载 polyfill

3. **模块化示例（src/login/index.js）**

```javascript
import { checkPhone, checkCode } from '../utils/check.js'

document.querySelector('.btn').addEventListener('click', () => {
  const phone = document.querySelector('.login-form [name=mobile]').value
  if (!checkPhone(phone)) {
    console.log('手机号长度必须是11位')
    return
  }
  // ...
})
```

- 特点
  - 支持多种模块规范
  - 自动处理依赖
  - 支持代码分割

4. **项目结构**

```
webpack_study/
├── public/          # 静态资源
├── src/             # 源代码
│   ├── login/       # 业务模块
│   └── utils/       # 工具函数
├── webpack.config.js # webpack配置
├── .babelrc         # babel配置
└── package.json     # 项目配置
```

- 最佳实践
  - 模块化组织代码
  - 合理的目录结构
  - 配置文件分离

## NPM 常用命令参考

### 项目初始化

```bash
npm init            # 交互式创建package.json
npm init -y         # 快速创建package.json，使用默认值
```

### 安装包

```bash
# 本地安装
npm install 包名    # 安装到dependencies（简写：npm i 包名）
npm install 包名 --save-dev    # 安装到devDependencies（简写：npm i 包名 -D）
npm install 包名@版本号        # 安装指定版本
npm install         # 安装package.json中所有依赖（简写：npm i）

# 全局安装
npm install 包名 -g  # 全局安装（简写：npm i 包名 -g）

# 其他安装选项
npm install 包名 --save-exact  # 安装精确版本（^1.2.3 -> 1.2.3）
npm install 包名 --no-save     # 安装但不添加到package.json
```

### 卸载包

```bash
npm uninstall 包名   # 卸载本地包（简写：npm un 包名）
npm uninstall 包名 -g # 卸载全局包
```

### 更新包

```bash
npm update 包名      # 更新指定包
npm update          # 更新所有包
npm outdated        # 检查过时的包
```

### 包信息查看

```bash
npm list            # 查看本地安装的包列表
npm list -g        # 查看全局安装的包列表
npm list 包名      # 查看特定包信息
npm info 包名      # 查看包的详细信息
```

### 脚本运行

```bash
npm run 脚本名称    # 运行package.json中scripts定义的脚本
npm start          # 运行start脚本（可以省略run）
npm test           # 运行test脚本（可以省略run）
```

### 配置相关

```bash
npm config list    # 查看npm配置
npm config set key=value  # 设置配置项
npm config get key # 获取配置项
npm config delete key # 删除配置项
```

### 缓存管理

```bash
npm cache clean --force  # 清除npm缓存
npm cache verify        # 验证缓存
```

### 包发布（如果你要发布自己的包）

```bash
npm login          # 登录npm账号
npm publish        # 发布包
npm unpublish 包名 # 取消发布
```

### 实用命令组合

```bash
# 清理并重装依赖
npm cache clean --force && npm install

# 更新到最新版本
npm update && npm outdated

# 安装开发和生产依赖
npm i && npm i --only=dev
```

### 常用 npm 配置

```bash
# 设置镜像源
npm config set registry https://registry.npmmirror.com

# 设置初始化默认值
npm config set init.author.name "你的名字"
npm config set init.author.email "你的邮箱"
npm config set init.license "MIT"
```

### package.json 脚本示例

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode production",
    "test": "jest",
    "lint": "eslint src"
  }
}
```

## 核心知识点总结

1. 模块化规范

   - CommonJS 是 Node.js 的传统模块系统，适合服务器端开发
   - ES Module 是更现代的模块系统，提供了更好的静态分析能力
   - 两种规范可以共存，通过文件扩展名或配置区分

2. 包管理

   - npm init 初始化项目
   - npm install 安装依赖
   - package.json 管理项目配置和依赖
   - 区分开发依赖和生产依赖

3. 工程化实践

   - 使用构建工具处理模块转换
   - 配置开发环境和生产环境
   - 处理资源文件和依赖关系
   - 优化打包和部署流程

4. 最佳实践
   - 在现代前端工程化项目中，推荐使用 ES Module
   - 使用构建工具时，源码可以直接使用 ES Module 语法
   - 合理组织项目结构和模块拆分
   - 注意开发环境和生产环境的区别

# Node.js 入门教程

## 1. Node.js 基础（01.js）

````javascript
consol3. 常用路径API详解

#### path.join([...paths])
```javascript
const path = require('path')

// 基础路径拼接
path.join('/foo', 'bar', 'baz/asdf')
// 返回: '/foo/bar/baz/asdf'

// 使用 ../
path.join('/foo', 'bar', '../', 'baz')
// 返回: '/foo/baz'

// 使用 __dirname（当前文件所在目录的绝对路径）
path.join(__dirname, 'src', 'index.js')
// 返回: 'D:\项目目录\src\index.js'
````

- **作用**：将多个路径片段连接成一个完整的路径
- **特点**：
  - 自动处理多个路径之间的分隔符
  - 正确处理 `../` 和 `./`
  - 在不同操作系统中使用对应的路径分隔符
  - 删除多余的分隔符
- **使用场景**：
  - 构建文件路径
  - 处理相对路径
  - 跨平台路径处理

#### path.resolve([...paths])

```javascript
const path = require('path')

// 从右到左处理，直到构建完整的绝对路径
path.resolve('/foo', '/bar', 'baz')
// 返回: '/bar/baz'（因为/bar是绝对路径，所以/foo被忽略）

// 当前目录相对路径解析
path.resolve('src', 'index.js')
// 返回: 'D:\当前工作目录\src\index.js'

// 混合使用相对路径和绝对路径
path.resolve('/foo/bar', './baz')
// 返回: '/foo/bar/baz'
```

- **作用**：将路径或路径片段解析为绝对路径
- **特点**：
  - 从右向左处理路径
  - 遇到绝对路径就停止解析
  - 如果处理完所有路径还没有得到绝对路径，则加上当前工作目录
- **使用场景**：
  - 需要获取绝对路径时
  - 处理配置文件中的路径
  - 确保路径完整性

#### path.dirname(path)

```javascript
const path = require('path')

// 获取文件所在目录路径
path.dirname('/foo/bar/baz/asdf/quux.html')
// 返回: '/foo/bar/baz/asdf'

// 处理相对路径
path.dirname('foo/bar/baz.js')
// 返回: 'foo/bar'

// 处理文件名
path.dirname('foo.js')
// 返回: '.'
```

- **作用**：获取路径中的目录名
- **特点**：
  - 返回路径中最后一个部分的上层目录
  - 如果路径中没有目录，返回'.'
  - 保留路径的相对/绝对特性
- **使用场景**：
  - 获取文件所在目录
  - 创建相关文件到同一目录
  - 路径分析和处理

#### path.basename(path[, ext])

```javascript
const path = require('path')

// 获取文件名（包含扩展名）
path.basename('/foo/bar/baz/asdf/quux.html')
// 返回: 'quux.html'

// 获取文件名（不包含扩展名）
path.basename('/foo/bar/baz/asdf/quux.html', '.html')
// 返回: 'quux'

// 处理没有扩展名的文件
path.basename('/foo/bar/baz/asdf/quux')
// 返回: 'quux'
```

- **作用**：获取路径中的文件名
- **特点**：
  - 可选择是否包含文件扩展名
  - 不会检查路径是否真实存在
  - 只处理字符串，不进行路径解析
- **使用场景**：
  - 提取文件名
  - 文件重命名
  - 文件类型处理

#### path.extname(path)

```javascript
const path = require('path')

// 获取文件扩展名
path.extname('index.html') // 返回: '.html'
path.extname('index.coffee.md') // 返回: '.md'
path.extname('index.') // 返回: '.'
path.extname('index') // 返回: ''
path.extname('.index') // 返回: ''
```

- **作用**：获取路径中的扩展名
- **特点**：
  - 返回最后一个点号后面的内容
  - 如果没有扩展名，返回空字符串
  - 如果文件名以点开头且没有其他扩展名，返回空字符串
- **使用场景**：
  - 文件类型判断
  - 文件筛选
  - 文件格式验证

#### 综合使用示例

````javascript
const path = require('path')

// 完整的文件路径处理
const filePath = '/path/to/file/example.txt'

console.log({
    // 获取目录名
    dir: path.dirname(filePath),        // '/path/to/file'
    // 获取文件名
    base: path.basename(filePath),      // 'example.txt'
    // 获取扩展名
    ext: path.extname(filePath),        // '.txt'
    // 获取不带扩展名的文件名
    name: path.basename(filePath, path.extname(filePath))  // 'example'
})

// 路径组合示例
const projectRoot = path.resolve(__dirname)
const srcPath = path.join(projectRoot, 'src')
const filePath2 = path.join(srcPath, 'index.js')
```'hello');
for (let i = 0; i < 3; i++) {
  console.log(6);
}
````

### 知识点

- Node.js 运行环境介绍
- JavaScript 在服务器端的执行
- 命令行执行：`node 文件名.js`
- 区别于浏览器的运行环境特点

## 2. 文件操作基础（02.js）

```javascript
const fs = require('fs')

// 写入文件
fs.writeFile('./text.txt', 'hello', (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('success')
  }
})

// 读取文件
fs.readFile('./text.txt', (error, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data.toString())
  }
})
```

### 知识点

1. fs 模块的基本使用
   - 文件读取（fs.readFile）
   - 文件写入（fs.writeFile）
2. 回调函数的使用
3. Buffer 数据类型
4. 错误处理机制

## 3. 路径处理（03/index.js）

```javascript
const path = require('path')
fs.readFile(path.join(__dirname, '../text.txt'), (error, data) => {
  if (error) {
    console.log(error)
  } else {
    console.log(data.toString())
  }
})
```

### 知识点

1. path 模块使用
   - path.join() - 路径拼接
   - \_\_dirname - 当前文件所在目录的绝对路径
2. 相对路径和绝对路径
3. 跨平台路径处理
4. 常用路径 API
   - path.join()
   - path.resolve()
   - path.dirname()
   - path.basename()
   - path.extname()

## 4. HTML 文件处理（04/build.js）

```javascript
const fs = require('fs')
const path = require('path')

// 读取HTML文件
fs.readFile(path.join(__dirname, 'public/index.html'), (error, data) => {
  if (error) {
    console.log(error)
  } else {
    // 压缩HTML
    const htmlStr = data.toString()
    const resultStr = htmlStr.replace(/[\r\n]/g, '')

    // 写入新文件
    fs.writeFile(path.join(__dirname, 'dist/index.html'), resultStr, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('write success')
      }
    })
  }
})
```

### 知识点

1. 文件处理实战
   - HTML 文件读取
   - 正则表达式处理内容
   - 压缩 HTML 文件
2. 项目实践
   - 源文件和目标文件组织
   - 构建流程处理
   - 错误处理

## 5. Web 服务器基础（05/server.js）

```javascript
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.end('welcome')
})

server.listen(3000, () => {
  console.log('web server success')
})
```

### 知识点

1. HTTP 模块基础
   - 创建 Web 服务器
   - 请求监听
   - 响应设置
2. HTTP 协议基础
   - 请求头和响应头
   - Content-Type 类型
   - 字符编码设置
3. 服务器编程基础
   - 端口监听
   - 事件处理
   - 回调函数

## 6. 静态资源服务器（06/server.js）

```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')
const server = http.createServer()

server.on('request', (req, res) => {
  if (req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'dist/index.html'), (error, data) => {
      if (error) {
        console.log(error)
      } else {
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(data.toString())
      }
    })
  } else {
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end('访问资源路径不存在')
  }
})
```

### 知识点

1. 静态资源服务
   - URL 路径处理
   - 文件类型判断
   - 响应头设置
2. 错误处理
   - 404 处理
   - 错误响应
3. 服务器进阶
   - 路由处理
   - 内容类型
   - 资源访问控制

## 核心概念总结

### 1. Node.js 基础概念

- 运行环境
- 模块系统
- 异步编程

### 2. 常用内置模块

- fs（文件系统）
- path（路径处理）
- http（网络服务）

### 3. Web 开发基础

- HTTP 协议
- 服务器编程
- 静态资源处理

### 4. 最佳实践

- 错误处理
- 路径处理
- 编码规范
- 项目结构组织

### 5. 开发技巧

- 使用\_\_dirname 确保路径正确
- 适当的错误处理
- 合理的代码组织
- 注意跨平台兼容性

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  // 入口
  entry: path.resolve(__dirname, 'src/login/index.js'),
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './login/index.js',
  },
  // 插件 给webpack提高更多功能
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'), // 模板文件
      filename: path.resolve(__dirname, 'dist/login/index.html'), // 输出文件
    }),
    new MiniCssExtractPlugin(), // 提取css到单独文件
  ],
  // 加载器 (让webpack识别各种文件)
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      }
    ],
  },
  // 优化
  optimization: {
    minimizer: [
      `...`, // 继承现有的 minimizer（即 `terser-webpack-plugin` ）
      new CssMinimizerPlugin(),
    ],
  },
}

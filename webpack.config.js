const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebPackPlugin = require('copy-webpack-plugin')

const config = {
  entry: {
    main: ['@babel/polyfill','./src/index.js',],
    backgroundMagic: ['./src/backgroundMagic.js']
  },
  //entry: ['@babel/polyfill','./src/index.js',],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env',],
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new UglifyJSPlugin(),
    new CopyWebPackPlugin([
      {from:'./public/textures',to:'textures'}
    ]),
  ],
  stats: {
    children:false
  }
}

module.exports = config
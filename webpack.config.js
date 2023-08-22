const path = require('path');

module.exports = {
  name: 'tilemaster',
  mode: 'development', // 서비스: production
  devtool: 'eval',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist',
  }, // 출력

  devServer: {
    // 빌드된 파일이 들어갈 위치
    devMiddleware: { 
      publicPath: '/dist',
    },
    // 정적 파일 index.html의 위치
    static: {
      directory: path.resolve(__dirname),
    },
    port: 9000,
  },
};
var path = require('path');

module.exports = {
  target: 'web',
  entry: {
    app: ['babel-polyfill', './ui/App.jsx']
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, './src/ui/index.html'),
  //     inlineSource: '.(js|jsx|css)$'
  //   }),
  //   new HtmlWebpackInlineSourcePlugin()
  // ]
};

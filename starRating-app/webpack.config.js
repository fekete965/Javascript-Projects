const path = require('path');
module.exports = {
  entry: './src/js/main.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|tff)$/,
        use: 'url-loader?limit=25000'
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
    },
    resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
    },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/public/')
  }
};


const path = require('path');
const isDevBuild = false;

module.exports = {
  entry: {
    'StarRating': './app/src/js/main.ts'
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'app/dist/js'),
    library: 'StarRating'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=25000'
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader",
            {
              loader: 'typings-for-css-modules-loader',
							options: {
								modules: true,
								localIdentName: isDevBuild ? '[local]' : '[sha1:hash:hex:4]',
								minimize: false
              }
            },
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
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: [ path.resolve(__dirname, "src"), path.resolve(__dirname, "local_modules"), path.resolve(__dirname, "node_modules")]
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  }
};


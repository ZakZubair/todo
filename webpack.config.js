const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
  return {
    mode: env.development ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, env.development ? 'build/development' : 'build/production'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(jpe?g|gif|png|svg|ico)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        filename: 'index.html',
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'build/development'),
      port: 8080,
      open: true,
    },
    devtool: env.development ? 'source-map' : '',
  };
};

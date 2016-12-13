module.exports = {
  entry: './main.jsx',
  output: {
    path: './',
    filename: 'index.js',
  },
  debug: 'true',
  devtool: '#eval-source-map',
  resolve: {
    extensions: ['', '.js', '.scss', '.css', '.jsx'],
  },
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
    ],
  },

};

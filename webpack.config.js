module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|componet_modules)/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name toreference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
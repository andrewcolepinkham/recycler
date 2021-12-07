module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
}
    // devServer: {
    //     historyApiFallback:{
    //         index:'./index.html'
    //     }
    // }
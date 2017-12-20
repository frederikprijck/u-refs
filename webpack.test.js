const path = require('path');
const ROOT = path.resolve( __dirname, 'src' );

module.exports = function (options) {
  return {
    context: ROOT,
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [ path.resolve(__dirname, 'src'), 'node_modules' ]
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader'
        }
      ]
    },

    plugins: [],

    node: {
      global: true,
      process: true,
      fs: 'empty',
      child_process: 'empty',
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
}
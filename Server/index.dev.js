// require('ts-node').register({
//   cache: false,
//   transpileOnly: true
// });
require('source-map-support/register');
const tsNode = require('ts-node');
tsNode.register({
  compilerOptions: {
    target: 'es2017',
    module: 'commonjs',
    //, sourceMap: true
  },
});
require('./src/server');

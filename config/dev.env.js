var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TMBD_API_KEY: "'c3716451b0491eed24da6bcaa3b0b5d4'"
})

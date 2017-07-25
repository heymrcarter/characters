var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DICTIONARY_API_ENDPOINT: '"http://api.pearson.com/v2/dictionaries/entries"'  
})

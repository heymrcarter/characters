var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DICTIONARY_API_ENDPOINT: '"http://api.pearson.com/v2/dictionaries/entries"',
  DICTIONARY_API_KEY: '"2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"'
})

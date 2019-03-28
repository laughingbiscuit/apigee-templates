const ApiMocker = require('apimocker')

ApiMocker.createServer({port: process.env.PORT})
  .setConfigFile('config.json')
  .start()

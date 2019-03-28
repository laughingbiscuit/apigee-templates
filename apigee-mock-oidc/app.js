const express = require('express')
const Provider = require('oidc-provider')
const configuration = require('./support/config')
const clients = require('./support/clients')
const routes = require('./support/routes')
const path = require('path')
const org = ''
const app = express()
const oidc = new Provider('https://' + org + '-test.apigee.net', configuration)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
Provider.useRequest()

let server

(async () => {
    await oidc.initialize({
        clients
    })
    app.get('/', (req, res) => res.send('Welcome to the Apigee OIDC Mock'))
    routes(app, oidc)
    app.use(oidc.callback)
    app.enable('trust proxy')
    oidc.proxy = true

    server = app.listen(process.env.PORT || 9000, function() {
        console.log('Listening on port %d', server.address().port)
    })

})().catch((err) => {
    if (server && server.listening) server.close()
    console.error(err)
})

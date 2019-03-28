const { urlencoded } = require('express')
const body = urlencoded({
    extended: false
})

module.exports = (app, provider) => {

    //check that the application is up
    app.get('/ping', (req, res) => {
        res.render('ping')
    })

    //get login page
    app.get('/interaction/:grant', async (req, res, next) => {
        try {
            const details = await provider.interactionDetails(req)

            return res.render('login', {
                details
            })
        } catch (err) {
            return next(err)
        }
    })



    //submit login
    app.post('/interaction/:grant/login', body, async (req, res, next) => {
        res.set('Pragma', 'no-cache')
        res.set('Cache-Control', 'no-cache, no-store')
        try {

            const result = {
                account: 'username'
            }
            await provider.setProviderSession(req, res, result)
            res.status(302).set({
                Location: '/interaction/' + req.params.grant + '/consent'
            }).send()
        } catch (err) {
            next(err)
        }
    })

    //get consent
    app.get('/interaction/:grant/consent', body, async (req, res, next) => {
        try {
            const details = await provider.interactionDetails(req)
            return res.render('consent', {
                details,
            })
        } catch (err) {
            return next(err)
        }
    })

    //submit consent
    app.post('/interaction/:grant/consent', body, async (req, res, next) => {
        res.set('Pragma', 'no-cache')
        res.set('Cache-Control', 'no-cache, no-store')
        try {
            const result = {
                login: {
                    account: 'username',
                    acr: 'urn:mace:incommon:iap:bronze',
                    amr: ['pwd'],
                    remember: false,
                    ts: Math.floor(Date.now() / 1000),
                },
            }
            if (req.body.consent) result.consent = {}

            const redirectTo = await provider.interactionResult(req, res, result);
            const redirectToRelative = redirectTo.replace(/http(s?):\/\/(.*):(\d{4})/g, "")
            console.log("SD+"+redirectToRelative)
            res.status(302).set({Location: redirectToRelative}).send()
        } catch (err) {
            next(err)
        }
    })

}

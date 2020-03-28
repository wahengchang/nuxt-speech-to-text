const translate = require('../lib/gcloud/translate')
const router = require('express').Router()

router.get('/', async function(req, res) {
    const {query} = req
    const {text, to} = query

    if(!text) {
        res.status(500)
        return res.json(new Error('text is null'))
    }
    
    const _t = await translate.translate(text, to)
    return res.json({text: _t})
})

module.exports = router

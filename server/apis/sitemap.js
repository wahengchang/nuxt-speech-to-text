const sm = require('sitemap')
const config = require('../../config.json')

const router = require('express').Router()
router.get('/', async function(req, res) {
    const host = req.get('host');
    const {protocol} = req

    const sitemap = sm.createSitemap({
        hostname: host,
        cacheTime: 600000
    })

    config.forEach(item => {
        sitemap.add({
            url: `${protocol}://${host}/translate/${item.value}`,
            changefreq: 'monthly'
        })
    });

    res.header('Content-Type', 'application/xml')
    res.send(sitemap.toString())
})

module.exports = router

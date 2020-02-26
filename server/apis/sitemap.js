const sm = require('sitemap')
const config = require('../../config.json')

const router = require('express').Router()

const hostname = process.env.HOST_NAME || 'http://localhost:3000'
router.get('/', async function(req, res) {
    const sitemap = sm.createSitemap({
        hostname,
        cacheTime: 600000
    })

    config.forEach(item => {
        sitemap.add({
            url: `${hostname}/translate/${item.value}`,
            changefreq: 'monthly'
        })
    });

    res.header('Content-Type', 'application/xml')
    res.send(sitemap.toString())
})

module.exports = router

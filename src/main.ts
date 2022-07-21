import express from 'express'
import home from './routes/home'
import config from './utils/config'
import siteInfos from './routes/siteInfos'
import posts from './routes/posts'
import log from './utils/log'

const port = config.get('port')

const app = express()

app.get('/', (req, res) => {
    log.info(`got a request to "/"`)
    home(req, res)
})

app.get('/api/siteinfos', (req, res) => {
    log.info(`got a request to "/api/siteinfos"`)
    siteInfos(req, res)
})

app.get('/api/posts', (req, res) => {
    log.info(`got a request to "/api/posts"`)
    posts(req, res)
})

app.listen(port, () => {
    log.info(`Application started on port ${port}!`)
})

import express from 'express'
import bodyParser from 'body-parser'
import home from './routes/home'
import config from './utils/config'
import siteInfos from './routes/siteInfos'
import login from './routes/login'
import posts from './routes/posts'
import log from './utils/log'

const port = config.get('port')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/api/session/login', (req, res) => {
    log.info(`got a request to "/api/sessions/login"`)
    login(req, res)
})

app.listen(port, () => {
    log.info(`Application started on port ${port}!`)
})

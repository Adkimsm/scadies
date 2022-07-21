import express from 'express'
import home from './routes/home'
import config from './utils/config'
import siteInfos from './routes/siteInfos'
import posts from './routes/posts'

const port = config.get('port')

const app = express()

app.get('/', (req, res) => {
    home(req, res)
})

app.get('/api/siteinfos', (req, res) => {
    siteInfos(req, res)
})

app.get('/api/posts', (req, res) => {
    posts(req, res)
})

app.listen(port, () => {
    console.log(`Application started on port ${port}!`)
})

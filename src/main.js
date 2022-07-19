import express from 'express'
import home from './routes/home.js'
import config from './utils/config.cjs'
import siteInfos from './routes/siteInfos.js'

const port = config.get('port')

const app = express()

app.get('/', (req, res) => {
    home(req,res)
})

app.get('/api/siteinfos', (req, res) => {
    siteInfos(req,res)
})

app.listen(port, () => {
    console.log(`Application started on port ${port}!`)
})

/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import cors from 'cors'
import home from './routes/home'
import config from './utils/config'
import siteInfos from './routes/siteInfos'
import login from './routes/login'
import posts from './routes/posts'
import post from './routes/post'
import reg from './routes/reg'
import verifyToken from './routes/verifyToken'
import log from './utils/log'

const port = config.get('port')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', home)

app.get('/api/siteinfos', siteInfos)

app.get('/api/posts', posts)

app.get('/api/posts/:id', post)

app.post('/api/session/login', login)

app.get('/api/session/verifytoken/:token', verifyToken)

app.post('/api/session/reg', reg)

app.listen(port, () => {
    log.info(`Application started on port ${port}!`)
})

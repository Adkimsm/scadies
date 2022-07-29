/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { expressjwt as expressJWT } from 'express-jwt'
import terminalLink from 'terminal-link'
import cors from 'cors'
import home from './routes/home'
import config from './utils/config'
import siteInfos from './routes/siteInfos'
import login from './routes/login'
import posts from './routes/posts'
import post from './routes/post'
import reg from './routes/reg'
import verifyToken from './routes/verifyToken'
import deletePost from './routes/deletePost'
import log from './utils/log'
//import version from './routes/version'

const port = config.get('port')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/api', home)

app.get('/api/siteinfos', siteInfos)

app.get('/api/posts', posts)

app.get('/api/posts/:id', post)

app.post('/api/session/login', login)

app.get('/api/session/verifytoken/:token', verifyToken)

app.post('/api/session/reg', reg)

//app.get('/api/ver', version)

app.get(
    '/api/posts/delete/:id',
    expressJWT({ secret: config.get('secret'), algorithms: ['RS512'] }),
    deletePost
)

if (config.get('buildForVercel') === false) {
    app.listen(port, () => {
        const link = terminalLink(
            `http://localhost:${port.toString()}`,
            `http://localhost:${port.toString()}`
        )
        log.info(`Application started at ${link}!`)
    })
}

if (config.get('buildForVercel') === true) {
    module.exports = app
}

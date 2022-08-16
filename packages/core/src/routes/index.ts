import express from 'express'
import { expressjwt as expressJWT } from 'express-jwt'
import home from './home'
import siteInfos from './siteInfos'
import login from './login'
import posts from './posts'
import post from './post'
import reg from './reg'
import verifyToken from './verifyToken'
import deletePost from './deletePost'
import newPost from './newPost'
import config from '../utils/config'

const app = express.Router()

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
    expressJWT({ secret: config.get('publicKey'), algorithms: ['RS512'] }),
    deletePost
)

app.post(
    '/api/posts/new/:id',
    expressJWT({ secret: config.get('publicKey'), algorithms: ['RS512'] }),
    newPost
)

export default app

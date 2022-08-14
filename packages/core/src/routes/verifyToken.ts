import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import log from '../utils/log'
import config from '../utils/config'

const PUBLIC_KEY = config.get('publicKey')

export default function (req: Request, res: Response) {
    log.info('verifyToken is working', '/session/verifytoken')
    const { token } = req.params
    return jwt.verify(
        token,
        PUBLIC_KEY,
        { algorithms: ['RS512'] },
        (err, decoded) =>
            res.json(err ? { ...err, y: false } : { y: true, msg: decoded })
    )
}

import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import log from '../utils/log'
import config from '../utils/config'

const SECRET_KEY = config.get('cryptoSecret')

export default function (req: Request, res: Response) {
    log.info("verifyToken is working", '/session/verifytoken')
    const { token } = req.params
    try {
        const decoded = jwt.verify(token, SECRET_KEY, { algorithms: ['RS512'] });
        return res.json({y: true, msg: decoded})
      } catch(err) {
        return res.json({y: false, msg: err})
      }
}
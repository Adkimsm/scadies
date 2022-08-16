import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../utils/config'

const PUBLIC_KEY = config.get('publicKey')

export default function (req: Request, res: Response) {
    const { token } = req.params
    jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS512'] }, (err, decoded) => {
        res.status(200).json(
            err ? { ...err, y: false } : { y: true, msg: decoded }
        )
    })
}

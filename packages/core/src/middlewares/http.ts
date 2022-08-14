import { Request, Response, NextFunction } from 'express'
import log from '../utils/log'

export const startHTTP = (req: Request, res: Response, next: NextFunction) => {
    log.info(`http request: ${req.method} : ${req.url}`)
    next()
}

export const endHTTP = (req: Request, res: Response) => {
    log.info(`http Response: ${req.url} => ${res.statusCode}`)
}

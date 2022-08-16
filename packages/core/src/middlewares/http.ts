import { Request, Response, NextFunction } from 'express'
import log from '../utils/log'

let date: number

export const startHTTP = (req: Request, res: Response, next: NextFunction) => {
    date = Date.now()
    log.info(`http request: ${req.method} : ${req.url}`, 'http service')
    next()
}

export const endHTTP = (req: Request, res: Response, next: NextFunction) => {
    res.on('close', () => {
        log.info(
            `http Response: ${req.url} => ${res.statusCode} | ${
                Date.now() - date
            } ms`,
            'http service'
        )
    })
    next()
}

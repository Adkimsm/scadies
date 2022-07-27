import { Request, Response } from 'express'
import log from '../utils/log'

export default function (_req: Request, res: Response) {
    log.info('home is working', '/')
    res.send('Application works!')
}

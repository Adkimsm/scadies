import { NextFunction, Request, Response } from 'express'

export default function (_req: Request, res: Response, next: NextFunction) {
    res.status(200).send('Application works!')
}

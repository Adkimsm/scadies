import db from '../utils/db'
import config from '../utils/config'
import { NextFunction, Request, Response } from 'express'

export default async function (
    _req: Request,
    res: Response,
    next: NextFunction
) {
    const dbObj = await (await db).default({ endpoint: config.get('dbUri') }),
        siteData = await dbObj('posts'),
        data = await siteData.list()

    await siteData.close()
    res.status(200).json(data)
}

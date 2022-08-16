import db from '../utils/db'
import config from '../utils/config'
import { NextFunction, Request, Response } from 'express'

export default async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    const postId = req.params.id
    const dbObj = await (await db).default({ endpoint: config.get('dbUri') }),
        siteData = await dbObj('posts'),
        data = await siteData.read(postId)

    await siteData.close()
    res.status(200).json(data)
}

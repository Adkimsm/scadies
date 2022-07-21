import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'
import log from '../utils/log'

export default async function (_req: Request, res: Response) {
    log.info("posts is working", '/api/posts')
    const dbObj = await (await db).default({ endpoint: config.get('dbUri') }),
        siteData = await dbObj('posts'),
        data = await siteData.list()

    await siteData.close()
    return res.json(data)
}

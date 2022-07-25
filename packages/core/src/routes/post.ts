import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'
import log from '../utils/log'

export default async function (req: Request, res: Response) {
    const postId = req.params.id
    log.info("post is working", `/api/posts/${postId}`)
    const dbObj = await (await db).default({ endpoint: config.get('dbUri') }),
        siteData = await dbObj('posts'),
        data = await siteData.read(postId)

    await siteData.close()
    return res.json(data)
}

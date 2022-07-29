import { Response } from 'express'
import { Request } from 'express-jwt'
import log from '../utils/log'
import db from '../utils/db'
import config from '../utils/config'

export default async function (req: Request, res: Response) {
    const auth: any = req.auth
    if (auth.role !== 'admin')
        return res.status(401).json({ y: false, msg: 'permission denied' })

    const id = req.params.id
    log.info('deletePost is working', '/api/posts/delete')

    const dbObj = await (await db).default({ endpoint: config.get('dbUri') }),
        posts = await dbObj('posts'),
        data = await posts.delete(id)

    await posts.close()
    return res.json(data)
}

import { Response } from 'express'
import { Request } from 'express-jwt'
import db from '../utils/db'
import config from '../utils/config'

export default async function (req: Request, res: Response) {
    const auth: any = req.auth
    if (auth.role !== 'admin')
        return res.status(401).json({ y: false, msg: 'permission denied' })

    const id = req.params.id

    const dbObj = await (await db).default({ endpoint: config.get('dbUri') }),
        posts = await dbObj('posts'),
        data = await posts.delete(id)

    await posts.close()
    res.status(200).json(data)
}

import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'

export default async function (_req: Request, res: Response) {
    const dbObj = await (await db).default({ endpoint: config.get('dbUri') }),
        siteData = await dbObj('data'),
        data = await siteData.list()

    await siteData.close()
    return res.json(data)
}

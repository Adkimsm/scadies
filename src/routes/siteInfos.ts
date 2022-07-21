import dbPromise from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'

export default async function (_req: Request, res: Response) {
    const db = await dbPromise
    const dbObj = await db.default({ endpoint: config.get('dbUri') }),
        siteData = await dbObj('data'),
        data = await siteData.list()

    await siteData.close()
    return await res.json(data)
}

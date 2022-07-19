import db from '../utils/db.cjs'
import config from '../utils/config.cjs'

export default async function (_req, res) {
    const dbObj = await db({ endpoint: config.get('dbUri') }),
        siteData = await dbObj('data'),
        data = await siteData.list()

    await siteData.close()
    return await res.json(data)
}
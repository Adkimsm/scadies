import db from '../utils/db.js'
import config from '../utils/config.js'

export default async function (_req, res) {
    const dbObj = await db.default({ endpoint: config.get('dbUri') }),
        siteData = await dbObj('data'),
        data = await siteData.list()

    await siteData.close()
    return await res.json(data)
}

import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'
import log from '../utils/log'

export default async function (req: Request, res: Response) {
    log.info('verifyUuid is working', '/session/verifyuuid')
    const dbObj = await (
            await db
        ).default({
            endpoint: config.get('dbUri'),
            dbName: config.get('dbName'),
        }),
        users = await dbObj('users'),
        data = await users.list(),
        reqUsrId = req.params.id

    await users.close()

    console.log(data)

    for (const userNum in data) {
        const user = data[userNum]
        console.log(user)
        if (user) {
            if (user.info.id == reqUsrId) {
                    return res.json({ y: true, ...user.info })
            } else return res.json({ y: false })
        } else continue
    }
}

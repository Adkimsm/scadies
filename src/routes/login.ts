import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'
import log from '../utils/log'
import { encrypt } from '../utils/crypto'

export default async function (req: Request, res: Response) {
    log.info('login is working', '/session/login')
    const dbObj = await (
            await db
        ).default({
            endpoint: config.get('dbUri'),
            dbName: config.get('dbName'),
        }),
        users = await dbObj('users'),
        data = await users.list(),
        reqUsrName = req.body.usr,
        reqUsrPwd = encrypt(String(req.body.pwd))

    await users.close()

    console.log(req.body)

    console.log(data)

    for (const userNum in data) {
        const user = data[userNum]
        console.log(user)
        if (user) {
            if (user.name == reqUsrName) {
                if (user.pwd == reqUsrPwd)
                    return res.json({ ok: true, ...user.info })
                else return res.json({ ok: false, pwd: false })
            } else return res.json({ ok: false, name: false })
        } else continue
    }
}

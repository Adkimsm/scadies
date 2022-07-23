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
        reqUsrName = encrypt(req.body.usr),
        reqUsrPwd = encrypt(req.body.pwd)

    await users.close()

    for (const user of data) {
        if (typeof user.value === 'object') {
            if (user.value.name === reqUsrName) {
                if (user.value.pwd === reqUsrPwd)
                    return res.json({ ok: true, ...user.value.info })
                else return res.json({ ok: false, pwd: false })
            } else return res.json({ ok: false, name: false })
        } else continue
    }

    return res.json({ ok: false, name: false, pwd: false })
}

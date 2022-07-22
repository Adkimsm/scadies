import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'
import log from '../utils/log'

export default async function (req: Request, res: Response) {
    log.info("login is working", '/session/login')
    const dbObj = await (await db).default({ endpoint: config.get('dbUri'), dbName: config.get('dbName') }),
        users = await dbObj('users'),
        data = await users.list(),
        reqUsrName = req.body.usr,
        reqUsrPwd = req.body.pwd

    await users.close()

    for (const user of data) {
        if ((typeof user.key === "string") && (typeof user.value === "string")) {
            if (user.key === reqUsrName) {
                if (user.value === reqUsrPwd) res.json({ ok: true })
                else res.json({ ok: false, pwd: false })
            } else res.json({ ok: false, name: false })
        } else continue
    }

    return res.json({ ok: false, name: false, pwd: false })
}

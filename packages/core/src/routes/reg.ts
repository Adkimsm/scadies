import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'
import { encrypt } from '../utils/crypto'
import { v4 } from 'uuid'

export default async function (req: Request, res: Response) {
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

    for (const userNum in data) {
        const user = data[userNum]
        if (user) {
            if (user.name == reqUsrName) {
                res.status(200).json({ y: false, msg: 'user already exists' })
            }
        } else continue
    }

    await users.write(Object.keys(data).length + 1, {
        name: reqUsrName,
        pwd: reqUsrPwd,
        info: {
            id: v4(),
            role: 'admin',
        },
    })

    res.status(200).json({ y: true, msg: 'user creates successful' })
}

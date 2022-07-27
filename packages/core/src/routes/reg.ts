import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'
import log from '../utils/log'
import { encrypt } from '../utils/crypto'
import { v4 } from 'uuid'

export default async function (req: Request, res: Response) {
    log.info('reg is working', '/session/reg')
    const dbObj = await (
            await db
        ).default({
            endpoint: config.get('dbUri'),
            dbName: config.get('dbName'),
        }),
        users = await dbObj('users'),
        data = await users.list(),
        reqUsrName = req.body.usr,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        reqUsrPwd = encrypt(String(req.body.pwd))

    console.log(req.body)

    console.log(data)

    for (const userNum in data) {
        const user = data[userNum]
        console.log(user)
        if (user) {
            if (user.name == reqUsrName) {
                return res.json({ y: false, msg: 'user already exists' })
            }
        } else continue
    }

    console.log(Object.keys(data).length)


    await users.write(Object.keys(data).length + 1, {
        name: reqUsrName,
        pwd: reqUsrPwd,
        info: {
            id: v4(),
            role: "admin"
        },
    })


    return res.json({ y: true, msg: 'user creates successful' })
}

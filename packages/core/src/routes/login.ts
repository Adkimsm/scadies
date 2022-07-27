import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import log from '../utils/log'
import { encrypt } from '../utils/crypto'

const SECRET_KEY = config.get('secret')

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

    let nameBool = false
    const pwdBool = false

    for (const userNum in data) {
        const user = data[userNum]
        console.log(user)
        if (user) {
            if (user.name == reqUsrName) {
                if (user.pwd == reqUsrPwd) {
                    const token = jwt.sign(
                        {
                            _id: user.info.id,
                            role: user.info.role,
                        },
                        SECRET_KEY,
                        {
                            algorithm: 'RS512',
                            expiresIn: '7d',
                        }
                    )
                    return res.json({
                        y: true,
                        token: token,
                    })
                }
            } else nameBool = true
        } else continue
    }

    if (!nameBool) {
        return res.json({
            y: false,
            name: false
        })
    }

    if (!pwdBool) {
        return res.json({
            y: false,
            pwd: false
        })
    }
    
}

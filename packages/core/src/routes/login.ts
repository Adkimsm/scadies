import db from '../utils/db'
import config from '../utils/config'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { encrypt } from '../utils/crypto'

const SECRET_KEY = config.get('secret')

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

    await users.close()

    let nameBool = false
    const pwdBool = false

    for (const userNum in data) {
        const user = data[userNum]
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
                            expiresIn: '6h',
                        }
                    )
                    res.status(200).json({
                        y: true,
                        token: token,
                    })
                }
            } else nameBool = true
        } else continue
    }

    if (!nameBool) {
        res.status(200).json({
            y: false,
            name: false,
        })
    }

    if (!pwdBool) {
        res.status(200).json({
            y: false,
            pwd: false,
        })
    }
}

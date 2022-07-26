import { Request, Response } from 'express'
import log from '../utils/log'
import fs from 'fs'

const {version} = JSON.parse(fs.readFileSync('../../package.json', { encoding: 'utf8' }))

export default function (_req: Request, res: Response) {
    log.info('version is working', '/ver')
    res.json({y: true, v: version.toString()})
}

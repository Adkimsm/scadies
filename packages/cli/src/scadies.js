#!/usr/bin/env node

const chalk = require('chalk')
const cli = require('cac')()
const prompts = require('prompts')
const gitdown = require('git-down-repo')
const copydir = require('node-copydir')
const rimraf = require('rimraf')
const pkg = require('../package.json')

const gitdownFunc = gitdown()

console.log(`${chalk.blue('Scadies-CLI')} v${chalk.green(pkg.version)}`)

cli.command(
    'create [type]',
    'Create a theme or plugin with default template'
).action(async type => {
    if (!type) {
        const response = await prompts({
            type: 'select',
            name: 'todo',
            message: 'What do you want to do?',
            choices: [
                {
                    title: 'Create a theme with default template',
                    value: 'theme',
                },
                {
                    // wait for core supportting
                    title: 'Create a plugin with default template',
                    value: 'plugin',
                    description: 'not available yet',
                    disabled: true,
                },
            ],
        })

        type = response.todo
    }

    switch (type) {
        case 'theme':
            gitdownFunc([
                'https://github.com/kysolva/scadies/blob/main/packages/theme-default',
            ])
            copydir(`scadies/packages/theme-default`, `default`, () =>
                rimraf(`scadies`, {}, () => {})
            )
            break

        default:
            break
    }
})

cli.parse()

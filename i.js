#! /usr/bin/env node

const { program } = require('commander')
const {config, prService} = require('./bin/tinygit')

program
    .command('config')
    .description('Add git access token.')
    .option('-github, -github [value]')
    .option('-gitlab, -gitlab [value]')
    .action(config)

program
    .command('pr')
    .description('Make Pull request.')
    .option('-b, -branch [value]')
    .option('-t, -title [value]')
   // .option('-d, -description [value]')
    .action(prService)


program.parse()




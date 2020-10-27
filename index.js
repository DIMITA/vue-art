#!/usr/bin/env node

const prog = require('caporal');
const fs = require('fs')
const path = require('path')
const ncp = require('ncp').ncp

ncp.limit = 16

prog
    .version('1.0.0')

.command('make', 'Generate some tempate')

.argument('<type>', 'type of template that you want to generate', /^store|page|component$/)
    .argument('[name]', 'Environment to deploy on')

.option('--path <lines>', 'Skip test')

.action(function(args, options, logger) {
    if (args.type === 'page' || args.type === "component") {

        const entryPath = path.resolve(__dirname, 'templates', args.type + '.txt')
        const entryContent = fs.readFileSync(entryPath)
        fs.writeFile(options.path + '/' + args.name + '.vue' || './src/' + args.type + 's/' + args.name + '.vue', entryContent, (err) => { logger.error(err) })

    } else {

        ncp(path.resolve(__dirname, 'templates', args.type), options.path + '/' + args.name || path.resolve('./src', args.type, args.name), function(err) {
            err ? logger.error(err) : logger.info(`the ${args.type} ${args.name} was generated`)

        })

    }



});

prog.parse(process.argv);
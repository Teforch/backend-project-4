#!/usr/bin/env node
import { Command } from 'commander';
import pageLoader from '../index.js';
import debug from 'debug';
const log = debug('page-loader');

const program = new Command();

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .arguments('<url>')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .action((url, options) => {
    log(options.output);
    pageLoader(url, options.output);
  });

program.parse(process.argv);

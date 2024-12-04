#!/usr/bin/env node
import { Command } from 'commander';
import PageLoader from '../index.js';

const program = new Command();

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .arguments('<url>')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .action((url, options) => {
    const pageLoader = new PageLoader(url, options.output);
    pageLoader.load();
  });

program.parse(process.argv);

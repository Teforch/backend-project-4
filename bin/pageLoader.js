#!/usr/bin/env node
import { Command } from 'commander';
import pageLoader from '../index.js';

const program = new Command();

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .arguments('<url>')
  .option('-o, --output [dir]', 'output directory (default is current)')
  .action((url) => {
    pageLoader(url)
      .then(() => process.exit(0))
      .catch(() => console.error('Error'));
  });

program.parse(process.argv);

#!/usr/bin/env node
import { Command } from 'commander';
import pageLoader from '../index.js';
import getErrorMessage from '../src/errors.js';

const program = new Command();

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .arguments('<url>')
  .option('-o, --output [dir]', 'output directory (default is current)')
  .action(async (url, options) => {
    console.log(options);
    try {
      await pageLoader(url, options.output);
      process.exit(0);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  });

program.parse(process.argv);

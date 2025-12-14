#!/usr/bin/env bun

import { Command } from 'commander';
import { version } from '../package.json';
import { devCommand } from './commands/dev';
import { buildCommand } from './commands/build';
import { testCommand } from './commands/test';
import { initCommand } from './commands/init';
import { doctorCommand } from './commands/doctor';
import { cleanCommand } from './commands/clean';
import { infoCommand } from './commands/info';
import { graphCommand } from './commands/graph';
import { shipCommand } from './commands/ship';
import { welcomeCommand } from './commands/welcome';
import { printWelcome } from './utils/ascii-art';
import pc from 'picocolors';

const program = new Command();

program
  .name('eat')
  .description('🥟 Eat - The Bun Control Plane')
  .version(version);

// Core commands
program
  .command('init')
  .description('Initialize Eat in your project')
  .action(initCommand);

program
  .command('dev')
  .description('Start development workflow')
  .option('--local', 'Use local environment')
  .action(devCommand);

program
  .command('build')
  .description('Build project')
  .option('--prod', 'Production build')
  .option('--affected', 'Build only affected packages')
  .action(buildCommand);

program
  .command('test')
  .description('Run tests')
  .option('--ci', 'CI mode')
  .option('--watch', 'Watch mode')
  .action(testCommand);

program
  .command('ship')
  .description('Deploy workflow')
  .option('--env <environment>', 'Target environment')
  .action(shipCommand);

// Utility commands
program
  .command('doctor')
  .description('Diagnose project health')
  .action(doctorCommand);

program
  .command('clean')
  .description('Clean workspace')
  .action(cleanCommand);

program
  .command('info <workflow>')
  .description('Show workflow execution plan')
  .action(infoCommand);

program
  .command('graph')
  .description('Show dependency graph')
  .action(graphCommand);

program
  .command('welcome')
  .description('Show welcome screen')
  .action(welcomeCommand);

// Show welcome screen if no command provided
if (process.argv.length === 2) {
  printWelcome();
  process.exit(0);
}

// Error handling
program.exitOverride();

try {
  await program.parseAsync(process.argv);
} catch (error: any) {
  if (error.code === 'commander.help') {
    process.exit(0);
  }
  console.error(pc.red('❌ Error:'), error.message);
  process.exit(1);
}

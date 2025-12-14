import pc from 'picocolors';

// Custom cream color function (using white as closest to cream in terminal)
const cream = (text: string) => `\x1b[38;5;230m${text}\x1b[0m`;

// Clean blocky EAT logo in cream color (Claude Code style)
export const EAT_LOGO = cream(`
  ███████╗     █████╗     ████████╗
  ██╔════╝    ██╔══██╗    ╚══██╔══╝
  █████╗      ███████║       ██║   
  ██╔══╝      ██╔══██║       ██║   
  ███████╗    ██║  ██║       ██║   
  ╚══════╝    ╚═╝  ╚═╝       ╚═╝   
`);

// Alternative with border (like your reference image)
export const EAT_LOGO_BORDERED = `
${pc.yellow('  .===============================================.')}
${pc.yellow('  |')}${cream('  ███████╗     █████╗     ████████╗        ')}${pc.yellow('|')}
${pc.yellow('  |')}${cream('  ██╔════╝    ██╔══██╗    ╚══██╔══╝        ')}${pc.yellow('|')}
${pc.yellow('  |')}${cream('  █████╗      ███████║       ██║           ')}${pc.yellow('|')}
${pc.yellow('  |')}${cream('  ██╔══╝      ██╔══██║       ██║           ')}${pc.yellow('|')}
${pc.yellow('  |')}${cream('  ███████╗    ██║  ██║       ██║           ')}${pc.yellow('|')}
${pc.yellow('  |')}${cream('  ╚══════╝    ╚═╝  ╚═╝       ╚═╝           ')}${pc.yellow('|')}
${pc.yellow("  '==============================================='")}
`;

export const DUMPLING = '🥟';

export function printWelcome() {
  console.clear();
  console.log('');
  console.log(EAT_LOGO);
  console.log('');
  console.log(pc.dim('  The Bun Control Plane'));
  console.log('');
  console.log(pc.gray('  Tips for getting started:'));
  console.log(pc.gray("  1. Run 'eat init' to initialize your project."));
  console.log(pc.gray("  2. Use 'eat dev' to start development workflow."));
  console.log(pc.gray("  3. Try 'eat info <workflow>' to see execution plans."));
  console.log(pc.gray("  4. Run 'eat doctor' to check project health."));
  console.log('');
  console.log(pc.dim('  ─────────────────────────────────────────────────'));
  console.log('');
  console.log(pc.cyan('  > ') + pc.dim("Type 'eat --help' for all commands"));
  console.log('');
  console.log(
    pc.dim('  eat-cli-v0.1') +
    ' '.repeat(20) +
    pc.dim('bun-native (see /docs)') +
    ' '.repeat(20) +
    pc.dim('eat-v0.1.0')
  );
  console.log('');
}

export function printBanner() {
  console.log(pc.cyan('  🥟 ') + pc.bold('Eat') + pc.dim(' - The Bun Control Plane'));
  console.log('');
}

export function printSuccess(message: string) {
  console.log(pc.green('  ✓ ') + message);
}

export function printError(message: string) {
  console.log(pc.red('  ✗ ') + message);
}

export function printInfo(message: string) {
  console.log(pc.cyan('  ℹ ') + message);
}

export function printWarning(message: string) {
  console.log(pc.yellow('  ⚠ ') + message);
}

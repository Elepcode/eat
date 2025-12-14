import pc from 'picocolors';
import { theme } from '../utils/theme';

export async function doctorCommand() {
  console.log(`\n${theme.cream('┌─')} Running Eat Doctor...`);
  console.log(theme.cream('│'));

  const checks = [
    { name: 'Bun installation', fn: checkBun },
    { name: 'eat.config.ts', fn: checkConfig },
    { name: 'package.json', fn: checkPackageJson },
  ];

  let allPassed = true;

  for (const check of checks) {
    try {
      const result = await check.fn();
      if (result.success) {
        console.log(theme.success(`${check.name} ${pc.dim(result.message || '')}`));
      } else {
        console.log(theme.error(`${check.name} ${pc.dim(result.message || '')}`));
        allPassed = false;
      }
    } catch (error: any) {
      console.log(theme.error(`${check.name} ${pc.dim(error.message)}`));
      allPassed = false;
    }
  }

  console.log();

  if (allPassed) {
    console.log(theme.footer('All checks passed'));
  } else {
    console.log(theme.footer(pc.yellow('Some checks failed. Please review above')));
  }
}

async function checkBun() {
  try {
    const proc = Bun.spawn(['bun', '--version']);
    const version = await new Response(proc.stdout).text();
    return { success: true, message: `v${version.trim()}` };
  } catch {
    return { success: false, message: 'Bun not found' };
  }
}

async function checkConfig() {
  const { existsSync } = await import('fs');
  const { join } = await import('path');

  const configPath = join(process.cwd(), 'eat.config.ts');

  if (existsSync(configPath)) {
    return { success: true, message: 'Found' };
  }

  return { success: false, message: 'Not found. Run: eat init' };
}

async function checkPackageJson() {
  const { existsSync } = await import('fs');
  const { join } = await import('path');

  const pkgPath = join(process.cwd(), 'package.json');

  if (existsSync(pkgPath)) {
    return { success: true, message: 'Found' };
  }

  return { success: false, message: 'Not found' };
}

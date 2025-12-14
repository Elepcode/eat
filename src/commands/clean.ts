import pc from 'picocolors';
import ora from 'ora';

export async function cleanCommand() {
  const spinner = ora('Cleaning workspace...').start();

  try {
    // Clean common build artifacts
    const targets = [
      'node_modules',
      'dist',
      'build',
      '.turbo',
      '.next',
      '.eat-cache'
    ];

    const { existsSync, rmSync } = await import('fs');
    const { join } = await import('path');

    let cleaned = 0;

    for (const target of targets) {
      const targetPath = join(process.cwd(), target);
      if (existsSync(targetPath)) {
        rmSync(targetPath, { recursive: true, force: true });
        cleaned++;
      }
    }

    spinner.succeed(`Cleaned ${cleaned} directories`);
    console.log(pc.green('\n✅ Workspace cleaned!\n'));

  } catch (error: any) {
    spinner.fail('Failed to clean workspace');
    console.error(pc.red('Error:'), error.message);
    process.exit(1);
  }
}

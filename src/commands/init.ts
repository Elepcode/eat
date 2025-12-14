import { writeFileSync } from 'fs';
import { join } from 'path';
import { getDefaultConfig } from '../config/loader';
import pc from 'picocolors';
import ora from 'ora';

export async function initCommand() {
  const spinner = ora('Initializing Eat...').start();

  try {
    const cwd = process.cwd();
    const configPath = join(cwd, 'eat.config.ts');

    // Generate config file
    const config = getDefaultConfig();
    const configContent = generateConfigFile(config);

    writeFileSync(configPath, configContent, 'utf-8');

    spinner.succeed('Created eat.config.ts');

    console.log(pc.green('\n✅ Eat initialized successfully!\n'));
    console.log(pc.cyan('Next steps:\n'));
    console.log(`  1. Review ${pc.yellow('eat.config.ts')}`);
    console.log(`  2. Run ${pc.yellow('eat dev')} to start development`);
    console.log(`  3. Run ${pc.yellow('eat info dev')} to see what will execute\n`);

  } catch (error: any) {
    spinner.fail('Failed to initialize Eat');
    console.error(pc.red('Error:'), error.message);
    process.exit(1);
  }
}

function generateConfigFile(config: any): string {
  return `import { defineConfig } from '@eatjs/cli';

export default defineConfig({
  name: 'my-project',
  
  workflows: {
    // Development workflow
    dev: [
      'install',
      'dev:start'
    ],
    
    // Build workflow
    build: [
      'typecheck',
      'build:bundle'
    ],
    
    // Test workflow
    test: [
      'test:run'
    ],
    
    // Ship workflow (deploy)
    ship: [
      'typecheck',
      'lint',
      'test',
      'build',
      'deploy'
    ]
  },
  
  // Workspace configuration for monorepos
  workspace: {
    packages: ['packages/*'],
    strategy: 'affected'
  },
  
  // Environment configurations
  environments: {
    dev: {
      env: {
        NODE_ENV: 'development'
      }
    },
    prod: {
      env: {
        NODE_ENV: 'production'
      },
      bunFlags: ['--minify']
    }
  }
});
`;
}

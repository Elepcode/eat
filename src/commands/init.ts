import { writeFileSync } from 'fs';
import { join } from 'path';
import { getDefaultConfig } from '../config/loader';
import pc from 'picocolors';
import { theme, Progress } from '../utils/theme';

export async function initCommand() {
  const progress = new Progress('Initializing Eat...');
  progress.start();

  try {
    const cwd = process.cwd();
    const configPath = join(cwd, 'eat.config.ts');

    // Generate config file
    const config = getDefaultConfig();
    const configContent = generateConfigFile(config);

    writeFileSync(configPath, configContent, 'utf-8');

    progress.succeed('Created eat.config.ts');

    console.log(theme.footer('Eat initialized successfully'));
    console.log(theme.cream('Next steps:'));
    console.log();
    console.log(`  1. Review ${theme.cream('eat.config.ts')}`);
    console.log(`  2. Run ${theme.cream('eat dev')} to start development`);
    console.log(`  3. Run ${theme.cream('eat info dev')} to see what will execute`);
    console.log();

  } catch (error: any) {
    progress.fail('Failed to initialize Eat');
    console.error(pc.red('Error:'), error.message);
    process.exit(1);
  }
}

function generateConfigFile(config: any): string {
  return `export default {
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
};
`;
}

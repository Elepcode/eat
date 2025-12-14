import { existsSync } from 'fs';
import { join } from 'path';
import type { EatConfig } from './types';

const CONFIG_FILES = [
  'eat.config.ts',
  'eat.config.js',
  'eat.config.mjs',
];

export async function loadConfig(cwd: string = process.cwd()): Promise<EatConfig | null> {
  for (const configFile of CONFIG_FILES) {
    const configPath = join(cwd, configFile);

    if (existsSync(configPath)) {
      try {
        // Use Bun's native import
        const module = await import(configPath);
        const config = module.default || module;

        return validateConfig(config);
      } catch (error) {
        throw new Error(`Failed to load config from ${configFile}: ${error}`);
      }
    }
  }

  return null;
}

function validateConfig(config: any): EatConfig {
  if (!config || typeof config !== 'object') {
    throw new Error('Config must be an object');
  }

  if (!config.workflows || typeof config.workflows !== 'object') {
    throw new Error('Config must have a "workflows" object');
  }

  return config as EatConfig;
}

export function getDefaultConfig(): EatConfig {
  return {
    workflows: {
      dev: [
        'install',
        'dev:start'
      ],
      build: [
        'typecheck',
        'build:bundle'
      ],
      test: [
        'test:run'
      ],
      ship: [
        'typecheck',
        'lint',
        'test',
        'build',
        'deploy'
      ]
    },
    workspace: {
      packages: ['packages/*'],
      strategy: 'affected'
    },
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
}

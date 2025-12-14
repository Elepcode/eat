import { defineConfig } from '../src/config/types';

export default defineConfig({
  name: 'eat-example',

  workflows: {
    // Development workflow
    dev: [
      { name: 'install', command: 'bun install' },
      { name: 'typecheck', command: 'bun run typecheck' },
      { name: 'start', command: 'bun run dev' }
    ],

    // Build workflow
    build: [
      { name: 'typecheck', command: 'bun run typecheck' },
      { name: 'bundle', command: 'bun run build' }
    ],

    // Test workflow
    test: [
      { name: 'typecheck', command: 'bun run typecheck' },
      { name: 'run-tests', command: 'bun test' }
    ],

    // Ship workflow
    ship: [
      { name: 'typecheck', command: 'bun run typecheck' },
      { name: 'test', command: 'bun test' },
      { name: 'build', command: 'bun run build' },
      { name: 'deploy', command: 'echo "Deploying..."' }
    ]
  },

  environments: {
    dev: {
      env: {
        NODE_ENV: 'development',
        LOG_LEVEL: 'debug'
      }
    },
    prod: {
      env: {
        NODE_ENV: 'production',
        LOG_LEVEL: 'info'
      },
      bunFlags: ['--minify']
    }
  }
});

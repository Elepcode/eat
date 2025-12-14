# 🥟 Eat - Quick Start Guide

## What is Eat?

**Eat is the control plane for Bun projects.**

Instead of managing 20 different scripts, you run:
- `eat dev` - Start development
- `eat build` - Build your project
- `eat test` - Run tests
- `eat ship` - Deploy

**Bun is the engine. Eat is the driver.**

---

## Installation (Future)

```bash
bun add -g @eatjs/cli
```

**Note**: Not yet published to npm. For now, use from source.

---

## Quick Start

### 1. Initialize Eat in Your Project

```bash
cd your-project
eat init
```

This creates `eat.config.ts`:

```typescript
import { defineConfig } from '@eatjs/cli';

export default defineConfig({
  workflows: {
    dev: ['install', 'dev:start'],
    build: ['typecheck', 'build:bundle'],
    test: ['test:run'],
    ship: ['typecheck', 'lint', 'test', 'build', 'deploy']
  }
});
```

### 2. Run Your Workflows

```bash
# Start development
eat dev

# Build for production
eat build --prod

# Run tests
eat test

# Deploy
eat ship
```

---

## Core Concepts

### Workflows

Workflows are sequences of steps:

```typescript
workflows: {
  dev: [
    'install',
    'db:start',
    'generate',
    'serve'
  ]
}
```

Run with: `eat dev`

### Environments

Define environment-specific settings:

```typescript
environments: {
  dev: {
    env: { NODE_ENV: 'development' }
  },
  prod: {
    env: { NODE_ENV: 'production' },
    bunFlags: ['--minify']
  }
}
```

Use with: `eat build --prod`

### Advanced Workflows

Use objects for more control:

```typescript
workflows: {
  ship: [
    { 
      name: 'typecheck', 
      command: 'bun run typecheck' 
    },
    { 
      name: 'test', 
      command: 'bun test',
      env: { CI: 'true' }
    },
    { 
      name: 'build', 
      command: 'bun run build',
      env: { NODE_ENV: 'production' }
    }
  ]
}
```

---

## Useful Commands

### See What Will Run

```bash
eat info dev
```

Output:
```
📋 Workflow: dev

Execution plan:

├─ install
   → bun install

├─ typecheck
   → bun run typecheck

└─ start
   → bun run dev
```

### Check Project Health

```bash
eat doctor
```

Output:
```
🏥 Running Eat Doctor...

✓ Bun installation v1.0.0
✓ eat.config.ts Found
✓ package.json Found

✅ All checks passed!
```

### Clean Workspace

```bash
eat clean
```

Removes:
- `node_modules`
- `dist`
- `build`
- `.turbo`
- `.next`
- `.eat-cache`

---

## Example Project

See the `example/` directory for a working demo:

```bash
cd example
bun install
eat info dev
eat dev
```

---

## Configuration Reference

### Full `eat.config.ts` Example

```typescript
import { defineConfig } from '@eatjs/cli';

export default defineConfig({
  // Project name
  name: 'my-project',
  
  // Workflow definitions
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
  
  // Monorepo configuration
  workspace: {
    packages: ['packages/*'],
    strategy: 'affected'  // Coming in v0.2
  },
  
  // Environment configurations
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
  },
  
  // Bun-specific settings
  bun: {
    version: '>=1.0.0',
    flags: []
  }
});
```

---

## Common Patterns

### Database Migrations

```typescript
workflows: {
  dev: [
    'install',
    'db:migrate',
    'db:seed',
    'dev:start'
  ]
}
```

### Code Generation

```typescript
workflows: {
  dev: [
    'install',
    'generate:types',
    'generate:client',
    'dev:start'
  ]
}
```

### Full CI/CD Pipeline

```typescript
workflows: {
  ci: [
    'install',
    'typecheck',
    'lint',
    'test',
    'build'
  ],
  deploy: [
    'build',
    'docker:build',
    'docker:push',
    'k8s:apply'
  ]
}
```

---

## Troubleshooting

### "No eat.config.ts found"

Run `eat init` to create one.

### "Workflow not found"

Check your `eat.config.ts` has the workflow defined:

```typescript
workflows: {
  dev: ['install', 'dev:start']  // ← Must exist
}
```

### "Command failed"

Run `eat info <workflow>` to see what will execute, then debug the failing step.

---

## What's Next?

### v0.2 - Monorepo Support
- Workspace detection
- Dependency graph
- Affected-only builds
- Parallel execution

### v0.3 - Intelligence
- Smart caching
- Better error messages
- Performance insights

### v1.0 - Production Ready
- Stable API
- Plugin system
- Full documentation

---

## Resources

- **Documentation**: See `docs/` folder
- **Examples**: See `example/` folder
- **Architecture**: `docs/ARCHITECTURE.md`
- **Contributing**: `CONTRIBUTING.md`

---

## Philosophy

> "Bun makes things fast. Eat makes them make sense."

Eat exists because:
1. Speed without structure is chaos
2. Tools need opinions to scale
3. Teams need consistency
4. Bun deserves a product layer

---

## Get Help

- 🐛 [Report Issues](https://github.com/yourorg/eat/issues)
- 💬 [Discussions](https://github.com/yourorg/eat/discussions)
- 📧 Email: hello@eatjs.dev (coming soon)

---

**Happy Eating! 🥟**

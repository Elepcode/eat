# 🥟 Eat v0.1.0 - Installation & Usage Guide

## Installation Methods

### Method 1: Global Installation (Recommended)

Install globally directly from npm:

```bash
bun add -g eat-cli
```

Then use anywhere:
```bash
eat
eat init
eat dev
```

### Method 2: Local Development (Current)

For now, link it locally:

```bash
cd C:\Users\vinod\.gemini\antigravity\scratch\eat
bun link
```

Then use `eat` command anywhere:
```bash
cd your-project
eat init
eat dev
```

### Method 3: npx (After Publishing)

Run without installing:
```bash
bunx @eatjs/cli init
bunx @eatjs/cli dev
```

---

## Quick Start

### 1. Initialize Your Project

```bash
cd your-project
eat init
```

This creates `eat.config.ts` with default workflows.

### 2. Run Development

```bash
eat dev
```

### 3. Build for Production

```bash
eat build --prod
```

### 4. Run Tests

```bash
eat test
```

### 5. Deploy

```bash
eat ship
```

---

## All Available Commands

```bash
eat                    # Show welcome screen
eat init               # Initialize Eat in project
eat dev                # Run development workflow
eat build              # Build project
eat build --prod       # Production build
eat test               # Run tests
eat test --ci          # CI mode
eat ship               # Deploy
eat ship --env prod    # Deploy to specific environment
eat doctor             # Check project health
eat clean              # Clean workspace
eat info <workflow>    # Show execution plan
eat graph              # Show dependency graph (v0.2)
eat welcome            # Show welcome screen
eat --help             # Show help
eat --version          # Show version
```

---

## Configuration

### Basic eat.config.ts

```typescript
import { defineConfig } from '@eatjs/cli';

export default defineConfig({
  workflows: {
    dev: ['install', 'dev:start'],
    build: ['typecheck', 'build:bundle'],
    test: ['test:run'],
    ship: ['typecheck', 'test', 'build', 'deploy']
  }
});
```

### Advanced Configuration

```typescript
import { defineConfig } from '@eatjs/cli';

export default defineConfig({
  name: 'my-project',
  
  workflows: {
    dev: [
      { name: 'install', command: 'bun install' },
      { name: 'db:migrate', command: 'bun run db:migrate' },
      { name: 'serve', command: 'bun run dev' }
    ],
    
    build: [
      { name: 'typecheck', command: 'bun run typecheck' },
      { name: 'bundle', command: 'bun run build', env: { NODE_ENV: 'production' } }
    ]
  },
  
  environments: {
    dev: {
      env: { NODE_ENV: 'development', LOG_LEVEL: 'debug' }
    },
    prod: {
      env: { NODE_ENV: 'production', LOG_LEVEL: 'info' },
      bunFlags: ['--minify']
    }
  }
});
```

---

## What's Included in v0.1.0

### ✅ Core Features
- Single command entry point
- Workflow orchestration
- Environment awareness (dev/prod/ci)
- Beautiful CLI with cream-colored logo
- TypeScript-based configuration
- Bun-native execution
- Context-aware error messages
- Execution plan visualization

### ✅ Commands (10 Total)
1. `eat` - Welcome screen
2. `eat init` - Initialize project
3. `eat dev` - Development workflow
4. `eat build` - Build workflow
5. `eat test` - Test workflow
6. `eat ship` - Deployment workflow
7. `eat doctor` - Health diagnostics
8. `eat clean` - Clean workspace
9. `eat info` - Show execution plan
10. `eat welcome` - Show welcome

### ✅ Documentation
- Complete README
- Quick start guide
- Architecture docs
- API reference
- Examples

---

## Publishing to npm (For Maintainers)

### 1. Build

```bash
bun run build
```

### 2. Test

```bash
bun test
```

### 3. Publish

```bash
npm publish --access public
```

---

## Uninstallation

```bash
bun remove -g @eatjs/cli
```

---

## Troubleshooting

### Command not found

If `eat` command is not found after installation:

```bash
# Check if installed
bun pm ls -g

# Reinstall
bun add -g @eatjs/cli
```

### Permission errors

On Unix systems, you might need:

```bash
sudo bun add -g @eatjs/cli
```

---

## Support

- 📚 [Documentation](https://github.com/yourorg/eat)
- 🐛 [Report Issues](https://github.com/yourorg/eat/issues)
- 💬 [Discussions](https://github.com/yourorg/eat/discussions)

---

**Eat v0.1.0 - The Bun Control Plane** 🥟

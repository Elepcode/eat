# Eat Architecture

## Overview

Eat is built as a **control plane** that orchestrates Bun, not a replacement for it.

```
Developer
   ↓
 Eat CLI (decides & orchestrates)
   ↓
 Bun (executes fast)
   ↓
 OS / Network / FS
```

## Core Components

### 1. CLI Layer (`src/cli.ts`)

- **Purpose**: User-facing command interface
- **Technology**: Commander.js
- **Commands**: `init`, `dev`, `build`, `test`, `ship`, `doctor`, `clean`, `info`, `graph`

### 2. Configuration System (`src/config/`)

- **`types.ts`**: TypeScript definitions for `eat.config.ts`
- **`loader.ts`**: Config file discovery and loading using Bun's native import

### 3. Workflow Engine (`src/engine/`)

- **`executor.ts`**: Core orchestration logic
  - Step normalization
  - Sequential/parallel execution
  - Bun command wrapping
  - Error handling with context
  - Execution planning (`explain()`)

### 4. Commands (`src/commands/`)

Each command is a thin wrapper that:
1. Loads config
2. Validates workflow exists
3. Prepares environment
4. Delegates to `WorkflowExecutor`

## Key Design Decisions

### ✅ What Eat Does

1. **Workflow Orchestration**: Defines and executes multi-step workflows
2. **Environment Management**: Handles dev/prod/ci environments
3. **Bun Integration**: Wraps Bun commands with context
4. **Developer Experience**: Rich feedback, spinners, colored output
5. **Configuration**: Single source of truth (`eat.config.ts`)

### ❌ What Eat Does NOT Do

1. **Replace Bun**: Always delegates execution to Bun
2. **Implement Runtime**: Uses Bun's runtime
3. **Bundle Code**: Uses Bun's bundler
4. **Manage Packages**: Uses Bun's package manager

## Data Flow

```
User runs: eat dev
    ↓
CLI parses command
    ↓
Load eat.config.ts
    ↓
Get 'dev' workflow definition
    ↓
WorkflowExecutor normalizes steps
    ↓
For each step:
    - Show spinner
    - Run Bun command
    - Handle errors
    - Update spinner
    ↓
Success or failure
```

## Workflow Execution

### Simple Workflow (Array of Strings)

```typescript
workflows: {
  dev: ['install', 'dev:start']
}
```

Normalized to:
```typescript
[
  { name: 'install', command: 'install' },
  { name: 'dev:start', command: 'dev:start' }
]
```

### Advanced Workflow (Array of Objects)

```typescript
workflows: {
  ship: [
    { name: 'typecheck', command: 'bun run typecheck' },
    { name: 'test', command: 'bun test' },
    { name: 'build', command: 'bun run build', env: { NODE_ENV: 'production' } }
  ]
}
```

## Environment Handling

Environments are first-class:

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

Commands can target environments:
```bash
eat build --prod  # Uses prod environment
```

## Error Handling

Eat provides **context-aware errors**:

```
❌ Workflow dev failed
→ Step "typecheck" failed
→ src/index.ts:42:5 - error TS2345
```

Instead of raw Bun output.

## Future Architecture (v0.2+)

### Monorepo Support

```
src/monorepo/
  ├── graph.ts        # Build dependency graph
  ├── affected.ts     # Detect affected packages
  └── parallel.ts     # Parallel execution
```

### Caching Layer

```
src/cache/
  ├── local.ts        # Local filesystem cache
  └── remote.ts       # Remote cache (Eat Cloud)
```

### Plugin System

```
src/plugins/
  ├── loader.ts       # Plugin discovery
  └── types.ts        # Plugin API
```

## Technology Choices

| Component | Technology | Why |
|-----------|------------|-----|
| Runtime | Bun | Fast, native TypeScript |
| CLI | Commander.js | Battle-tested, familiar |
| Spinners | Ora | Beautiful feedback |
| Colors | Picocolors | Tiny, fast |
| Config | TypeScript | Type-safe, flexible |

## Performance Considerations

1. **Bun's Speed**: All execution uses Bun's fast spawn
2. **Lazy Loading**: Configs loaded only when needed
3. **Minimal Dependencies**: Small dependency tree
4. **Native TypeScript**: No transpilation overhead

## Comparison to Alternatives

### vs Nx
- **Eat**: Bun-native, simpler, opinionated
- **Nx**: Node-first, complex, flexible

### vs Turborepo
- **Eat**: Full workflow platform
- **Turbo**: Task runner + cache

### vs Make/Just
- **Eat**: JS-native, runtime-aware
- **Make**: Language-agnostic, no context

## Extensibility

Future plugin API:

```typescript
// eat-plugin-docker.ts
export default {
  name: 'docker',
  commands: {
    'docker:build': async () => { /* ... */ }
  },
  hooks: {
    beforeBuild: async () => { /* ... */ }
  }
}
```

## Security

- **No eval()**: Config loaded via Bun's import
- **No shell injection**: Commands use spawn with args array
- **Environment isolation**: Env vars scoped per step

## Monitoring (Future)

Eat Cloud will collect:
- Build times
- Failure rates
- Bottlenecks
- Team metrics

All opt-in, privacy-first.

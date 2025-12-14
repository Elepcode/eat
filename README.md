# 🥟 Eat

**The Bun Control Plane**

> Eat consumes Bun and turns speed into structure.

---

## ✨ Beautiful CLI Experience

Run `eat` to see the clean welcome screen:

```
  ███████╗     █████╗     ████████╗
  ██╔════╝    ██╔══██╗    ╚══██╔══╝
  █████╗      ███████║       ██║   
  ██╔══╝      ██╔══██║       ██║   
  ███████╗    ██║  ██║       ██║   
  ╚══════╝    ╚═╝  ╚═╝       ╚═╝   

  The Bun Control Plane

  Tips for getting started:
  1. Run 'eat init' to initialize your project.
  2. Use 'eat dev' to start development workflow.
  3. Try 'eat info <workflow>' to see execution plans.
  4. Run 'eat doctor' to check project health.
```

---

## What is Eat?

Eat is an **orchestration layer** that sits on top of Bun, transforming it from a fast toolset into a complete, opinionated developer platform.

**Bun is the engine. Eat is the driver.**

### The Problem

Bun gives you incredible speed with:
- ⚡ Fast runtime
- 📦 Fast package manager  
- 🔨 Fast bundler
- 🧪 Fast test runner

But Bun intentionally avoids opinions. This leads to:
- ❌ Messy scripts in `package.json`
- ❌ Inconsistent workflows across teams
- ❌ No orchestration for complex tasks
- ❌ "How do I run this?" confusion

### The Solution

Eat adds the missing layer:

```bash
# Instead of this mess:
bun install
bun run db:migrate
bun run codegen
bun run dev

# You do this:
eat dev
```

Eat knows what to run, in what order, and why.

---

## Core Philosophy

### Bun vs Eat

| Aspect | Bun | Eat |
|--------|-----|-----|
| **Role** | Provides capabilities | Provides decisions |
| **Speed** | Extremely fast | Leverages Bun's speed |
| **Opinions** | Intentionally none | Strongly opinionated |
| **Scope** | Runtime + tools | Workflows + orchestration |
| **Target** | Individual commands | Complete developer experience |

**Eat does not replace Bun. Eat productizes Bun.**

---

## What Eat Does

### 1️⃣ **Single Command Entry Point**

```bash
eat dev      # Start development
eat build    # Build project
eat test     # Run tests
eat ship     # Deploy
eat doctor   # Diagnose issues
eat clean    # Reset workspace
```

No more remembering 20 different scripts.

### 2️⃣ **Workflow Orchestration**

Define flows, not just commands:

```typescript
// eat.config.ts
export default {
  dev: [
    "install",
    "db:start",
    "generate",
    "serve"
  ],
  ship: [
    "typecheck",
    "lint",
    "test",
    "build",
    "deploy"
  ]
}
```

Eat runs these in order, handles failures, and parallelizes when safe.

### 3️⃣ **Monorepo Intelligence**

Eat understands your workspace:
- 📊 Builds dependency graph
- 🎯 Detects affected packages
- ⚡ Runs only what changed
- 🔄 Parallelizes safely

```bash
eat build  # Only builds affected packages
```

### 4️⃣ **Environment Awareness**

```bash
eat build --prod   # Production build
eat dev --local    # Local development
eat test --ci      # CI environment
```

Eat loads correct env vars and applies appropriate flags.

### 5️⃣ **Better Developer Experience**

```bash
eat info build     # Explain what will run
eat graph          # Show dependency graph
eat explain dev    # Show execution plan
```

Transparency and clarity built-in.

---

## Quick Start

### Installation

```bash
bun add -g @eatjs/cli
```

### Initialize a Project

```bash
eat init
```

This creates:
- `eat.config.ts` - Your workflow definitions
- `.eatrc` - Local settings
- Standard project structure

### Run Your First Workflow

```bash
eat dev
```

---

## How Eat Overcomes Bun's Limitations

| Bun Limitation | How Eat Fixes It |
|----------------|------------------|
| No opinions | Enforced conventions |
| No orchestration | Workflow engine |
| Script chaos | Unified CLI |
| Monorepo limits | Smart graph + caching |
| Low-level errors | Context-aware messages |
| Tool-focused | Product experience |
| No env management | Environment-first design |

---

## Positioning

### What Eat Is

✅ A **Bun-native control plane**  
✅ An **opinionated workflow orchestrator**  
✅ A **developer experience layer**  
✅ A **monorepo brain**

### What Eat Is NOT

❌ A Bun replacement  
❌ A new runtime  
❌ A bundler  
❌ A competitor to Bun

---

## Comparison

| Tool | Runtime-aware | Bun-native | Opinionated | Workflow Brain | DX-first |
|------|---------------|------------|-------------|----------------|----------|
| **Bun** | ✅ | ✅ | ❌ | ❌ | ⚠️ |
| **Nx** | ❌ | ❌ | ⚠️ | ✅ | ⚠️ |
| **Turbo** | ❌ | ❌ | ❌ | ⚠️ | ⚠️ |
| **Moon** | ❌ | ❌ | ❌ | ⚠️ | ⚠️ |
| **Eat** | ✅ | ✅ | ✅ | ✅ | ✅ |

**Eat occupies a unique position in the ecosystem.**

---

## Roadmap

### v0.1 (Current) - Foundation
- ✅ Core CLI structure
- ✅ Basic workflow engine
- ✅ Bun integration
- ✅ Config system

### v0.2 - Monorepo
- 🔄 Workspace detection
- 🔄 Dependency graph
- 🔄 Affected package detection
- 🔄 Parallel execution

### v0.3 - Intelligence
- 📋 Smart caching
- 📋 Error context
- 📋 Diagnostic commands
- 📋 Workflow insights

### v1.0 - Production Ready
- 📋 Stable API
- 📋 Plugin system
- 📋 Full documentation
- 📋 Migration guides

### Future - Eat Cloud
- 📋 Remote cache
- 📋 Team analytics
- 📋 CI integration
- 📋 Enterprise features

---

## Business Model

**Eat is open source forever.**

Revenue comes from:
- 💰 **Remote Cache** (like Turborepo)
- 📊 **Analytics Dashboard** (for teams)
- 🔐 **Enterprise Features** (SSO, policies, audit logs)
- ☁️ **Eat Cloud** (hosted control plane)

**Free tier is generous. Paid tier saves time at scale.**

---

## Contributing

Eat is in early development. We welcome:
- 🐛 Bug reports
- 💡 Feature ideas
- 📖 Documentation improvements
- 🔧 Pull requests

---

## Philosophy

> "Bun makes things fast. Eat makes them make sense."

Eat exists because:
1. **Speed without structure is chaos**
2. **Tools need opinions to scale**
3. **Teams need consistency**
4. **Bun deserves a product layer**

---

## License

MIT

---

## Links

- 📚 [Documentation](./docs)
- 🐛 [Issues](https://github.com/yourorg/eat/issues)
- 💬 [Discussions](https://github.com/yourorg/eat/discussions)
- 🐦 [Twitter](https://twitter.com/eatjs)

---

**Built with ❤️ for the Bun ecosystem**

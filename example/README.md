# Example Eat Project

This is a demo project showing how Eat works.

## Structure

```
example/
├── src/
│   └── index.ts       # Main application
├── package.json
└── eat.config.ts      # Eat configuration
```

## Try It

1. Install dependencies:
   ```bash
   bun install
   ```

2. See what `dev` workflow will do:
   ```bash
   eat info dev
   ```

3. Run development:
   ```bash
   eat dev
   ```

4. Build for production:
   ```bash
   eat build --prod
   ```

5. Run tests:
   ```bash
   eat test
   ```

## What This Demonstrates

- ✅ Simple workflow definitions
- ✅ Environment-specific builds
- ✅ Bun integration
- ✅ Clean CLI experience

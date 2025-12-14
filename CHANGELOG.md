# Changelog

All notable changes to Eat will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2024-12-14

### Added
- Initial release of Eat CLI
- Core commands: `init`, `dev`, `build`, `test`, `ship`
- Utility commands: `doctor`, `clean`, `info`, `graph`
- Workflow orchestration engine
- Configuration system (`eat.config.ts`)
- Environment awareness (dev/prod/ci)
- Bun integration layer
- Rich CLI feedback with spinners and colors
- Comprehensive documentation

### Features
- ✅ Single command entry point
- ✅ Workflow definitions in TypeScript
- ✅ Sequential step execution
- ✅ Environment-specific configurations
- ✅ Context-aware error messages
- ✅ Execution plan visualization (`eat info`)
- ✅ Project health diagnostics (`eat doctor`)

### Documentation
- README with positioning and philosophy
- Architecture documentation
- Positioning vs competitors
- Monetization strategy
- Contributing guidelines

## [0.2.0] - Planned

### Planned Features
- Monorepo workspace detection
- Dependency graph analysis
- Affected package detection
- Parallel workflow execution
- Local caching layer
- Watch mode for dev workflows

## [0.3.0] - Planned

### Planned Features
- Smart caching with invalidation
- Improved error context
- Workflow insights and analytics
- Plugin system foundation
- Remote cache preparation

## [1.0.0] - Planned

### Planned Features
- Stable API
- Full plugin system
- Complete documentation
- Migration guides from other tools
- Production-ready status

---

[Unreleased]: https://github.com/yourorg/eat/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourorg/eat/releases/tag/v0.1.0

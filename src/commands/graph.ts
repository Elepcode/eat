import pc from 'picocolors';

export async function graphCommand() {
  console.log(pc.cyan('\n📊 Dependency Graph\n'));
  console.log(pc.yellow('⚠️  Graph visualization coming in v0.2\n'));
  console.log(pc.dim('This will show:'));
  console.log(pc.dim('  - Package dependencies'));
  console.log(pc.dim('  - Build order'));
  console.log(pc.dim('  - Affected packages\n'));
}

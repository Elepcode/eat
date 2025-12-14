import { loadConfig } from '../config/loader';
import { WorkflowExecutor } from '../engine/executor';
import pc from 'picocolors';

export async function buildCommand(options: { prod?: boolean; affected?: boolean }) {
  try {
    const config = await loadConfig();

    if (!config) {
      console.error(pc.red('❌ No eat.config.ts found. Run'), pc.cyan('eat init'), pc.red('first.'));
      process.exit(1);
    }

    const workflow = config.workflows.build;

    if (!workflow) {
      console.error(pc.red('❌ No "build" workflow defined in eat.config.ts'));
      process.exit(1);
    }

    const env = options.prod ? config.environments?.prod?.env : undefined;

    if (options.affected) {
      console.log(pc.yellow('⚠️  Affected-only builds coming in v0.2'));
    }

    const executor = new WorkflowExecutor('build', workflow, { env });
    await executor.execute();

  } catch (error: any) {
    console.error(pc.red('\n❌ Build workflow failed:'), error.message);
    process.exit(1);
  }
}

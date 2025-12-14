import { loadConfig } from '../config/loader';
import { WorkflowExecutor } from '../engine/executor';
import pc from 'picocolors';

export async function testCommand(options: { ci?: boolean; watch?: boolean }) {
  try {
    const config = await loadConfig();

    if (!config) {
      console.error(pc.red('❌ No eat.config.ts found. Run'), pc.cyan('eat init'), pc.red('first.'));
      process.exit(1);
    }

    const workflow = config.workflows.test;

    if (!workflow) {
      console.error(pc.red('❌ No "test" workflow defined in eat.config.ts'));
      process.exit(1);
    }

    const env = options.ci ? { CI: 'true', ...config.environments?.ci?.env } : undefined;

    if (options.watch) {
      console.log(pc.yellow('⚠️  Watch mode coming soon'));
    }

    const executor = new WorkflowExecutor('test', workflow, { env });
    await executor.execute();

  } catch (error: any) {
    console.error(pc.red('\n❌ Test workflow failed:'), error.message);
    process.exit(1);
  }
}

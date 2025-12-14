import { loadConfig } from '../config/loader';
import { WorkflowExecutor } from '../engine/executor';
import pc from 'picocolors';

export async function devCommand(options: { local?: boolean }) {
  try {
    const config = await loadConfig();

    if (!config) {
      console.error(pc.red('❌ No eat.config.ts found. Run'), pc.cyan('eat init'), pc.red('first.'));
      process.exit(1);
    }

    const workflow = config.workflows.dev;

    if (!workflow) {
      console.error(pc.red('❌ No "dev" workflow defined in eat.config.ts'));
      process.exit(1);
    }

    const env = options.local ? config.environments?.dev?.env : undefined;

    const executor = new WorkflowExecutor('dev', workflow, { env });
    await executor.execute();

  } catch (error: any) {
    console.error(pc.red('\n❌ Dev workflow failed:'), error.message);
    process.exit(1);
  }
}

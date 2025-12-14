import { loadConfig } from '../config/loader';
import { WorkflowExecutor } from '../engine/executor';
import pc from 'picocolors';

export async function shipCommand(options: { env?: string }) {
  try {
    const config = await loadConfig();

    if (!config) {
      console.error(pc.red('❌ No eat.config.ts found. Run'), pc.cyan('eat init'), pc.red('first.'));
      process.exit(1);
    }

    const workflow = config.workflows.ship;

    if (!workflow) {
      console.error(pc.red('❌ No "ship" workflow defined in eat.config.ts'));
      process.exit(1);
    }

    const envName = options.env || 'prod';
    const env = config.environments?.[envName]?.env;

    console.log(pc.magenta(`\n🚀 Shipping to: ${pc.bold(envName)}\n`));

    const executor = new WorkflowExecutor('ship', workflow, { env });
    await executor.execute();

    console.log(pc.green(`\n🎉 Successfully shipped to ${envName}!\n`));

  } catch (error: any) {
    console.error(pc.red('\n❌ Ship workflow failed:'), error.message);
    process.exit(1);
  }
}

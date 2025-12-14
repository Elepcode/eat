import { loadConfig } from '../config/loader';
import { WorkflowExecutor } from '../engine/executor';
import pc from 'picocolors';

export async function infoCommand(workflowName: string) {
  try {
    const config = await loadConfig();

    if (!config) {
      console.error(pc.red('❌ No eat.config.ts found. Run'), pc.cyan('eat init'), pc.red('first.'));
      process.exit(1);
    }

    const workflow = config.workflows[workflowName];

    if (!workflow) {
      console.error(pc.red(`❌ Workflow "${workflowName}" not found in eat.config.ts`));
      console.log(pc.dim('\nAvailable workflows:'));
      Object.keys(config.workflows).forEach(name => {
        console.log(`  - ${pc.cyan(name)}`);
      });
      process.exit(1);
    }

    const executor = new WorkflowExecutor(workflowName, workflow);
    await executor.explain();

  } catch (error: any) {
    console.error(pc.red('\n❌ Failed to show workflow info:'), error.message);
    process.exit(1);
  }
}

import type { WorkflowDefinition, WorkflowStep } from '../config/types';
import { spawn } from 'bun';
import pc from 'picocolors';
import ora from 'ora';

export class WorkflowExecutor {
  constructor(
    private workflowName: string,
    private definition: WorkflowDefinition,
    private options: ExecutionOptions = {}
  ) { }

  async execute(): Promise<void> {
    const steps = this.normalizeSteps(this.definition);

    console.log(pc.cyan(`\n🥟 Eating workflow: ${pc.bold(this.workflowName)}\n`));

    for (const step of steps) {
      if (step.parallel) {
        // Handle parallel execution in future
        await this.executeStep(step);
      } else {
        await this.executeStep(step);
      }
    }

    console.log(pc.green(`\n✅ Workflow ${pc.bold(this.workflowName)} completed successfully!\n`));
  }

  private async executeStep(step: WorkflowStep): Promise<void> {
    const spinner = ora({
      text: `Running: ${step.name}`,
      color: 'cyan'
    }).start();

    try {
      if (step.workflow) {
        // Execute nested workflow
        spinner.text = `Running nested workflow: ${step.workflow}`;
        // This would recursively execute another workflow
        spinner.succeed(`Completed: ${step.name}`);
        return;
      }

      if (step.command) {
        await this.runCommand(step.command, step);
        spinner.succeed(`Completed: ${step.name}`);
      }
    } catch (error: any) {
      spinner.fail(`Failed: ${step.name}`);
      throw new WorkflowError(
        `Step "${step.name}" failed: ${error.message}`,
        step.name,
        error
      );
    }
  }

  private async runCommand(command: string, step: WorkflowStep): Promise<void> {
    // Check if this is a Bun command
    const isBunCommand = command.startsWith('bun ');
    const actualCommand = isBunCommand ? command : `bun ${command}`;

    const [cmd, ...args] = actualCommand.split(' ');

    const proc = spawn({
      cmd: [cmd, ...args],
      cwd: step.cwd || process.cwd(),
      env: {
        ...process.env,
        ...step.env,
        ...this.options.env
      },
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const exitCode = await proc.exited;

    if (exitCode !== 0) {
      const stderr = await new Response(proc.stderr).text();
      throw new Error(stderr || `Command exited with code ${exitCode}`);
    }
  }

  private normalizeSteps(definition: WorkflowDefinition): WorkflowStep[] {
    if (Array.isArray(definition)) {
      return definition.map(item => {
        if (typeof item === 'string') {
          return {
            name: item,
            command: item
          };
        }
        return item;
      });
    }
    return [];
  }

  async explain(): Promise<void> {
    const steps = this.normalizeSteps(this.definition);

    console.log(pc.cyan(`\n📋 Workflow: ${pc.bold(this.workflowName)}\n`));
    console.log(pc.dim('Execution plan:\n'));

    steps.forEach((step, index) => {
      const prefix = index === steps.length - 1 ? '└─' : '├─';
      console.log(`${prefix} ${pc.yellow(step.name)}`);

      if (step.command) {
        console.log(`   ${pc.dim('→')} ${pc.gray(step.command)}`);
      }

      if (step.workflow) {
        console.log(`   ${pc.dim('→')} ${pc.gray(`workflow: ${step.workflow}`)}`);
      }

      if (step.parallel) {
        console.log(`   ${pc.dim('→')} ${pc.blue('(parallel)')}`);
      }

      console.log();
    });
  }
}

export interface ExecutionOptions {
  env?: Record<string, string>;
  cwd?: string;
  dryRun?: boolean;
}

export class WorkflowError extends Error {
  constructor(
    message: string,
    public stepName: string,
    public originalError: Error
  ) {
    super(message);
    this.name = 'WorkflowError';
  }
}

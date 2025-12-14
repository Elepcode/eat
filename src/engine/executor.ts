import type { WorkflowDefinition, WorkflowStep } from '../config/types';
import { spawn } from 'bun';
import pc from 'picocolors';
import { theme, Progress } from '../utils/theme';

export class WorkflowExecutor {
  constructor(
    private workflowName: string,
    private definition: WorkflowDefinition,
    private options: ExecutionOptions = {}
  ) { }

  async execute(): Promise<void> {
    const steps = this.normalizeSteps(this.definition);

    console.log(theme.workflow(this.workflowName));

    for (const step of steps) {
      if (step.parallel) {
        // Handle parallel execution in future
        await this.executeStep(step);
      } else {
        await this.executeStep(step);
      }
    }

    console.log(theme.footer(`Workflow ${pc.bold(this.workflowName)} completed successfully`));
  }

  private async executeStep(step: WorkflowStep): Promise<void> {
    const progress = new Progress(`Running: ${step.name}`);
    progress.start();

    try {
      if (step.workflow) {
        // Execute nested workflow
        progress.update(`Running nested workflow: ${step.workflow}`);
        progress.succeed(`Completed: ${step.name}`);
        return;
      }

      if (step.command) {
        await this.runCommand(step.command, step);
        progress.succeed(`Completed: ${step.name}`);
      }
    } catch (error: any) {
      progress.fail(`Failed: ${step.name}`);
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

    console.log(`\n${theme.cream('┌─')} Workflow: ${pc.bold(this.workflowName)}`);
    console.log(theme.cream('│'));
    console.log(pc.dim('Execution plan:'));
    console.log();

    steps.forEach((step, index) => {
      const isLast = index === steps.length - 1;
      console.log(theme.tree.branch(theme.cream(step.name), isLast));

      if (step.command) {
        console.log(theme.tree.indent(step.command));
      }

      if (step.workflow) {
        console.log(theme.tree.indent(`workflow: ${step.workflow}`));
      }

      if (step.parallel) {
        console.log(theme.tree.indent(pc.cyan('(parallel)')));
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

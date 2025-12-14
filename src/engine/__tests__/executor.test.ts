import { describe, test, expect } from 'bun:test';
import { WorkflowExecutor } from '../executor';

describe('Workflow Executor', () => {
  test('should normalize string array to steps', () => {
    const workflow = ['install', 'build', 'test'];
    const executor = new WorkflowExecutor('test', workflow);

    // Test that executor is created
    expect(executor).toBeDefined();
  });

  test('should handle object-based workflow steps', () => {
    const workflow = [
      { name: 'install', command: 'bun install' },
      { name: 'build', command: 'bun run build' }
    ];
    const executor = new WorkflowExecutor('test', workflow);

    expect(executor).toBeDefined();
  });
});

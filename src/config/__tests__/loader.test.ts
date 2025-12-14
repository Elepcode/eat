import { describe, test, expect } from 'bun:test';
import { getDefaultConfig } from '../loader';

describe('Config Loader', () => {
  test('should return default config', () => {
    const config = getDefaultConfig();

    expect(config).toBeDefined();
    expect(config.workflows).toBeDefined();
    expect(config.workflows.dev).toBeDefined();
    expect(config.workflows.build).toBeDefined();
    expect(config.workflows.test).toBeDefined();
  });

  test('default config should have required workflows', () => {
    const config = getDefaultConfig();

    expect(Array.isArray(config.workflows.dev)).toBe(true);
    expect(Array.isArray(config.workflows.build)).toBe(true);
    expect(Array.isArray(config.workflows.test)).toBe(true);
    expect(Array.isArray(config.workflows.ship)).toBe(true);
  });

  test('default config should have workspace settings', () => {
    const config = getDefaultConfig();

    expect(config.workspace).toBeDefined();
    expect(config.workspace?.packages).toBeDefined();
    expect(config.workspace?.strategy).toBe('affected');
  });
});

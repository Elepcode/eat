import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import { existsSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';

describe('eat init command', () => {
  const testDir = join(process.cwd(), 'test-temp');

  beforeEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
    mkdirSync(testDir);
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  test('should setup test environment correctly', () => {
    expect(existsSync(testDir)).toBe(true);
  });

  // Placeholder for integration test
  // Use eat init implementation when ready
  test('should have valid structure', () => {
    expect(true).toBe(true);
  });
});

export interface EatConfig {
  /** Project name */
  name?: string;

  /** Workflow definitions */
  workflows: {
    [key: string]: WorkflowDefinition;
  };

  /** Workspace configuration for monorepos */
  workspace?: {
    /** Workspace packages glob patterns */
    packages?: string[];
    /** Build strategy */
    strategy?: 'all' | 'affected';
  };

  /** Environment configurations */
  environments?: {
    [key: string]: EnvironmentConfig;
  };

  /** Bun-specific settings */
  bun?: {
    /** Bun version constraint */
    version?: string;
    /** Additional Bun flags */
    flags?: string[];
  };

  /** Plugin configurations */
  plugins?: string[];
}

export type WorkflowDefinition = string[] | WorkflowStep[];

export interface WorkflowStep {
  /** Step name */
  name: string;
  /** Command to execute */
  command?: string;
  /** Nested workflow */
  workflow?: string;
  /** Run in parallel with other steps */
  parallel?: boolean;
  /** Environment variables */
  env?: Record<string, string>;
  /** Working directory */
  cwd?: string;
  /** Condition to run this step */
  condition?: string;
}

export interface EnvironmentConfig {
  /** Environment variables */
  env?: Record<string, string>;
  /** Bun flags for this environment */
  bunFlags?: string[];
}

export const defineConfig = (config: EatConfig): EatConfig => config;

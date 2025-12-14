import pc from 'picocolors';

// Cream color theme
const CREAM = '\x1b[38;5;230m';
const RESET = '\x1b[0m';

export const theme = {
  // Colors
  cream: (text: string) => `${CREAM}${text}${RESET}`,
  dim: pc.dim,
  gray: pc.gray,
  green: pc.green,
  red: pc.red,
  cyan: pc.cyan,

  // Symbols (no emojis, only ASCII)
  symbols: {
    success: '[✓]',
    error: '[✗]',
    arrow: '→',
    pipe: '│',
    branch: '├─',
    last: '└─',
    dot: '•',
    running: '[→]',
  },

  // Formatted messages
  success: (text: string) => `${pc.green('[✓]')} ${text}`,
  error: (text: string) => `${pc.red('[✗]')} ${text}`,
  info: (text: string) => `${theme.cream('[•]')} ${text}`,
  running: (text: string) => `${theme.cream('[→]')} ${text}`,

  // Headers
  header: (text: string) => `\n${theme.cream('┌─')} ${pc.bold(text)}\n${theme.cream('│')}`,
  footer: (text: string) => `${theme.cream('└─')} ${text}\n`,

  // Workflow header
  workflow: (name: string) => {
    return `\n${theme.cream('┌─')} Workflow: ${pc.bold(name)}\n${theme.cream('│')}`;
  },

  // Tree structure
  tree: {
    branch: (text: string, isLast: boolean = false) => {
      const symbol = isLast ? '└─' : '├─';
      return `${theme.cream(symbol)} ${text}`;
    },
    indent: (text: string) => `   ${theme.dim('→')} ${pc.gray(text)}`,
  }
};

// Remove ora spinner, use custom progress
export class Progress {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  start() {
    process.stdout.write(theme.running(this.text));
    return this;
  }

  succeed(text?: string) {
    process.stdout.write('\r\x1b[K'); // Clear line
    console.log(theme.success(text || this.text));
  }

  fail(text?: string) {
    process.stdout.write('\r\x1b[K'); // Clear line
    console.log(theme.error(text || this.text));
  }

  update(text: string) {
    this.text = text;
    process.stdout.write(`\r\x1b[K${theme.running(text)}`);
  }
}

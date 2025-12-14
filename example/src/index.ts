console.log('🥟 Eat Example App');
console.log('Environment:', process.env.NODE_ENV);
console.log('Log Level:', process.env.LOG_LEVEL);

export function greet(name: string): string {
  return `Hello, ${name}! Welcome to Eat.`;
}

if (import.meta.main) {
  console.log(greet('Developer'));
}

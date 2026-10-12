// PLAT-91: обёртка с журналом вызовов.
export function withLogging(fn: (...args: unknown[]) => unknown, name: string, log: (line: string) => void) {
  throw new Error('Не реализовано');
}

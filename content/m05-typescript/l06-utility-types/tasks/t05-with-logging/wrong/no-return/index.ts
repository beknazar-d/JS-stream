export function withLogging<F extends (...args: any[]) => any>(
  fn: F,
  name: string,
  log: (line: string) => void,
): (...args: Parameters<F>) => ReturnType<F> {
  return (...args) => {
    const result = fn(...args);
    log(`${name}(${args.join(', ')}) = ${String(result)}`);
  };
}

export function withLogging<F extends (...args: any[]) => any>(
  fn: F,
  name: string,
  log: (line: string) => void,
): (...args: Parameters<F>) => ReturnType<F> {
  return (...args) => {
    try {
      const result = fn(...args);
      log(`${name}(${args.join(', ')}) = ${String(result)}`);
      return result;
    } catch {
      return undefined as ReturnType<F>;
    }
  };
}

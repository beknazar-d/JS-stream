export function withLogging(
  fn: (...args: any[]) => any,
  name: string,
  log: (line: string) => void,
): (...args: any[]) => any {
  return (...args) => {
    const result = fn(...args);
    log(`${name}(${args.join(', ')}) = ${String(result)}`);
    return result;
  };
}

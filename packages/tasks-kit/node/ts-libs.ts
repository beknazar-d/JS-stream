// lib.*.d.ts компилятора TypeScript для проверки типов в CI.
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

let cache: Record<string, string> | undefined;

export function loadTsLibs(): Record<string, string> {
  if (cache) return cache;
  const dir = dirname(createRequire(import.meta.url).resolve('typescript/lib/lib.d.ts'));
  cache = {};
  for (const name of readdirSync(dir)) {
    if (/^lib\..*\.d\.ts$/.test(name) && !/dom|webworker|scripthost/.test(name)) cache[name] = readFileSync(join(dir, name), 'utf8');
  }
  return cache;
}

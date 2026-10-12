// Постоянный Worker компиляции. Компилятор TypeScript большой,
// поэтому грузится один раз и только на страницах с заданиями.
import { compileAll, guardPageScripts } from '@platform/tasks-kit/compile';
import { typecheck } from '@platform/tasks-kit/typecheck';

const tsPromise = import('typescript').then((m) => (m as { default?: unknown }).default ?? m);

type Request = { id: number; kind?: 'compile' | 'guard' | 'typecheck'; files: Record<string, string> };

// Стандартная библиотека TypeScript для проверки типов — только по требованию.
const libLoaders = import.meta.glob<string>(
  ['../../../node_modules/typescript/lib/lib.*.d.ts', '!**/lib.dom*', '!**/lib.webworker*', '!**/lib.scripthost*'],
  { query: '?raw', import: 'default' },
);
let libsPromise: Promise<Record<string, string>> | undefined;
const loadLibs = () =>
  (libsPromise ??= Promise.all(
    Object.entries(libLoaders).map(async ([path, load]) => [path.split('/').pop()!, await load()] as const),
  ).then(Object.fromEntries));

self.onmessage = async (event: MessageEvent<Request>) => {
  const ts = (await tsPromise) as Parameters<typeof guardPageScripts>[0];
  const { id, kind = 'compile', files } = event.data;
  if (kind === 'guard') self.postMessage({ id, ...guardPageScripts(ts, files) });
  else if (kind === 'typecheck') self.postMessage({ id, diagnostics: typecheck(ts, files, await loadLibs()) });
  else self.postMessage({ id, ...compileAll(ts, files) });
};

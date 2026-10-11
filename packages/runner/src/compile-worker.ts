// Постоянный Worker компиляции. Компилятор TypeScript большой,
// поэтому грузится один раз и только на страницах с заданиями.
import { compileAll, guardPageScripts } from '@platform/tasks-kit/compile';

const tsPromise = import('typescript').then((m) => (m as { default?: unknown }).default ?? m);

type Request = { id: number; kind?: 'compile' | 'guard'; files: Record<string, string> };

self.onmessage = async (event: MessageEvent<Request>) => {
  const ts = (await tsPromise) as Parameters<typeof guardPageScripts>[0];
  const { id, kind = 'compile', files } = event.data;
  if (kind === 'guard') self.postMessage({ id, ...guardPageScripts(ts, files) });
  else self.postMessage({ id, ...compileAll(ts, files) });
};

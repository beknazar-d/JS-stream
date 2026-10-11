// Постоянный Worker компиляции. Компилятор TypeScript большой,
// поэтому грузится один раз и только на страницах с заданиями.
import { compileAll } from '@platform/tasks-kit/compile';

const tsPromise = import('typescript').then((m) => (m as { default?: unknown }).default ?? m);

self.onmessage = async (event: MessageEvent<{ id: number; files: Record<string, string> }>) => {
  const ts = (await tsPromise) as Parameters<typeof compileAll>[0];
  const { id, files } = event.data;
  self.postMessage({ id, ...compileAll(ts, files) });
};

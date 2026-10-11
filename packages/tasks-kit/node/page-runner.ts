// Запуск заданий на страницу (language: html) в headless Chromium для CI.
// Используется тот же код, что и на сайте: page-host создаёт iframe с sandbox.
import { chromium, type Browser, type Page } from 'playwright';
import type { ExecOutcome } from '../src/evaluate.ts';
import type { HtmlRun } from '../src/html.ts';
import { bundleHarness, bundleHost } from './bundle-page.ts';

const HARD_TIMEOUT_MS = 20000;

export function createPageRunner() {
  let browser: Browser | undefined;
  let page: Promise<Page> | undefined;
  let code: Promise<{ harness: string; host: string }> | undefined;

  const getCode = () => (code ??= Promise.all([bundleHarness(), bundleHost()]).then(([harness, host]) => ({ harness, host })));

  const getPage = () =>
    (page ??= (async () => {
      browser ??= await chromium.launch();
      const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await p.setContent('<!doctype html><html lang="ru"><body></body></html>');
      await p.addScriptTag({ content: (await getCode()).host });
      return p;
    })());

  const executeHtml = async (run: HtmlRun): Promise<ExecOutcome> => {
    const { harness } = await getCode();
    const current = await getPage();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const hard = new Promise<ExecOutcome>((resolve) => {
      timer = setTimeout(() => {
        // Страница зависла целиком (синхронный бесконечный цикл): начинаем с новой.
        page = undefined;
        void current.close();
        resolve({ kind: 'timeout' });
      }, HARD_TIMEOUT_MS);
    });
    const work = current
      .evaluate(
        ([r, h]) => (window as unknown as { __pageHost: { runHtmlJob: (r: unknown, h: string) => Promise<ExecOutcome> } }).__pageHost.runHtmlJob(r, h),
        [run, harness] as const,
      )
      .catch((): ExecOutcome => ({ kind: 'timeout' }));
    const outcome = await Promise.race([work, hard]);
    clearTimeout(timer);
    return outcome;
  };

  const close = async () => {
    await browser?.close();
  };
  return { executeHtml, close };
}

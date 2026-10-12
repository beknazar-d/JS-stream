// Родительская сторона заданий на страницу: создаёт iframe с sandbox
// (без allow-same-origin — у страницы чужой источник и нет доступа к
// данным платформы), передаёт тесты и ждёт результат с лимитом времени.
// Работает и на сайте, и в Chromium при проверке контента в CI.

import type { ExecOutcome } from './evaluate.ts';
import type { ExecJob, ExecResult } from './exec.ts';
import { buildDocument, type HtmlRun } from './html.ts';

export const PAGE_WIDTH = 1024;
export const PAGE_HEIGHT = 768;

export function runHtmlJob(run: HtmlRun, harness: string, timeoutMs = 8000): Promise<ExecOutcome> {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts allow-forms');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    // Вне экрана, но с настоящими размерами: тесты проверяют раскладку.
    Object.assign(iframe.style, {
      position: 'fixed',
      left: '-20000px',
      top: '0',
      width: `${run.width ?? PAGE_WIDTH}px`,
      height: `${PAGE_HEIGHT}px`,
      border: '0',
    });

    const job: ExecJob = { modules: run.modules, tests: run.tests, testTimeoutMs: run.testTimeoutMs };
    let done = false;
    const finish = (outcome: ExecOutcome) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      window.removeEventListener('message', onMessage);
      iframe.remove();
      resolve(outcome);
    };
    const onMessage = (event: MessageEvent<{ type: string; width?: number; result?: ExecResult }>) => {
      if (event.source !== iframe.contentWindow) return;
      const data = event.data;
      if (data?.type === 'ready') iframe.contentWindow?.postMessage({ type: 'job', job }, '*');
      else if (data?.type === 'resize' && data.width) {
        iframe.style.width = `${data.width}px`;
        setTimeout(() => iframe.contentWindow?.postMessage({ type: 'resized' }, '*'), 0);
      } else if (data?.type === 'result' && data.result) finish({ kind: 'ok', result: data.result });
    };
    const timer = setTimeout(() => finish({ kind: 'timeout' }), timeoutMs);
    window.addEventListener('message', onMessage);
    iframe.srcdoc = buildDocument(run.pageFiles, { harness, api: run.api });
    document.body.append(iframe);
  });
}

// Обвязка внутри iframe: ждёт загрузки страницы, получает тесты от
// родителя и выполняет их прямо в документе. Собирается в один скрипт
// (IIFE) и встраивается в конец страницы человека.

import { execute, type ExecJob, type LogEntry } from './exec.ts';
import { explainError } from './explain.ts';
import { format } from './format.ts';

declare global {
  interface Window {
    __pageErrors: string[];
    __pageLogs: { level: LogEntry['level']; args: unknown[] }[];
    __api: { calls: unknown[] };
  }
}

type Target = string | Element | null;

function element(target: Target): Element {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) throw new Error(`Элемент ${typeof target === 'string' ? `«${target}»` : ''} не найден на странице`);
  return el;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let resizeResolve: (() => void) | undefined;

const helpers = {
  $: (selector: string) => document.querySelector(selector),
  $$: (selector: string) => [...document.querySelectorAll(selector)],
  // Вычисленное значение CSS-свойства: css('.card', 'display') → "flex".
  css: (target: Target, property: string) => getComputedStyle(element(target)).getPropertyValue(property).trim(),
  // Положение и размер элемента в пикселях, округлённые до целых.
  box: (target: Target) => {
    const r = element(target).getBoundingClientRect();
    return {
      x: Math.round(r.x),
      y: Math.round(r.y),
      top: Math.round(r.top),
      left: Math.round(r.left),
      right: Math.round(r.right),
      bottom: Math.round(r.bottom),
      width: Math.round(r.width),
      height: Math.round(r.height),
    };
  },
  // Меняет ширину окна (iframe) и ждёт перерисовки: проверка адаптивности.
  viewport: (width: number) =>
    new Promise<void>((resolve) => {
      // rAF во фрейме вне экрана не срабатывает: ждём таймером.
      resizeResolve = () => void sleep(30).then(() => resolve());
      parent.postMessage({ type: 'resize', width }, '*');
    }),
  click: async (target: Target) => {
    const el = element(target) as HTMLElement;
    el.click();
    await sleep(0);
  },
  // Ввод текста в поле: значение и события input и change, как при вводе руками.
  type: async (target: Target, text: string) => {
    const el = element(target) as HTMLInputElement;
    el.focus();
    el.value = text;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(0);
  },
  submit: async (target: Target) => {
    const form = element(target) as HTMLFormElement;
    form.requestSubmit();
    await sleep(0);
  },
  press: async (target: Target, key: string) => {
    const el = element(target);
    el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }));
    await sleep(0);
  },
  wait: sleep,
  // Ждёт, пока условие станет истинным (данные загрузились, элемент появился).
  waitFor: async <T>(condition: () => T, timeoutMs = 1500): Promise<T> => {
    const start = Date.now();
    for (;;) {
      try {
        const value = condition();
        if (value) return value;
      } catch {
        // условие ещё не выполнимо — ждём дальше
      }
      if (Date.now() - start > timeoutMs) throw new Error(`Условие не выполнилось за ${timeoutMs} мс`);
      await sleep(20);
    }
  },
  // Доступное имя элемента, как его прочитает скринридер (упрощённо).
  labelOf: (target: Target) => {
    const el = element(target);
    const aria = el.getAttribute('aria-label');
    if (aria) return aria.trim();
    const labelledBy = el.getAttribute('aria-labelledby');
    if (labelledBy) {
      return labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent?.trim() ?? '')
        .join(' ')
        .trim();
    }
    if (el.id) {
      const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (label) return (label.textContent ?? '').trim();
    }
    const wrapping = el.closest('label');
    if (wrapping) return (wrapping.textContent ?? '').trim();
    if (el instanceof HTMLImageElement) return el.alt.trim();
    return (el.textContent ?? '').trim();
  },
  api: () => window.__api,
};

Object.assign(window, helpers);

window.addEventListener('message', async (event: MessageEvent<{ type: string; job?: ExecJob }>) => {
  if (event.source !== parent) return;
  if (event.data?.type === 'resized') {
    resizeResolve?.();
    resizeResolve = undefined;
    return;
  }
  if (event.data?.type !== 'job' || !event.data.job) return;
  const result = await execute(event.data.job);
  const pageLogs: LogEntry[] = window.__pageLogs.map(({ level, args }) => ({
    level,
    text: args.map((a) => (typeof a === 'string' ? a : format(a))).join(' '),
  }));
  const pageErrors: LogEntry[] = window.__pageErrors.map((message) => {
    const hint = explainError(new Error(message));
    return { level: 'error' as const, text: `Ошибка в коде страницы: ${message}${hint ? `\nЧто это значит: ${hint}` : ''}` };
  });
  parent.postMessage({ type: 'result', result: { ...result, logs: [...pageErrors, ...pageLogs, ...result.logs] } }, '*');
});

// Тесты начинаются после полной загрузки страницы и её скриптов.
if (document.readyState === 'complete') parent.postMessage({ type: 'ready' }, '*');
else window.addEventListener('load', () => parent.postMessage({ type: 'ready' }, '*'));

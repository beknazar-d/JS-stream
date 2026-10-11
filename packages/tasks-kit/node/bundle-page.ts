// Сборка обвязки страницы (iframe) и родительской части в отдельные скрипты.
// Нужны и сайту (встраивается при сборке), и проверке контента в Chromium.
import { fileURLToPath } from 'node:url';
import { build, type Rollup } from 'vite';

async function bundle(entry: string, name: string): Promise<string> {
  const output = await build({
    configFile: false,
    logLevel: 'silent',
    build: {
      write: false,
      minify: true,
      target: 'es2022',
      lib: { entry: fileURLToPath(new URL(entry, import.meta.url)), formats: ['iife'], name },
    },
  });
  const result = (Array.isArray(output) ? output[0] : output) as Rollup.RollupOutput;
  return result.output[0].code;
}

export function bundleHarness(): Promise<string> {
  return bundle('../src/page-harness.ts', '__pageHarness');
}

export function bundleHost(): Promise<string> {
  return bundle('../src/page-host.ts', '__pageHost');
}

// Проверка типов для заданий модуля TypeScript: полноценная программа
// компилятора в памяти (strict), ошибки становятся проверками задания.
// Тесты уровня типов пишутся в tests/*.types.ts с помощниками Expect и Equal.

import type * as TS from 'typescript';
import type { FullTypeScript } from './loop-guard.ts';

export interface TypeDiagnostic {
  file: string;
  line?: number;
  code: number;
  message: string;
}

// Помощники для тестов типов (в духе type-challenges, написаны заново).
export const TYPE_ASSERTIONS = `
/** Проверка: тип должен быть true. */
type Expect<T extends true> = T;
/** Проверка: тип должен быть false. */
type ExpectFalse<T extends false> = T;
/** true, если типы A и B совпадают в точности. */
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
/** true, если типы различаются. */
type NotEqual<A, B> = true extends Equal<A, B> ? false : true;
`;

export const TYPECHECK_OPTIONS = (ts: FullTypeScript): TS.CompilerOptions => ({
  strict: true,
  noEmit: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  allowImportingTsExtensions: true,
  noUncheckedIndexedAccess: false,
  exactOptionalPropertyTypes: false,
  lib: ['lib.es2022.d.ts'],
  types: [],
});

// files — файлы задания (index.ts, tests/orders.types.ts…), libs — lib.*.d.ts компилятора по имени.
export function typecheck(ts: FullTypeScript, files: Record<string, string>, libs: Record<string, string>): TypeDiagnostic[] {
  const root = '/task/';
  const all = new Map<string, string>();
  for (const [name, source] of Object.entries(files)) all.set(root + name, source);
  all.set(`${root}__assertions.d.ts`, TYPE_ASSERTIONS);
  const libPath = (name: string) => `/lib/${name}`;
  for (const [name, source] of Object.entries(libs)) all.set(libPath(name), source);

  const options = TYPECHECK_OPTIONS(ts);
  const host: TS.CompilerHost = {
    getSourceFile: (fileName, languageVersion) => {
      const text = all.get(fileName);
      return text === undefined ? undefined : ts.createSourceFile(fileName, text, languageVersion, true);
    },
    getDefaultLibFileName: () => libPath('lib.d.ts'),
    getDefaultLibLocation: () => '/lib',
    writeFile: () => {},
    getCurrentDirectory: () => root,
    getDirectories: () => [],
    getCanonicalFileName: (f) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
    fileExists: (f) => all.has(f),
    readFile: (f) => all.get(f),
    directoryExists: (d) => [...all.keys()].some((f) => f.startsWith(d.endsWith('/') ? d : `${d}/`)),
  };
  const rootNames = [...all.keys()].filter((f) => f.startsWith(root) && /\.tsx?$/.test(f));
  const program = ts.createProgram({ rootNames, options, host });
  const diagnostics = [...program.getSyntacticDiagnostics(), ...program.getSemanticDiagnostics(), ...program.getGlobalDiagnostics()];
  return diagnostics.map((d) => ({
    file: d.file ? d.file.fileName.replace(root, '').replace('/lib/', 'lib/') : 'tsconfig',
    line: d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start).line + 1 : undefined,
    code: d.code,
    message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
  }));
}

export function formatTypeDiagnostic(d: TypeDiagnostic): string {
  return `${d.line ? `строка ${d.line}: ` : ''}TS${d.code}: ${d.message}`;
}

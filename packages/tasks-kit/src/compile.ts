// Компиляция JS и TS в CommonJS через компилятор TypeScript.
// Модуль typescript передаётся снаружи: в браузере он грузится лениво в Worker.

import type * as TS from 'typescript';

export type TypeScriptModule = Pick<typeof TS, 'transpileModule' | 'ModuleKind' | 'ScriptTarget' | 'flattenDiagnosticMessageText'>;

export interface CompileError {
  file: string;
  message: string;
  line?: number;
  column?: number;
}

export function compileFile(ts: TypeScriptModule, file: string, source: string): { code: string; errors: CompileError[] } {
  const output = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      sourceMap: false,
      // Сохраняем привычные имена: никаких __awaiter и переименований.
      removeComments: false,
    },
  });
  const errors: CompileError[] = (output.diagnostics ?? []).map((d) => {
    const position = d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start) : undefined;
    return {
      file,
      message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
      line: position ? position.line + 1 : undefined,
      column: position ? position.character + 1 : undefined,
    };
  });
  return { code: output.outputText, errors };
}

export function compileAll(ts: TypeScriptModule, files: Record<string, string>) {
  const modules: Record<string, string> = {};
  const errors: CompileError[] = [];
  for (const [file, source] of Object.entries(files)) {
    const result = compileFile(ts, file, source);
    modules[file] = result.code;
    errors.push(...result.errors);
  }
  return { modules, errors };
}

export function formatCompileError(error: CompileError): string {
  const where = error.line ? `${error.file}, строка ${error.line}, позиция ${error.column}` : error.file;
  return `${where}: ${error.message}`;
}

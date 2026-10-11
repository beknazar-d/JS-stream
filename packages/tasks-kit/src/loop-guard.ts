// Защита от бесконечных циклов в скриптах страницы. Код страницы работает
// в iframe, и зависший цикл остановил бы всю вкладку: Worker здесь не
// поможет, потому что скрипту нужен DOM. Поэтому в каждый цикл
// вставляется проверка времени (тот же приём используют онлайн-песочницы).

import type * as TS from 'typescript';

// Модуль typescript целиком (импорт по умолчанию и пространство имён совпадают).
export type FullTypeScript = Omit<typeof TS, 'default'>;

export const LOOP_LIMIT_MS = 1000;
export const LOOP_ERROR = `Цикл выполняется дольше ${LOOP_LIMIT_MS / 1000} с — похоже, он бесконечный. Проверьте условие выхода.`;

function guardTransformer(ts: FullTypeScript): TS.TransformerFactory<TS.SourceFile> {
  return (context) => {
    const f = context.factory;
    let counter = 0;
    const wrapped = new WeakMap<TS.Node, { declaration: TS.Statement; loop: TS.Statement }>();

    const check = (name: string) =>
      // if (Date.now() - __loopN > LIMIT) throw new Error(...)
      f.createIfStatement(
        f.createBinaryExpression(
          f.createBinaryExpression(
            f.createCallExpression(f.createPropertyAccessExpression(f.createIdentifier('Date'), 'now'), undefined, []),
            ts.SyntaxKind.MinusToken,
            f.createIdentifier(name),
          ),
          ts.SyntaxKind.GreaterThanToken,
          f.createNumericLiteral(LOOP_LIMIT_MS),
        ),
        f.createThrowStatement(f.createNewExpression(f.createIdentifier('Error'), undefined, [f.createStringLiteral(LOOP_ERROR)])),
      );

    const withCheck = (body: TS.Statement, name: string): TS.Statement =>
      f.createBlock([check(name), ...(ts.isBlock(body) ? body.statements : [body])], true);

    const visit = (node: TS.Node): TS.Node | TS.Node[] => {
      const visited = ts.visitEachChild(node, visit, context);
      if (
        ts.isWhileStatement(visited) ||
        ts.isDoStatement(visited) ||
        ts.isForStatement(visited) ||
        ts.isForOfStatement(visited) ||
        ts.isForInStatement(visited)
      ) {
        const name = `__loop${counter++}`;
        let loop: TS.Statement;
        if (ts.isWhileStatement(visited)) loop = f.updateWhileStatement(visited, visited.expression, withCheck(visited.statement, name));
        else if (ts.isDoStatement(visited)) loop = f.updateDoStatement(visited, withCheck(visited.statement, name), visited.expression);
        else if (ts.isForStatement(visited))
          loop = f.updateForStatement(visited, visited.initializer, visited.condition, visited.incrementor, withCheck(visited.statement, name));
        else if (ts.isForOfStatement(visited))
          loop = f.updateForOfStatement(visited, visited.awaitModifier, visited.initializer, visited.expression, withCheck(visited.statement, name));
        else loop = f.updateForInStatement(visited, visited.initializer, visited.expression, withCheck(visited.statement, name));
        const declaration = f.createVariableStatement(
          undefined,
          f.createVariableDeclarationList(
            [f.createVariableDeclaration(name, undefined, undefined, f.createCallExpression(f.createPropertyAccessExpression(f.createIdentifier('Date'), 'now'), undefined, []))],
            ts.NodeFlags.Let,
          ),
        );
        const block = f.createBlock([declaration, loop], true);
        wrapped.set(block, { declaration, loop });
        return block;
      }
      // Метка должна стоять на самом цикле (иначе сломается continue метка):
      // { let __loop = ...; метка: цикл }
      if (ts.isLabeledStatement(visited) && wrapped.has(visited.statement)) {
        const { declaration, loop } = wrapped.get(visited.statement)!;
        return f.createBlock([declaration, f.updateLabeledStatement(visited, visited.label, loop)], true);
      }
      return visited;
    };
    return (file) => ts.visitNode(file, visit) as TS.SourceFile;
  };
}

// Возвращает код скрипта страницы с проверками в циклах. Синтаксис и
// версия языка не меняются: страница получает тот же код, что написал человек.
export function guardLoops(ts: FullTypeScript, file: string, source: string): { code: string; errors: { file: string; message: string; line?: number }[] } {
  const output = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext, removeComments: false },
    transformers: { before: [guardTransformer(ts)] },
  });
  const errors = (output.diagnostics ?? []).map((d) => ({
    file,
    message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
    line: d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start).line + 1 : undefined,
  }));
  return { code: output.outputText, errors };
}

// Объяснения типичных ошибок человеческим языком.
// Сообщения движков отличаются (V8, SpiderMonkey, JavaScriptCore),
// поэтому для каждой ошибки есть несколько шаблонов.

interface Rule {
  test: RegExp;
  explain: (match: RegExpMatchArray) => string;
}

const RULES: Rule[] = [
  {
    test: /^(\S+) is not defined$|^Can't find variable: (\S+)$/,
    explain: (m) =>
      `Имя «${m[1] ?? m[2]}» нигде не объявлено. Проверьте опечатку в названии и что переменная объявлена через let, const или function до использования.`,
  },
  {
    test: /Cannot access '(\S+)' before initialization|can't access lexical declaration [`'](\S+)' before initialization/,
    explain: (m) =>
      `Переменная «${m[1] ?? m[2]}» используется раньше строки, где она объявлена. Перенесите объявление выше.`,
  },
  {
    test: /Cannot read propert(?:y|ies) of (undefined|null)(?: \(reading '([^']+)'\))?|(undefined|null) is not an object|can't access property "([^"]+)", \S+ is (undefined|null)/,
    explain: (m) => {
      const kind = m[1] ?? m[3] ?? m[5];
      const prop = m[2] ?? m[4];
      return `Код пытается прочитать свойство${prop ? ` «${prop}»` : ''} у значения ${kind}. Значит, переменная слева от точки пустая: проверьте, что объект существует, или добавьте проверку (например, через ?.).`;
    },
  },
  {
    test: /Cannot set propert(?:y|ies) of (undefined|null)/,
    explain: (m) => `Код записывает свойство в ${m[1]}. Сначала создайте объект, потом заполняйте его поля.`,
  },
  {
    test: /([\w$]+)\)? is not a function|is not a function/,
    explain: (m) =>
      `${m[1] ? `«${m[1]}»` : 'Значение'} вызывается как функция, но функцией не является. Частые причины: функция не экспортирована (нет export), опечатка в имени метода или вызов метода массива у не-массива.`,
  },
  {
    test: /is not iterable/,
    explain: () => 'Значение нельзя перебрать в for...of или разложить через ...: скорее всего, это не массив (а undefined, число или обычный объект).',
  },
  {
    test: /Assignment to constant variable|invalid assignment to const/,
    explain: () => 'Переменной, объявленной через const, присваивается новое значение. Используйте let, если значение должно меняться.',
  },
  {
    test: /Maximum call stack size exceeded|too much recursion/,
    explain: () => 'Функция вызывает сама себя без остановки. Проверьте условие выхода из рекурсии.',
  },
  {
    test: /Invalid array length/,
    explain: () => 'Размер массива получился отрицательным или слишком большим. Проверьте, откуда берётся длина.',
  },
  {
    test: /Unexpected token .* in JSON|JSON\.parse|is not valid JSON/,
    explain: () => 'Строка не является корректным JSON. Проверьте кавычки (в JSON только двойные) и лишние запятые.',
  },
  {
    test: /Unexpected token|Unexpected end of input|missing \) after|expected expression/,
    explain: () => 'Синтаксическая ошибка: код не удаётся прочитать. Проверьте парные скобки, кавычки и запятые около указанного места.',
  },
];

// Убирает из сообщений следы компиляции модулей: (0 , index_js_1.total) → total.
export function cleanMessage(message: string): string {
  return message.replace(/\(0\s*,\s*[\w$]+_\d+\.([\w$]+)\)/g, '$1').replace(/\b[\w$]+_\d+\.([\w$]+)/g, '$1');
}

export function explainError(error: unknown): string | undefined {
  if (!(error instanceof Error) && !(typeof error === 'object' && error && 'message' in error)) {
    return 'Код выбросил значение, которое не является ошибкой (throw без new Error). Используйте throw new Error("...").';
  }
  const message = cleanMessage(String((error as Error).message));
  for (const rule of RULES) {
    const match = message.match(rule.test);
    if (match) return rule.explain(match);
  }
  return undefined;
}

export const TIMEOUT_EXPLANATION =
  'Код не завершился за отведённое время. Скорее всего, где-то бесконечный цикл: проверьте, что условие цикла когда-нибудь становится ложным, а счётчик меняется.';

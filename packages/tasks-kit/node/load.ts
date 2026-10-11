// Загрузка контента курса с диска (для CI и скриптов).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';
import type { TaskBundle } from '../src/evaluate.ts';
import type { TaskMeta } from '../src/meta.ts';

export interface LessonOnDisk {
  id: string;
  dir: string;
  meta: unknown;
  mdx: string | undefined;
  cards: unknown;
  examples: Record<string, string>;
  tasks: { dir: string; bundle: TaskBundle; rawMeta: unknown }[];
}

export interface ModuleOnDisk {
  id: string;
  dir: string;
  meta: unknown;
  lessons: LessonOnDisk[];
}

const isDir = (path: string) => statSync(path).isDirectory();
const exists = (path: string) => {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
};
const read = (path: string) => (exists(path) ? readFileSync(path, 'utf8') : undefined);
const readYaml = (path: string): unknown => {
  const text = read(path);
  return text === undefined ? undefined : parse(text);
};
const subdirs = (path: string) =>
  exists(path)
    ? readdirSync(path)
        .filter((name) => isDir(join(path, name)))
        .sort()
    : [];

function readTree(root: string): Record<string, string> {
  const files: Record<string, string> = {};
  const walk = (dir: string) => {
    for (const name of readdirSync(dir).sort()) {
      const path = join(dir, name);
      if (isDir(path)) walk(path);
      else files[relative(root, path).split('\\').join('/')] = readFileSync(path, 'utf8');
    }
  };
  walk(root);
  return files;
}

export function loadContent(contentRoot: string): ModuleOnDisk[] {
  return subdirs(contentRoot)
    .filter((name) => /^m\d\d-/.test(name))
    .map((moduleName) => {
      const moduleDir = join(contentRoot, moduleName);
      const lessons = subdirs(moduleDir).map((lessonName): LessonOnDisk => {
        const lessonDir = join(moduleDir, lessonName);
        const examplesDir = join(lessonDir, 'examples');
        const tasksDir = join(lessonDir, 'tasks');
        return {
          id: `${moduleName}/${lessonName}`,
          dir: lessonDir,
          meta: readYaml(join(lessonDir, 'lesson.yaml')),
          mdx: read(join(lessonDir, 'lesson.mdx')),
          cards: readYaml(join(lessonDir, 'cards.yaml')),
          examples: exists(examplesDir) ? readTree(examplesDir) : {},
          tasks: subdirs(tasksDir).map((taskName) => {
            const taskDir = join(tasksDir, taskName);
            const files = readTree(taskDir);
            const rawMeta = files['meta.yaml'] === undefined ? undefined : parse(files['meta.yaml']);
            return {
              dir: taskDir,
              rawMeta,
              bundle: {
                id: `${moduleName}/${lessonName}/${taskName}`,
                meta: rawMeta as TaskMeta,
                description: files['task.md'] ?? '',
                files,
              },
            };
          }),
        };
      });
      return { id: moduleName, dir: moduleDir, meta: readYaml(join(moduleDir, 'module.yaml')), lessons };
    });
}

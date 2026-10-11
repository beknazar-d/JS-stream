// Каталог курса: модули → уроки → задания. Метаданные загружаются сразу
// (они маленькие), тексты уроков и файлы заданий — по требованию.

import type { ComponentType } from 'react'
import type { TaskBundle } from '@platform/tasks-kit/evaluate'
import type { Card, LessonMeta, ModuleMeta, TaskMeta } from '@platform/tasks-kit/meta'

type MdxModule = { default: ComponentType<{ components?: Record<string, unknown> }> }

const moduleMetas = import.meta.glob<ModuleMeta>('../../../content/*/module.yaml', { eager: true, import: 'default' })
const lessonMetas = import.meta.glob<LessonMeta>('../../../content/*/*/lesson.yaml', { eager: true, import: 'default' })
const lessonCards = import.meta.glob<Card[]>('../../../content/*/*/cards.yaml', { eager: true, import: 'default' })
const taskMetas = import.meta.glob<TaskMeta>('../../../content/*/*/tasks/*/meta.yaml', { eager: true, import: 'default' })
const lessonBodies = import.meta.glob<MdxModule>('../../../content/*/*/lesson.mdx')
const taskDescriptions = import.meta.glob<MdxModule>('../../../content/*/*/tasks/*/task.md')
const solutionNotes = import.meta.glob<MdxModule>('../../../content/*/*/tasks/*/solution/README.md')
const taskSources = import.meta.glob<string>('../../../content/*/*/tasks/*/**/*.{js,ts}', {
  query: '?raw',
  import: 'default',
})
const exampleSources = import.meta.glob<string>('../../../content/*/*/examples/*', { query: '?raw', import: 'default' })
const mediaUrls = import.meta.glob<string>('../../../content/*/*/media/*', { eager: true, query: '?url', import: 'default' })

const PREFIX = '../../../content/'

export interface TaskInfo {
  id: string // m01-js-basics/l01-values/t01-to-number
  slug: string
  moduleSlug: string
  lessonSlug: string
  meta: TaskMeta
}

export interface LessonInfo {
  id: string // m01-js-basics/l01-values
  slug: string
  moduleSlug: string
  meta: LessonMeta
  cards: Card[]
  tasks: TaskInfo[]
}

export interface ModuleInfo {
  slug: string
  meta: ModuleMeta
  lessons: LessonInfo[]
}

function strip(path: string): string[] {
  return path.slice(PREFIX.length).split('/')
}

function buildCatalog(): ModuleInfo[] {
  const modules = new Map<string, ModuleInfo>()
  for (const [path, meta] of Object.entries(moduleMetas)) {
    const [slug] = strip(path)
    modules.set(slug, { slug, meta, lessons: [] })
  }
  const lessons = new Map<string, LessonInfo>()
  for (const [path, meta] of Object.entries(lessonMetas)) {
    const [moduleSlug, slug] = strip(path)
    const id = `${moduleSlug}/${slug}`
    const lesson: LessonInfo = { id, slug, moduleSlug, meta, cards: lessonCards[`${PREFIX}${id}/cards.yaml`] ?? [], tasks: [] }
    lessons.set(id, lesson)
    modules.get(moduleSlug)?.lessons.push(lesson)
  }
  for (const [path, meta] of Object.entries(taskMetas)) {
    const [moduleSlug, lessonSlug, , slug] = strip(path)
    const lesson = lessons.get(`${moduleSlug}/${lessonSlug}`)
    lesson?.tasks.push({ id: `${moduleSlug}/${lessonSlug}/${slug}`, slug, moduleSlug, lessonSlug, meta })
  }
  for (const lesson of lessons.values()) lesson.tasks.sort((a, b) => a.meta.order - b.meta.order)
  for (const module of modules.values()) module.lessons.sort((a, b) => a.meta.order - b.meta.order)
  return [...modules.values()].sort((a, b) => a.meta.number - b.meta.number)
}

export const catalog: ModuleInfo[] = buildCatalog()

export function findModule(slug: string | undefined) {
  return catalog.find((m) => m.slug === slug)
}

export function findLesson(moduleSlug: string | undefined, lessonSlug: string | undefined) {
  return findModule(moduleSlug)?.lessons.find((l) => l.slug === lessonSlug)
}

export function findTask(moduleSlug?: string, lessonSlug?: string, taskSlug?: string) {
  return findLesson(moduleSlug, lessonSlug)?.tasks.find((t) => t.slug === taskSlug)
}

export const allLessons = (): LessonInfo[] => catalog.flatMap((m) => m.lessons)
export const allTasks = (): TaskInfo[] => allLessons().flatMap((l) => l.tasks)

export function lessonUrl(lesson: { moduleSlug: string; slug: string }) {
  return `/${lesson.moduleSlug}/${lesson.slug}`
}

export function taskUrl(task: TaskInfo) {
  return `/${task.moduleSlug}/${task.lessonSlug}/${task.slug}`
}

// Соседи задания в уроке: для кнопок «назад» и «дальше».
export function taskNeighbours(task: TaskInfo) {
  const lesson = findLesson(task.moduleSlug, task.lessonSlug)!
  const index = lesson.tasks.findIndex((t) => t.id === task.id)
  return { prev: lesson.tasks[index - 1], next: lesson.tasks[index + 1], lesson }
}

export async function loadLessonBody(lesson: LessonInfo) {
  const loader = lessonBodies[`${PREFIX}${lesson.id}/lesson.mdx`]
  return loader ? (await loader()).default : undefined
}

export async function loadExample(lessonId: string, name: string) {
  const entry = Object.entries(exampleSources).find(([path]) => {
    const file = path.slice(`${PREFIX}${lessonId}/examples/`.length)
    return path.startsWith(`${PREFIX}${lessonId}/examples/`) && (file === name || file.replace(/\.[jt]s$/, '') === name)
  })
  if (!entry) return undefined
  return { file: entry[0].split('/').pop()!, source: await entry[1]() }
}

export function mediaUrl(lessonId: string, name: string): string | undefined {
  return mediaUrls[`${PREFIX}${lessonId}/media/${name}`]
}

export interface LoadedTask {
  bundle: TaskBundle
  Description: MdxModule['default']
  SolutionNotes?: MdxModule['default']
}

export async function loadTask(task: TaskInfo): Promise<LoadedTask> {
  const base = `${PREFIX}${task.moduleSlug}/${task.lessonSlug}/tasks/${task.slug}/`
  const entries = Object.entries(taskSources).filter(([path]) => path.startsWith(base))
  const files: Record<string, string> = {}
  await Promise.all(
    entries.map(async ([path, load]) => {
      files[path.slice(base.length)] = await load()
    }),
  )
  const description = await taskDescriptions[`${base}task.md`]?.()
  const notes = await solutionNotes[`${base}solution/README.md`]?.()
  return {
    bundle: { id: task.id, meta: task.meta, description: '', files },
    Description: description?.default ?? (() => null),
    SolutionNotes: notes?.default,
  }
}

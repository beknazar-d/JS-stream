// Редактор Monaco (движок VS Code). Грузится лениво, только на странице задания.
import { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/editor/editor.worker.js?worker'
import TsWorker from 'monaco-editor/languages/features/typescript/ts.worker.js?worker'
import CssWorker from 'monaco-editor/languages/features/css/css.worker.js?worker'
import HtmlWorker from 'monaco-editor/languages/features/html/html.worker.js?worker'
import testGlobals from './test-globals.d.ts.txt?raw'

// Workers редактора собирает Vite: базовый и языковой для JS/TS.
self.MonacoEnvironment = {
  getWorker(_id: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new TsWorker()
    if (label === 'css' || label === 'scss' || label === 'less') return new CssWorker()
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new HtmlWorker()
    return new EditorWorker()
  },
}

let configured = false
function configure() {
  if (configured) return
  configured = true
  const ts = monaco.typescript
  const options = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    allowJs: true,
    allowNonTsExtensions: true,
    strict: true,
    noEmit: true,
  }
  ts.typescriptDefaults.setCompilerOptions(options)
  ts.javascriptDefaults.setCompilerOptions(options)
  ts.typescriptDefaults.addExtraLib(testGlobals, 'file:///platform-test-globals.d.ts')
  ts.javascriptDefaults.addExtraLib(testGlobals, 'file:///platform-test-globals.d.ts')
}

function currentTheme() {
  const forced = document.documentElement.dataset.theme
  const dark = forced ? forced === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  return dark ? 'vs-dark' : 'vs'
}

function languageOf(file: string) {
  if (/\.tsx?$/.test(file)) return 'typescript'
  if (/\.html?$/.test(file)) return 'html'
  if (/\.css$/.test(file)) return 'css'
  return 'javascript'
}

export interface CodeEditorProps {
  // Все файлы, которые редактор должен знать (для подсказок по импортам).
  files: Record<string, string>
  active: string
  readOnlyFiles?: string[]
  onChange: (file: string, value: string) => void
  onRun: () => void
  label: string
}

export default function CodeEditor({ files, active, readOnlyFiles = [], onChange, onRun, label }: CodeEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(undefined)
  const modelsRef = useRef(new Map<string, monaco.editor.ITextModel>())
  const handlers = useRef({ onChange, onRun })
  useEffect(() => {
    handlers.current = { onChange, onRun }
  }, [onChange, onRun])

  // Модели файлов: создаются один раз, обновляются при сбросе кода.
  useEffect(() => {
    configure()
    const models = modelsRef.current
    for (const [file, source] of Object.entries(files)) {
      const existing = models.get(file)
      if (!existing) {
        const model = monaco.editor.createModel(source, languageOf(file), monaco.Uri.parse(`file:///${file}`))
        model.onDidChangeContent(() => handlers.current.onChange(file, model.getValue()))
        models.set(file, model)
      } else if (existing.getValue() !== source) {
        existing.setValue(source)
      }
    }
  }, [files])

  useEffect(() => {
    const models = modelsRef.current
    const editor = monaco.editor.create(hostRef.current!, {
      model: null,
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 14,
      tabSize: 2,
      scrollBeyondLastLine: false,
      ariaLabel: label,
      theme: currentTheme(),
      accessibilitySupport: 'auto',
    })
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => handlers.current.onRun())
    editorRef.current = editor
    const onTheme = () => monaco.editor.setTheme(currentTheme())
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    window.addEventListener('themechange', onTheme)
    media.addEventListener('change', onTheme)
    return () => {
      window.removeEventListener('themechange', onTheme)
      media.removeEventListener('change', onTheme)
      editor.dispose()
      for (const model of models.values()) model.dispose()
      models.clear()
    }
  }, [label])

  useEffect(() => {
    const editor = editorRef.current
    const model = modelsRef.current.get(active)
    if (editor && model && editor.getModel() !== model) editor.setModel(model)
    editor?.updateOptions({ readOnly: readOnlyFiles.includes(active) })
  }, [active, files, readOnlyFiles])

  return <div ref={hostRef} className="editor-host" />
}

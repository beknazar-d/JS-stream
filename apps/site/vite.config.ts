import { fileURLToPath } from 'node:url'
import mdx from '@mdx-js/rollup'
import rehypeShiki from '@shikijs/rehype'
import react from '@vitejs/plugin-react'
import remarkGfm from 'remark-gfm'
import { defineConfig, type Plugin } from 'vite'
import { parse } from 'yaml'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))

// meta.yaml, lesson.yaml, cards.yaml импортируются как готовые объекты.
function yaml(): Plugin {
  return {
    name: 'content-yaml',
    transform(code, id) {
      if (!id.endsWith('.yaml')) return
      return { code: `export default ${JSON.stringify(parse(code))};`, map: null }
    },
  }
}

export default defineConfig({
  plugins: [
    yaml(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false }],
        ],
      }),
    },
    react({ include: /\.(mdx|md|jsx|js|tsx|ts)$/ }),
  ],
  server: { fs: { allow: [repoRoot] } },
  worker: { format: 'es' },
  build: { target: 'es2022' },
})

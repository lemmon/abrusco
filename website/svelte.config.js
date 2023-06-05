import adapter from '@sveltejs/adapter-vercel'
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import lolight from 'lolight'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],
  kit: {
    adapter: adapter(),
    inlineStyleThreshold: 10240,
  },
  preprocess: [
    sveltePreprocess({
      postcss: true,
    }),
    mdsvex({
      layout: './src/lib/layout.svelte',
      highlight: {
        highlighter: (code, lang) => {
          return `<pre class=""><code class="code lang-${lang}">${lolight
            .tok(code)
            .map(([token, text]) => `<span class="token token--${token}">{\`${text}\`}</span>`)
            .join('')}</code></pre>`
        },
      },
    }),
  ],
}

export default config

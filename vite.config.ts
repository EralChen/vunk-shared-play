import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import md from 'unplugin-vue-markdown/vite'
import { demoContainerPlugin, DemoContainerPluginSettings, copyableFencePlugin } from '@vunk/shared/markdown/plugins'
import { highlight } from '@vunk/shared/markdown/shiki'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    md({
      markdownItOptions: {
        highlight: (await highlight({
          dark: 'github-dark',
          light: 'github-light',
        }, {})),
      },
      markdownItSetup (mdit) {
        mdit.use(copyableFencePlugin)
        mdit.use(demoContainerPlugin, {
          root: path.resolve(__dirname, './src/demos'),
          globSource: '**/*.vue'
        } as DemoContainerPluginSettings)
      },
      wrapperClasses: [
        'vp-doc'
      ]
    }),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

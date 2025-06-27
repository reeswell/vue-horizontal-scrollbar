
import type { App, Plugin } from 'vue'

import VueHorizontalScrollbar from './components/VueHorizontalScrollbar.vue'
import type {
  HorizontalScrollbarProps,
  HorizontalScrollbarEmits,
  HorizontalScrollbarExpose
} from './types'
export type {
  HorizontalScrollbarProps,
  HorizontalScrollbarEmits,
  HorizontalScrollbarExpose
}

const HorizontalScrollbarPlugin: Plugin = {
  install(app: App) {
    app.component('VueHorizontalScrollbar', VueHorizontalScrollbar)
  }
}

export { VueHorizontalScrollbar, HorizontalScrollbarPlugin }

export default HorizontalScrollbarPlugin

// Version
export const version = '__VERSION__'

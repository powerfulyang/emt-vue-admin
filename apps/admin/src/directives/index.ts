import type { App } from 'vue'
import copyDirective from '@/directives/modules/copy'

export function setupDirectives(app: App<Element>) {
  app.directive('copy', copyDirective())
}

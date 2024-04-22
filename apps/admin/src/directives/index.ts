import copyDirective from '@/directives/modules/copy';
import type { App } from 'vue';

export const setupDirectives = (app: App<Element>) => {
  app.directive('copy', copyDirective());
};

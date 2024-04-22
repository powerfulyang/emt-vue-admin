import { NIcon } from 'naive-ui';
import type { VNodeChild } from 'vue';
import { h } from 'vue';

export function renderIcon(icon: any): () => VNodeChild {
  return () => h(NIcon, null, { default: () => h(icon) });
}

import ClipboardJS from 'clipboard';
import type { Directive } from 'vue';

export interface CopyElement extends Element, Record<string, any> {
  $value: string;
  $$clipboard: ClipboardJS | null;
}
export type CustomDirectiveFC<T, K> = () => Directive<T, K>;

const createClipboard = (el: CopyElement, value: string) => {
  el.$$clipboard = new ClipboardJS(el, {
    text: () => value,
  });

  el.$$clipboard.on('success', () => {
    window.$message.success('复制成功');
  });
  el.$$clipboard.on('error', () => {
    window.$message.error('复制失败');
  });
};

const copyDirective: CustomDirectiveFC<CopyElement, string> = () => {
  return {
    mounted: (el, { value }) => {
      createClipboard(el, value);
    },
    updated: (el, { value, oldValue }) => {
      if (value !== oldValue) {
        el.$$clipboard?.destroy();
        createClipboard(el, value);
      }
    },
    beforeUnmount: (el: CopyElement) => {
      if (el.$$clipboard) {
        el.$$clipboard?.destroy();
        el.$$clipboard = null;
      }
    },
  };
};

export default copyDirective;

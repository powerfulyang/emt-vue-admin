declare global {
  import type { PropType as VuePropType } from 'vue'

	declare type PropType<T> = VuePropType<T>
}

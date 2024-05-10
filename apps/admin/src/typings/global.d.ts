export {}

declare global {
  import type { PropType as VuePropType } from 'vue'

	declare type PropType<T> = VuePropType<T>

	declare const $tt: import('@/locales').Translate

	declare const $message: import('naive-ui').MessageApi
	declare const $dialog: import('naive-ui').DialogApi
	declare const $notification: import('naive-ui').NotificationApi
	declare const $loadingBar: import('naive-ui').LoadingBarApi
}

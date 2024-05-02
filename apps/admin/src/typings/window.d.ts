interface Window {
  $message: import('naive-ui').MessageApi
  $dialog: import('naive-ui').DialogApi
  $notification: import('naive-ui').NotificationApi
  $loadingBar: import('naive-ui').LoadingBarApi

  $translate: typeof import('@/locales').$translate
}

import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { fetchUserInfo, login as postLogin } from './service'
import { useUserStore } from '@/store/modules/user.ts'
import { useRouteStore } from '@/store'
import { localStg } from '@/utils'

export const useAuthStore = defineStore('auth-store', () => {
  const router = useRouter()
  const route = useRoute()
  const routeStore = useRouteStore()
  const userStore = useUserStore()

  const token = ref(localStg.get('token'))
  const userInfo = ref(localStg.get('userInfo'))
  const loginLoading = ref(false)

  const reset = (timeout = 0) => {
    localStg.remove('token')
    localStg.remove('userInfo')
    setTimeout(() => {
      token.value = localStg.get('token')
      userInfo.value = localStg.get('userInfo')
    }, timeout)
  }

  const getUserInfo = async () => {
    const _userInfo = await fetchUserInfo()
    localStg.set('userInfo', _userInfo)
    userInfo.value = _userInfo
  }

  const login = async (userName: string, password: string) => {
    loginLoading.value = true
    try {
      const _token = await postLogin(userName, password)
      localStg.set('token', _token)
      token.value = _token
      await getUserInfo()
      await routeStore.init()
      loginLoading.value = false
      window.$notification.success({
        title: window.$t('login.loginSuccess'),
        content: window.$t('login.welcomeBack', {
          userName: userInfo.value?.userName,
        }),
        duration: 3000,
      })
      await router.push(route.query.redirect ? (route.query.redirect as string) : { name: 'Root' })
    }
    catch (e) {
      console.warn(e)
      loginLoading.value = false
      reset()
    }
  }

  const logout = async () => {
    const redirect = route.fullPath
    // 设置 500 毫秒延迟，避免页面出现空白
    await userStore.logout()
    await router.push({ name: 'Login', query: { redirect } })
  }

  return {
    userInfo,
    loginLoading,
    reset,
    login,
    logout,
  }
})

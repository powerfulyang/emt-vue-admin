import type { User } from '@root/mocks/sys/user.ts'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { request } from '@/request'

export interface UserInfoType extends User {

}

export interface IUserState {
  userInfo?: UserInfoType
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    userInfo: undefined,
  }),
  getters: {
    getUserInfo(): UserInfoType {
      return this.userInfo!
    },
  },
  actions: {
    // 登录
    async login(username: string, password: string) {
      const user = await request<User>('/api/login', {
        method: 'POST',
        data: {
          username,
          password,
        },
      })
      this.userInfo = user
      return user
    },
    // 查询用户信息
    async fetchUserInfo() {
      try {
        const user = await request<User>('/api/user/info', {
          showErrorMessage: false,
        })
        this.userInfo = user
        return user
      }
      catch {
        this.userInfo = undefined
        return undefined
      }
    },
    // 退出登录
    async logout() {
      await request('/api/logout', {
        method: 'POST',
      })
      this.userInfo = undefined
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useUserStore, import.meta.hot),
  )
}

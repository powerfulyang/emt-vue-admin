import { acceptHMRUpdate, defineStore } from 'pinia'

// 长时间不操作默认锁屏时间
const initTime = 60 * 60

const isLocked = false

export interface IScreenLockState {
  isLocked: boolean // 是否锁屏
  lockTime: number
}

export const useScreenLockStore = defineStore({
  id: 'app-screen-lock',
  state: (): IScreenLockState => ({
    isLocked: isLocked === true, // 是否锁屏
    lockTime: isLocked == 'true' ? initTime : 0,
  }),
  getters: {},
  actions: {
    setLock(payload: boolean) {
      this.isLocked = payload
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScreenLockStore, import.meta.hot))
}

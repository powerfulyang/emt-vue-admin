<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query'
import type { FormInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/store/modules/user.ts'

definePage({
  name: 'Login',
})

const formRef = ref<FormInst>(null!)
const message = useMessage()

const formInline = shallowReactive({
  username: 'admin',
  password: 'admin',
  remember: true,
})

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)

const { mutate: login } = useMutation({
  onMutate() {
    loading.value = true
  },
  onError() {
    loading.value = false
  },
  mutationFn: async () => {
    return userStore.login(formInline.username, formInline.password)
  },
  onSuccess(data) {
    router.push(data.homePath)
  },
})

onUnmounted(() => {
  loading.value = false
  message.destroyAll()
})

const rules = {
  username: { required: true, trigger: 'blur' },
  password: { required: true, trigger: 'blur' },
}

function handleSubmit(e: Event) {
  e.preventDefault()
  formRef.value.validate(async (errors) => {
    if (!errors) {
      login()
    }
  })
}
</script>

<template>
  <div class="login-page">
    <div class="flex justify-end h-10 pr-4">
      <lang-select with-hover-container />
    </div>
    <div class="m-auto w-350px">
      <div class="pt-4 sm:pt-16 pb-8">
        <div class="text-3rem flex items-center gap-4 justify-center">
          <i-fluent-emoji-smiling-cat-with-heart-eyes />
          <span class="text-2xl pt-2">
            EMT Admin
          </span>
        </div>
        <n-p depth="3" class="mt-4 text-center">
          {{ $tt('login.welcome') }}
        </n-p>
      </div>
      <div>
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <i-mdi-person-outline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-on="click"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <i-mdi-lock-outline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <div class="flex justify-between">
              <div>
                <n-checkbox v-model:checked="formInline.remember">
                  {{ $tt('login.remember') }}
                </n-checkbox>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" size="large" :loading="loading" block @click="handleSubmit">
              {{ $tt('login.login') }}
            </n-button>
          </n-form-item>
          <n-form-item>
            <div class="flex w-full items-center gap-2">
              <span>
                {{ $tt('login.otherLogin') }}
              </span>
              <n-icon size="24" class="cursor-pointer" @click="message.info($tt('login.notImplemented'))">
                <i-mdi-github />
              </n-icon>
              <div class="ml-auto">
                <a class="cursor-pointer" @click="message.info($tt('login.notImplemented'))">
                  {{ $tt('login.register') }}
                </a>
              </div>
            </div>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
	height: 100vh;
}
@media (min-width: 768px) {
    .login-page {
      background-image: url('@/assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }
  }
</style>

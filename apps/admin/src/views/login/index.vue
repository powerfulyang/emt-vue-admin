<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query'
import type { FormInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { LockClosedOutline, LogoFacebook, LogoGithub, PersonOutline } from '@vicons/ionicons5'
import { useUserStore } from '@/store/modules/user.ts'
import { websiteConfig } from '@/config/website.config.ts'

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

const { mutate: login, isPending: loading } = useMutation({
  mutationFn: async () => {
    return userStore.login(formInline.username, formInline.password)
  },
  onSettled() {
    message.destroyAll()
  },
  onSuccess(data) {
    message.success('登录成功')
    router.push(data.homePath)
  },
})

const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
}

function handleSubmit(e: Event) {
  e.preventDefault()
  formRef.value.validate(async (errors) => {
    if (!errors) {
      message.loading('登录中...')
      login()
    }
    else {
      message.error('请填写完整信息，并且进行验证码校验')
    }
  })
}
</script>

<template>
  <div class="view-account">
    <div class="view-account-header" />
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img :src="websiteConfig.loginImage" alt="">
        </div>
        <div class="view-account-top-desc">
          {{ websiteConfig.loginDesc }}
        </div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="formInline.remember">
                  记住密码
                </n-checkbox>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" size="large" :loading="loading" block @click="handleSubmit">
              登录
            </n-button>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex view-account-other">
              <div class="flex-initial">
                <span>其它登录方式</span>
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoGithub />
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoFacebook />
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial" style="margin-left: auto">
                <a class="cursor-pointer" @click="message.info('请使用 SSO 登录, 将自动注册账号')">
                  注册账号
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
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      flex: 1;
      padding: 32px 12px;
      max-width: 384px;
      min-width: 320px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('@/assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

definePage({
  name: 'NotFound',
})

const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col justify-center page-container">
    <div class="text-center">
      <img src="@/assets/images/exception/404.svg" alt="">
    </div>
    <div class="text-center">
      <h1 class="text-base">
        抱歉，你访问的页面不存在
      </h1>
      <n-button type="primary" @click="goHome">
        回到首页
      </n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-container {
    width: 100%;
    border-radius: 4px;
    padding: 50px 0;
    height: 100vh;

    .text-center {
      h1 {
        color: #666;
        padding: 20px 0;
      }
    }

    img {
      width: 350px;
      margin: 0 auto;
    }
  }
</style>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col justify-center page-container">
    <div class="text-center">
      <img src="@/assets/images/exception/403.svg" alt="">
    </div>
    <div class="text-center">
      <h1 class="text-base">
        抱歉，你无权访问该页面
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

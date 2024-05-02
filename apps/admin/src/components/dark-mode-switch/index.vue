<script setup lang="ts">
import { localStg } from '@/utils'

defineOptions({ name: 'DarkModeSwitch' })

const props = withDefaults(defineProps<Props>(), {
  dark: false,
})

const emit = defineEmits<Emits>()

interface Props {
  dark?: boolean
}

interface Emits {
  (e: 'update:dark', darkMode: boolean): void
}

const darkMode = computed({
  get() {
    return props.dark
  },
  set(newVal: boolean) {
    localStg.set('theme', newVal ? 'dark' : 'light')
    emit('update:dark', newVal)
  },
})

async function handleSwitch() {
  darkMode.value = !darkMode.value
}
</script>

<template>
  <div class="flex justify-center items-center text-18px cursor-pointer" @click="handleSwitch">
    <i-mdi-moon-waning-crescent v-if="darkMode" />
    <i-mdi-white-balance-sunny v-else />
  </div>
</template>

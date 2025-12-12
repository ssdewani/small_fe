<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useAuth } from '@clerk/vue'
import { watch } from 'vue'

const { isLoaded, userId } = useAuth()
const router = useRouter()
const route = useRoute()

watch([isLoaded, userId, () => route.path], ([loaded, signedIn, path]) => {
  if (!loaded) return

  if (signedIn && path === '/') {
    router.push('/app')
  } else if (!signedIn && path === '/app') {
    router.push('/')
  }
}, { immediate: true })
</script>

<template>
  <RouterView />
</template>

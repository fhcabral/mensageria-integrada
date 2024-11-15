<script setup>
import { watchEffect, ref } from 'vue'
import { authStorage } from "~/store/auth/store"
import CardCarregamento from '~/components/CardCarregamento.vue';

const isLoading = ref(false)

watchEffect(async () => {
  isLoading.value = true;
  const storage = authStorage()
  const auth = storage.getToken()

  if (auth) {
    try {
      await navigateTo('/home', { 
        replace: true,
        force: true 
      })
    } catch (error) {
      console.error('Erro no redirecionamento:', error)
    }
  }
  isLoading.value = false
})
</script>

<template>
  <CardCarregamento v-if="isLoading"/>
</template>
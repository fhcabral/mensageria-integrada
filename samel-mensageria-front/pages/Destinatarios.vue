<template>
  <div>
    <MazBtn 
      color="theme" 
      class="backButton text-white flex items-center mt-4 ml-4"
      @click="goBack"
    >
      <span class="mr-2">&#8592;</span>
      Voltar
    </MazBtn>
  </div>
  <div
    class="flex flex-col items-center w-full p-4 dark:text-lightMode-100 text-darkTheme-100 bg-lightMode-100 dark:bg-darkTheme-200 text-2xl font-semibold"
  >
    <div class="flex w-5/6">
      <Destinatarios />
    </div>
  </div>
</template>

<script setup lang="ts">
import Destinatarios from '~/components/Destinatarios/Destinatarios.vue';

const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<style scoped>
</style>
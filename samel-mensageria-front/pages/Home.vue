<template>
  <Header />
  <div
    class="flex flex-col items-center w-full p-4 dark:text-lightMode-100 text-darkTheme-100 bg-lightMode-100 dark:bg-darkTheme-200 text-2xl font-semibold"
  >
    <div class="flex w-5/6 h-[400px]">
      <Listas />
    </div>
  </div>
</template>

<script setup lang="ts">
import Listas from '~/components/ListDest/Listas.vue';
</script>

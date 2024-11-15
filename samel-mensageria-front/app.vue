<script setup lang="ts">
import CardCarregamento from './components/CardCarregamento.vue';
import { storeList } from './store/msg-list/store';
const loadingStore = storeList();
</script>

<template>
  <div class="bg-lightMode-100 dark:bg-darkTheme-200 h-screen">
    <CardCarregamento v-if="loadingStore.loading"/>
    <NuxtPage />
  </div>
</template>

<template>
  <div v-if="route.name !== 'Login'" class="flex w-full justify-between bg-lightMode-100 text-darkTheme-100 dark:bg-darkTheme-200 text p-4 dark:text-lightMode-100">
    <h1 class="font-semibold">//MENSAGERIA SAMEL</h1>

      <div class="flex gap-4">
        <button
        class="dark:bg-zinc-100 bg-zinc-800 p-2 rounded-lg transition-colors duration-200 ease-in-out"
          @click="setColorTheme(colorMode.preference === 'dark' ? 'light' : 'dark')"
        >
          <span v-if="colorMode.preference === 'dark'" v-html="icon_moon(20, '#121212')"></span>
          <span v-else v-html="icon_sunny(20, '#FFFF')"></span>
        </button>
        
        <button @click="logout">
          Sair
        </button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { icon_moon, icon_sunny } from '~/utils/icons';
import { authStorage } from '~/store/auth/store';

const storage = authStorage()
const colorMode = useColorMode();
const route = useRoute();
type Theme = "light" | "dark";

const logout = () => {
  storage.logout()
  navigateTo('/Login')
}

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};
</script>

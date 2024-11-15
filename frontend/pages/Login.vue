<template>
  <div
    class="w-full flex items-center justify-center h-screen dark:bg-darkTheme-200 bg-lightMode-100 dark:text-lightMode-100 text-darkTheme-200"
  >
    <div
      class="flex flex-col gap-10 w-2/5 items-center shadow-xl dark:bg-darkTheme-100 bg-lightMode-100 rounded-lg p-6"
    >
      <header class="flex w-full justify-center items-center">
        <h1 class="font-semibold text-xl">Login mensageria Samel</h1>
      </header>
      <form
        class="w-full flex flex-col gap-10 justify-center items-center mt-10"
      >
        <MazInput
          class="w-full"
          v-model="values_reactive.username"
          label="Digite seu usuário"
          autocomplete="username"
          required
        >
          <template #left-icon>
            <span v-html="icon_user(20, '#525472')"></span>
          </template>
        </MazInput>

        <MazInput
          class="w-full"
          v-model="values_reactive.password"
          label="Digite sua senha"
          type="password"
          autocomplete="current-password"
          required
        >
          <template #left-icon>
            <span v-html="icon_key(20, '#525472')"></span>
          </template>
        </MazInput>

        <MazBtn @click="login" block>Entrar</MazBtn>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import pkg from 'crypto-js';
const { SHA1 } = pkg;

import { icon_user, icon_key } from "~/utils/icons";
import type { ILogin, ILoginResult } from "~/services/login/types";
import { authStorage } from "~/store/auth/store";

const storage = authStorage()
const { $http } = useNuxtApp();


const values_reactive = computed<ILogin>(() => {
  return reactive({
    username: "",
    password: "",
  });
});

const login = async () => {
  const hashedPassword = SHA1(values_reactive.value.password).toString();
  const result = await $http.login.loginUser({
    username: values_reactive.value.username,
    password: hashedPassword,
  }) as ILoginResult
  storage.setToken(result.token)
  storage.setUsername(result.username)
  storage.setLoginTimeStamp(Date.now())
  
  if(result) {
    useRouter().push('/Home');
  }
};
</script>

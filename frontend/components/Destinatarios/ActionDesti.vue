<template>
  <MazDialog v-model="isDialogOpen" title="Adicionar nova lista">
    <div class="flex flex-col gap-4">
      <MazInput
        class="w-full"
        v-model="values_reactive.fist_name"
        label="Primeiro nome"
        autocomplete="off"
      />
      <MazInput
        class="w-full"
        v-model="values_reactive.full_name"
        label="Nome completo"
        autocomplete="off"
      />
      <MazInput
        class="w-full"
        v-model="values_reactive.telephone"
        label="Telefone"
        autocomplete="off"
      />
    </div>
    <template #footer="{ close }">
      <MazBtn @click="updateList(close)">Salvar</MazBtn>
    </template>
  </MazDialog>
</template>

<script setup lang="ts">
import { useCustomToast } from "~/composables/useToast";
import { mount_json_update_recipient } from '~/validator';

const { showSuccessToast, showErrorToast } = useCustomToast();
const { $http } = useNuxtApp();
const isDialogOpen = inject("isDialogOpen", ref(false));

const props = defineProps<{ select_item: any; }>();

const values_reactive = computed(() => {
  return props.select_item;
});

const updateList = async (close: () => void) => {
  try {
    const json = mount_json_update_recipient(values_reactive.value);

    await $http.recipient.updateRecipient(json);

    showSuccessToast("Destinatário atualizado com sucesso!");
    close();
  } catch (error) {
    showErrorToast("Erro ao atualizar destinatário");
  }
};
</script>

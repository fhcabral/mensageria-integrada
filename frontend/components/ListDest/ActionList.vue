<template>
  <MazDialog v-model="isDialogOpen" title="Adicionar nova lista">
    <div>
      <MazInput
        class="w-full"
        v-model="values_reactive.list_name"
        label="Nome da lista"
        autocomplete="off"
      />
    </div>
    <template #footer="{ close }">
      <MazBtn @click="createList(close)">Salvar</MazBtn>
    </template>
  </MazDialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"; // Importar o ref para controlar a abertura do diálogo
import { useCustomToast } from "~/composables/useToast";
import MazDialog from "maz-ui/components/MazDialog";
import MazInput from "maz-ui/components/MazInput";
import MazBtn from "maz-ui/components/MazBtn";
import { mount_json_list } from "~/validator/index";
import { useNuxtApp } from "#imports";

const { showSuccessToast, showErrorToast } = useCustomToast();
const { $http } = useNuxtApp();
const emit = defineEmits(["save"]);

const isDialogOpen = inject("isDialogOpen", ref(false));
const props = defineProps<{ select_item: any; type: string }>();
const type = computed(() => props.type);

const values_reactive = computed(() => {
  if (type.value === "create") {
    return reactive({
      id: 0,
      list_name: "",
    });
  } else {
    return props.select_item;
  }
});

const createList = async (close: () => void) => {
  try {
    const json = mount_json_list(values_reactive.value, type.value);
    type.value === "create"
      ? await $http.list.createList(json)
      : await $http.list.editList(json);

    showSuccessToast(
      type.value === "edit"
        ? "Lista editada com sucesso!"
        : "Lista criada com sucesso!"
    );

    emit("save");
    close();
  } catch (error) {
    showErrorToast("Erro ao criar lista!");
    console.error("Erro ao criar lista:", error);
  }
};
</script>

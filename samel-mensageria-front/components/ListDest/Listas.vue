<template>
  <div class="w-full mb-10 mt-2">
    <div class="flex justify-between w-full">
      <h1>Listas de destinatários</h1>
      <MazBtn @click="create" color="secondary" style="bottom: 10px;" >Adicionar</MazBtn>
    </div>
    <MazTable
      v-if="listMsg.length > 0"
      width="100%"
      size="sm"
      sortable
      hoverable
      :headers="header_lista"
      :rows="listMsg"
      pagination
    >
      <template #actions="{ row }">
        <div class="flex gap-3">
          <MazBtn fab size="xs" color="danger" @click.stop="deleteItem(row.id)">
            <template #left-icon>
              <span v-html="icon_trash(20, '#FFFF')" />
            </template>
          </MazBtn>
          <MazBtn fab size="xs" color="primary" @click.stop="editItem(row)">
            <template #left-icon>
              <span v-html="icon_pen(20, '#FFFF')" />
            </template>
          </MazBtn>
          <MazBtn
            fab
            size="xs"
            color="secondary"
            @click="linkDestinatarios(row)"
          >
            <template #left-icon>
              <span v-html="icon_eye(20, '#FFFF')" />
            </template>
          </MazBtn>
        </div>
      </template>
    </MazTable>

    <ActionList
      @save="getListMsg"
      :select_item="select_item"
      :type="type"
    />
  </div>
</template>

<script setup lang="ts">
import MazTable from "maz-ui/components/MazTable";
import { icon_trash, icon_pen, icon_eye } from '@/utils/icons'
import { header_lista } from "./headerTableList";
import type { IListMsg } from "~/services/msg-list/types";
import ActionList from "./ActionList.vue";
import { storeList } from "~/store/msg-list/store";
import { ref, onMounted } from "vue";
import { useCustomToast } from "#imports";

const { showSuccessToast, showErrorToast } = useCustomToast();
const { $http } = useNuxtApp();
const store = storeList();

const isDialogOpen = ref(false); 
provide('isDialogOpen', isDialogOpen);

const type = ref<string>("");
const select_item = ref<any | null>(null);
const listMsg = ref<IListMsg[]>([]);

onMounted(async () => {
  await getListMsg();
});

const create = () => {
  type.value = "create";
  select_item.value = null;
  isDialogOpen.value = true;
};

const editItem = (value: any) => {
  type.value = "edit";
  select_item.value = value;
  isDialogOpen.value = true;
};

const getListMsg = async () => {
  try {
    const result = await $http.list.getList();
    listMsg.value = result || [];
  } catch (error) {
    showErrorToast("Erro ao carregar listas!");
    listMsg.value = [];
  }
};

const deleteItem = async (id: number) => {
  try {
    await $http.list.deleteList(id);
    showSuccessToast("Lista deletada com sucesso!");
    getListMsg();
  } catch (error) {
    showErrorToast("Erro ao deletar lista!");
  }
};

const linkDestinatarios = (row: any) => {
  store.setSequence(row.id);
  store.setName(row.list_name);
  navigateTo("/Destinatarios");
};
</script>

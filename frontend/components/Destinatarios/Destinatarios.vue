<template>
  <div class="w-full mb-10 mt-2">
    <div class="flex justify-between w-full ">
      <h1>Destinatários ({{ storeListMsg.getName }})</h1>
      <InputFile @save="create" :chosenDestination="chosenDestination" :selectLabel="selectedLabel"/>
    </div>
    <MazTable size="sm" sortable :loading="isLoading" selectable hoverable :rows="recipients"
      :headers="header_recipients" pagination selected-key="id" @update:model-value="handleRecipientsSelected">
      <template #actions="{ row }">
        <div class="flex gap-3">
          <MazBtn fab size="xs" color="danger" @click="deleteRecipient(row)">
            <template #left-icon>
              <span v-html="icon_trash(20, '#FFFF')" />
            </template>
          </MazBtn>
          <MazBtn fab size="xs" color="primary" @click="editItem(row)">
            <template #left-icon>
              <span v-html="icon_pen(20, '#FFFF')" />
            </template>
          </MazBtn>
          <MazBtn fab size="xs" color="secondary" @click="openChat(row)">
            <template #left-icon>
              <span v-html="icon_chat(19, '#FFFF')" />
            </template>
          </MazBtn>
        </div>
      </template>
    </MazTable>

    <ActionDesti :select_item="select_item" />
  </div>
</template>

<script setup lang="ts">
import { useCustomToast } from "#imports";
import { icon_trash, icon_pen, icon_chat } from "@/utils/icons";
import ActionDesti from "./ActionDesti.vue";
import { header_recipients } from "./headerTableDesti";
import InputFile from "./InputFile.vue";
import MazTable from "maz-ui/components/MazTable";
import type { IRecipient } from "~/services/recipients/types";
import { storeList } from "~/store/msg-list/store";
import { mount_json_recipient } from "~/validator";

const { showSuccessToast, showErrorToast } = useCustomToast();
const isOpenedRight = ref<boolean>(false);
provide('isOpenedRight', isOpenedRight);
const isDialogOpen = ref<boolean>(false);
provide('isDialogOpen', isDialogOpen);

const { $http } = useNuxtApp();
const chosenDestination = ref<IRecipient[]>([]);
const select_item = ref({});
const storeListMsg = storeList();
const recipients = ref<IRecipient[]>([]);
const selectedLabel = ref([])
const isLoading = ref(true)

onMounted(() => {
  storeListMsg.initializeStore()
  getRecipients();
});

const editItem = (row: any) => {
  isDialogOpen.value = true;
  select_item.value = row;
};

const handleRecipientsSelected = (selected: any) => {
  selectedLabel.value = selected
  setMessageSendingRecipient()
}

const getRecipients = async () => {
  try {
    const sequence = storeListMsg.getSequence;
    const result = await $http.recipient.getList(sequence);
    recipients.value = result.data;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};

const setMessageSendingRecipient = () => {
  if (selectedLabel.value?.length) {
    const set: any = new Set(selectedLabel.value);
    const selectedSet: number[] = [...set]

    chosenDestination.value = chosenDestination.value.filter(chosen => {
      if(selectedSet.includes(chosen.id)) {
        return chosen;
      }
    })

    for (const user of recipients.value) {
      if (selectedSet.includes(user.id) && 
          !chosenDestination.value.some(chosen => chosen.id === user.id)) {
        chosenDestination.value.push(user);
      }
    }

  } else {
    chosenDestination.value = [];
  }
}

const create = async (event: string) => {
  try {
    const sequence = storeListMsg.getSequence;
    const json = mount_json_recipient({
      list_base64: event,
      list_code: String(sequence),
    });
    await $http.recipient.createRecipient(json);

    showSuccessToast("Lista de destinatários criada com sucesso!");
    getRecipients();
  } catch (error) {
    showErrorToast("Erro ao criar lista de destinatários");
  }
};

const deleteRecipient = async (row: any) => {
  try {
    await $http.recipient.deleteRecipient(row.id);
    showSuccessToast("Destinatário deletado com sucesso!");
    getRecipients();
  } catch (error) {
    showErrorToast("Erro ao deletar destinatário");
  }
};

const openChat = (row: any) => {
  isOpenedRight.value = true;
  navigateTo(`/MensagemMenu?contactId=${row.id}`);
};
</script>

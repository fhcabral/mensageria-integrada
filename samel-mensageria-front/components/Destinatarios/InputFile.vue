<template>
  <div>
    <MazBtn color="secondary" @click="navigateTo('/mensagemMenu')" class="btn-size">
      <span class="btn-text-color">Menu de Mensagens</span>
    </MazBtn>
    <MazBtn color="success" @click="showModalConfirm = true" class="btn-size" :class="{ 'send-message-btn': isSelected }" :disabled="!isSelected">
      <span class="btn-text-color">Enviar mensagem</span>
    </MazBtn>
    <MazBtn color="warning" @click="triggerFileInput" class="btn-size">
      Importar lista
    </MazBtn>
    <MazDropdown color="warning" trigger="click" style='bottom: 10px;' position="left" :items="dropdownAction">
    </MazDropdown>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileChange"
    />
  </div>

  <CardConfirmacao v-if="showModalConfirm" @close="closeModal" @send-messages="sendAllMessage"/>
  <CardCarregamentoDeEnvio v-if="loading"/>
</template>

<script setup lang="ts">
import CardCarregamentoDeEnvio from "../CardCarregamentoDeEnvio.vue";
import { useCustomToast } from "#imports";
import type { IRecipient, IRecipientReport } from "~/services/recipients/types"
import MazDropdown from 'maz-ui/components/MazDropdown'
import { storeList } from "~/store/msg-list/store";
import { navigateTo } from "#imports";
import CardConfirmacao from "./CardConfirmacao.vue";

const { $http } = useNuxtApp();
const storage = storeList();
const { showSuccessToast, showErrorToast, showWarnToast } = useCustomToast()
const loading = ref(false)
const isSelected = ref(false);

const fileInput = ref<HTMLInputElement | null>(null);
const messageStatus = ref<IRecipientReport[]>([])
const showModalConfirm = ref(false)
const emit = defineEmits(["save","report"]);


const dropdownAction = [
  { label: 'Gerar relatório', action: async () => {
    const reportStats = await generateReport()
    if(reportStats?.total) {
      showSuccessToast(`Relatório gerado. Total: ${reportStats?.total}, Enviados: ${reportStats?.enviadas}`)
    }
  } },
]

const props = defineProps<{
  chosenDestination: IRecipient[],
  selectLabel: never[]
}>()

watch(() => props.selectLabel, (recipients) => {
  isSelected.value = recipients? true : false
})

function triggerFileInput() {
  fileInput.value?.click();
}

const closeModal = () => {
  showModalConfirm.value = false
}

const generateReport = async () => {
  const status = storage.getMessageStatus || '[]'
  if(!status.length || status.length === 0) {
    showWarnToast('Nenhuma mensagem foi enviada para gerar o relatório')
    return;
  }
  try {
    loading.value = true;
    const response = await $http.report.gerarRelatorioMensagens(messageStatus.value);
    const base64Response = await fetch(`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response.base64}`);
    const blob = await base64Response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio_mensagens_${new Date().toISOString()}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return {
      total: response.total,
      enviadas: response.enviadas,
      naoEnviadas: response.naoEnviadas,
    };
  } catch (error) {
    showErrorToast('Erro ao gerar relatório');
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function sendAllMessage() {
  if(!props.chosenDestination.length || props.chosenDestination.length === 0) {
    showWarnToast('Selecione pelo menos um destinatário')
    return;
  }
  try{
    loading.value = true
    const results = await Promise.all(
      props.chosenDestination.map(async (person) => {
          const result = await $http.MsgHistory.sendAllWhatsappMessage({ phone: person.telephone, contactId: person.id });
          return {
            id: person.id,
            nome: person.full_name,
            telefone: person.telephone,
            cpf: person.person_code,
            status: result.success
          };
      })
    );
    messageStatus.value = results;
    storage.setMessageStatusReport(messageStatus.value)
    showSuccessToast(
        "Mensagens enviadas para todos os contatos da lista!"
      );
  } catch(error) {
    showErrorToast("Ocorreu um erro ao enviar mensagens")
  } finally {
    loading.value = false
  }
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const fileType = file.type;

    if (fileType !== "text/csv") {
      showWarnToast(
        "Selecione um arquivo CSV para importar a lista de destinatários"
      );
      return;
    }

    try {
      const base64Data = await convertFileToBase64(file);

      emit("save", base64Data);
    } catch (error) {
      console.error("Erro ao processar CSV:", error);
    }
  }
}
</script>

<style scoped>
.btn-size {
  bottom: 10px; 
  margin-right: 10px;
}

.btn-text-color {
  color: rgb(33, 36, 39);
}

.send-message-btn {
  transition: background-color 0.3s, opacity 0.3s; /* Transição suave */
}

.send-message-btn:disabled {
  background-color: rgba(19, 173, 19, 0.4); /* Cor mais clara quando desabilitado */
  cursor: not-allowed; /* Muda o cursor para indicar que não é clicável */
  opacity: 0.5; /* Diminui a opacidade */
}

/* Efeito de hover para o botão desabilitado */
.send-message-btn:disabled:hover {
  background-color: rgba(0, 128, 0, 0.4); /* Mantém a mesma cor ao passar o mouse */
  cursor: not-allowed; /* Muda o cursor para indicar que não é clicável */
  opacity: 0.5; /* Mantém a opacidade reduzida */
}

</style>
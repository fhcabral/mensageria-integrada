<template>
  <div class="message-area">
    <div v-if="selectedContact" class="message-header">
      <div class="contact-info">
        <div class="contact-avatar">
          <img src="../assets/imagens/do-utilizador.png" alt="avatar">
        </div>
        <span>{{ chosenContact.full_name }}</span>
      </div>
    </div>

    <div class="message-content">
      <div v-if="!selectedContact" class="messages">
        <div class="message-placeholder">
          <span v-html="icon_menu_chat(130, '#FFFF')"/>
          <p style="font-size: 130%;">Selecione uma conversa para começar</p>
        </div>
      </div>

      <div v-else class="messages" ref="messagesContainer">
        <CardMensagemConteudo ref="cardMensagem" :messages="currentConversation.messages" />
      </div>

      <div v-if="selectedContact" class="message-input">
        <input type="text" placeholder="Digite sua mensagem..." v-model="newMessage" @keyup.enter="sendMessage">
        <button @click="sendMessage" :disabled="!newMessage.trim()" >Enviar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import CardMensagemConteudo from './Mensagens/CardMensagemConteudo.vue';
import type { IContacts, IConversation, IMessage, IWebhookMessage } from '~/services/msg-history/types';
import { MessageQueue } from '~/services/msg-history/messageQueue';
import { icon_menu_chat } from '~/utils/icons';

const { $http, $socket } = useNuxtApp();
const newMessage = ref('')
const cardMensagem = ref<InstanceType<typeof CardMensagemConteudo> | null>(null);

const props = defineProps<{
  selectedContact: boolean
  chosenContact: IContacts
  currentConversation: IConversation
  contacts: IContacts[]
}>()

const emit = defineEmits(['update-chat','reorder-chat','new-message'])

const messageQueue = new MessageQueue();

onBeforeUnmount(() => {
  $socket.off('newMessage');
});

const setupWebSocket = () => {
  // Tratamento de novas mensagens
  messageQueue.setContext({
    $http,
    props,
    emit,
    saveChatHistory,
    scrollToBottom
  });

  $socket.on('connect', () => {
    console.log('WebSocket conectado com sucesso');
  });

  // Log quando houver erro
  $socket.on('connect_error', (error: any) => {
    console.error('Erro na conexão WebSocket:', error);
  });

  $socket.on('newMessage', (webHookMessage: IWebhookMessage) => {
    messageQueue.enqueue(webHookMessage);
  });
};


onMounted(async () => {
  setupWebSocket();
  $socket.connect(); 
  scrollToBottom();
});

watch(() => props.currentConversation.messages, (messages) => {
  if (messages.length > 0) {
    const lastMessage = messages.at(-1);
    const text = formatedText(lastMessage?.text)
    lastMessage?.type === 'U' ? props.chosenContact.lastMessage = `Você: ${text}` : props.chosenContact.lastMessage = text
  } else {
    props.chosenContact.lastMessage = '';
  }
}, { deep: true })

const saveChatHistory = async(data: IMessage) => {
  if (props.currentConversation.contactId) {
    await $http.MsgHistory.createMsg({contactId: props.currentConversation.contactId, messages: [data]})
  }
}

const formatedText = (text: any) => {
  if (text.length > 15) {
    const textSplited = text.split('');
    return textSplited.slice(0, 20).join('') + '...';
  }
  return text;
}

const scrollToBottom = () => {
  nextTick(() => {
    cardMensagem.value?.scrollToBottom();
  });
};

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const message: IMessage = {
      text: newMessage.value,
      sent: true,
      time: currentTime,
      type: 'U'
    };

    try {
      newMessage.value = '';
     const msgResult = await $http.MsgHistory.sendWhatsAppMessage({
        number: props.chosenContact.telephone,
        message: message
      });
        emit('reorder-chat', { contactId: props.currentConversation.contactId });
      if(msgResult.success) {
        props.currentConversation.messages.push(message);
        scrollToBottom();
        await saveChatHistory(message);
      } else {
        await retrySendMessage(message, 1);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      await retrySendMessage(message, 1)
    }
  }
};

async function retrySendMessage(
  message: IMessage, 
  attempt: number, 
  maxRetries: number = 3
): Promise<boolean> {
  try {
    // Calcula tempo de espera com backoff exponencial
    const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s...
    
    // Aguarda antes de tentar novamente
    await new Promise(resolve => setTimeout(resolve, waitTime));

    const retryResult = await $http.MsgHistory.sendWhatsAppMessage({
      number: props.chosenContact.telephone,
      message: message
    });

    if (retryResult.success) {
      props.currentConversation.messages.push(message);
      await saveChatHistory(message);
      newMessage.value = '';
      scrollToBottom();
      return true;
    } else {
      return retrySendMessage(message, attempt + 1, maxRetries);
    }
  } catch (error) {
    return retrySendMessage(message, attempt + 1, maxRetries);
  }
}

</script>

<style>
.contact-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  height: 100vh;
}

.message-header {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #f0f2f5;
  border-bottom: 1px solid #e0e0e0;
  height: 60px;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  /* Removemos o padding daqui */
  overflow: auto;
  /* Mudamos para hidden para evitar scroll duplo */
  background-color: #efeae2;
}

.message-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  color: #667781;
  font-size: 14px;
}

.message-input {
  display: flex;
  padding: 10px;
  background-color: #f0f2f5;
  gap: 10px;
}

.message-input input {
  flex: 1;
  padding: 9px 12px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
}

.message-input button {
  padding: 8px 16px;
  background-color: #00a884;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.message-input button:hover {
  background-color: #008f6f;
}
</style>

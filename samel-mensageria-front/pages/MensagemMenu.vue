<template>
  <div class="chat-container">
    <!-- Lista de Contatos (Lado Esquerdo) -->
    <div class="contacts-list" :class="{empty: contacts.length === 0}">
      <div class="search-box">
        <input type="text" placeholder="Buscar contato..." v-model="searchText">
      </div>
      <div class="contacts" v-if="contacts.length > 0">
        <CardDestinatario :contacts="contacts" @selectedContact="changeContact" ref="cardDestinatarioRef" />
      </div>
      <div v-else class="empty-state">
      <span v-html="icon_empty(50, '#FFFF')"/>
      <p>Nenhum contato encontrado</p>
    </div>
    </div>

    <!-- Área de Mensagens (Lado Direito) -->
    <CardMensagem :selectedContact='selectedContact' :chosenContact='chosenContact'
      :currentConversation='currentConversation' :contacts="contacts" @update-chat="getChatHistory"
      @reorder-chat="reorderContacts" @new-message="handleNewMessage" />
  </div>

  <CardCarregamento v-if="isLoading" />
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue'
import { storeList } from "~/store/msg-list/store";
import type { IContacts, IConversation, IContactSelection, IMessage } from '~/services/msg-history/types'
import CardDestinatario from '~/components/CardDestinatario.vue';
import CardMensagem from '~/components/CardMensagem.vue'
import CardCarregamento from '~/components/CardCarregamento.vue';
import { icon_empty } from '~/utils/icons';

const route = useRoute();
const contactId = ref(route.query.contactId);
const selectedContact = ref(false)
const chosenContact = ref(<IContacts>({}))
const conversations = ref<IConversation[]>([])
const currentConversation = ref(<IConversation>({}))
const cardDestinatarioRef = ref()
const isLoading = ref(true)
const allContacts = ref<IContacts[]>([]);

const { $http } = useNuxtApp();
const storeListMsg = storeList();
storeListMsg.initializeStore();
const contacts = ref<IContacts[]>([]);
const searchText = ref('');

onMounted(async () => {
  await getContacts()
  await getChatHistory()
  const rawContacts = toRaw(contacts.value)
  if (contactId.value) {
    const contact = rawContacts.find(pessoa => pessoa.id === parseInt(contactId.value as string))
    if (contact) {
      changeContact({ selected: true, contact })
    }
  }
  isLoading.value = false
})

watch(() => searchText.value, (text) => {
  const regex = new RegExp(text, 'i')
  const filter =  contacts.value.filter(contactName => contactName.full_name.match(regex))
  contacts.value = filter
  if(text.length === 0) {
    contacts.value = allContacts.value
  }
})

const handleNewMessage = (data: { contactId: number, message: IMessage }) => {
  const conversationIndex = conversations.value.findIndex(
    conv => conv.contactId === data.contactId
  );
  if (conversationIndex !== -1) {
    conversations.value[conversationIndex].messages.push(data.message);
  }

  const contactIndex = contacts.value.findIndex(
    contact => contact.id === data.contactId
  );

  if (contactIndex !== -1) {
    contacts.value[contactIndex].lastMessage = data.message.text;
  }

  reorderContacts({ contactId: data.contactId })
}

const reorderContacts = (newMessage: { contactId: number }) => {
  const contactIndex = contacts.value.findIndex(
    contact => contact.id === newMessage.contactId
  );

  if (contactIndex !== -1) {
    // Remover contato da posição atual
    const [contact] = contacts.value.splice(contactIndex, 1);

    contacts.value.unshift(contact);
    cardDestinatarioRef.value.handleReorderChat(newMessage)
  }
}

const getChatHistory = async () => {
  for (const destiny of contacts.value) {
    const backupHistory = await $http.MsgHistory.getMsg(destiny.id)
    let chat = {
      contactId: destiny.id,
      messages: [...backupHistory]
    }
    conversations.value.push(chat)
    const contactIndex = contacts.value.findIndex(
      contact => contact.id === destiny.id
    );

    if (contactIndex !== -1) {
     const lastMsg = conversations.value.find(msg => msg.contactId === destiny.id);
       contacts.value[contactIndex].lastMessage = lastMsg?.messages.at(-1)?.type === 'U'? `Você: ${lastMsg?.messages.at(-1)?.text}` : lastMsg?.messages.at(-1)?.text
    }
  }
}

const changeContact = async (data: IContactSelection) => {
  selectedContact.value = data.selected
  if (data.selected) {
    chosenContact.value = data.contact
  } else {
    chosenContact.value = {} as IContacts
    currentConversation.value = {} as IConversation
  }
  getCurrentChat()
}

const getCurrentChat = () => {
  const userChatFound = conversations.value.find(chat => chat.contactId === chosenContact.value.id) as IConversation
  if (!userChatFound) {
    let chat = {
      contactId: chosenContact.value.id,
      messages: []
    }
    conversations.value.push(chat)
    showCurrentChat(chat)
  } else {
    showCurrentChat(userChatFound)
  }
}

const showCurrentChat = (userChat: IConversation) => {
  currentConversation.value = userChat
}

const getContacts = async () => {
  const recipientsReceived = []
  try {
    const sequence = storeListMsg.getSequence;
    const result = await $http.recipient.getList(sequence);
    for (const item of result.data) {
      const recipientFounded: IMessage | null = await $http.MsgHistory.getMsgSentForContacts(item.id)
      if (recipientFounded && recipientFounded.text) {
        recipientsReceived.push(item)
      }
    }
    contacts.value = recipientsReceived;
    allContacts.value = recipientsReceived;
  } catch (error) {
    console.error(error);
  }
};

</script>
<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.contacts {
  overflow-y: auto;
  flex: 1;
}

.contacts-list {
  width: 300px;
  border-right: 1px solid #ddd;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #888;
  padding: 20px;
}

.icon-empty {
  /* Substitua com o ícone desejado */
  font-size: 48px;
  margin-bottom: 10px;
  /* Exemplo com ícone de fonte */
  /* font-family: 'your-icon-font'; */
  /* content: '\e900'; */
}


.search-box {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.search-box input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
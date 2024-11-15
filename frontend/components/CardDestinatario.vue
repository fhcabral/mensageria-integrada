<template>
    <div v-for="contact in contacts"
    :key="contact.id"
    class="contact-item"
    :class="{ 
        'active': chosenContact === contact,
        'has-unread': contact.unreadMessages && contact.unreadMessages > 0 && chosenContact !== contact 
        }"
        @click="selectContact(contact)"
        >
        <div class="contact-avatar">
            <img src="../assets/imagens/do-utilizador.png" alt="avatar">
            <div 
                v-if="contact.unreadMessages && contact.unreadMessages > 0 && chosenContact !== contact" 
                class="unread-badge"
            >
                {{ contact.unreadMessages }}
            </div>
        </div>
        <div class="contact-info">
            <div class="contact-name">{{ contact.full_name }}</div>
            <div class="contact-last-message">{{ contact.lastMessage }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IContacts, IConversation } from '~/services/msg-history/types'

interface ContactWithUnread extends IContacts {
    unreadMessages?: number
}

const chosenContact = ref(<ContactWithUnread>({}))
const selected = ref(false)
const emit = defineEmits(['selectedContact', 'allChats'])

const props = defineProps<{
    contacts: ContactWithUnread[]
}>()

const selectContact = (contact: ContactWithUnread) => {
    if (contact.unreadMessages && contact.unreadMessages > 0) {
        contact.unreadMessages = 0
    }
    chosenContact.value = contact
    emit('selectedContact', { 
        selected: true, 
        contact: contact,
    })
}

// Método para ser chamado pelo pai quando houver reordenação
const handleReorderChat = (newMessage: { contactId: number }) => {
    // Incrementa mensagens não lidas para o contato reordenado
    const contact = props.contacts.find(c => c.id === newMessage.contactId)
    
    if (contact && chosenContact.value?.id !== contact.id) {
        contact.unreadMessages = (contact.unreadMessages || 0) + 1
    }
}

defineExpose({
    handleReorderChat
})

</script>

<style scoped>
.contact-item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.contact-item:hover {
    background-color: #f5f5f5;
}

.contact-item.active {
    background-color: #e3f2fd;
}

.contact-avatar {
    position: relative;
}

.contact-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.unread-badge {
    position: absolute;
    bottom: -5px;
    right: 5px;
    background-color: #00695c;  /* Cor do WhatsApp */
    color: white;
    border-radius: 50%;
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 2px;
}

.contact-info {
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.contact-name {
    font-weight: bold;
    line-height: 1.2;
}

.contact-last-message {
    font-size: 0.9em;
    color: #666;
    line-height: 0.2;
}
</style>
<template>
    <div class="message-container" ref="messageContainer">
        <div v-for="(message, index) in messages" :key="index" class="message-bubble" :class="{
            'received-user': message.type === 'U',
            'received-patient': message.type === 'P'
        }">
            <div class="message-content">{{ message.text }}</div>
            <div class="message-time">{{ message.time }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineExpose } from 'vue';
import type { IMessage } from '~/services/msg-history/types';

defineProps<{
    messages: IMessage[];
}>();

const messageContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
};

defineExpose({ scrollToBottom });

</script>

<style scoped>
.message-container {
    flex: 1;
    /* Isso fará com que ocupe todo o espaço disponível */
    overflow-y: auto;
    padding: 20px;
    background-color: #e5e5e5;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.message-bubble {
    display: flex;
    flex-direction: column;
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 15px;
    margin-bottom: 10px;
    word-wrap: break-word;
    position: relative;
}

.message-bubble.received-user {
    background-color: #00695c;
    /* Verde escuro Samel */
    color: white;
    align-self: flex-end;
    margin-left: auto;
}

.message-bubble.received-patient {
    background-color: white;
    color: #333;
    align-self: flex-start;
}

.message-content {
    word-wrap: break-word;
}

.message-time {
    font-size: 0.75em;
    color: #999;
    align-self: flex-end;
    margin-top: 4px;
}

/* Para mensagens enviadas, o horário deve ter cor diferente devido ao fundo escuro */
.message-bubble.sent .message-time {
    color: rgba(255, 255, 255, 0.7);
}
</style>
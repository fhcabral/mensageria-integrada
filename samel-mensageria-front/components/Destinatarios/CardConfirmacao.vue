<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h3>Confirmar Envio de Mensagem</h3>
        <p>Deseja realmente enviar mensagem para todos os destinatários selecionados?</p>
        <div class="modal-footer">
          <MazBtn color="danger" outline @click="close">Cancelar</MazBtn>
          <MazBtn color="success" @click="sendMessages">Confirmar</MazBtn>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue'
  
  const emit = defineEmits(['close', 'send-messages'])
  
  const close = () => {
    emit('close')
  }
  
  const sendMessages = () => {
    emit('send-messages')
    close()
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7); /* Fundo escuro com mais opacidade */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Garante que o modal fique acima de outros elementos */
  }
  
  .modal-content {
    background: white;
    padding: 30px; /* Aumenta o padding para mais espaço */
    border-radius: 10px; /* Bordas mais arredondadas */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Sombra mais suave */
    max-width: 400px;
    width: 90%; /* Largura responsiva */
    text-align: center; /* Centraliza o texto */
  }
  
  h3 {
    color: #333; /* Cor do texto do título */
    margin-bottom: 15px; /* Espaçamento abaixo do título */
  }
  
  p {
    color: #555; /* Cor do texto do parágrafo */
    margin-bottom: 20px;
    font-size: medium /* Espaçamento abaixo do parágrafo */
  }
  
  .modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
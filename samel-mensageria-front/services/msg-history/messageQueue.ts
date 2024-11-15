import type { IContacts, IMessage, IWebhookMessage, IMessageQueueItem } from "./types";

export class MessageQueue {
    private queue: IMessageQueueItem[] = [];
    private isProcessing = false;
    private context: any;
  
    // Método para adicionar à fila
    enqueue(message: IWebhookMessage) {
      const queueItem: IMessageQueueItem = {
        id: this.generateUniqueId(),
        from: message.from,
        message: message.msg_body,
        timestamp: Date.now(),
        processed: false
      };
  
      this.queue.push(queueItem);
      this.processQueue();
    }
  
    // Processamento sequencial
    private async processQueue() {
      if (this.isProcessing) return;
  
      this.isProcessing = true;
  
      while (this.queue.length > 0) {
        const currentMessage = this.queue[0];
  
        try {
          await this.processMessage(currentMessage);
          this.queue.shift();
        } catch (error) {
          console.error('Erro ao processar mensagem', error);
          this.queue.shift();
        }
  
        await new Promise(resolve => setTimeout(resolve, 100));
      }
  
      this.isProcessing = false;
    }
  
    // Processamento individual da mensagem
    private async processMessage(item: IMessageQueueItem) {
      const { 
        $http, 
        props, 
        emit, 
        saveChatHistory, 
        scrollToBottom 
      } = this.context;
  
      const currentTime = new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      const contact: IContacts[] = props.contacts
      const contactToReorder = contact.find(person => {
        if(person.telephone === item.from || `55${person.telephone}` === item.from) {
          return person;
        }
      })
  
      if (contactToReorder) {
        const newMsg: IMessage = {
          text: item.message,
          sent: false,
          time: currentTime,
          type: 'P'
        };

        if (props.chosenContact.id === contactToReorder.id) {
            props.currentConversation.messages.push(newMsg);
            emit('reorder-chat', { contactId: contactToReorder.id });
            props.chosenContact.lastMessage = item.message;
            scrollToBottom();
          } else {
            emit('new-message', { 
              contactId: contactToReorder.id, 
              message: newMsg 
            });
          }
      }
      item.processed = true;
    }
  
    // Gerador de ID único
    private generateUniqueId(): string {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
  
    // Método para injetar contexto
    setContext(context: any) {
      this.context = context;
    }
  }
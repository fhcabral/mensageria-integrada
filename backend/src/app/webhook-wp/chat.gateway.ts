import { 
    WebSocketGateway, 
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect 
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Ajuste conforme sua necessidade
    },
  })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: any) {
      console.log(`Cliente conectado: ${client.id}`);
    }
  
    handleDisconnect(client: any) {
      console.log(`Cliente desconectado: ${client.id}`);
    }
  
    // Método para emitir mensagem para todos os clientes conectados
    emitMessage(message: any) {
      this.server.emit('newMessage', message);
    }
  }
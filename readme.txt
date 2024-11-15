# 📬 Mensageria Integrada com WhatsApp

Este projeto implementa uma solução de mensageria integrada utilizando **Nuxt.js**, **Vue.js** e **NestJS**, conectando-se à **API Cloud do Facebook**. Ele oferece funcionalidades avançadas para enviar mensagens automáticas (push) para marketing e também possibilita a comunicação em tempo real com clientes diretamente pelo sistema, simulando o ambiente do WhatsApp.

---

## 🚀 Funcionalidades

- **Envio de mensagens automáticas (push):**  
  Permite campanhas de marketing de forma simples e eficiente.

- **Chat em tempo real:**  
  Comunicação direta com os clientes como se fosse o WhatsApp, mas centralizado no ambiente corporativo.

- **Interface amigável e responsiva:**  
  Desenvolvida com Nuxt.js e Vue.js para uma experiência de usuário fluida.

- **Integração com a API Cloud do Facebook:**  
  Garantindo robustez e segurança no envio e recebimento de mensagens.

---

## 🛠️ Tecnologias Utilizadas

### Front-end:
- **Nuxt.js:** Framework Vue para renderização SSR.
- **Vue.js:** Criação de componentes interativos e responsivos.

### Back-end:
- **NestJS:** Framework modular para criação de APIs escaláveis e robustas.

### Outras Ferramentas:
- **API Cloud do Facebook:** Gerenciamento de mensagens pelo WhatsApp.

---

## 🏗️ Arquitetura

1. **Cliente:**  
   Desenvolvido com **Nuxt.js**, o cliente é responsável por:  
   - Exibir os chats e mensagens em tempo real.  
   - Enviar mensagens para o servidor via chamadas API.

2. **Servidor:**  
   Utilizando **NestJS**, o servidor é responsável por:  
   - Integrar-se à API Cloud do Facebook para envio/recebimento de mensagens.  
   - Gerenciar usuários, mensagens e campanhas de marketing push.

---

## 🛠️ Como Configurar

### Pré-requisitos:
- Node.js (>=16)
- Yarn ou npm
- Conta na API Cloud do Facebook configurada para WhatsApp

### Passos:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

# Instale as dependências do cliente
cd client
yarn install
# Instale as dependências do servidor
cd ../server
yarn install

# configure as variáveis de ambiente:

# Crie um arquivo .env em server e insira suas credenciais:

FACEBOOK_API_KEY=your-facebook-api-key
FACEBOOK_PHONE_NUMBER_ID=your-number-id
FACEBOOK_WHATSAPP_URL=your-whatsapp-api-url

# Inicie o projeto
# Cliente
cd client
yarn dev
# Servidor
cd ../server
yarn start:dev

Autor:
Fhellipe Cabral
Desenvolvedor Full Stack

# 🚌 interRotas

> Sistema inteligente de rastreamento e monitoramento de frotas de ônibus urbanos em tempo real.

---

## 📌 Índice
* [Sobre o Projeto](#-sobre-o-projeto)
* [Funcionalidades](#-funcionalidades)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Arquitetura do Sistema](#-arquitetura-do-sistema)
* [Como Executar o Projeto](#-como-executar-o-projeto)
* [Estrutura de Arquivos](#-estrutura-de-arquivos)
* [Autores](#-autores)

---

## 💻 Sobre o Projeto

O **interRotas** é uma solução desenvolvida para resolver o problema da previsibilidade do transporte público urbanizado. O sistema coleta dados geográficos das frotas de ônibus e os processa para disponibilizar trajetos, horários de chegada e localização exata dos veículos para os passageiros e gestores.

Este projeto engloba desde a captura de telemetria no hardware embarcado até a disponibilização das rotas em uma interface acessível.

---

## ⚙️ Funcionalidades

- [x] **Geolocalização em Tempo Real:** Captura de coordenadas de latitude e longitude do veículo.
- [x] **Mapeamento de Linhas:** Exibição gráfica dos trajetos e pontos de parada na interface.
- [ ] **Cálculo de ETA (Tempo Estimado de Chegada):** Predição de tempo baseada na velocidade média do ônibus (Em desenvolvimento).
- [ ] **Alerta de Lotação:** Envio de dados sobre a ocupação do veículo (Planejado).

---

## 🛠 Tecnologias Utilizadas

O ecossistema do interRotas foi construído utilizando as seguintes tecnologias:

* **Hardware / Embarcados:**
  * Microcontrolador ESP32 (Sinal de telemetria e comunicação de rede)
  * Módulo GPS (Ex: Neo-6M para captura de coordenadas)
  * Simulador Wokwi (Para validação e testes lógicos do circuito)

* **Backend & API:**
  * NestJS / Node.js (Serviço robusto de mensageria e processamento de rotas)
  * TypeScript (Linguagem base para tipagem e segurança do código)

* **Frontend / Mobile:**
  * React Native (Aplicativo móvel para o usuário final acompanhar as linhas)

---

## 📐 Arquitetura do Sistema

O fluxo de dados do interRotas segue o modelo abaixo:
1. O **Módulo Embarcado (ESP32)** lê os dados do satélite via GPS.
2. Os dados de latitude/longitude são enviados via rede (HTTP ou MQTT) para o **Servidor Backend**.
3. A **API Backend** processa a rota e gerencia as coordenadas atuais do veículo.
4. O **Aplicativo Mobile** consome a API e renderiza o ônibus se movendo no mapa para o usuário.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão LTS recomendada)
* Um editor de código (como o [VS Code](https://code.visualstudio.com/))
* Extensões de simulação se for rodar o hardware localmente.

### 1. Configurando o Servidor Backend (NestJS)
```bash
# Navegue até a pasta do servidor
cd interrotas-backend

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run start:dev

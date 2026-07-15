# InterRotas

> Sistema inteligente de rastreamento, monitoramento de frotas de ônibus urbanos e gestão de ocorrências em tempo real.

---

##  Índice
* [Sobre o Projeto](#-sobre-o-projeto)
* [Como Executar o Projeto](#-Inicializar-projeto)
* [Funcionalidades](#-funcionalidades)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Arquitetura do Sistema](#-arquitetura-do-sistema)
* [Autores](#-autores)

---

##  Sobre o Projeto

O **interRotas** é uma solução desenvolvida para otimizar a gestão do transporte público urbano e garantir previsibilidade operacional. O sistema coleta dados geográficos das frotas de ônibus via hardware embarcado e os processa centralizadamente, permitindo que gestores controlem frotas em tempo real e motoristas reportem eventos críticos instantaneamente.

Este projeto integra IoT (Internet das Coisas), persistência de dados robusta e interfaces mobile/web dinâmicas para transformar a telemetria veicular em tomada de decisão.

---


##  Inicializar Projeto
## Pré-requisitos e Instalação de Tecnologias

Antes de inicializar o projeto, você precisa ter as ferramentas básicas instaladas na sua máquina:

### 1. Ferramentas Essenciais
* Node.js (versão LTS recomendada): [Baixar Node.js](https://nodejs.org/)

### 2. Instalações Globais (CLI)
Abra o seu terminal e instale as ferramentas necessárias para rodar o NestJS e o Expo globalmente:

```
bash
npm install -g @nestjs/cli npm install -g expo-cli 
```

Roteiro de Inicialização do Projeto

Siga o passo a passo abaixo para clonar, instalar as dependências e rodar o projeto completo:
Bash

# 1. Clonar o repositório e entrar na pasta do projeto

```
git clone https://github.com/JanyeliceD/InterRotas.git
cd InterRotas

```


# 2. Configurar e rodar o Backend (NestJS)
```
cd backend
npm install
npm run start:dev
```

# 3. Configurar e rodar o Mobile (Abra um novo terminal na pasta raiz 'InterRotas' para executar os passos abaixo)
```
cd ../
cd mobile
npm install
npx expo start
## Pré-requisitos e Instalação de Tecnologias
```



##  Funcionalidades

###  Módulo do Gestor de Frotas (Painel Principal)
- **Monitoramento em Tempo Real:** Visualização ao vivo da localização exata de cada ônibus em um mapa interativo na tela inicial.
- **Cálculo de Gastos com Combustível:** Relatório financeiro automatizado calculando o consumo e os custos de combustível nos **últimos 30 dias**.
- **Alertas Automáticos Inteligentes:** Notificações em tempo real caso algum veículo sofra **atrasos significativos** ou **desvios da rota prevista**.
- **Central de Ocorrências:** Painel para recebimento, triagem e tratamento de alertas enviados pelos motoristas.

###  Módulo do Motorista
- **Área de Login Exclusiva:** Ambiente seguro para o motorista se identificar no veículo operante.
- **Cadastro e Envio de Ocorrências:** Canal direto para relatar sinistros, problemas mecânicos, trânsito atípico ou emergências diretamente para o gestor.

###  Telemetria & Infraestrutura
-  **Geolocalização Contínua:** Envio periódico de coordenadas (latitude/longitude) do veículo.
-  **Mapeamento de Linhas:** Exibição gráfica dos trajetos e pontos de parada na interface.

---

##  Tecnologias Utilizadas

O ecossistema do interRotas foi construído utilizando as seguintes ferramentas:

* **Hardware / Embarcados & IoT:**
  * **Microcontrolador:** ESP32 (Responsável pelo processamento e lógica interna de envio).
  * **Linguagem de Programação:** **MicroPython** (Garante agilidade no desenvolvimento de scripts embarcados e manipulação de rede).
  * **Módulo GPS:** Neo-6M (Captura precisa de coordenadas via satélite).
  * **Módulo de Internet Móvel:** SIM800L (Conectividade GPRS/2G para transmissão de dados em trânsito).

* **Backend & API:**
  * **NestJS / Node.js:** Framework escalável para construção de microsserviços e processamento assíncrono de rotas.
  * **TypeScript:** Linguagem base garantindo tipagem forte e segurança ao código.

* **Banco de Dados (Persistência):**
  * **MongoDB:** Banco de dados NoSQL utilizado para salvar todos os dados enviados pelo backend (telemetria, logs de rotas, usuários e ocorrências), servindo como fonte imediata para renderização no frontend.

* **Frontend / Mobile:**
  * **React Native:** Aplicativo móvel multiplataforma onde motoristas enviam dados e gestores monitoram as frotas e mapas.

---

##  Arquitetura do Sistema

O fluxo de comunicação e persistência do interRotas segue a lógica abaixo:

1. **Captura:** O script em **MicroPython** rodando no **ESP32** lê a latitude/longitude fornecidas pelo módulo GPS Neo-6M.
2. **Transmissão:** Utilizando o módulo **SIM800L (2G)**, a placa dispara requisições HTTP (POST) contendo os dados de telemetria para o servidor backend.
3. **Processamento e Salvamento:** A API desenvolvida em **NestJS** recebe a requisição, valida as regras de negócio (verifica se há atraso/desvio para disparar alertas automáticos) e **salva as informações diretamente no banco de dados MongoDB**.
4. **Consumo:** O aplicativo em **React Native** (Frontend) realiza requisições para a API. O backend puxa os dados históricos e em tempo real gravados no MongoDB e os entrega

## Autores

Abaixo estão os desenvolvedores responsáveis pela concepção, circuitos IoT e codificação do ecossistema interRotas:

* **Janyelice Viviane Dantas Soares** - *Scrum Master, Desenvolvedora Full Stack(BackEnd, Desenvolvimento Mobile* 
* **Maria Alice de Medeiros Silva** - * Desenvolvedora Full Stack(BackEnd, Banco de Dados, Designer do protótipo Mobile)* 
* **Rômulo César do Nascimento Santos** - * Pesquisa e integração dos componentes IoT* 
* **Wellington Jerônimo da Silva** -  * Documentação e Pesquisa e integração dos componentes IoT*  



---

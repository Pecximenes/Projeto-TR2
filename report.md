# Relatório do Projeto - Grupo 11

- Paulo Fernando Vilarim - 211043351
- Pedro Eduardo Cunha Ximenes - 200026071

## Resumo

O objetivo deste projeto é desenvolver um sistema de monitoramento remoto para tanques de combustível, utilizando a tecnologia de comunicação LoRa e dispositivos Arduino. Este sistema visa proporcionar um acompanhamento contínuo dos níveis de combustível, transmitindo dados de forma eficiente. A comunicação será ativada em intervalos predefinidos para garantir baixo consumo de energia, permitindo que o transmissor e o receptor operem de maneira otimizada. Além disso, os dados coletados serão apresentados em uma interface de servidor, proporcionando informações sobre os níveis de combustível e métricas do desenpenho da rede. Este relatório detalha o desenvolvimento, implementação e resultados obtidos com o sistema proposto.

## Introdução

O sistema atual de abastecimento energético da UnB é fornecido pela rede pública, porém, a universidade possui tanques de combustível para suprir a demanda de energia caso a oferecida pela rede pública tenha algum problema. Esse sistema de emergencia é essencial para manter os serviços importantes da UnB funcionando, serviços como: rede da universidade, projetos em execução contínua e entre outros.

Devido ao grau de importancia desse sistema, surge a necessidade acompanhar o nível de combustível dos tanques de forma rígida para que o tanque não fique vazio em um momento de necessidader

## Metodologia

#### Equipamentos Utilizados

Durante o desenvolvimento do projeto, foram utilizados os seguintes equipamentos:

- Computador
- 2x Arduinos Uno
- 2x Dragino LoRa Shield v1.4
- Módulo ultrassom HC - SR4
- Protoboard
- Jumpers
- 2x Cabo de alimentação e transmissão de dados

#### Tecnologias utilizadas

Durante o desenvolvimento do projeto, foram utilizadas as seguintes tecnologias:

- Servidor e Apresentação
  - Next.js
  - Prisma
  - SQLite
- Arduino
  - Arduino CLI
  - [Biblioteca LoRa](https://github.com/sandeepmistry/arduino-LoRa)

#### Fluxograma do Sistema

O projeto foi desenvolvido com base em ciclos onde todo o processo de requisição dos dados é feito dentro de um intervalo pré-definido de tempo. Dessa forma, o projeto foi divido em 3 sistemas: servidor, gateway e nó.

O servidor está responsável por armazenar todas as informações obtidas, a fim de realizar um histórico do fluxo de combustível e suas métricas no decorrer do tempo. Outra questão atrelada ao servidor é a apresentação dessas informações, tendo implementado um sistema de gerenciamento e visualização dos dados, além de um fator de autenticação para acessá-las.

O papel do gateway é orquestrar o nó (ou conjunto de nós), utilizando um sistema de gerenciamento baseado em pooling e round-robin. Já o papel do nó é fazer a leitura da informação necessária (sendo o cálculo da distancia entre o combustível e o topo do tanque para determinar a porcentagem atual do tanque ocupada). Tendo essa informação em mãos, o nó vai repassar ao tanque assim que for requisitado.

Com base nisso, o esquema do projeto segue os seguintes passos:

- Gateway:
  - O gateway acorda e espera 10 segundos para todos os outros dispositivos acordarem.
  - O gateway inicia um cronometro para analisar quanto tempo vai durar para ele coletar todos os dados.
  - Mensagem inicial, o gateway vai começar a coleta de dados seguindo a ordem crescente de id's dos nós, começando com o nó de id 1.
    - Ele deve mandar um pacote com 2 informações: Seu id e o id do destinatario
    - Ele vai ouvir o canal, caso não receba nada em 5 segundos, ele vai tentar novamente, no total são 3 tentativas.
    - Ele deve receber uma mensagem com 3 informações (adicionar também os dados extras para analise): o id do remetente, o id do destinatário, o nível do tanque codificado (usar aquela divisão feita em tr1 - CRC).
    - Caso a mensagem tenha algum erro, ele deve reenviar a mensagem pedindo novamente o resultado.
    - Depois de receber as informações de todos, ele vai enviar calcular o tempo que o nó deve suspender até iniciar o próximo ciclo e envia para o mesmo.
  - Suspender o gateway com base no cronometro, fazendo a contagem acontecer de 1 em 1 hora.
- Nó:
  - Assim que o nó acordar, ele deve ficar ouvindo o canal.
  - Quando receber algo, e verifica se é para ele a mensagem, se não for ele ignora.
  - Caso seja para ele o pedido, ele faz o cálculo da distancia usando o ultrassom e devolve para o remetente (gateway).
  - Ele aguarda mensagem para dormir e asimm que recebe ele suspende pelo tempo passado na mensagem.

## Melhorias

Uma adaptação que pode ser feita no sistema, para deixar o algoritmo mais dinâmico, é a retirada ou a atualização programada da tabela de endereçamento do nós utilizada pelo gateway. Uma forma para implementar essa estrutura seria acrescentar alguns passos no início do ciclo:

- Gateway:
  - O gateway reserva um intervalo para detectar se há um nó utilizando o canal que ele ainda não tem conhecimento (ele envia um pacote ao canal informando que está a procura de novos nós e da duração desse intervalo).
  - Assim que encontra um pacote de um nó desconhecido no canal, o gateway lê as informações do pacote para adicionar o nó à tabela de endereçamento. Depois envia uma confirmação que o nó foi adicionado na tabela.
  - Se o gateway lê um pacote com informações de um nó já adicionado na tabela, ele envia um ack dizendo que o nó já está cadastrado na tabela.
  - Caso o nó não envie informação para o gateway quando solitidado, em um intervalo pré-estabelecido de ciclos, ele é retirado da tabela de endereçamento (para retornar à tabela, o nó deverá enviar suas informações para o gateway durante o intervalo de detecção de novos nós)
- Nó:
  - Sendo um nó recém-criado, ele não suspende enquanto não estabelecer contato com o gateway.
  - Assim que recebe a informação da abertura do intervalo, o nó envia um pacote com suas credenciais e aguarda a resposta do gateway.
  - Se a resposta do gateway não for para este nó, ele envia novamente assim que o gateway finaliza o envio do pacote.
  - Se a resposta do gateway for para este nó, ele para de tentar utilizar o canal durante o intervalo.
  - Esse processo vai acontecendo de forma que os nós vão competindo pelo canal e ganha quem conseguir "falar mais alto", dessa forma o intervalo de cadastro é dividido em partes onde em cada uma delas um nó é adicionado.
  - Se o nó não receber um pedido de requisição dos dados do gateway no ciclo. Ele vai enviar uma mensagem de cadastro no ciclo seguinte.

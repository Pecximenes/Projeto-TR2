//* Todos os dispositivos possuem uma tabela com informações de cada dispositivo do sistema com seus id's e cargos.

/* Passos para realizar a comunicação entre dispositivos, levando em conta os passos de um gateway:
    1º= O gateway acorda e espera 10 segundos para todos os outros dispositivos acordarem.
    2º= O gateway inicia um cronometro para analisar quanto tempo vai durar para ele coletar todos os dados.
    3º= Mensagem inicial, o gateway vai começar a coleta de dados seguindo a ordem crescente de id's dos nós, começando com o nó de id 1.
        a. Ele deve mandar um pacote com 2 informações: Seu id e o id do destinatario
        b. Agora ele vai ouvir o canal, caso não receba nada em 5 segundos, ele vai tentar novamente, no total são 3 tentativas.
        c. Ele deve receber uma mensagem com 3 informações (adicionar também os dados extras para analise): o id do remetente, o id do destinatário, o nível do tanque codificado (usar aquela divisão feita em tr1 - CRC).
        d. Caso a mensagem tenha algum erro, ele deve reenviar a mensagem pedindo novamente o resultado.
    4º= Depois de receber as informações de todos, ele vai enviar repetitivamente durante 5 segundos uma mensagem para todos dormirem. 
    5º= Suspender o gateway com base no cronometro, fazendo a contagem acontecer de 1 em 1 hora.

*/

#include <Arduino.h>

#include <SPI.h>
#include <LoRa.h>

const int localId = 0; // Id do Gateway

const int arraySize = 1; // Tamanho do array
const int destIdArray[arraySize] = {1}; // Array de id's dos dispositivos de transmissão

//* Cronometro
unsigned long startTime;                // Tempo quando o se inicia a coleta dos dados
unsigned long endTime;                  // Tempo total após coletar os dados

unsigned int globalExecPeriod = 60000;  // Tempo de duração completa do período de execução
unsigned int listeningTime = 5000;      // Tempo de escuta do sinal 
unsigned int startListeningTime;


void setupSerial() {
    Serial.begin(9600);
    while(!Serial);
    Serial.println("Serial iniciada com sucesso");
}

void setupLoRa() {
    if (!LoRa.begin(915E6)) {
        Serial.println("Erro ao iniciar o modulo LoRa");
        while(1);
    }
    Serial.println("Modulo LoRa iniciado com sucesso");
}

void setup() {
    setupSerial();
    setupLoRa();
}


//* Existem dois tipos de type: REQ -> Pedido de dados, FIN -> Finalização da chamada
void sendPacket(int destId, String type="REQ", int msg=0) {
    Serial.println("Iniciando envio do pacote o nó" + destId);
    LoRa.beginPacket();
    LoRa.write(localId); // endereco local do modulo transmissor
    LoRa.write(destId);  // endereco do modulo de destino
    LoRa.write(type);  // mensagem do pacote
    LoRa.write(msg);  // mensagem do pacote
    LoRa.endPacket();
}

bool receivePacket() {
    if (LoRa.parsePacket(int nodeId)) {
        // Lê pacote
        while (LoRa.available()) {
            senderId = LoRa.read();
            receiverId = LoRa.read();
            tankLevelBinary = LoRa.read();
            tankLevelUnchecked = LoRa.read();
        }

        if (senderId == nodeId && receiverId == localId) {
            Serial.println("Mensagem do nó " + senderId + " Recebida!");
            return true;
        }

        return false;
}}

int convertToInt(String binary) {
  int number = 0;
  int power = 1; // Potência inicial de 2^0

  for (int i = binary.length() - 1; i >= 0; i--) {
    if (binary[i] == '1') {
      number += power;
    }
    power *= 2; // Incrementa a potência de 2
  }

  return number;
}

void loop() {
    //TODO: Parte que faz o gateway esperar
    // ...

    startTime = millis(); // Inicia o contador geral

    // Laço que percorre todos os dispositivos transmissores
    for (int i = 0; i < arraySize; i++) {
        //TODO: Fazer o tratamento no dado
        unsigned int tankLevelUnchecked; // Dados do Tanque sem tratamento
        String tankLevelBinary;
        unsigned int tankLevelChecked; // Dados do Tanque
        bool isChecked = false;

        startListeningTime = millis(); // Início do intervalo de escuta
        bool isConnected;

        while (!isChecked && millis() - startListeningTime < listeningTime) {
            sendPacket(destIdArray[i]); // Enviando pedido para o nó
            delay(500)

            isConnected = receivePacket(destIdArray[i]);
            if (isConnected) {
                int tankLevelBinaryToInt = convertToInt(tankLevelBinary);
                isChecked = tankLevelBinaryToInt == tankLevelUnchecked
                if (isChecked) {
                    //TODO: Enviar as informações do tanque
                }
            } else {
                Serial.println("Nó " + senderId + " não enviou a mensagem!");
            }   
        }
    }

    endTime = millis() - startTime; // Finaliza o contador geral
    unsigned int sleepTime = globalExecPeriod - endTime;

    startListeningTime = millis(); // Início do intervalo de escuta
    while (millis() - startListeningTime < listeningTime) {
        sendPacket(localId, "FIN", sleepTime);
    }

    sleep(sleepTime - listeningTime);
}
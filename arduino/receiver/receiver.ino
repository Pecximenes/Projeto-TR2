//* Todos os dispositivos possuem uma tabela com informações de cada dispositivo do sistema com seus id's e cargos.

/* Passos para realizar a comunicação entre dispositivos, levando em conta os passos de um gateway:
    1º= O gateway acorda e espera 10 segundos para todos os outros dispositivos acordarem.
    2º= O gateway inicia um cronometro para analisar quanto tempo vai durar para ele coletar todos os dados.
    1º= Mensagem inicial, o gateway vai começar a coleta de dados seguindo a ordem crescente de id's dos nós, começando com o nó de id 1.
        a. Ele deve mandar um pacote com 2 informações: Seu id e o id do destinatario
        b. Agora ele vai ouvir o canal, caso não receba nada em 5 segundos, ele vai tentar novamente, no total são 3 tentativas.
        c. Ele deve receber uma mensagem com 3 informações: o id do remetente, o id do destinatário, o nível do tanque codificado (usar aquela divisão feita em tr1 - CRC).
        d. Caso a mensagem tenha algum erro, ele deve reenviar a mensagem pedindo novamente o resultado.
    2º= Depois de receber as informações de todos, ele vai enviar repetitivamente durante 5 segundos uma mensagem para todos dormirem. 
    3º= Suspender o gateway com base no cronometro, fazendo a contagem acontecer de 1 em 1 hora.

*/

#include <Arduino.h>

#include <SPI.h>
#include <LoRa.h>

const int localId = 0; // Id do Gateway

const int arraySize = 1; // Tamanho do array
const int destIdArray[arraySize] = {1}; // Array de id's dos dispositivos de transmissão


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

    // register the channel activity dectection callback
    // LoRa.onCadDone(onCadDone);
    // // register the receive callback
    // LoRa.onReceive(onReceive);
    // put the radio into CAD mode
    // LoRa.channelActivityDetection();
}

void establishingConnectionTx(int destId) {
    Serial.println("Iniciando envio do ACK");
    LoRa.beginPacket();
    LoRa.write(localId);  // endereco local do modulo transmissor
    LoRa.write(destId);  // endereco do modulo de destino
    LoRa.endPacket();
}

void loop() {
    // Laço que percorre todos os dispositivos transmissores
    for (int i = 0; i < arraySize; i++) {
        // antes de tudo devemos estabelecer conexao
        establishingConnectionTx(destIdArray[i]);
    }
    // LoRa.channelActivityDetection();
    // LoRa.onCadDone(onCadDone);

    // if (LoRa.parsePacket()) {
    //     int contentLength = LoRa.read();
    //     int senderId = LoRa.read();
    //     int receiverId = LoRa.read();
    //     // unsigned long caughAt = LoRa.read();

    //     if (receiverId != localId) {
    //         return;
    //     }

    //     String content = "";
    //     while (LoRa.available()) {
    //         content += (char)LoRa.read();
    //     }

    //     if (contentLength != content.length()) {
    //         Serial.println("Mensagem corrompida recebida");
    //         return;
    //     }
    //     LoRa.packetRssi();

    //     Serial.println(content + ' ' + senderId + ' ' + receiverId);
    // }
    // LoRa.onCadDone(onCadDone);
    delay(1000);

}

// void onCadDone(boolean signalDetected) {
//   // detect preamble
//   if (signalDetected) {
//     Serial.println("Sinal Detectado!");
//     // put the radio into continuous receive mode
//     LoRa.receive();
//   } else {
//     // try next activity dectection
//     LoRa.channelActivityDetection();
//   }
// }

// void onReceive(int packetSize) {
//   // received a packet
//   Serial.print("Received packet '");

//   // read packet
//   for (int i = 0; i < packetSize; i++) {
//     Serial.print((char)LoRa.read());
//   }

//   // print RSSI of packet
//   Serial.print("' with RSSI ");
//   Serial.println(LoRa.packetRssi());

//   // put the radio into CAD mode
//   LoRa.channelActivityDetection();
// }
#include <Arduino.h>

#include <SPI.h>
#include <LoRa.h>

const int csPin = 10;  // Chip Select para o protocolo SPI
const int resetPin = 0; // Pin de reset do modulo
const int irqPin = 4;  // Pin DI0

const int localId = 0;

const int arraySize = 1; // Tamanho do array
const int destIdArray[arraySize] = {1}; // Array de id's dos dispositivos de transmissão

void setup() {
    setupSerial();

    setupLoRa();
}

void setupSerial() {
    Serial.begin(9600);
    while(!Serial);
    Serial.println("Serial iniciada com sucesso");
}

void setupLoRa() {
    LoRa.setPins(csPin, resetPin, irqPin);
    if (!LoRa.begin(915E6)) {
        Serial.println("Erro ao iniciar o modulo LoRa");
        while(1);
    }
    Serial.println("Modulo LoRa iniciado com sucesso");
}

void establishingConnectionTx(int destId) {
    LoRa.beginPacket();
    LoRa.write(localId);  // endereco local do modulo transmissor
    LoRa.write(destId);  // endereco do modulo de destino
    LoRa.endPacket();
}

void loop() {
    // Laço que percorre todos os dispositivos transmissores
    for (int i = 0; i < arraySize; i++) {
        // antes de tudo devemos estabelecer conexao
        establishingConnectionTx(i);
    }

    if (LoRa.parsePacket()) {
        int contentLength = LoRa.read();
        int senderId = LoRa.read();
        int receiverId = LoRa.read();
        // unsigned long caughAt = LoRa.read();

        if (receiverId != localId) {
            return;
        }

        String content = "";
        while (LoRa.available()) {
            content += (char)LoRa.read();
        }

        if (contentLength != content.length()) {
            Serial.println("Mensagem corrompida recebida");
            return;
        }
        LoRa.packetRssi();

        Serial.println(content + ' ' + senderId + ' ' + receiverId)
    }
}

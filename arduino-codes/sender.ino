#include <SPI.h>
#include <LoRa.h>

const int csPin = 10;  // Chip Select para o protocolo SPI
const int resetPin = 0; // Pin de reset do modulo
const int irqPin = 4;  // Pin DI0

const int localId = 1;
const int destId = 2;
int timeout = 10000;

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

void loop() {
    // ... logica para pegar o nivel do tanque a partir de um sensor

    String tankLevel = "100";
    if (tankLevel) {
        LoRa.beginPacket();
        LoRa.write(tankLevel.length());  // tamanho do conteudo do pacote LoRa
        LoRa.write(localId);  // endereco local do modulo transmissor
        LoRa.write(destId);  // endereco do modulo de destino
        // LoRa.write(millis());  // tempo da captura
        LoRa.print(tankLevel); // conteudo do pacote LoRa
        LoRa.endPacket();
        delay(timeout);  // timeout para enviar o proximo nivel
    }
}
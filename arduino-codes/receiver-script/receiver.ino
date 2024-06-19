#include <Arduino.h>

#include <SPI.h>
#include <LoRa.h>

const int csPin = 10;  // Chip Select para o protocolo SPI
const int resetPin = 0; // Pin de reset do modulo
const int irqPin = 4;  // Pin DI0

const int localId = 2;

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
    if (LoRa.parsePacket()) {
        int contentLength = LoRa.read();
        int tankId = LoRa.read();
        int gatewayId = LoRa.read();
        // unsigned long caughAt = LoRa.read();

        if (gatewayId != localId) {
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

        Serial.println(content + ' ' + tankId + ' ' + gatewayId)
    }
}

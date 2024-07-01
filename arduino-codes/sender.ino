#include <SPI.h>
#include <LoRa.h>
#include "Ultrasonic.h"

const int csPin = 10;  // Chip Select para o protocolo SPI
const int resetPin = 0; // Pin de reset do modulo
const int irqPin = 4;  // Pin DI0

const int gatewayId = 0;
const int localId = 1;
int timeout = 10000;

String inString = "";    // string de leitura

// Passa como um parâmetro os pinos de trigger(3) e echo(4), respectivamente.
Ultrasonic ultrasonic(3, 4);
int distance;

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

bool establishingConnectionRx() {
    if (LoRa.parsePacket()) {
        // Lê pacote
        while (LoRa.available()) {
            int senderId = LoRa.read();
            int receiverId = LoRa.read();
        }

        if (senderId == gatewayId && receiverId == localId) {
            return true;
        }

        return false;
}}

String readTankLevel() {
    // ... logica para pegar o nivel do tanque a partir de um sensor
    distance = ultrasonic.read();
    Serial.print("Distancia em CM: ");
    Serial.println(distance);
    String tankLevel = String(distance);

    return tankLevel;
}

void loop() {
    bool connected = false;
    while (!connected) {
        connected = establishingConnectionRx();
        delay(10);
    }
    Serial.print("Conexão estabelecida com servidor");

    String tankLevel = readTankLevel();
    if (tankLevel) {
        LoRa.beginPacket();
        LoRa.write(tankLevel.length());  // tamanho do conteudo do pacote LoRa
        LoRa.write(localId);  // endereco local do modulo transmissor
        LoRa.write(gatewayId);  // endereco do modulo de destino
        // LoRa.write(millis());  // tempo da captura
        LoRa.print(tankLevel); // conteudo do pacote LoRa
        LoRa.endPacket();
        delay(timeout);  // timeout para enviar o proximo nivel
    }
}
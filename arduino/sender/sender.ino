/* Passos para realizar a comunicação entre dispositivos, levando em conta os passos de um nó:
    1º= Os nós devem ouvir 
    1º= 
    1º= 
    1º= 

*/




#include <SPI.h>
#include <LoRa.h>
#include "Ultrasonic.h"

const int csPin = 10;  // Chip Select para o protocolo SPI
const int resetPin = 0; // Pin de reset do modulo
const int irqPin = 4;  // Pin DI0

const int gatewayId = 0;
const int localId = 1;
int timeout = 100;

const int trigPin = 3;
const int echoPin = 4;

int senderId;
int receiverId;
String inString = "";    // string de leitura

// Passa como um parâmetro os pinos de trigger(3) e echo(4), respectivamente.
Ultrasonic ultrasonic(trigPin, echoPin);
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
            senderId = LoRa.read();
            receiverId = LoRa.read();
        }

        if (senderId == gatewayId && receiverId == localId) {
            Serial.println("Ack Recebido!");
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
    Serial.print("Conexão estabelecida com servidor\n");
    delay(100);
    

    // String tankLevel = readTankLevel();
    // if (tankLevel) {
    //     String tankLevel = "Isso É um teste";
    //     LoRa.beginPacket();
    //     // LoRa.write(tankLevel.length());  // tamanho do conteudo do pacote LoRa
    //     LoRa.write(tankLevel.length());  // tamanho do conteudo do pacote LoRa
    //     LoRa.write(localId);  // endereco local do modulo transmissor
    //     LoRa.write(gatewayId);  // endereco do modulo de destino
    // //     // LoRa.write(millis());  // tempo da captura
    //     LoRa.print(tankLevel); // conteudo do pacote LoRa
    //     LoRa.endPacket();
    //     delay(timeout);  // timeout para enviar o proximo nivel
    // }
}
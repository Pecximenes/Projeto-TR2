#include <SPI.h>
#include <LoRa.h>

const int csPin = 10;
const int resetPin = 0;
const int irqPin = 4;

byte localAddr = 0xBB;
byte destAddr = 0XFF;
int timeout = 1000;

void setup() {
    Serial.begin(9600);
    while(!Serial);
    Serial.println("Serial iniciada com sucesso");

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
    LoRa.beginPacket();
    LoRa.write(destAddr);  // endereco do modulo de destino
    LoRa.write(localAddr);  // endereco local do modulo transmissor
    LoRa.write(tankLevel.length());  // tamanho do conteudo do pacote LoRa
    LoRa.print(tankLevel); // conteudo do pacote LoRa
    LoRa.endPacket();
    delay(timeout);  // timeout para enviar o proximo nivel
}
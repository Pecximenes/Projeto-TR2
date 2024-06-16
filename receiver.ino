#include <SPI.h>
#include <LoRa.h>

const int csPin = 10;  // Chip Select para o protocolo SPI
const int resetPin = 0; // Pin de reset do modulo
const int irqPin = 4;  // Pin DI0

byte localAddr = 0xBA;

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
    if (LoRa.parsePacket()) {
        int receiverAddr = LoRa.read();
        int senderAddr = LoRa.read();
        int contentLength = LoRa.read();

        if (receiverAddr != localAddr && receiverAddr != 0xFF) {
            return;
        }

        String content = "";
        while (LoRa.available()) {
            content += (char)LoRa.read();
            // contentInt = content.toInt();
        }
        if (contentLength != content.length()) {
            Serial.println("Mensagem corrompida recebida");
            return;
        }
        LoRa.packetRssi();

        // ...logica para enviar ao servidor web o content e o senderAddr
        Serial.println("Nivel de tanque " + content + " recebido do transmissor 0x" + String(senderAddr, HEX));
    }
}
#include <Arduino.h>

#include <SPI.h>
#include <LoRa.h>

const int localId = 0;
const destIdArraySize = 1;
const destIdArray[destIdArraySize] = {1}


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
    if (!LoRa.begin(915E6)) {
        Serial.println("Erro ao iniciar o modulo LoRa");
        while(1);
    }
    Serial.println("Modulo LoRa iniciado com sucesso");
}


void loop() {
    delay(8000);

    unsigned long startTimeGateway = millis();
    for (int i = 0; i < destIdArraySize; i++) {
        unsigned long startTimeTank = millis();
        sendPacket(1, localId, destIdArray[i]);
        bool packetSent = waitForAck();
        if (packetSent) {
            unsigned long endTimeTank = millis();
            sendPacket(2, localId, destIdArray[i], String(640000 - (endTimeTank - startTimeTank)));
        }
    }
    unsigned long endTimeGateway = millis();

    delay(6400000 - (endTimeGateway - startTimeGateway));
}

void sendPacket(int mode, int senderId, int destId, String content="") {
    LoRa.beginPacket();
    LoRa.write(mode);
    LoRa.write(senderId);
    LoRa.write(destId);
    LoRa.write(content.length());
    LoRa.print(content);
}

bool waitForAck() {
    while (1) {
        if (LoRa.parsePacket()) {
            int mode = LoRa.read();
            int tankId = LoRa.read();
            int gatewayId = LoRa.read();
            int contentLength = LoRa.read();

            if (gatewayId == localId) {
                String content = "";
                while (LoRa.available()) {
                    content += (char)LoRa.read();
                }

                if (mode != 0 || contentLength != content.length()) {
                    Serial.println("Pacote corrompido recebido");
                    return false;
                }

                int rssiValue = LoRa.packetRssi();

                Serial.println("dados:",tankId, gatewayId, content, rssiValue);
                return true;
            }

        }
    }
}

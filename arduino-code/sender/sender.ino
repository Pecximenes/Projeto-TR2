#include <Arduino.h>

#include <SPI.h>
#include <LoRa.h>
#include <Ultrasonic.h>

const int localId = 2;
int gatewayId;

const int trigPin = 3;
const int echoPin = 4;
Ultrasonic ultrasonic(trigPin, echoPin);


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


void sendPacket(int mode, int senderId, int destId, String content="") {
    LoRa.beginPacket();
    LoRa.write(mode);
    LoRa.write(senderId);
    LoRa.write(destId);
    LoRa.write(content.length());
    LoRa.print(content);
    LoRa.endPacket();
    LoRa.receive();
}

void loop() {
    while (1) {
        if (LoRa.parsePacket()) {
            int mode = LoRa.read();
            gatewayId = LoRa.read();
            int tankId = LoRa.read();
            int contentLength = LoRa.read();

            if (tankId == localId) {
                if (mode == 1) {
                    String tankLevel = readTankLevel();
                    sendPacket(0, localId, gatewayId, tankLevel);
                }

                if (mode == 2) {
                    String content = "";
                    while (LoRa.available()) {
                        content += (char)LoRa.read();
                    }

                    if (contentLength == content.length()) {
                        Serial.println("Dormindo zzzzzz...");
                        setTimer(content.toInt());
                        Serial.println("Acordei :)");
                    }
                }

            }
        }
    }
}

void setTimer(unsigned int duration) {
  unsigned long startTimer = millis();
  while (millis() - startTimer < duration);
}

String readTankLevel() {
    int distance = ultrasonic.read();
    return String(distance);
}

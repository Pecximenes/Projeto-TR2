#include <Arduino.h>

#include <SPI.h>
#include <LoRa.h>

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const int csPin = 10;  // Chip Select para o protocolo SPI
const int resetPin = 0; // Pin de reset do modulo
const int irqPin = 4;  // Pin DI0

byte localAddr = 0xBA;

const char* ssidWifi = "";  // identificador da wifi
const char* passWifi = "";  // senha da wifi

void setup() {
    // setup da serial
    Serial.begin(9600);
    while(!Serial);
    Serial.println("Serial iniciada com sucesso");

    // setup do lora
    LoRa.setPins(csPin, resetPin, irqPin);
    if (!LoRa.begin(915E6)) {
        Serial.println("Erro ao iniciar o modulo LoRa");
        while(1);
    }
    Serial.println("Modulo LoRa iniciado com sucesso");

    // setup da wifi
    WiFi.begin(ssidWifi, passWifi);
    while(WiFi.status() != WL_CONNECTED) {
        Serial.println("Conectando com a WiFi...");
        delay(500);
    }
    Serial.println("WiFi conectada")
}

void loop() {
    if (LoRa.parsePacket()) {
        int contentLength = LoRa.read();
        byte receiverAddr = LoRa.read();
        byte senderAddr = LoRa.read();

        if (receiverAddr != localAddr) {
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

        httpPostTankLevel(content, senderAddr);
    }
}

void httpPostTankLevel(String tankLevel, byte tankAddr) {
    HTTPClient http;
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Accept", "application/json");

    DynamicJsonDocument contentJson(2048);
    contentJson["level"] = tankLevel;
    contentJson["tank"] = "0x" + String(tankAddr, HEX)
    String body;
    serializeJson(contentJson, body);

    char *url = ""
    http.begin(url);

    int resCode = http.POST(body);
    Serial.println(resCode);

    http.end();
}
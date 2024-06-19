#include <Arduino.h>

#include <SPI.h>
#include <LoRa.h>

#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>

const int csPin = 10;  // Chip Select para o protocolo SPI
const int resetPin = 0; // Pin de reset do modulo
const int irqPin = 4;  // Pin DI0

const int localId = 2;

const char* ssidWifi = "";  // identificador da wifi
const char* passWifi = "";  // senha da wifi

void setup() {
    setupSerial();

    setupLoRa();

    setupWiFi();
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

void setupWiFi() {
    WiFi.begin(ssidWifi, passWifi);
    while(WiFi.status() != WL_CONNECTED) {
        Serial.println("Conectando com a WiFi...");
        delay(500);
    }
    Serial.println("WiFi conectada");
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
        int contentInt = 0;
        while (LoRa.available()) {
            content += (char)LoRa.read();
            contentInt = content.toInt();
        }

        if (contentLength != content.length()) {
            Serial.println("Mensagem corrompida recebida");
            return;
        }
        LoRa.packetRssi();

        httpPostTankLevel(contentInt, tankId);
    }
}

void httpPostTankLevel(int tankLevel, int tankId) {
    HTTPClient http;
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Accept", "application/json");

    DynamicJsonDocument contentJson(2048);
    contentJson["tank"]["levels"]["level"] = tankLevel;
    // contentJson["tank"]["levels"]["caught_at"] = caughtAt / 1000;
    contentJson["tank"]["id"] = tankId
    contentJson["id"] = localId  // endereco do arduino receptor (gateway)
    String body;
    serializeJson(contentJson, body);

    char *url = ""
    http.begin(url);

    int resCode = http.POST(body);
    Serial.println(resCode);

    http.end();
}
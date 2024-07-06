/* Passos para realizar a comunicação entre dispositivos, levando em conta os passos de um nó:
    1º= Assim que o nó acordar, ele deve ficar ouvindo o canal
    2º= Quando receber algo, e verifica se é para ele a mensagem, se não for ele ignora.
    3º= Ele faz o cálculo da mensagem e devolve para o remetente.
    4º= Ele aguarda mensagem para dormir e asimm que recebe ele hiberna pelo tempo passado na mensagem.

*/




#include <SPI.h>
#include <LoRa.h>
#include "Ultrasonic.h"

const int csPin = 10;  // Chip Select para o protocolo SPI
const int resetPin = 0; // Pin de reset do modulo
const int irqPin = 4;  // Pin DI0

const int gatewayId = 0;
const int localId = 1;
String type;
int message;

int tankLevel;
String tankLevelBinary;

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
            type = LoRa.read();
            message = LoRa.read();
        }

        if (senderId == gatewayId && receiverId == localId) {
            Serial.println("Ack Recebido!");
            return true;
        }

        return false;
}}

void readTankLevel() {
    // ... logica para pegar o nivel do tanque a partir de um sensor
    distance = ultrasonic.read();
    Serial.print("Distancia em CM: ");
    Serial.println(distance);
    tankLevel = distance;
}

String convertBinaries(int numero) {
  if (numero == 0) {
    return "0";
  }

  String binario = "";

  while (numero > 0) {
    binario = String(numero % 2) + binario;
    numero = numero / 2;
  }

  return binario;
}

void loop() {
    bool connected = false;
    while (!connected) {
        connected = establishingConnectionRx();
    }
    Serial.print("Conexão estabelecida com servidor\n");

    if (type == "REQ") {

        readTankLevel(); // Leitor ultrassom
        // Caso o leitor ultrassom não funcione, utilize o código abaixo
        // tankLevel = random(1, 300);

        tankLevelBinary = convertBinaries(tankLevel)


        if (tankLevel) {
            LoRa.beginPacket();
            LoRa.write(localId);  // endereco local do modulo transmissor
            LoRa.write(gatewayId);  // endereco do modulo de destino
            LoRa.write(tankLevelBinary);  // mensagem em binário do nível do tanque
            LoRa.print(tankLevel); // conteudo do pacote LoRa
            LoRa.endPacket();
        }
    } else if (type == "FIN") {
        sleep(message); // Fazer o dispositivo dormir
    }
}
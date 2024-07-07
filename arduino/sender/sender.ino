/* Passos para realizar a comunicação entre dispositivos, levando em conta os passos de um nó:
    1º= Assim que o nó acordar, ele deve ficar ouvindo o canal
    2º= Quando receber algo, e verifica se é para ele a mensagem, se não for ele ignora.
    3º= Ele faz o cálculo da mensagem e devolve para o remetente.
    4º= Ele aguarda mensagem para dormir e asimm que recebe ele hiberna pelo tempo passado na mensagem.

*/

#include <SPI.h>
#include <LoRa.h>

// Variáveis para armazenar o tempo de duração do pulso ultrassônico
long duration;
int distance;

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

void setup() {
    setupSerial();

    setupLoRa();

    // Inicialização dos pinos Trig (saída) e Echo (entrada)
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
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

bool receivePacket() {
    int packetSize = LoRa.parsePacket();
    if (packetSize) {
        // Lê pacote
        while (LoRa.available()) {
            senderId = LoRa.read();
            receiverId = LoRa.read();
            type = LoRa.read();
            message = LoRa.read();
        }

        if (senderId == gatewayId && receiverId == localId) {
            Serial.println("Ack Recebido!");
            delay(100000);
            return true;
        }
        
        Serial.println("Ack Recebido!");
        return false;
    }
    return false;
}


void readTankLevel() {
    // Gera um pulso de 10 microssegundos no pino Trig
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Lê a duração do pulso recebido no pino Echo
  duration = pulseIn(echoPin, HIGH);

  // Calcula a distância em centímetros
  distance = duration * 0.034 / 2;

  // Imprime a distância no Monitor Serial
  Serial.print("Distancia: ");
  Serial.print(distance);
  Serial.println(" cm");
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
    readTankLevel();
    delay(1000);
    // bool connected = false;
    // while (!connected) {
    //     Serial.println(connected);
    //     connected = receivePacket();
    //     Serial.println(connected);

    // }
    // Serial.println(connected);
    // Serial.print("Conexão estabelecida com servidor\n");

    // if (type == "REQ") {

    //     readTankLevel(); // Leitor ultrassom
    //     // Caso o leitor ultrassom não funcione, utilize o código abaixo
    //     // tankLevel = random(1, 300);

    //     tankLevelBinary = convertBinaries(distance);


    //     if (tankLevel) {
    //         LoRa.beginPacket();
    //         LoRa.write(localId);  // endereco local do modulo transmissor
    //         LoRa.write(gatewayId);  // endereco do modulo de destino
    //         LoRa.print(tankLevelBinary);  // mensagem em binário do nível do tanque
    //         LoRa.write(distance); // conteudo do pacote LoRa
    //         LoRa.endPacket();
    //     }
    // } else if (type == "FIN") {
    //     delay(message); // Fazer o dispositivo dormir
    // }
}
/*
      Programa Receptor LoRa Simples

      Componentes:
        - Arduino Uno;
        - Módulo LoRa XL1278-SMT;

      Versão 1.0 - Versão inicial - 09/Out/2021

 *    * Criado por Cleber Borges - FunBots - @cleber.funbots  *     *

      Instagram: https://www.instagram.com/cleber.funbots/
      Facebook: https://www.facebook.com/cleber.funbots
      YouTube: https://www.youtube.com/channel/UCKs2l5weIqgJQxiLj0A6Atw
      Telegram: https://t.me/cleberfunbots

*/

#include <SPI.h>
#include <LoRa.h>

// Variáveis para armazenar o tempo de duração do pulso ultrassônico
const int trigPin = 3;
const int echoPin = 4;
long duration;
int distance;

int dadoRecebido = 0;
int valorRssi = 0;
/*
  Received Signal Strength Indication
  RSSI=-30dBm: sinal forte.
  RSSI=-120dBm: sinal fraco.
*/

unsigned int senderId;
unsigned int receiverId;
String typeMessage;
String message;

const int gatewayId = 0;
const int localId = 1;


unsigned long startTime; // Tempo quando se inicia a coleta dos dados
unsigned long startListeningTime; // Tempo que inicia a coleta de um no especifico
unsigned long listeningTimeLimit = 15000; // Tempo limite reservado para obter os dados de cada no


void setup() {
  Serial.begin(9600);

  while (!Serial);
  Serial.println("Receptor LoRa");
  if (!LoRa.begin(433E6)) {       // Frequencia de operação (ou 915E6)
    Serial.println("Falha em iniciar o LoRa!");
    while (1);
  }
}

void setTimer(unsigned int duration)
{
  unsigned long startTimer = millis();
  while (millis() - startTimer < duration) {}
  //Serial.println("O timer demorou: " + String(millis() - startTimer) + "s"); // Debug
  //Serial.println("Millis=" + String(millis())); // Debug
  //Serial.println("startTimer=" + String(startTimer)); // Debug
  //Serial.println("duration=" + String(duration)); // Debug
}


String receivePacket()
{
  String completePcktStr = "";
  // Tenta receber pacote de dados
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // Lê pacote
    while (LoRa.available())
    {
      completePcktStr += (char)LoRa.read();
    }
    valorRssi = LoRa.packetRssi();
    return completePcktStr;
  }
  return "";
}

/**
 * Função para enviar o pacote de dados pelo LoRa.
 * 
 * @param binMsg Mensagem em binário.
 * @param msg Mensagem do nível do tanque.
 * @return void.
 */
void sendPacket(String binMsg, int msg)
{
  String completedPacket = String(localId) + "/" + String(gatewayId) + "/" + binMsg + "/" + String(msg);
  
  Serial.println("Iniciando envio do pacote ao gateway, a mensagem eh: " + completedPacket);

  LoRa.beginPacket();
  LoRa.print(completedPacket);
  LoRa.endPacket();
}

void breakPacketString(String packet)
{
  String parts[4]; // Array para armazenar as partes
  int startIndex = 0;
  int partIndex = 0;

  // Percorre a string e divide pelas '/'
  for (int i = 0; i < packet.length(); i++) {
    if (packet.charAt(i) == '/') {
      parts[partIndex++] = packet.substring(startIndex, i);
      startIndex = i + 1;
    }
  }

  // Última parte da string
  parts[partIndex] = packet.substring(startIndex);

  senderId = parts[0].toInt();
  receiverId = parts[1].toInt();
  typeMessage = parts[2];
  message = parts[3];
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

void readTankLevel()
{
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
  Serial.println("Distancia: " + String(distance) + "cm");
}

void loop() {
  String completePacketString = receivePacket();    // string de leitura
  
  if (completePacketString != "")
  {
    Serial.println("Dado Recebido: " + completePacketString + "; Sinal: " + String(valorRssi));
    // setTimer(10);
    breakPacketString(completePacketString);

    // Serial.println("SenderId: " + senderId); // Debug
    // Serial.println("ReceiverId: " + receiverId); // Debug
    // Serial.println("TypeMessage: " + typeMessage); // Debug
    // Serial.println("Message: " + message); // Debug
    if (receiverId == localId)
    {
      if (typeMessage == "REQ")
      {
        //TODO fazer o disp usar o ultrassom
        readTankLevel();
        //TODO fazer o disp enviar os dados
        sendPacket(convertBinaries(distance), distance);
        LoRa.receive(); // Mudando o status do LoRa de send para receive
      }
      else if (typeMessage == "FIN")
      {
        setTimer(message.toInt());
      }
    }
  }
}
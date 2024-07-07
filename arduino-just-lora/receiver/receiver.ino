/*
      Programa Transmissor LoRa Simples

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

const int localId = 0; // Id do Gateway

String binaryTankLevel;
int tankLevel;

unsigned long listeningTimeLimit = 15000;

int senderId;
int receiverId;

int valorRssi;

const int arraySize = 1; // Tamanho do array
const int destIdArray[arraySize] = {1}; // Array de id's dos dispositivos de transmissão

// unsigned long timeout = 3600000; // Ciclo de recepção dos dados em uma hora
unsigned long timeout = 60000; // Ciclo de recepção dos dados


void setup()
{
  Serial.begin(9600);

  while (!Serial);
  Serial.println("Transmissor LoRaaa");
  if (!LoRa.begin(433E6)) {           // Frequencia de operação (ou 915E6)
    Serial.println("Falha em iniciar o LoRa!");
    while (1);
  }
}

/**
 * Função para ativar o temporizador.
 * 
 * @param duration Tempo em milissegundos(ms) de duração do temporizador.
 * @return void.
 */
void setTimer(unsigned int duration)
{
  unsigned long startTimer = millis();
  while (millis() - startTimer < duration) {}
}


/**
 * Função para enviar o pacote de dados pelo LoRa.
 * 
 * @param destId Id do nó desejado.
 * @param type="REQ" Existem dois tipos de type: REQ -> Requisição de dados, FIN -> Finalização da chamada.
 * @param msg=0 Mensagem do pacote (utilizada para enviar o intervalo de suspensão em MS caso type="FIN").
 * @return void.
 */
void sendPacket(int destId, String type="REQ", int msg=0)
{
  String completedPacket = String(localId) + "/" + String(destId) + "/" + type + "/" + String(msg);
  
  Serial.println("Iniciando envio do pacote ao nó: " + String(destId) + ", a mensagem eh: " + completedPacket);

  LoRa.beginPacket();
  LoRa.print(completedPacket);
  LoRa.endPacket();
}


String receivePacket()
{
  String completePcktStr;
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


int convertBinaryToInt(String binary)
{
  int number = 0;
  int power = 1; // Potência inicial de 2^0

  for (int i = binary.length() - 1; i >= 0; i--)
  {
    if (binary[i] == '1') {
      number += power;
    }
    power *= 2; // Incrementa a potência de 2
  }

  return number;
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
  binaryTankLevel = parts[2];
  tankLevel = parts[3].toInt();
}


void loop()
{
  setTimer(10000); // Tempo para o temporizador inicializar e aguardar o nó ligar
  unsigned long startTime = millis(); // Inicia o contador geral
  
  Serial.println("Comecando a leitura");

  for (int i = 0; i < arraySize; i++)
  {
    Serial.println("Vez do no: " + String(destIdArray[i]));
    
    unsigned long startListeningTime = millis(); // Início do intervalo de escuta
    bool isChecked = false;
    
    
    while (!isChecked && millis() - startListeningTime < listeningTimeLimit)
    {
      //Enviando o Pacote
      sendPacket(destIdArray[i]); // Enviando pedido para o no
      LoRa.receive(); // Mudando o status do LoRa de send para receive
      setTimer(1000); // Espera 1s para o no finalizar a leitura, transformação e envio dos dados, aqui deve implementar o Te (equação)
      
      Serial.println("Tentando ler o sinal");
      Serial.println("Tempo: " + String(millis() - startListeningTime) + "ms"); //Debug
      
      String completePacketString = receivePacket();    // string de leitura

      if (completePacketString != "") 
      {
        breakPacketString(completePacketString);
        unsigned int tankLevelFromBinary = convertBinaryToInt(binaryTankLevel);
        Serial.println("O numero em binario recebido foi: " + String(tankLevelFromBinary)); // Debug
        if (tankLevelFromBinary == tankLevel) 
        {
          isChecked = true;
          //TODO Enviar uma mensagem para o no dormir

        } 
        else
        {
          Serial.println("OS RESULTADOS NÂO BATEM, DANDO SEQUENCIA NO SISTEMA!");
        }
      }
    }
    
    // Serial.println("isChecked=" + String(isChecked));
    // Serial.println(millis() - startListeningTime < listeningTimeLimit);
    
    unsigned int ListeningTime = millis() - startListeningTime;
    Serial.println("Demorou " + String(ListeningTime) + "ms para ler o no: " + String(destIdArray[i]));
  }
  
  // Serial.println("Fazendo o gateway dormir por 10s depois do programa rodar por: " + String(millis() - startTime) + "ms");
  unsigned int gatewayTime = millis() - startTime;
  setTimer(timeout - gatewayTime);
}
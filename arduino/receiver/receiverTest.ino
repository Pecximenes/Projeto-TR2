// C++ code
//
#include <SPI.h>


const int arraySize = 2; // Tamanho do array
const int destIdArray[arraySize] = {1, 2}; // Array de id's dos dispositivos de transmissão


unsigned long startTime; // Tempo quando se inicia a coleta dos dados
unsigned int startListeningTime; // Tempo que inicia a coleta de um no especifico
unsigned int listeningTimeLimit = 15000; // Tempo limite reservado para obter os dados de cada no



void setup()
{
  Serial.begin(9600);
}

void loop()
{
  delay(1000);
  startTime = millis(); // Inicia o contador geral
  
  Serial.println("Comecando a leitura");

  for (int i = 0; i < arraySize; i++)
  {
    Serial.println("Vez do no: " + String(i));
    
    startListeningTime = millis(); // Início do intervalo de escuta
    bool isChecked = false;
    bool isConnected = false;
    
    while (!isChecked && millis() - startListeningTime < listeningTimeLimit)
    {
      //Enviando o Pacote
      // sendPacket(destIdArray[i]); // Enviando pedido para o no
      delay(1000); // Espera 1s para o no finalizar a leitura, transformação e envio dos dados, aqui deve implementar o Te (equação)

      
      Serial.println("Tentando ler o sinal");
      Serial.println("Tempo: " + String(millis() - startListeningTime) + "ms"); //Debug
      delay(500);
    }
    
    unsigned int finalListeningTime = millis() - startListeningTime;
    Serial.println("Demorou " + String(finalListeningTime) + "ms para ler o no: " + String(i));

  }  
}
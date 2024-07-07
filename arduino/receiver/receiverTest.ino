// C++ code
//


const int arraySize = 2; // Tamanho do array
const int destIdArray[arraySize] = {1, 2}; // Array de id's dos dispositivos de transmissão


unsigned long startTime; // Tempo quando se inicia a coleta dos dados
unsigned long startListeningTime; // Tempo que inicia a coleta de um no especifico
unsigned long listeningTimeLimit = 15000; // Tempo limite reservado para obter os dados de cada no



void setup()
{
  Serial.begin(9600);
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

int convertBinaryToInt(String binary) {
  int number = 0;
  int power = 1; // Potência inicial de 2^0

  for (int i = binary.length() - 1; i >= 0; i--) {
    if (binary[i] == '1') {
      number += power;
    }
    power *= 2; // Incrementa a potência de 2
  }

  return number;
}

void loop()
{
  setTimer(1000);
  startTime = millis(); // Inicia o contador geral
  
  Serial.println("Comecando a leitura");

  for (int i = 0; i < arraySize; i++)
  {
    Serial.println("Vez do no: " + String(i));
    
    startListeningTime = millis(); // Início do intervalo de escuta
    bool isChecked = false;
    bool isConnected = false;
    String binaryTankLevel;
    int tankLevel;
    
    while (!isChecked && millis() - startListeningTime < listeningTimeLimit)
    {
      //Enviando o Pacote
      // sendPacket(destIdArray[i]); // Enviando pedido para o no
      setTimer(1000); // Espera 1s para o no finalizar a leitura, transformação e envio dos dados, aqui deve implementar o Te (equação)

      
      Serial.println("Tentando ler o sinal");
      Serial.println("Tempo: " + String(millis() - startListeningTime) + "ms"); //Debug
      
      // Teste para ver quando recebe um sinal (Debug)
      if (millis() - startListeningTime > 8000)
      {
        isConnected = true;
        binaryTankLevel = "11001"; // Mensagem recebida (eh 25 em binario)
        tankLevel = 26;
      }
      
      if (isConnected) 
      {
        setTimer(1000); // Debug
        unsigned int tankLevelFromBinary = convertBinaryToInt(binaryTankLevel);
        Serial.println("O numero em binario recebido foi: " + String(tankLevelFromBinary));
        if (tankLevelFromBinary == tankLevel) 
        {
          isChecked = true;
        } 
        else
        {
          Serial.println("OS RESULTADOS NÂO BATEM, DANDO SEQUENCIA NO SISTEMA!");
        }
      }
      
      
      setTimer(500);
    }
    
    Serial.println("isChecked=" + String(isChecked));
    Serial.println(millis() - startListeningTime < listeningTimeLimit);
    
    unsigned int finalListeningTime = millis() - startListeningTime;
    Serial.println("Demorou " + String(finalListeningTime) + "ms para ler o no: " + String(i));
  }
  
  Serial.println("Fazendo o gateway dormir por 10s depois do programa rodar por: " + String(millis() - startTime) + "ms");
  setTimer(10000);
}
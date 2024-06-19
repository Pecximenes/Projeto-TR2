from serial import Serial
from datetime import datetime
import requests

# Configuracao da porta serial
serial = Serial('COM3', 9600)  # Substitua 'COM3' pela porta correta do seu Arduino

while True:
    if serial.in_waiting > 0:
        line = serial.readline().decode('utf-8').rstrip()
        print(f"Leitura do sensor: {line}")
        tank_level, tank_id, gateway_id = line.split()

        # Enviar dados para o servidor
        data = {"id": gateway_id,
                "tanks": [
                    {
                        "id": tank_id,
                        "levels": [
                            {
                                "level": tank_level,
                                "caught_at": datetime.now()
                            }
                        ]
                    }
                ]
        }
        response = requests.post("http://localhost:3001/api/tank/update-level", data=data)
        print(response.text)

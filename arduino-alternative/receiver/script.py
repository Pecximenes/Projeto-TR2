from serial import Serial
from datetime import datetime
from requests import Session
from requests.exceptions import ChunkedEncodingError, ReadTimeout, RequestException
from time import sleep

# Configuracao da porta serial
serial = Serial('porta', 9600)  # Substitua 'COM3' pela porta correta do seu Arduino

while True:
    if serial.in_waiting > 0:
        line = serial.readline().decode('utf-8').rstrip()
        print(f"Leitura do sensor: {line}")
        cmd, tank_id, gateway_id, tank_level, rssi = line.split()

        if cmd == "dados:":
            # Enviar dados para o servidor
            data = {
                "level": int(tank_level),
                "rssi": int(rssi),
                "caughtAt": datetime.now(),
                "tank": {
                    "arduinoId": int(tank_id),
                    "gateway": {
                        "arduinoId": int(gateway_id)
                    }
                }
            }

            session = Session()
            for attempt in range(3):
                try:
                    response = session.post("http://localhost:3001/api/tanklevel/create", data=data)
                    if response.status_code == 200:
                        print(response.text)
                        break
                except (ChunkedEncodingError, ReadTimeout, RequestException):
                    if attempt < 2:
                        sleep(2)
                    else:
                        raise

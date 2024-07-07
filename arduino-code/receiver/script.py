from serial import Serial
from datetime import datetime
from requests import Session
from threading import Thread
from requests.exceptions import ChunkedEncodingError, ReadTimeout, RequestException
from time import sleep

# Configuracao da porta serial
serial = Serial('porta', 9600)  # Substitua 'COM3' pela porta correta do seu Arduino

def postDataToWebServer():
    session = Session()
    for attempt in range(3):
        try:
            response = session.post("http://0.0.0.0:3001/tanklevels/create", data=data)
            if response.status_code == 200:
                print(response.text)
                break
        except (ChunkedEncodingError, ReadTimeout, RequestException):
            if attempt < 2:
                sleep(2)
            else:
                raise

while True:
    if serial.in_waiting > 0:
        line = serial.readline().decode('utf-8').rstrip()
        print(f"Leitura do sensor: {line}")

        if line[0] == "#":
            tank_id, gateway_id, tank_level, rssi = line[1:].split()
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

            thread = Thread(target=postDataToWebServer, args=(), daemon=True)
            thread.start()

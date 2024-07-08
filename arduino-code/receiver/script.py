from serial import Serial
from datetime import datetime
from requests import Session
from threading import Thread
from requests.exceptions import ChunkedEncodingError, ReadTimeout, RequestException
from time import sleep

def postDataToWebServer(tank_id, gateway_id, tank_level, rssi, snr):
    data = {
        "level": int(tank_level),
        "rssi": int(rssi),
        "snr": float(snr),
        "caughtAt": datetime.now().strftime("%Y-%m-%d, %H:%M:%S"),
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
            response = session.post("http://0.0.0.0:3001/tanklevels/create", json=data, headers={"Content-Type": "application/json"}, timeout=10)
            if response.status_code == 200:
                print(response.text)
                break
        except (ChunkedEncodingError, ReadTimeout, RequestException):
            if attempt < 2:
                sleep(2)
            else:
                break

# Inicialização da porta serial
serial = Serial('/dev/ttyACM1', 9600)  # Substitua 'COM3' pela porta correta do seu Arduino

while True:
    if serial.in_waiting > 0:
        line = serial.readline().decode('utf-8').rstrip()
        print(line)

        if line[0] == "#":
            tank_id, gateway_id, tank_level, rssi, snr = line[1:].split()

            thread = Thread(target=postDataToWebServer, args=(tank_id, gateway_id, tank_level, rssi, snr), daemon=True)
            thread.start()

#!/bin/bash

arduino-cli compile --libraries ./src/shared/ --fqbn arduino:avr:uno ./sender.ino
arduino-cli upload -p /dev/ttyACM1 --fqbn arduino:avr:uno  ./sender.ino
arduino-cli monitor -p /dev/ttyACM1

#!/bin/bash

arduino-cli compile --build-property build.extra_flags=-DOWN_ID=10 --libraries ./src/shared/ --fqbn arduino:avr:uno ./receiver.ino
arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno  ./receiver.ino
arduino-cli monitor -p /dev/ttyACM0
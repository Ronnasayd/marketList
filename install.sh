#!/bin/bash
# for Debian/Ubuntu
rm -rf /tmp/scrcpy
sudo apt install -y ffmpeg libsdl2-2.0-0 adb wget \
                 gcc git pkg-config meson ninja-build libsdl2-dev \
                 libavcodec-dev libavdevice-dev libavformat-dev libavutil-dev \
                 libswresample-dev libusb-1.0-0 libusb-1.0-0-dev
sudo modprobe binder_linux devices=binder,hwbinder,vndbinder
cd /tmp
git clone https://github.com/Genymobile/scrcpy
cd scrcpy
./install_release.sh
# Smart Light Experiments

A small IoT project to control LEDs on an **ESP8266 (NodeMCU)** from a web page, using **WebSockets**.

The browser sends a command to the server, the server forwards it to every connected client, and the NodeMCU changes the LED.

## Experiments

**01 - ON / OFF**
A button turns the ESP's built-in LED on or off.

**02 - Brightness**
A slider (0 - 100) controls the brightness of the ESP's built-in LED.

**03 - RGB Lights**
Three buttons (blue, red, green) turn three external LEDs on or off separately.

## Wiring (Experiment 03)

Each external LED has its own pin and a 220 ohm resistor, and returns to GND.

```
D5 --> 220 ohm --> Blue LED   --> GND
D6 --> 220 ohm --> red LED  --> GND
D7 --> 220 ohm --> Green LED --> GND
```

## Run

**Server**
```
npm install
npm start
```
`npm install` downloads the libraries listed in `package.json` (run it once). `npm start` runs the server with nodemon, so it restarts automatically when you edit the code.

Then open `http://<computer-ip>:3000` in the browser.

**NodeMCU**
1. Install the **WebSockets** library (by Markus Sattler) in the Arduino IDE.
2. In `light_client.ino`, put your own Wi-Fi name, Wi-Fi password, and the computer's IP address in their places:
   ```cpp
   const char *ssid = "YOUR_WIFI_NAME";
   const char *pass = "YOUR_WIFI_PASSWORD";
   #define SERVER  "YOUR_COMPUTER_IP"   // example: 192.168.1.20
   ```
   You can find the computer's IP by running `ipconfig` (look for the IPv4 Address of the Wi-Fi adapter).
3. Upload the code to the board.

> The computer, the phone, and the NodeMCU must be on the same Wi-Fi network.
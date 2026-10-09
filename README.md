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

## Run & Access

**Web Interface (Deployment)**
The web server is deployed and live at **[IOT LAB](https://iot-lab-alpha.vercel.app/)**. 
You can open this link directly in your browser or phone from anywhere to control the LEDs—no local server setup or `npm start` needed for clients!

*(Note: If you are hosting/modifying the backend source code locally or on a cloud platform, you can still run `npm install` and `npm start` to manage the server).*

**NodeMCU**
1. Install the **WebSockets** library (by Markus Sattler) in the Arduino IDE.
2. In `light_client.ino`, put your own Wi-Fi name and Wi-Fi password:
   ```cpp
   const char *ssid = "YOUR_WIFI_NAME";
   const char *pass = "YOUR_WIFI_PASSWORD";
   ```
   *(Note: You can also run it locally by running `npm install` and `npm start` to manage the server and replacing these lines with your computer's local IP and port instead of using ipconfig for the full setup)*:
   ```cpp
   #define SERVER  "iot-lab-alpha.vercel.app"   
   #define PORT    443
   ```
3. Upload the code to the board.

> The NodeMCU needs an internet connection via Wi-Fi to reach the deployed server, and you can control it from any network worldwide via the IOT LAB link.
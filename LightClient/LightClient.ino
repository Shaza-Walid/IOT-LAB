#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>

WebSocketsClient wsc;

const char *ssid = "wifi name";
const char *pass = "wifi password";

#define SERVER  "IP Address."
#define PORT    3000
#define URL     "/"

#define LEDBLUE_PIN  D5
#define LEDRED_PIN   D6
#define LEDGREEN_PIN D7

void websocketEvent(WStype_t type, uint8_t *data, size_t length){
  switch(type){
    case(WStype_CONNECTED):
      Serial.printf("connected to server\n");
      break;
    case WStype_DISCONNECTED:
      Serial.printf("Disconnected!\n");
      break;
    case(WStype_TEXT):
      // Experiment 1 esp led ON/OF 
      if(!strcmp((char*)data,"on")){
        analogWrite(LED_BUILTIN, 0);
      
      }else if(!strcmp((char*)data,"off")){
        analogWrite(LED_BUILTIN, 100);
      // Experiment 3 controlling three external LEDs connected to the esp
      }else if(!strcmp((char*)data,"blue_on")){
        analogWrite(LEDBLUE_PIN, 100);

      }else if(!strcmp((char*)data,"blue_off")){
        analogWrite(LEDBLUE_PIN, 0);

      }else if(!strcmp((char*)data,"red_on")){
        analogWrite(LEDRED_PIN, 100);

      }else if(!strcmp((char*)data,"red_off")){
        analogWrite(LEDRED_PIN, 0);

      }else if(!strcmp((char*)data,"green_on")){
        analogWrite(LEDGREEN_PIN, 100);

      }else if(!strcmp((char*)data,"green_off")){
        analogWrite(LEDGREEN_PIN, 0);
      // Experiment 2 controlling the esp LED brightness
      }else{

        analogWrite(LED_BUILTIN, 100 - atoi((char*)data));
      }
      Serial.printf("data: %s\n",data);
      break;
  }
}

void setup(){
  pinMode(LED_BUILTIN, OUTPUT);

  pinMode(LEDRED_PIN, OUTPUT);
  pinMode(LEDBLUE_PIN, OUTPUT);
  pinMode(LEDGREEN_PIN, OUTPUT);

  analogWriteRange(100);
  Serial.begin(115200);

  WiFi.begin(ssid, pass);

  while(WiFi.status() != WL_CONNECTED){
    Serial.println(".");
    delay(500);
  }

  Serial.println(WiFi.SSID());
  Serial.println(WiFi.localIP());

  wsc.begin(SERVER, PORT, URL);
  wsc.onEvent(websocketEvent);
  // try ever 1000 again if connection has failed
  wsc.setReconnectInterval(1000);
}

void loop(){
  wsc.loop();
}


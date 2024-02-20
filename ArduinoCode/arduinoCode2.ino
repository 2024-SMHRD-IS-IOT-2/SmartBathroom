#include <WiFi.h>

const char* ssid = "SMHRD_강의실C";
const char* password = "ccccc33333";


const uint16_t port = 8000;
const char * host = "172.30.1.25";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("...");
  }

  Serial.print("WiFi connected with IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {

  WiFiClient client;

  if (!client.connect(host, port)) {
      Serial.println("Connection to host failed");
      delay(1000);
      return;
  }

    Serial.println("Connected to server successful!");

    // send data 
    client.print("Hello from ESP32!");

    // stop. freeing
    Serial.println("Disconnecting...");
    client.stop();
    delay(1000);



  delay(500);
}

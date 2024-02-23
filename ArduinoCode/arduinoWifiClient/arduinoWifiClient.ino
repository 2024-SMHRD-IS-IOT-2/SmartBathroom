#include <WiFi.h>
#include "DHT.h"


#define DHTPIN 18
#define DHTTYPE DHT22
#define METHPINA0 34
#define VIBRATION 36
#define NH3 35

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "SMHRD_강의실C";
const char* password = "ccccc33333";
const char* serverAddress = "172.30.1.45"; // IP address of your Node.js server
const int serverPort = 3001; // Port of your Node.js server
const char* userId = "asdf";

WiFiClient wifiClient;

void setup() {
  Serial.begin(115200);
  connectToWiFi();
  dht.begin();
  pinMode(METHPINA0, INPUT);
  pinMode(NH3, INPUT);

}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {

    // Send sensor data to server
    sendDataToServer();

    delay(10000); // Adjust delay as needed
  }
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
}

//read sensor data, make json string.
void sendDataToServer() {
  String url = "/user/sensorData"; // Adjust the endpoint as needed


  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int nh3 = analogRead(NH3);
  float meth = analogRead(METHPINA0);
  bool btnEmerg = btnEmerg;
  int falldown = analogRead(VIBRATION);

  String data = "member_id=" + String(userId) + 
                "&humidity=" + String(h) + 
                "&temp=" + String(t) +
                "&nh3=" + String(nh3) +
                "&meth=" + String(meth) +
                "&btnEmerg=" + String(btnEmerg) +
                "&falldown=" + String(falldown);
  sendRequest(url, data);
}



//send get request to node server. with sensor data.
void sendRequest(String url, String data) {
  if (wifiClient.connect(serverAddress, serverPort)) {
    Serial.println("Connected to server");

    wifiClient.print("GET " + url + "?" + data + " HTTP/1.1\r\n");
    wifiClient.print("Host: " + String(serverAddress) + ":" + String(serverPort) + "\r\n");
    wifiClient.print("Connection: close\r\n\r\n");
    wifiClient.flush();

    // Read server response
    while (wifiClient.connected() && !wifiClient.available()) {
      delay(10);
    }

    while (wifiClient.available()) {
      String line = wifiClient.readStringUntil('\r');
      Serial.print(line);
    }

    wifiClient.stop();
    Serial.println("\nDisconnected from server");
  } else {
    Serial.println("Connection to server failed");
  }
}
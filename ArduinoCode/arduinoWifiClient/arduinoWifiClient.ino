#include <WiFi.h>

const char* ssid = "SMHRD_강의실C";
const char* password = "ccccc33333";
const char* serverAddress = "172.30.1.46"; // IP address of your Node.js server
const int serverPort = 3001; // Port of your Node.js server

WiFiClient wifiClient;

void setup() {
  Serial.begin(115200);
  connectToWiFi();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Read sensor data
    int sensorValue1 = 123;
    int sensorValue2 = 333;

    // Send sensor data to server
    sendDataToServer(sensorValue1, sensorValue2);

    // Check for commands from server
    receiveCommandsFromServer();

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

void sendDataToServer(int sensorValue1, int sensorValue2) {
  String url = "/user/sensorData"; // Adjust the endpoint as needed
  String data = "sensor1=" + String(sensorValue1) + "&sensor2=" + String(sensorValue2);
  sendRequest(url, data);
}

void receiveCommandsFromServer() {
  String url = "/user/sensorCommand"; // Adjust the endpoint as needed
  sendRequest(url, "");
}

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
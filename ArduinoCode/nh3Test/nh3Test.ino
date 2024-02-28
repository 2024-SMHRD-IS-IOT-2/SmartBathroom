
#include <MiCS6814-I2C.h>


#define NH3PIN 4


void setup() {
  Serial.begin(115200);

  //pin setup
  pinMode(NH3PIN, INPUT);

}

void loop() {
  sendDataToServer();
  delay(100);
}


//read sensor data, make json string.
void sendDataToServer() {
  String url = "/user/sensorData"; 

  float nh3 = analogRead(NH3PIN);
  String data = "&nh3=" + String(nh3);
  // sendRequest(url, data);  
    Serial.println(data);
}

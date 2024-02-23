#include "DHT.h"
#include <MiCS6814-I2C.h>

// 
#define DHTPIN 18
#define DHTTYPE DHT22
#define METHPINA0 34
// #define METHPIND0 13 
#define VIBRATION 36
#define NH3 35

DHT dht(DHTPIN, DHTTYPE);
// MiCS6814 sensor;
// bool sensorConnected;

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(METHPINA0, INPUT);
  // pinMode(METHPIND0, INPUT);
  pinMode(NH3, INPUT);


}

bool btnEmerg = false;
bool isFalldown = false;

void loop() {

  float h = dht.readHumidity();
  float t = dht.readTemperature();
  // int nh3 = sensor.measureNH3();  // 암모니아센서
  int nh3 = analogRead(NH3);
  float meth = analogRead(METHPINA0);
  // int methD =  digitalRead(METHPIND0);
  bool btnEmerg = btnEmerg;
  int falldown = analogRead(VIBRATION);


  String data = "humitidy=" + String(h) + 
                "&temp=" + String(t) +
                "&nh3=" + String(nh3) +
                "&meth=" + String(meth) +
                // "&methD=" + String(methD) +
                "btnEmerg=" + String(btnEmerg) +
                "&falldown=" + String(falldown);
  Serial.println(data);
  
  // sendDataToServer(h,t,am,meth,methD, btnEmerg,falldown);
  delay(1000);

}

// void sendDataToServer(float h, float t, float am, float meth, int methD, bool btnEmerg, bool falldown ) {

//   String data = "humitidy=" + String(h) + 
//                 "&temp=" + String(t) +
//                 "&ammonia=" + String(am) +
//                 "&meth=" + String(meth) +
//                 "&methD=" + String(methD) +
//                 "btnEmerg=" + String(btnEmerg) +
//                 "&falldown=" + String(falldown);
//   Serial.println(data);
// }
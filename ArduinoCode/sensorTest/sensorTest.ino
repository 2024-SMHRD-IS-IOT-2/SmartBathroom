#include "DHT.h"

// 
#define DHTPIN 18
#define DHTTYPE DHT22
#define METHPINA0 34
#define METHPIND0 13 
#define VIBRATION 36

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(METHPINA0, INPUT);
  pinMode(METHPIND0, INPUT);
  pinMode(VIBRATION, INPUT);
}

bool btnEmerg = false;
bool isFalldown = false;

void loop() {




  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float am = 0;  // 암모니아센서
  float meth = analogRead(METHPINA0);
  int methD =  digitalRead(METHPIND0);
  bool btnEmerg = btnEmerg;
  int falldown = analogRead(VIBRATION);


  String data = "humitidy=" + String(h) + 
                "&temp=" + String(t) +
                "&ammonia=" + String(am) +
                "&meth=" + String(meth) +
                "&methD=" + String(methD) +
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
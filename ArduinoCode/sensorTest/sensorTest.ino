#include "DHT.h"
#include <MiCS6814-I2C.h>

#define DHTPIN 8
#define DHTTYPE DHT22


DHT dht(DHTPIN, DHTTYPE);

unsigned long prevMillis = 0;  // last time data sent
const long interval = 200;  // time interval in milliSecond

void setup() {
  Serial.begin(9600);

//pin setup
  dht.begin();
}

void loop() {


    unsigned long curMillis = millis();

    // 1분간격으로 서버에 데이터 전송
    if (curMillis - prevMillis >= interval) {
      //update the prev
      prevMillis = curMillis;
      sendDataToServer();
    }


}

//read sensor data, make json string.
void sendDataToServer() {

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // testing.
  String testData = "humidity=" + String(h) + 
                "  //  temp=" + String(t);
  Serial.println(testData);

}

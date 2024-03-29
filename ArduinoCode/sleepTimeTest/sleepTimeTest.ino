#include <WiFi.h>
#include "DHT.h"
#include <MiCS6814-I2C.h>

#define DHTPIN 18
#define DHTTYPE DHT22
#define METHPIN 34
#define NH3PIN 4
#define VENTPIN 17
#define EMERGBTNPIN 27
#define FALLPIN 14
#define SONARTRIG 16
#define SONARECHO 17
#define LEDPIN 12
DHT dht(DHTPIN, DHTTYPE);
WiFiClient wifiClient;

const char* ssid = "SMHRD_강의실C";
const char* password = "ccccc33333";
const char* serverAddress = "172.30.1.37"; // IP address of your Node.js server
const int serverPort = 3001; // Port of your Node.js server
const char* userId = "sensor";

unsigned long prevMillis = 0;  // last time data sent
const long interval = 500;  // time interval in milliSecond
bool isSleepLightOn = false; // LED sleeplight
int sleepLightBright = 50; //LED 밝기 조절.
bool btnPressed = false;
bool fallDetected = false;
int distance = 0;

bool entered = false;  //초음파 출입감지
bool check = true;    //초음파 출입감지


void setup() {
  Serial.begin(115200);
  // connectToWiFi();

//pin setup
  dht.begin();
  pinMode(METHPIN, INPUT);
  pinMode(NH3PIN, INPUT);
  pinMode(EMERGBTNPIN, INPUT);
  pinMode(SONARTRIG, OUTPUT);
  pinMode(SONARECHO, INPUT);
  ledcSetup(0,5000,8);
  ledcAttachPin(LEDPIN,0);
}

void loop() {

  // if (WiFi.status() == WL_CONNECTED) {

    unsigned long curMillis = millis();

    // 1분간격으로 서버에 데이터 전송
    if (curMillis - prevMillis >= interval) {
      //update the prev
      prevMillis = curMillis;
      sendDataToServer();
    }

    // emergency button
    int btn = digitalRead(EMERGBTNPIN);
    if (btn) {
      btnPressed = true;
    }
    // falldown sensor
    bool fallsensor = digitalRead(FALLPIN);
    if (!fallsensor) {
      fallDetected = true;
    }
    //led
    ledControl();

  // } // end if WIFI.STATUS
}


void ledControl () {
  //초음파 감지
  digitalWrite(SONARTRIG, 1);  //초음파 쏜다.
  delay(10);
  digitalWrite(SONARTRIG, 0);  // 초음파 중지
  int duration = pulseIn(SONARECHO, 1);  // 왕복시간.
  duration = duration / 2;          // 편도시간으로
  distance = duration / 29.1;

  //출입 알고리즘
  if (check & (distance < 10)){
    check = false;
    entered = !entered;
    delay(100);
  } else if (!check & distance >= 24){
    check = true;
  }

  // led on/off
  if (entered) {
    if (isSleepLightOn) {
      ledcWrite(0,map(sleepLightBright, 0,100,0,255));
      // Serial.println("sleep light on");
    } else {
      ledcWrite(0,255);
      // Serial.println("normal light on");
    }
  } else {
    ledcWrite(0,0);
    // Serial.println("light off");
  }
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("connecting...");
  }
  Serial.println("WiFi connected");
}

//read sensor data, make json string.
void sendDataToServer() {
  String url = "/user/sensorData"; 


  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float nh3 = analogRead(NH3PIN);
  float meth = analogRead(METHPIN);

  String data = "member_id=" + String(userId) + 
                "&humidity=" + String(h) + 
                "&temp=" + String(t) +
                "&nh3=" + String(nh3) +
                "&meth=" + String(meth) +
                "&btnEmerg=" + String(btnPressed) +
                "&falldown=" + String(fallDetected);
  // sendRequest(url, data);  
    Serial.println(data);

  // testing.
  // String testData = "humidity=" + String(h) + 
  //               "  //  temp=" + String(t) +
  //               "  //  nh3=" + String(nh3) +
  //               "  //  meth=" + String(meth) +
  //               "  //  distance=" + String(distance) +
  //               "  //  btnEmerg=" + String(btnPressed) +
  //               "  // falldown=" + String(fallDetected);
  // Serial.println(testData);


  //reset the btn, falldown.
  btnPressed = false;
  fallDetected = false;
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
      String line = wifiClient.readStringUntil('*');
      Serial.println(line);
      if (line == "true") { // 수면등 on
        isSleepLightOn = true;

      } else if ( line == "false") { // 수면등 off
        isSleepLightOn = false;

      } else { // 수면등 밝기
        Serial.print("수면등 밝기 ");
        Serial.println(line);
        if (line.toInt() != 0){
          sleepLightBright = line.toInt();
        }
      }
      Serial.print("결과 : ");
      Serial.print(isSleepLightOn);
      Serial.print("....");
      Serial.println(sleepLightBright);
    }

    wifiClient.stop();
    Serial.println("\nDisconnected from server");
  } else {
    Serial.println("Connection to server failed");
  }
}
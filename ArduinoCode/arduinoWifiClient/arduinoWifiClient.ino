#include <WiFi.h>
#include "DHT.h"
#include <MiCS6814-I2C.h>

#define DHTPIN 23
#define DHTTYPE DHT22
#define METHPIN 34
#define NH3 35
#define VENTPIN 17
#define EMERGBTNPIN 27
#define FALLPIN 14
#define SONARTRIG 16
#define SONARECHO 17
#define LEDPIN 12
#define FANPIN 25
#define FALLAPIN 34

DHT dht(DHTPIN, DHTTYPE);
WiFiClient wifiClient;


const char* ssid = "SMHRD_강의실C";
const char* password = "ccccc33333";
const char* serverAddress = "172.30.1.42"; // IP address of your Node.js server
const int serverPort = 3001; // Port of your Node.js server
const char* userId = "sensor";

unsigned long prevMillis = 0;  // last time data sent
const long interval = 10000;  // time interval in milliSecond
bool isSleepLightOn = true; // LED sleeplight
int sleepLightBright = 0; //LED 밝기 조절.
float slope = -0.05;  // Negative slope to invert the relationship
float intercept = 130;  // Adjusted intercept
bool btnPressed = false;
bool fallDetected = false;
int fallDectecedVal = 0;
int distance = 0;

bool entered = false;  //초음파 출입감지
bool check = true;    //초음파 출입감지


void setup() {
  Serial.begin(115200);
  connectToWiFi();

//pin setup
  dht.begin();
  pinMode(METHPIN, INPUT);
  pinMode(NH3, INPUT);
  pinMode(EMERGBTNPIN, INPUT);
  pinMode(SONARTRIG, OUTPUT);
  pinMode(SONARECHO, INPUT);
  pinMode(FANPIN, OUTPUT);
  ledcSetup(0,5000,8);
  ledcAttachPin(LEDPIN,0);

}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {

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
      fallDectecedVal = analogRead(FALLAPIN);
      fallDetected = true;
    }
    //led
    ledControl();

  }
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
  if (check & (distance < 11)){
    check = false;
    entered = !entered;
    delay(1000);
  } else if (!check & distance >= 15){
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
  float nh3 = analogRead(NH3);
  nh3 = slope * nh3 + intercept;
  float meth = analogRead(METHPIN);
  int fallAnalog = analogRead(FALLAPIN);

  String data = "member_id=" + String(userId) + 
                "&humidity=" + String(h) + 
                "&temp=" + String(t) +
                "&nh3=" + String(nh3) +
                "&meth=" + String(meth) +
                "&btnEmerg=" + String(btnPressed) +
                "&falldown=" + String(fallDetected);
  sendRequest(url, data);  
    Serial.println(data);

  // testing.
  // String testData = "humidity=" + String(h) + 
  //               " // temp=" + String(t) +
  //               " // nh3=" + String(nh3) +
  //               " // meth=" + String(meth) +
  //               " // distance=" + String(distance) +
  //               " // btnEmerg=" + String(btnPressed) +
  //               " // falldown=" + String(fallDetected) + 
  //               " // fallAnalog=" + String(fallAnalog) +
  //               " // falldownVal=" + String(fallDectecedVal);
  // Serial.println(testData);

  // fan
  if (meth > 1000 || nh3 > 40  || h > 50) {
    digitalWrite(FANPIN, 1);
  } else {
    digitalWrite(FANPIN, 0);
  }

  //reset the btn, falldown.
  btnPressed = false;
  fallDetected = false;
  fallDectecedVal = 0;
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
      String line = wifiClient.readStringUntil('\n');
      line.trim();

      char sleepOn = line.charAt(0);
      int brightVal = line.substring(1).toInt();

      Serial.println(String(sleepOn) + " : " + brightVal);

      if (sleepOn == 'T') { // 수면등 on
        isSleepLightOn = true;

      } else if ( sleepOn == 'F') { // 수면등 off
        isSleepLightOn = false;

      } 
      sleepLightBright = line.substring(1).toInt();


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
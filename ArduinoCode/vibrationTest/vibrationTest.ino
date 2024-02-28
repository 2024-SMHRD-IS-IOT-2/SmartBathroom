


void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(39, INPUT);
  pinMode(26, INPUT);

}

void loop() {
  // put your main code here, to run repeatedly:
  int read = analogRead(39);
  int read2 = digitalRead(26);
  Serial.println(read2);

}

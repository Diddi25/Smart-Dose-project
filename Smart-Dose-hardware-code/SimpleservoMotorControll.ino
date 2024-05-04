#include <Servo.h>


//important ****************************************
// Code written by the Smart Does team.
// 93 is stop for servo motor
  // 0 and 180 are full speed
  // orange to PWM
  // red to 5V
  // brown to ground
//important ***************************************



Servo myservo;  // create  object 
// Servo servo2;  // if you we two servo motors

void setup() {

  Serial.begin(9600); //  serial communication 
  myservo.attach(9);  // attaches the servo on pin 9, 10, or 11 (it should be PWM)
  //myservo.attach(11);  // if we have more motor 

  myservo.write(0);  // servo mptor moves clockwise at full speed
  Serial.println("Servo at full speed clockwise   0 .");
  delay(5000);  // wait  5 seconds

  myservo.write(30); // motors speed becomes slower
  Serial.println("Servo motor speed become  slower 30.");
  delay(5000);

  myservo.write(50); // servo speed becomes even slower
  Serial.println("Servo motor speed become  slower 50.");
  delay(5000);

  myservo.write(70); // continue decreasing servo speed
  Serial.println("Servo motor speed become  slower 70.");
  delay(5000);

  myservo.write(80); // very slow speed
  Serial.println("Servo motor speed become  slower 80.");
  delay(10000);

  myservo.write(85); // servo speed extremely slow
  Serial.println("Servo motor speed become  slower 85.");
  delay(10000);

  myservo.write(93);  // stop the servo
  Serial.println("Servo stopped. 93 ");
  
}

void loop() {
 
}

#include "HX711.h"
#include <WiFiS3.h>
#include "WiFiSSLClient.h"
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#include <Servo.h>
const int SERVO1_START_POSITION=83;
const int SERVO2_START_POSITION = 112;
const int MAX_RETRIES = 3;

const int SERVO1_STOP_POSITION = 87;
const int SERVO2_STOP_POSITION = 95;

// Wiring constants for HX711 load cell
const int LOADCELL_DOUT_PIN = 2;
const int LOADCELL_SCK_PIN = 3;
const int LOADCELL2_DOUT_PIN = 4;
const int LOADCELL2_SCK_PIN = 5;
const int SERVO1_PIN = 9;
const int SERVO2_PIN = 10;
const int LOADCELL3_DOUT_PIN = 12;
const int LOADCELL3_SCK_PIN = 11;


Servo myservo2;  // Second servo motor
Servo myservo1;
HX711 scale1; // First scale
HX711 scale2;  //second scale 
HX711 scale3;  // third scale

#define FIREBASE_HOST "smartdose-51796-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "AIzaSyA9xQO9pLQ7-WJgjTmYIuwD2dG8IKTrcsE"
const char ssid[] = "test55";
const char pass[] = "test1234";
String serverAddress = FIREBASE_HOST;
int port = 443;
String path = "/USERID:S/Samuel Lövkvist: XynfcVTcSAP047sHrwynFlPaqR12.json?auth=" + String(FIREBASE_AUTH);


WiFiSSLClient wifi;
HttpClient client = HttpClient(wifi, serverAddress, port);



String scaleStatus = "false";  // Initial value is 'false'
int servomotorOption = 1;
bool scale1Active = false;
bool scale2Active = false;



String lastCommand = "false"; // Store the last command to prevent unnecessary repetition
int stopPosition= 90;
int startPosition=180;


float optimalDosage = 200.0;
float hysteresis = 0.5;
unsigned long debounceTime = 100;

float lastSensorWeight1 = 0.0;
unsigned long lastSensorWeight1Change = 0;




float lastSensorWeight2 = 0.0;
unsigned long lastSensorWeight2Change = 0;

float lastScaleWeight = 0.0;
float scaleWeightHysteresis = 2;
unsigned long lastScaleWeightChange = 0;

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  myservo1.attach(SERVO1_PIN);
  myservo1.write(SERVO1_STOP_POSITION);
  myservo2.attach(SERVO2_PIN);  // Attach the second servo to its pin
  myservo2.write(SERVO2_STOP_POSITION);           // Initialize position


  scale1.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale1.set_scale(-967);
  scale1.tare();


  scale2.begin(LOADCELL2_DOUT_PIN, LOADCELL2_SCK_PIN);
  scale2.set_scale(-967);      
  scale2.tare();

  scale3.begin(LOADCELL3_DOUT_PIN, LOADCELL3_SCK_PIN);
  scale3.set_scale(103);
  scale3.tare();

  

  Serial.print("Connecting to WiFi SSID: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  IPAddress ip = WiFi.localIP();
  Serial.println("\nWiFi connected");
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void loop() {
     static unsigned long lastCheck = 0;
    unsigned long currentCheck = millis();
    static unsigned long lastNetUpdate = 0;
    if (millis() - lastNetUpdate > 1000) {
        fetchAndUpdateFromFirebase();
        readThirdScaleSensor();
        lastNetUpdate = millis();
    }

    if (currentCheck - lastCheck > 30) {
        if (servomotorOption == 1) {
          checkWeightAndControlServo(scale1, myservo1, optimalDosage);


           
        } else if (servomotorOption == 2) {
          checkWeightAndControlServo(scale2, myservo2, optimalDosage);
           
        }
        
        lastCheck = currentCheck;
    }
  
}
bool httpRequestWithRetry(HttpClient& client, const char* method, const String& path, const String& contentType, const String& body) {
    int attempts = 0;
    int statusCode = -1;

    while (attempts < MAX_RETRIES) {
        if (strcmp(method, "GET") == 0) {
            client.get(path);
        } else if (strcmp(method, "PATCH") == 0) {
            client.patch(path, contentType, body);
        } else {
            Serial.println("Unsupported HTTP method");
            return false;
        }

        statusCode = client.responseStatusCode();
        if (statusCode == 200) {
            return true;
        } else {
            Serial.print("HTTP request failed with status code: ");
            Serial.println(statusCode);
            Serial.print("Retrying... (attempt ");
            Serial.print(attempts + 1);
            Serial.println(")");
            delay(500); // Small delay before retrying
        }

        attempts++;
    }

    return false;
}

void checkWeightAndControlServo(HX711& scale, Servo& servo, float dosage) {
    float sensorWeight = scale.get_units(1);
    Serial.print("This is the weight: ");
    Serial.print(sensorWeight);
    Serial.println(" gr");

     /*if (abs(sensorWeight - lastSensorWeight) > hysteresis && millis() - lastSensorWeightChange > debounceTime) {
        lastSensorWeightChange = millis();
        */
        if (sensorWeight > dosage && servo.read() != stopPosition) {
            servo.write(stopPosition);
            //scaleActive = false;
            Serial.println("Excessive weight detected, servo stopped.");
            updateFirebaseStatus("false");
        } else if (sensorWeight < dosage - hysteresis && servo.read() == stopPosition) {
            servo.write(startPosition);
            //scaleActive = true;
            updateFirebaseStatus("true");
            Serial.println("Reduced weight detected, servo started.");
        }
    }

void updateFirebaseStatus(String dispenserStatus) {
    DynamicJsonDocument jsonBuffer(1024);
    jsonBuffer["dispenserStatus"] = dispenserStatus;
    String output;
    serializeJson(jsonBuffer, output);

    if (httpRequestWithRetry(client, "PATCH", path, "application/json", output)) {
        Serial.println("Firebase dispenserStatus updated to " + dispenserStatus);
    } else {
        Serial.println("Failed to update Firebase after multiple attempts");
    }

    client.stop();  // Stop the client connection
}


void readThirdScaleSensor() {
 client.get(path);
    if (client.responseStatusCode() == 200) {
        String response = client.responseBody();
        DynamicJsonDocument doc(1024);
        deserializeJson(doc, response);


  if (doc.containsKey("scaleStatus")) {
      scaleStatus = doc["scaleStatus"].as<String>();
      Serial.print("Updated scaleStatus: ");
      Serial.println(scaleStatus); }
    }
  float scaleWeight = scale3.get_units(5);
  Serial.print("scaleWeight: ");
  Serial.print(scaleWeight);
  Serial.println(" gr");

  if (abs(scaleWeight - lastScaleWeight) > scaleWeightHysteresis && (millis() - lastScaleWeightChange > debounceTime)) {
    lastScaleWeight = scaleWeight;
    lastScaleWeightChange = millis();
    Serial.print("scale is ");
    Serial.println(scaleStatus);
    if (scaleStatus == "true") { // Correctly compare string to "true"
    updatescaleWeightInFirebase(scaleWeight);
}/*else{
  updatescaleWeightInFirebase2(scaleWeight);
}
*/
  }

}


void updatescaleWeightInFirebase(float scaleWeight) {
  DynamicJsonDocument jsonBuffer(256);
  jsonBuffer["userScaleWeight"] = scaleWeight;
  String output;
  serializeJson(jsonBuffer, output);

  // Use PATCH instead of PUT to update part of the JSON without overwriting other parts
  client.patch(path, "application/json", output);
  Serial.println("Firebase updated scaleWeight to: " + String(scaleWeight));
  client.stop();
}

void updatescaleWeightInFirebase2(float scaleWeight) {
  DynamicJsonDocument jsonBuffer(1024);
  jsonBuffer["userScaleWeight2"] = scaleWeight;
  String output;
  serializeJson(jsonBuffer, output);

  // Use PATCH instead of PUT to update part of the JSON without overwriting other parts
  client.patch(path, "application/json", output);
  Serial.println("Firebase updated scaleWeight to: " + String(scaleWeight));
  client.stop();
}


void fetchAndUpdateFromFirebase() {
    if (httpRequestWithRetry(client, "GET", path, "", "")) {
        String response = client.responseBody();
        DynamicJsonDocument doc(2048);
        deserializeJson(doc, response);

        // Process optimal dosage
        if (doc.containsKey("optimalDosage")) {
            optimalDosage = doc["optimalDosage"].as<float>();
            Serial.print("Updated optimalDosage: ");
            Serial.println(optimalDosage);
        }

        // Process servomotor option
        if (doc.containsKey("servoMotorOption")) {
            int newOption = doc["servoMotorOption"].as<int>();
            if (newOption != servomotorOption) {
                servomotorOption = newOption;
                Serial.print("Updated servomotorOption to: ");
                Serial.println(servomotorOption);
            }
        }

        // Process dispenser status
        if (doc.containsKey("dispenserStatus")) {
            String command = doc["dispenserStatus"].as<String>();
            if (command != lastCommand) {
                lastCommand = command;
                Serial.println("Command changed to: " + command);

                // Decide which servo to command based on the servomotor_option
                Servo& activeServo = (servomotorOption == 1) ? myservo1 : myservo2;
                stopPosition = (servomotorOption == 1) ? SERVO1_STOP_POSITION : SERVO2_STOP_POSITION;
                startPosition = (servomotorOption == 1) ? SERVO1_START_POSITION : SERVO2_START_POSITION;
                if (command == "true") {
                    activeServo.write(startPosition);
                    Serial.println("Command received to run servo.");
                } else if (command == "false") {
                    activeServo.write(stopPosition);
                    Serial.println("Command received to stop servo.");
                }
            }
        }
    } else {
        Serial.print("Failed to fetch data after multiple attempts: HTTP Error Code: ");
        Serial.println(client.responseStatusCode());
        Serial.println(client.responseBody());
    }

    client.stop();  // Stop the client connection
}





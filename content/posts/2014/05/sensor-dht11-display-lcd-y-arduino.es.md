---
title: Sensor DHT11, display LCD y Arduino
author: Leandro Fernandez
type: post
date: 2014-05-23T12:17:41+00:00
categories:
  - Electrónica
tags:
  - arduino
  - display
  - sensor

---
_Los sensores de temperatura y humedad DHTxx son de muy bajo costo y de una precisión entre aceptable y buena; dependiendo de los requisitos de nuestra aplicación. Y del modelo que tengamos en nuestras manos. En este breve artículo utilizaremos un DHT11 para medir las variables del ambiente._

<img loading="lazy" class="alignnone size-full wp-image-1986" src="http://blog.drk.com.ar/wp-content/uploads/2014/05/dht11-arduino-LCD-sketch.png" alt="DHT11, Arduino y LCD" width="744" height="652" srcset="https://blog.drk.com.ar/wp-content/uploads/2014/05/dht11-arduino-LCD-sketch.png 744w, https://blog.drk.com.ar/wp-content/uploads/2014/05/dht11-arduino-LCD-sketch-300x262.png 300w, https://blog.drk.com.ar/wp-content/uploads/2014/05/dht11-arduino-LCD-sketch-342x300.png 342w" sizes="(max-width: 744px) 100vw, 744px" /> 

Para este experimento utilicé un [sensor DHT11][1], un Arduino MEGA2560, un display LCD [modelo 1602A][2], un potenciómetro lineal de 50K., una resistencia de 220Ω, cables y protoboard.  
<span class="embed-youtube" style="text-align:center; display: block;"></span>

Procedimiento de conexión:

  1. Unir ambas líneas de alimentación del protoboard, positivo y tierra respectivamente.
  2. Conectar los extremos del potenciómetro a positivo y tierra. El punto medio al termina VO del LCD, posición 3.
  3. Desde el módulo LCD 
      1. Terminal VSS (1) a tierra.
      2. VDD (2) a positivo (5V).
      3. RS (4) a terminal 12 de Arduino Mega
      4. RW (5) a tierra
      5. E (6) a terminal 11 de Arduino Mega
      6. D0 a D3 sin conexión
      7. D4 (11) a terminal 5 de Arduino
      8. D5 (12) a terminal 4 de Arduino
      9. D6 (13) a terminal 3 de Arduino
     10. D7 (14) a terminal 2 de Arduino
     11. A (15) a resistencia de 220Ω y el otro extremo de la resistencia a 5V
     12. K (16) a tierra
  4. Con DHT11 (verificar terminales según versión del módulo a utilizar) 
      1. VCC (1) a 5V
      2. DATA (2) a terminal 22 de Arduino
      3. GND (3) a tierra

El potenciómetro permite controlar el contraste del LCD, y la resistencia de 220Ω limita la corriente del LED de iluminación. Por lo que es muy importante no conectar el terminal 3 del LCD directo a VDD.

Para compilar el código fuente se necesita la [biblioteca del sensor DTH][3]

### Código fuente

[code language=&#8221;cpp&#8221;]  
#include <LiquidCrystal.h>  
#include <dht.h>

dht DHT;

#define DHT11_PIN 22

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup()  
{  
Serial.begin(115200);  
lcd.begin(16, 2);  
Serial.println("Prueba de DHT");  
Serial.print("Version de biblioteca: ");  
Serial.println(DHT\_LIB\_VERSION);  
Serial.println();  
Serial.println("Sensor,\tEstado,\tHumedad (%),\tTemperatura (C)");  
}

void loop()  
{  
// Lectura  
Serial.print("DHT11, \t");  
int chk = DHT.read11(DHT11_PIN);  
switch (chk)  
{  
case DHTLIB_OK:  
Serial.print("OK,\t");  
break;  
case DHTLIB\_ERROR\_CHECKSUM:  
Serial.print("Checksum error,\t");  
break;  
case DHTLIB\_ERROR\_TIMEOUT:  
Serial.print("Time out error,\t");  
break;  
default:  
Serial.print("Unknown error,\t");  
break;  
}  
// Envio a puerto serie  
Serial.print(DHT.humidity,1);  
Serial.print(",\t");  
Serial.println(DHT.temperature,1);  
// Envio a LCD  
lcd.setCursor(0, 0);  
lcd.print("Temp.: ");  
lcd.print(DHT.temperature);  
lcd.print((char)223);  
lcd.print("C");  
lcd.setCursor(0, 1);  
lcd.print("Humedad: ");  
lcd.print(DHT.humidity);  
lcd.print("%");

delay(1000);  
}  
[/code]

La biblioteca de lectura del sensor DHT11 funciona declarando un objeto global del tipo **dht** (en el ejemplo la variable se llama DHT). El método **read11()** recibe como argumento el número de pin (terminal) de Arduino donde se encuentra conectado el sensor (en nuestro caso el 22). Devuelve el resultado de la operación en forma de un entero. Si fue exitosa, las propiedades &#8220;**humidity**&#8221; y &#8220;**temperature**&#8221; contendrán los valores medidos de humedad y temperatura respectivamente.

La biblioteca de LCD se utiliza declarando un objeto del tipo **LiquidCrystal** pasando en el constructor los pines donde se conectaron los terminales RW<span style="color: #4f4e4e;">, Enable, D4, D5, D6, y D7. El método**begin()**configura la cantidad de columnas y filas. Luego los métodos </span>**setCursor()** y **print()** permiten escribir texto en la pantalla.

Este ejemplo realiza una lectura y luego una pausa de un segundo. Al estar implementado en la función **loop()** esto se repite constantemente. La información también se envía al puerto serie de Arduino.

 [1]: http://www.micro4you.com/files/sensor/DHT11.pdf
 [2]: http://oomlout.com/parts/LCDD-01-datasheet.pdf
 [3]: https://github.com/adafruit/DHT-sensor-library
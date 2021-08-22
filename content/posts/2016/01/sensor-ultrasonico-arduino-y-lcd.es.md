---
title: Sensor ultrasónico, Arduino y LCD
author: Leandro Fernandez
type: post
date: 2016-01-22T01:54:33+00:00
featured_image: /2016/01/sensor-ultrasonico-arduin-lcd-672x372.jpg
categories:
  - Electrónica
tags:
  - arduino
---

_Otro artículo de una serie de ejemplos simples pero prácticos del uso de sensores con Ardunino._

![ultrasonido-arduino](/2016/01/sensor-ultrasonico-arduin-lcd.jpg)

En este artículo utilizamos un sensor ultrasónico US-020 (típico módulo para Arduino y otros microcontroladores que se puede adquirir en los sitios de venta de artículos DIY) para medir distancia y mostrar la medición en una pantalla de cristal líquido LCD. Para evitar implementar la lógica de cálculo de distancia y tratamiento del sensor de ultra sonido hacemos uso de la biblioteca de funciones [New Ping][1].

{{< youtube IWx9oVyiHpI >}}

En el video podemos observar cómo en la segunda línea del display LCD aparece la distancia medida. El máximo fue configurado a un metro. Al acercar la mano varía la medición, marcando infinito cuando no hay un objeto a menos de un metro de distancia.

{{< highlight cpp "linenos=table" >}}
/* The circuit:  
* LCD RS pin to digital pin 12  
* LCD Enable pin to digital pin 11  
* LCD D4 pin to digital pin 5  
* LCD D5 pin to digital pin 4  
* LCD D6 pin to digital pin 3  
* LCD D7 pin to digital pin 2  
* LCD R/W pin to ground  
* LCD VSS pin to ground  
* LCD VCC pin to 5V  
* 10K resistor:  
* ends to +5V and ground  
* wiper to LCD VO pin (pin 3)  
*/

#include <NewPing.h>  
#include <LiquidCrystal.h>

#define US_TRIGGER 36  
#define US_ECHO 42  
#define DISTANCE_MAX 100

#define S_WIDTH 16  
#define S_LINES 2

class SmartLCD : public LiquidCrystal {  
  private:  
    char screen[S_LINES][S_WIDTH+1];  
    char dbuff[S_LINES][S_WIDTH+1];
  
  void init() {  
    memset(screen, 0x20, sizeof(screen));  
    memset(dbuff, 0x20, sizeof(dbuff));  
  };

  public:  
    SmartLCD(uint8_t rs, uint8_t rw, uint8_t enable,  
        uint8_t d0, uint8_t d1, uint8_t d2, uint8_t d3,  
        uint8_t d4, uint8_t d5, uint8_t d6, uint8_t d7)  
        : LiquidCrystal(rs, rw, enable, d0, d1, d2, d3, d4, d5, d6, d7) {  
    init();  
    };
    
    SmartLCD(uint8_t rs, uint8_t enable,  
        uint8_t d0, uint8_t d1, uint8_t d2, uint8_t d3,  
        uint8_t d4, uint8_t d5, uint8_t d6, uint8_t d7)  
        : LiquidCrystal(rs, enable, d0, d1, d2, d3, d4, d5, d6, d7) {  
    init();  
    };
    
    SmartLCD(uint8_t rs, uint8_t rw, uint8_t enable,  
        uint8_t d0, uint8_t d1, uint8_t d2, uint8_t d3)  
        : LiquidCrystal(rs, rw, enable, d0, d1, d2, d3) {  
    init();  
    };
    
    SmartLCD(uint8_t rs, uint8_t enable,  
        uint8_t d0, uint8_t d1, uint8_t d2, uint8_t d3)  
        : LiquidCrystal(rs, enable, d0, d1, d2, d3) {  
    init();  
    };
    
    void printf(int line, const char *format, &#8230;) {  
      va_list ap;  
      va_start(ap, format);  
      memset(screen[line], 0x20, S_WIDTH);  
      vsnprintf(screen[line], sizeof(screen[line]), format, ap);
      
      for (int i=0; i < S_WIDTH; ++i) {  
        if (dbuff[line][i] != screen[line][i]) {  
          screen[line][i] = (screen[line][i] == 0) ? 0x20 : screen[line][i];  
          dbuff[line][i] = screen[line][i];  
          setCursor(i, line);  
          print(dbuff[line][i]);  
        }  
      }  
      va_end(ap);  
    };  
};
  
NewPing sonar(US_TRIGGER, US_ECHO, DISTANCE_MAX);  
SmartLCD lcd(12, 11, 5, 4, 3, 2);

void setup() {  
  // Serial  
  Serial.begin(19200);  
  // Set up the LCD  
  // initialize the library with the numbers of the interface pins  
  lcd.begin(16, 2);  
  lcd.printf(0, "www.drk.com.ar");  
  lcd.cursor();  
}
  
void loop() {  
  delay(150);  
  int uS = sonar.ping();  
  int distance = uS / US_ROUNDTRIP_CM;  
  if (distance > 0) {  
    lcd.printf(1, "%dcm", distance);  
  } else {  
    lcd.printf(1, "Infinito");  
  }
  
  Serial.print("Ping: ");  
  Serial.print(distance);  
  Serial.println("cm");  
}  
{{< /highlight >}}

En este programa implementamos una clase SmartLCD que deriva de la clase LiquidCrystal de la biblioteca. Y le agregamos dos buffers (**screen** y **dbuff**) para implementar una especie de _double buffering_ y evitar escribir todo el tiempo sobre la pantalla aún cuando no hay cambios. Se agregó un método **printf()** a la clase que funcionar como el clásico **printf()** de C/C++. Esta función recibe como primer argumento la línea del display sobre la que se imprimirá el texto. Ambos arrays de caracteres están rellenos con espacios (0x20) desde el principio. Cuando se recibe una nueva cadena se procesa sobre el array screen (línea 66, previamente rellenada con espacios en la 65). Luego se recorre el array y se copian sólo los caracteres que cambiaron a **dbuff**. En ese proceso además se reemplaza el fin de cadena (valor 0) por un espacio. Y luego se imprime en la posición adecuada del LCD (línea 73).

El lazo principal tiene un retardo de 150ms, luego utiliza el método ping() de la biblioteca que retorna el tiempo de eco del ultrasonido en microsegundos. Luego se lo divide por la constante **US_ROUNDTRIP_CM** que tiene el tiempo del sonido ida y vuelta para un centímetro, expresado en microsegundos. Por lo que la variable **distance** tendrá la distancia en centímetros. Finalmente se decide si es infinito o no, para imprimir el valor apropiado (líneas 97 a 100).

 [1]: http://playground.arduino.cc/Code/NewPing
---
title: Arduino, control remoto infrarrojo y LCD
author: Leandro Fernandez
type: post
date: 2014-06-05T14:23:01+00:00
featured_image: /2014/06/arduino.jpg
categories:
  - Electrónica
tags:
  - arduino
  - circuito
  - infrarrojo
---

_El artículo sobre el uso de un VS1838 para recibir señales de un control remoto con Arduino que escribí el en noviembre de 2013 se hizo muy popular. Y recibí varias consultas sobre la posibilidad de adaptar el programa para hacer algo útil con la señal recibida. Así que preparé este ejemplo ilustrativo._

![lcd](/2014/06/cr_lcd.jpg)

Aquí se combina el programa que [decodifica las teclas presionadas en el control remoto][1], con la biblioteca que permite escribir en una pantalla de cristal líquido (que también utilicé en el [artículo sobre el sensor DHT11][2]). De forma que se muestra en la pantalla el número correspondiente a la tecla presionada.

Omitiré lo detalles de funcionamiento del control remoto y el VS1838 ya que todo se explicó en detalle en artículo inicial. En este caso el enfoque será sobre el código. Ya que noté, en algunas consultas recibidas, una idea distorsionada de lo que es un programa. Por supuesto que muchos de ustedes podrá saltar la lectura del párrafo siguiente si les resulta demasiado básica la explicación. Pero está claro que algunos lectores se verá beneficiados con ella.

{{< youtube OyA3M-BMuSg >}}

## Programar no es configurar

Si bien el título es falso desde un punto de vista riguroso y de bajo nivel, en la práctica hacemos una distinción entre programar y configurar un programa. Cuando **programamos** estamos escribiendo las ordenes necesarias para que un microcontrolador (o microprocesador, o cualquier tipo de computadora) realice una tarea determinada. En ocasiones hacemos que ese programa se pueda **configurar** de alguna manera —ya sea modificando algunos parámetros en el código o bien mediante la modificación de alguna información que el programa recibe durante su ejecución— y que el comportamiento del mismo se vea afectado por ese cambio. Pero el programa realiza las tareas que su creador previó. Y opcionalmente varía su comportamiento en función de cierta configuración. Pero el grueso del trabajo que el programa realiza está acotado. Yendo al programa del artículo anterior podemos decir que podía configurarse (en tiempo de compilación) los pines a utilizar, la cantidad de pulsos y los anchos de pulsos necesarios para decodificar la señal del control. Pero el programa está limitado a mostrar una cantidad de pulsos en el LED, de acuerdo a la tecla recibida. Y ese comportamiento no puede cambiarse por configuración. Se requiere modifica el programa, tal como lo hice para esta nueva nota.

## Modificando el programa

Hay dos cambios importantes en el programa. Por un lado se agregó el uso de la biblioteca para manejar el LCD. Pero sólo se trata de la inclusión de los encabezados de la biblioteca (línea 17), algunas líneas de configuración (líneas 68 y 87). La modificación sustancial está en la rutina que busca en el arreglo key, el código de la señal recibida para identificar la tecla. Que en este caso envía el número a la pantalla en lugar de usar el valor para hacer titilar el LED. Así como ésta, podría haber realizado cualquier otra modificación arbitraria. Podría usar el número de índice para poner una salida en 1. Por ejemplo si hubiese escrito **digitalWrite(i, HIGH);** en lugar de las líneas 105 y 106.

{{< highlight cpp >}}
/**
The circuit:
* LCD RS pin to digital pin 12
* LCD Enable pin to digital pin 11
* LCD D4 pin to digital pin 5
* LCD D5 pin to digital pin 4
* LCD D6 pin to digital pin 3
* LCD D7 pin to digital pin 2
* LCD R/W pin to ground
* 10K resistor:
* ends to +5V and ground
* wiper to LCD VO pin (pin 3)
* IR data pin 19
*/

#include <LiquidCrystal.h>

///// Control Remoto //////
// Cantidad de pulsos
#define TRAIN_LENGTH 32
// En microsegundos
#define LOW_LIMIT 600
#define HIGH_LIMIT 1800
#define INIT_LIMIT 4000
// Pin de entrada
#define PIN 19
#define PIN_INT 4

long start, delta = 0;
uint32_t value;
int pos = 0;
boolean has_value = false;
unsigned int key[10];

void inputPin() {
  noInterrupts();
  if (has_value) return;
  if (digitalRead(PIN) == HIGH) {
    start = micros();
  }
  else {
    delta = micros() - start;
    if (delta < LOW_LIMIT) {
      value <<= 1;
      value |= 1;
      ++pos;
    }
    else if (delta < HIGH_LIMIT) {
      value <<= 1;
      value |= 0;
      ++pos;
    } else if (delta > INIT_LIMIT) {
      value = 0;
      pos = 0;
    }

    if (pos == TRAIN_LENGTH) {
      has_value = true;
    }
  }
  interrupts();
}
///////////////////////////

//// LCD ////
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup()
{
  // Definición de teclas
  key[0] = 0x9768;
  key[1] = 0xCF30;
  key[2] = 0xE718;
  key[3] = 0x857A;
  key[4] = 0xEF10;
  key[5] = 0xC738;
  key[6] = 0xA55A;
  key[7] = 0xBD42;
  key[8] = 0xB54A;
  key[9] = 0xAD52;

  Serial.begin(115200);
  pinMode(PIN, INPUT);
  attachInterrupt(PIN_INT, inputPin, CHANGE);
  lcd.begin(16, 2);
  Serial.println("http://www.drk.com.ar");
  Serial.println();
}

void loop()
{
  // Verificamos si hay una tecla recibida
  int i;
  if (has_value) {
    Serial.print("V: ");
    Serial.println(value & 0x0000FFFF, HEX);
    i = 0;
    while(i<10 && (key[i] != (value & 0x0000FFFF))) ++i;
    Serial.print("I: ");
    Serial.println(i);

    // LCD
    lcd.setCursor(0, 0);
    lcd.print(i);

    has_value = false;
    pos = 0;
  }
}
{{< / highlight >}}

Tal vez lo más importante de este artículo es ver que el código puede construirse en bloques autónomos, que luego son integrados en una sólo programa para cumplir una tarea diferente. Y de hecho esta es una práctica muy recomendable a la hora de trabajar. Porque poner en funcionamiento en forma aislada, distintas partes de lo que sabemos que será un todo, permite detectar fácilmente problemas individuales. Y luego, durante la integración, se pueden descartar muchas fallas. Esto no sería posible si un circuito y software complejo se arma de una sola ves y luego se intenta ponerlo en funcionamiento.

 [1]: /control-remoto-infrarrojo-con-arduino
 [2]: /sensor-dht11-display-lcd-y-arduino
---
title: Control remoto infrarrojo + LCD + Arduino
author: Leandro Fernandez
type: post
date: 2016-01-16T01:58:32+00:00
categories:
  - Electrónica
tags:
  - arduino
  - C/C++
  - display
  - sensor
---

_Si bien ya hay un artículo [Control remoto infrarrojo con Arduino][1] donde abordé el tema, quería escribir una variante que sirviera para dar paso a un artículo más avanzado de programación._

En este artículo emplearemos un LCD y un decodificador infrarrojo VS1838 para recibir pulsaciones de teclas de un control remoto, decodificarlas y generar una salida en la pantalla LCD de acuerdo al mando recibido.

El circuito a utilizar tiene muchas conexiones pero es simple ya que en su mayoría se trata de conexiones directas al Arduino. Usaremos un potenciómetro de 10KΩ para controlar el contraste del display LCD. Y una resistencia de 220Ω para limitar la corriente del led de backlight del mismo.

![lcd-ir](/2016/01/lcd-ir-demo_bb.png)

Los terminales extremos del potenciómetro se conectan entre Vcc y GND creando un divisor resistivo. El cursor del potenciómetro se conecta al pin 3 (VO) del LCD. Los pines 1 y 2 del LCD a GND y a Vcc respectivamente. Los pines 4 (RS) y 6 (E) del LCD a los pines 12 y 11 del Arduino. El pin 5 (RW) a GND. Los pines 7 (D0) al 10 (D3) sin conexión. Del 11 (D4) al 14 (D7) a los pines del 5 al 2 (El 11 al 5, el 12 al 4 y así). El pin 15 (A) a la resistencia de 220Ω y ésta a Vcc, el pin 16 (K) a GND. 

> **Cuidado:** estos últimos dos pines son el ánodo y cátodo del led de backlight y conectarlos a Vcc y GND sin resistencia haría que se queme el led inevitablemente. Para el VS1838 se conecta la alimentación de 5V  a la pata 3 y GND a la pata 2. La salida de la señal decodificada es la pata 1, y ésta se conecta a la entrada digital 19 del Arduino.

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

#include <LiquidCrystal.h>  
#include <IRremote.h>

#define KEYS 11  
#define COMMANDS 1  
#define IR_PIN 19

typedef void (*command)(const struct Key * c, LiquidCrystal lcd);

// initialize the library with the numbers of the interface pins  
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);  
IRrecv irrecv(IR_PIN);

struct Key {  
  long ID;  
  int value;  
  command cmd;  
};

Key record[KEYS];

void setup() {  
  memset(record, 0, sizeof(record));
  
  record[0].ID = 0xFF6897;  
  record[0].value = 0;  
  record[0].cmd = cmd_show;  
  record[1].ID = 0xFF30CF;  
  record[1].value = 1;  
  record[1].cmd = cmd_show;  
  record[2].ID = 0xFF18E7;  
  record[2].value = 2;  
  record[2].cmd = cmd_show;  
  record[3].ID = 0xFF7A85;  
  record[3].value = 3;  
  record[3].cmd = cmd_show;  
  record[4].ID = 0xFF10EF;  
  record[4].value = 4;  
  record[4].cmd = cmd_show;  
  record[5].ID = 0xFF38C7;  
  record[5].value = 5;  
  record[5].cmd = cmd_show;  
  record[6].ID = 0xFF5AA5;  
  record[6].value = 6;  
  record[6].cmd = cmd_show;  
  record[7].ID = 0xFF42BD;  
  record[7].value = 7;  
  record[7].cmd = cmd_show;  
  record[8].ID = 0xFF4AB5;  
  record[8].value = 8;  
  record[8].cmd = cmd_show;  
  record[9].ID = 0xFF52AD;  
  record[9].value = 9;  
  record[9].cmd = cmd_show;  
  record[10].ID = 0xFF9867;  
  record[10].value = 0;  
  record[10].cmd = cmd_clear;
  
  // Serial  
  Serial.begin(19200);  
  // Setup IR  
  irrecv.enableIRIn(); // Start the receiver  
  // Set up the LCD  
  lcd.begin(16, 2);  
  lcd.print("www.drk.com.ar");  
}

void loop() {  
  decode_results results;
  
  if (irrecv.decode(&results) && (results.value & 0xFF0000 == 0x00FF0000)) {  
    Serial.print("IR: ");  
    Serial.println(results.value, HEX);
    
    for(int i=0; i < KEYS; ++i) {  
      if (record[i].ID == results.value) {  
        Serial.println(record[i].value);
      
        if (record[i].cmd != NULL)  
          (*record[i].cmd)(&record[i], lcd);  
      }  
    }
    
    irrecv.resume();  
  }  
}

void cmd_show(const struct Key * r, LiquidCrystal lcd)  
{  
  lcd.setCursor(0, 1);  
  lcd.print(r->value);  
}  
void cmd_clear(const struct Key * r, LiquidCrystal lcd)  
{  
  lcd.setCursor(0, 1);  
  lcd.print(" ");  
}  
{{< /highlight >}}

_Dado que la intención de este artículo y el que le sigue es utilizar técnicas de programación avanzadas evitaré detenerme en cuestiones básicas como la inclusión de declaraciones de bibliotecas y su inicialización._

El programa utiliza una estructura llamada **Key** (declarada en línea 29) con tres campos:

ID (long): Contiene el código de la tecla del control remoto

value (int): El valor asociado a esa tecla

cmd (command): Un puntero a la función que debe ejecutarse

Por cada tecla del control remoto que el programa admitirá se utiliza una struct dentro de un array llamado record (declarado en línea 35). Cada ítem del array se inicializa a partir de la línea 40. El primero corresponde a la tecla cero del control, por lo que se establece el campo _value_ a cero y _ID_ al código que previamente obtuvimos del control. El puntero a función _cmd_ se apunta a la función **cmd_show()**. Esto se repite para el resto de las teclas numéricas del control. Finalmente, en la posición 10 del array record se da de alta una tecla especial del control y se apunta _cmd_ a **cmd_clear()**. Para esa función el campo _value_ no se utiliza, se la deja en cero.

La condición de la línea 87 será verdadera si se recibió un código en el receptor infrarrojo, y si ese código está en el rango de nuestro control. El bucle for() de la línea 92 recorre el array _record_ y compara el código recibido con el valor del campo _ID_ de cada ítem. Si hay una coincidencia utiliza ese registro ejecutando la función a la que apunta. De esta forma agregar la capacidad de procesamiento de una nueva tecla del control sólo requiere agregar un ítem al array y completar los valores. En este programa hay sólo dos funciones posibles: una que simplemente escribe el valor del campo _value_ en la primera posición del segundo renglón de la pantalla y otra que imprime un espacio en ese lugar.

Si fuese necesario agregar al programa una nueva lógica, como por ejemplo cambiar la posición de escritura en pantalla, simplemente bastaría con escribir una nueva función que respete el tipo definido en la línea 23. El tipo puntero a función nos permite crear funciones compatibles con la llamada de la línea 97. Esta estrategia que utiliza la capacidad del lenguaje C de usar punteros a función simplifica enormemente el mantenimiento y la evolución del programa. Cualquier función futura que programemos recibirá como parámetros un puntero al registro que tiene la información de la tecla presionada, y el objeto de control de la pantalla. Con lo que podrá &#8220;reaccionar&#8221; en forma adecuada y según el contexto.

La función **cmd_show** lee el valor del campo _value_ a través del puntero _r_. Y lo imprime en la primera posición del segundo renglón. La función **cmd_clear** simplemente imprime un espacio en ese lugar.

En el siguiente artículo extendermos las capacidades de este programa para que realice funciones más complejas agregando funciones y una variable compleja que contenga el contexto.

 [1]: http://blog.drk.com.ar/2013/control-remoto-infrarrojo-con-arduino
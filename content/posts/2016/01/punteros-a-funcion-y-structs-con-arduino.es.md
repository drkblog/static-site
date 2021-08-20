---
title: Punteros a función y structs con Arduino
author: Leandro Fernández
type: post
date: 2016-01-18T01:01:53+00:00
url: /2016/punteros-a-funcion-y-structs-con-arduino
categories:
  - Electrónica
tags:
  - arduino
  - C/C++
  - display
  - infrarrojo

---
_En este artículo presentamos una extensión al programa de [Control remoto Arduino + LCD][1] aprovechando el uso de punteros a función. Es recomendable darle una mirada al programa de ese artículo para comparar con este, y entender cómo evolucionó. De todas formas se puede leer este artículo en forma independiente para tener un ejemplo de uso de punteros a función. Pero el circuito está explicado en ese artículo y no se repetirá aquí._

En el programa utilizamos una estructura cuyo tipo llamamos _State_ y de la cual creamos una sola global variable **state**. En ella encapsulamos el estado de la lógica del display. En el programa anterior el objeto de control del display era una variable global. Ahora lo incluimos en la estructura **state** para encapsular la información. Si bien es común en los programas de Arduino tener muchas variables globales, eso no es una buena práctica de programación. En este caso al encapsular las variables que tienen que ver con la lógica del display en una estructura, el código queda más ordenado. Aunque la estructura en sí siga siendo global. Pero ese punto es imposible de solucionar porque Arduino llama constantemente a la función **loop()** y carece de punto de entrada como una aplicación estándar de C/C++.  
<a href="http://blog.drk.com.ar/wp-content/uploads/2016/01/arduino-lcd-puntero-a-funcion.jpg" rel="attachment wp-att-2423"><img loading="lazy" src="http://blog.drk.com.ar/wp-content/uploads/2016/01/arduino-lcd-puntero-a-funcion-1024x863.jpg" alt="Arduino LCD Puntero a funcion" width="474" height="399" class="aligncenter size-large wp-image-2423" srcset="https://blog.drk.com.ar/wp-content/uploads/2016/01/arduino-lcd-puntero-a-funcion-1024x863.jpg 1024w, https://blog.drk.com.ar/wp-content/uploads/2016/01/arduino-lcd-puntero-a-funcion-300x253.jpg 300w, https://blog.drk.com.ar/wp-content/uploads/2016/01/arduino-lcd-puntero-a-funcion-768x648.jpg 768w, https://blog.drk.com.ar/wp-content/uploads/2016/01/arduino-lcd-puntero-a-funcion.jpg 1920w" sizes="(max-width: 474px) 100vw, 474px" /></a>

<!--more-->

Además del objeto de control del display en la estructura state guardamos los caracteres que se mostrarán en el segundo renglón del display, limitado a 16 posiciones. Y la posición del cursor de escritura. Esto permitirá responder a las teclas del control escribiendo en la posición que corresponda. Y mover el cursor a la posición siguiente cada vez.

[code language=&#8221;cpp&#8221;]  
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

#define KEYS 13  
#define COMMANDS 1  
#define IR_PIN 19  
#define LINE_MAX 16

typedef void (\*command)(const struct Key \* c, struct State * s);

IRrecv irrecv(IR_PIN);

struct Key {  
long ID;  
int value;  
command cmd;  
};

struct State {  
LiquidCrystal * lcd;  
char line[LINE_MAX];  
char position;  
} state;

Key record[KEYS];

void setup() {  
memset(record, 0, sizeof(record));

record[0].ID = 0xFF6897;  
record[0].value = 0;  
record[0].cmd = cmd_write;  
record[1].ID = 0xFF30CF;  
record[1].value = 1;  
record[1].cmd = cmd_write;  
record[2].ID = 0xFF18E7;  
record[2].value = 2;  
record[2].cmd = cmd_write;  
record[3].ID = 0xFF7A85;  
record[3].value = 3;  
record[3].cmd = cmd_write;  
record[4].ID = 0xFF10EF;  
record[4].value = 4;  
record[4].cmd = cmd_write;  
record[5].ID = 0xFF38C7;  
record[5].value = 5;  
record[5].cmd = cmd_write;  
record[6].ID = 0xFF5AA5;  
record[6].value = 6;  
record[6].cmd = cmd_write;  
record[7].ID = 0xFF42BD;  
record[7].value = 7;  
record[7].cmd = cmd_write;  
record[8].ID = 0xFF4AB5;  
record[8].value = 8;  
record[8].cmd = cmd_write;  
record[9].ID = 0xFF52AD;  
record[9].value = 9;  
record[9].cmd = cmd_write;  
record[10].ID = 0xFF9867;  
record[10].value = 0;  
record[10].cmd = cmd_clear;  
record[11].ID = 0xFF02FD;  
record[11].value = -1;  
record[11].cmd = cmd_move;  
record[12].ID = 0xFFC23D;  
record[12].value = 1;  
record[12].cmd = cmd_move;

// Serial  
Serial.begin(19200);  
// Setup IR  
irrecv.enableIRIn(); // Start the receiver  
// Set up the LCD  
// initialize the library with the numbers of the interface pins  
state.lcd = new LiquidCrystal(12, 11, 5, 4, 3, 2);  
state.lcd->begin(16, 2);  
state.lcd->print("blog.drk.com.ar");  
state.lcd->cursor();  
state.lcd->setCursor(state.position, 1);  
}

void loop() {  
decode_results results;

if (irrecv.decode(&results)  
&& (results.value & 0xFF0000 == 0x00FF0000)) {  
Serial.print("IR: ");  
Serial.println(results.value, HEX);

for(int i=0; i < KEYS; ++i) {  
if (record[i].ID == results.value) {  
Serial.println(record[i].value);

if (record[i].cmd != NULL)  
(*record[i].cmd)(&record[i], &state);  
}  
}

irrecv.resume();  
}  
}

void cmd_write(const struct Key \* r, struct State \* s)  
{  
// write the value in the string  
s->line[s->position] = r->value + 48;  
s->lcd->print(s->line[s->position]);  
s->position++;  
// Limit position to LINE_MAX-1  
if (s->position == LINE_MAX)  
s->position = LINE_MAX &#8211; 1;  
s->lcd->setCursor(s->position, 1);  
}  
void cmd_clear(const struct Key \* r, struct State \* s)  
{  
for(int i=0; i<LINE_MAX; ++i) {  
s->line[i] = &#8216; &#8216;;  
s->lcd->setCursor(i, 1);  
s->lcd->print(s->line[i]);  
s->position = 0;  
s->lcd->setCursor(s->position, 1);  
}  
}  
void cmd_move(const struct Key \* r, struct State \* s)  
{  
s->position += r->value;  
if (s->position == LINE_MAX)  
s->position = LINE_MAX &#8211; 1;  
if (s->position < 0)  
s->position = 0;  
s->lcd->setCursor(s->position, 1);  
}  
[/code]

Cada tecla que se acepta del control remoto se configura en una posición del array **record**. El array es recorrido cuando se recibe un código desde el receptor infrarrojo. Si el código coincide con el valor **ID** del índice revisado en la línea 107, se procede a usar los datos de ese índice. Esto se hace llamando a la función apuntada por el campo **cmd** de la estructura _Key_. En la función **setup()** se configuró el campo **cmd** de cada ítem para que apunte a alguna de las funciones definidas a partir de la línea 119. Para las teclas del 0 al 9 se apunta a la función **cmd_write** que escribe el valor de **value** como un caracter ASCII en la posición actual. Para la tecla de &#8220;reset&#8221; se apunta a la función **cmd_clear** que borra el contenido de toda la línea. Las teclas de avanzar y retroceder del control se apuntan a la función **cmd_move** que suma el valor de value a la posición actual del cursor (por eso se asigna -1 a la tecla de retroceso y 1 a la de avance).

Al utilizar el tipo puntero a función definido en la línea 24 podemos crear varias funciones que comparten la firma. Y esto facilita agregar funciones en el futuro sin necesidad de realizar muchos cambios en el código general. La función siempre recibe la información de la tecla (puntero a la tecla, sólo lectura) y la de estado (puntero a **state**, lectura escritura). De esta manera cada función realiza su trabajo con la información recibida y modificando el estado.

Para visualizar las ventajas de los punteros a función se puede comparar este programa con el del artículo anterior y ver cómo el programa tiene una funcionalidad mucho más compleja con relativamente pocos cambios. También podemos ejemplificar qué pasaría si quisiéramos usar las teclas + y &#8211; del control remoto para incrementar o decrementar el valor de la posición actual: simplemente sería necesario agregar ambas teclas al array key y definir una función nueva **cmd_plus** que sume el valor de value al valor numérico de la posición actual. En cada tecla, para el campo **value**, pondríamos 1 y -1 respectivamente de forma que cuando la función sume el valor resulte en un incremento o decremento. El nombre de la función es arbitrario, claro. Si tuviésemos que agregar otra funcionalidad más compleja que requiriese guardar más información de estado, simplemente agregaríamos campos a la estructura state. Sin necesidad de modificar la firma del tipo puntero a función. Es decir que sería transparente a las funciones que existen actualmente.

 [1]: http://blog.drk.com.ar/2016/control-remoto-infrarrojo-lcd-arduino
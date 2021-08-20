---
title: Prueba de motor servo con Arduino
author: Leandro Fernández
type: post
date: 2016-01-09T15:17:26+00:00
url: /2016/prueba-de-motor-servo-con-arduino
featured_image: http://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino-672x372.jpg
categories:
  - Electrónica
tags:
  - arduino
  - circuito
  - sensor

---
Los **motores servo** o **servo mecanismos** son dispositivos que permiten girar un eje en forma controlada una determinada cantidad de grados, mediante una señal eléctrica. Estos motores no giran continuamente como un motor convencional sino que se mueven a una posición determinada que permanecen allí hasta que se envía una señal que mueve el eje a un ángulo distinto. Incluso es muy común que los servos tengan una capacidad de giro limitada que no llega a los 360 grados. En este artículo se realiza una prueba simple de un servo utilizando un fotoresistor para generar la señal de entrada.

[<img loading="lazy" class="aligncenter wp-image-2393 size-large" src="http://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino-1024x768.jpg" alt="Servo con arduino" width="474" height="356" srcset="https://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino-1024x768.jpg 1024w, https://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino-300x225.jpg 300w, https://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino-768x576.jpg 768w, https://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino.jpg 2048w" sizes="(max-width: 474px) 100vw, 474px" />][1]

<!--more-->

Para el experimento se usó un servo Tower Pro&#x2122; Microservo 9g SG90 cuyo giro controlaremos en función de la la cantidad de luz que reciba un fotoresistor. Si bien aquí se empleó un Arduino Mega 2560, cualquier otra versión de placa Arduino puede funcionar ya que el servo es controlado desde un pin digital, y el valor del fotoresistor requiere el uso de un pin analógico de entrada.

Se conecta el foto resistor en serie con una resistencia de 100kΩ formando un divisor resistivo entre Vcc y GND. Y el nodo central con la pata analógica A0 que medirá el nivel de tensión. El servo se conecta a Vcc y GND, y el pin de control a la salida digital 9 del Arduino.

<a href="http://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino-circuit.png" rel="attachment wp-att-2400"><img loading="lazy" class="aligncenter wp-image-2400 size-full" src="http://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino-circuit.png" alt="servo-arduino-circuit" width="753" height="474" srcset="https://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino-circuit.png 753w, https://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino-circuit-300x189.png 300w" sizes="(max-width: 753px) 100vw, 753px" /></a>

[code language=&#8221;cpp&#8221;]  
#include <Servo.h>

Servo servo1;

void setup() {  
Serial.begin(9600);  
Serial.println("Ready");  
// Configuramos el servo y lo ponemos en cero  
servo1.attach(9);  
servo1.write(0);  
}

void loop() {  
long v;

delay(100);

// 500 y 400 son valores de ajuste  
v = (long)(analogRead(0) &#8211; 500) * 180 / 400;  
// Limitamos a 0..180  
if (v < 0) v = 0;  
if (v > 180) v = 180;

// Mostramos el valor por puerto serie y lo enviamos  
// al servo  
Serial.println(v);  
servo1.write(v);  
}  
[/code]

La función setup() simplemente inicializa el puerto serie para poder enviar la información de la variable v calculada al serial monitor. Y luego inicializa el controlador del servo indicando que está conectado al PIN 9 del Arduino.

En la función loop() tenemos un retardo de 100ms y luego se calcula un valor &#8220;v&#8221; leyendo el estado del fotoresistor. En el ejemplo se le resta 500 y se lo divide por 400. Esto se debe a que en el ambiente de prueba el menor valor obtenido cuando se hacía sombra era aproximadamente 500, y el máximo con luz total era 900. Al restarle 500 el valor va de 0 a 400, y al dividirlo por 400 va de 0,0 a 1,0 (en números reales esto serviría como factor que represente una proporción. Al multiplicarlo por 180 logramos que cuando no hay luz &#8220;v&#8221; tome un valor 0 y con luz total un valor 180. Para no usar variables de punto flotante primero se hace la multiplicación por 180 y luego la división por 400. Si se repite este experimento el primer paso es obtener los valores del fotoresistor para los dos casos extremos de oscuridad y sombra que se puedan lograr. Una vez obtenidos esos valores hay que cambiar el 500 y 400 como se explicó anteriormente para obtener el rango de 0 a 180.  
El programa limita la variable &#8220;v&#8221; a un mínimo de 0 y un máximo de 180 independientemente del cálculo previo para evitar enviar valores no adecuados al servo. Luego se envía el valor de &#8220;v&#8221; al puerto serie y al servo.

Al armar le circuito y cargar el programa en el Arduino podemos probar hacer sombra sobre el fotoresistor, y veremos que el servo se colocará en un ángulo proporcional a la luz recibida por el sensor en tiempo prácticamente instantáneo.  
&nbsp;

 [1]: http://blog.drk.com.ar/wp-content/uploads/2016/01/servo-arduino.jpg
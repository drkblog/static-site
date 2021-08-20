---
title: Control remoto infrarrojo con Arduino
author: Leandro Fernández
type: post
date: 2013-11-24T21:53:51+00:00
url: /2013/control-remoto-infrarrojo-con-arduino
categories:
  - Electrónica
tags:
  - arduino
  - circuito
  - electrónica digital

---
_Finalmente me siento a escribir otra nota técnica para el blog. Al igual que las anteriores, esta surge como resultado de pruebas que hice para un proyecto específico que no era justamente relacionado con el control remoto. Pero que involucra la transmisión de una señal infrarroja._

Es muy común el uso de luz infrarroja para el control a distancia de aparatos del hogar. Actualmente no existen televisores ni aire acondicionadores que no se comanden desde un control remoto. Y, por supuesto, cada vez son más los dispositivos que incorporan esta comodidad. El funcionamiento del sistema es bastante simple: cuando se presiona una tecla del control remoto, éste envía al aparato una señal lumínica invisible al ojo humano. En el otro extremo el artefacto recibe la señal, la decodifica y reacciona a la indicación.

<img loading="lazy" class="alignnone size-full wp-image-1792" src="http://blog.drk.com.ar/wp-content/uploads/2013/11/arduin_vs1838.jpg" alt="Arduino y VS1838" width="600" height="341" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/11/arduin_vs1838.jpg 600w, https://blog.drk.com.ar/wp-content/uploads/2013/11/arduin_vs1838-300x170.jpg 300w, https://blog.drk.com.ar/wp-content/uploads/2013/11/arduin_vs1838-500x284.jpg 500w" sizes="(max-width: 600px) 100vw, 600px" /> 

En este artículo vamos a utilizar una placa de desarrollo Arduino UNO (aunque también se podría utilizar un <a href="http://articulo.mercadolibre.com.ar/MLA-616815622-arduino-mega-2560-r3-cable-usb-_JM" rel="nofollow">Arduino Mega 2560 R3</a>), y un receptor infrarrojo con filtro pasabanda VS1838. Para hacer más didáctico el experimento usaremos también una batería de 9 volt y un LED.

<!--more-->Primero veámoslo funcionar:

<span class="embed-youtube" style="text-align:center; display: block;"></span>

<img loading="lazy" class="size-full wp-image-1794 alignright" src="http://blog.drk.com.ar/wp-content/uploads/2013/11/ir_decode.png" alt="Decodificación IR" width="400" height="268" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/11/ir_decode.png 400w, https://blog.drk.com.ar/wp-content/uploads/2013/11/ir_decode-300x201.png 300w" sizes="(max-width: 400px) 100vw, 400px" /> Antes de avanzar con el circuito es importante agregar algo de información sobre el funcionamiento de los controles remotos infrarrojos. Si bien existen varios métodos y protocolos, con el tiempo se estandarizaron ciertas prácticas y componentes. La vasta mayoría de los controles remotos transmiten la señal lumínica en forma de pulsos a 38kHz. Aunque se utilizan también otras frecuencias de portadora que cuentan con 30kHz, 36kHz y 56kHz entre las más comunes. Además los aparatos suelen traducir la presencia de la portadora en un nivel lógico alto y la ausencia en uno bajo. Y codificar con ese mecanismo, algún protocolo de transmisión digital serie que permita identificar el comienzo de la información en el flujo. Y que impone alguna restricciones, como por ejemplo limitar la cantidad de pulsos que se puedan recibir en forma continua a un tiempo acotado. Todo esto se debe a la necesidad de filtrar el ruido que provenga de fuentes lumínicas distintas al control remoto.

En un artículo anterior había utilizado [un foto transistor y un LM358 para recibir una señal infrarroja][1], pero de seguir ese método de recepción debería encargarme del filtrado de ruido que acabo de mencionar. Es decir, la luz del sol o cualquier otra fuente cercana al espectro infrarrojo podría introducir una señal que se confundiría con la del control. Por lo que debería implementar un complejo algoritmo en Arduino que me permita descartar una señal que persiste infinitamente en el tiempo. Por suerte en la actualidad contamos con receptores infrarrojos integrados como el VS1838 (similiar al TSOP1738 y otros) que realizan el trabajo de filtrado y decodificación a niveles lógico por nosotros. Y así podemos dedicar nuestro esfuerzo a decodificar la información transmitida.

<img loading="lazy" class="size-full wp-image-1796 alignnone" src="http://blog.drk.com.ar/wp-content/uploads/2013/11/circuit.png" alt="Arduino con VS1838" width="550" height="460" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/11/circuit.png 550w, https://blog.drk.com.ar/wp-content/uploads/2013/11/circuit-300x250.png 300w, https://blog.drk.com.ar/wp-content/uploads/2013/11/circuit-358x300.png 358w" sizes="(max-width: 550px) 100vw, 550px" /> 

<img loading="lazy" class="size-full wp-image-1798 alignright" src="http://blog.drk.com.ar/wp-content/uploads/2013/11/vs1838.png" alt="vs1838" width="300" height="257" /> El armado del circuito consiste en montar el VS1838 en un protoboard y conectar la alimentación de 5V  a la pata 3 y la tierra a la pata 2. La salida de la señal decodificada es la pata 1, y ésta se conecta a la entrada digital 2 del Arduino UNO. En la figura de la derecha se encuentra el esquema del encapsulado con sus medidas y la indicación de las terminales. Adicionalmente conectamos el ánodo del LED en forma directa al pin 13 del Arduino, que cuenta con una resistencia para limitar la corriente. Usaremos ese pin como salida para indicar la recepción correcta de los comandos enviados por el control remoto.

[<img loading="lazy" class="alignleft size-medium wp-image-1801" src="http://blog.drk.com.ar/wp-content/uploads/2013/11/vs1838_out-300x259.png" alt="Osciloscopio a la salida de VS1838" width="300" height="259" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/11/vs1838_out-300x259.png 300w, https://blog.drk.com.ar/wp-content/uploads/2013/11/vs1838_out-347x300.png 347w, https://blog.drk.com.ar/wp-content/uploads/2013/11/vs1838_out.png 593w" sizes="(max-width: 300px) 100vw, 300px" />][2]Para este tipo de proyectos es muy práctico tener un osciloscopio. En la actualidad existen algunas versiones de osciloscopio USB que son considerablemente más baratas que las clásicas. Aún así no se trata de un instrumento fácil de adquirir. En este punto del armado es conveniente revisar la recepción, midiendo la salida del VS1838. En la figura de la izquierda podemos ver la forma de onda recibida (decodificada). El período más pequeño es de 1,17mS  (es decir 851Hz). Lo que dista mucho de los 38kHz transmitidos desde el control. Esto se debe a que el integrado decodifica la señal y emite en la salida un nivel alto mientras hay portadora y uno bajo cuando no la hay. Del gráfico podemos inferir que el control emitió la señal de 38kHz durante 4,40mS, luego hizo una pausa de 0,59mS, luego emitió durante 0,51mS y así varias veces, hasta que comenzó a emitir en lapsos de 1,61mS. Esa es la codificación que utiliza este control remoto. Básicamente emite un pulso largo para indicar el comienzo de un dato. Luego emite pulsos de 500µS o pulsos de 1,6mS según corresponda un uno o cero lógico. Así emite 32 bits después del pulso inicial. No es importante en este caso saber a qué pulso corresponde el uno o el cero. Arbitrariamente decidí que los pulsos menores a 600µS serán unos y los menores a 1,8mS serán ceros. Con ese criterio desarrollé este pequeño programa que nos permite decodificar las teclas presionadas:

<div class="nota-enlinea">
  Nota: tras la publicación de este artículo recibí varias consultas sobre cómo modificar el siguiente código. Finalmente decidí publicar una nota separada <a href="/2014/arduino-control-remoto-infrarrojo-y-lcd">donde se utiliza esta decodificación para imprimir en una pantalla LCD</a>.
</div>

[code language=&#8221;cpp&#8221;]  
// Cantidad de pulsos  
#define TRAIN_LENGTH 32  
// En microsegundos  
#define LOW_LIMIT 600  
#define HIGH_LIMIT 1800  
#define INIT_LIMIT 4000

#define IN 2  
#define LED 13

long start, delta = 0;  
uint32_t value;  
int pos = 0;  
boolean has_value = false;  
unsigned int key[10];

void inputPin() {  
noInterrupts();  
if (has_value) return;  
if (digitalRead(IN) == HIGH) {  
start = micros();  
}  
else {  
delta = micros() &#8211; start;  
if (delta < LOW_LIMIT) {  
value <<= 1;  
value |= 1;  
++pos;  
}  
else if (delta < HIGH_LIMIT) {  
value <<= 1;  
value |= 0;  
++pos;  
}  
else if (delta > INIT_LIMIT) {  
value = 0;  
pos = 0;  
}

if (pos == TRAIN_LENGTH) {  
has_value = true;  
}  
}  
interrupts();  
}

void setup()  
{  
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
pinMode(IN, INPUT);  
pinMode(LED, OUTPUT);  
digitalWrite(LED, LOW);

attachInterrupt(0, inputPin, CHANGE);  
}

void loop()  
{  
int i;  
if (has_value) {  
Serial.print("V: ");  
Serial.println(value & 0x0000FFFF, HEX);  
i = 0;  
while(i<10 && (key[i] != (value & 0x0000FFFF))) ++i;  
Serial.println(i);  
while(i&#8211;) {  
digitalWrite(LED, HIGH);  
delay(400);  
digitalWrite(LED, LOW);  
delay(200);  
}  
has_value = false;  
pos = 0;  
}  
}  
[/code]

Al incio del código se define la cantidad de bits en un dato; los límites de tiempo de los pulsos correspondientes a uno, cero y al inicio del dato; el pin de entrada y el LED.

La función de inicialización **setup()** define los valores correspondientes a las teclas numérica del control remoto. Sólo los 16 bits posteriores, ya que los 16 bits iniciales son fijos en este control. Vale aclarar que cada control utiliza un protocolo y valores determinados. Por lo que para poder armar esta tabla primero debí decodificar los valores de cada tecla con un programa similar a este. Luego configura el puerto serie a 115200 bps y establece la configuración de los pines que se utilizan. Finalmente conecta la interrupción de hardware del pin 2 a la función **inputPin()**.

Esto significa que cada ver que hay un cambio de nivel de tensión en el pin 2, se ejecuta el código de dicha función. Lo que hace básicamente es medir el tiempo de duración del pulso. Si el estado del pin es alto (1) toma el tiempo con la función **micros()**. Cuando el estado es bajo (0) calcula el delta de tiempo. Y así determina cuánto duró el pulso, y en función de esa duración procede a insertar un uno o un cero en la variable **value** y desplazar hacia la izquierda hasta completar los 32 bits. Cuando la duración determina que se recibió el pulso de inicio, pone **value** y **pos** en cero para asegurar el sincronismo. Se utiliza un la variable **has_value** a modo de indicador de que se recibió un valor completo, y se ignoran los datos recibidos hasta que el bucle principal de ejecución haya utilizado el valor y haya puesto el indicador **has_value** en falso.

La función principal **loop()** en Arduino es ejecutada constantemente. Cuando se detecta que el indicador **has_value **está marcado, se imprimen en el puerto serie los 16 bits menos significativos del dato recibido. Y se busca en la tabla de teclas un valor que coincida. La posición del valor en la tabla **key** no indica el número de la tecla presionada. Hice esto porque es una forma práctica de obtener el valor numérico. En un programa que recibe comandos seguramente se utilizará una estructura del tipo switch/case. Finalmente el programa prende y apaga el LED la cantidad de veces que indica el número presionado en el control. Y pone **has_value** en falso para recibir el próximo dato.

&nbsp;

 [1]: /2013/lm358-amplificando-fototransistor-ir
 [2]: http://blog.drk.com.ar/wp-content/uploads/2013/11/vs1838_out.png
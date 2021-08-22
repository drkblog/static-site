---
title: Interfaz lógica bidireccional entre 5V y 3.3V
author: Leandro Fernandez
type: post
date: 2013-05-25T01:19:53+00:00
categories:
  - Electrónica
tags:
  - circuito
---

_En ocasiones la suma de eventos desafortunados puede complicarnos el día._

![arduino_uno_small](/2013/05/arduino_uno_small.jpg)

Cuando me ocurrió lo que voy a relatar a continuación, decidí publicar este artículo en solidaridad con aquellos aficionados a la electrónica que sufren día a día las complicaciones típicas de la materia. Veremos una solución para conectar en forma bidireccional, una entrada/salida digital de 5 volts a una de 3.3 volts.

## La historia

Compré un módulo para Arduino que utiliza 3.3V de alimentación, y por consiguiente un nivel de tensión de 3.3V para representar el uno en sus entradas y salidas. Al recibirlo y leer las especificaciones pensé que era demasiado amplio, por parte del proveedor, decir que es compatible con Arduino. Ya que la plataforma utiliza 5V de alimentación. Y si bien tiene un regulador incluido que provee un nivel de 3.3V, todas las entradas/salidas del micro utilizan 5V.

Inicialmente no me preocupé, ya que no es el primer módulo que utilizo, y que trabaja con 3.3V en lugar de 5V. Por experiencia sabía que las líneas que van desde el dispositivo de "baja tensión" (3.3V) hacia el de "alta tensión" (5V) pueden conectarse en forma directa. El nivel del uno lógico de baja tensión es suficiente para estimular la señal en la entrada digital de 5 volts. En cambio la tensión de 5 volts en una entrada digital de 3.3 volts termina por dañar el dispositivo. Esto es lógico ya que existirá una diferencia de potencial de 1,7 volts hacia el interior, que provocará una corriente en ese mismo sentido. Pero es fácil de solucionar utilizando un divisor resistivo; aún cuando no es la solución más ortodoxa.

Al leer más sobre las especificaciones del módulo noté que debería realizar unas catorce conexiones, y si bien muchas eran desde el dispositivo de baja tensión hacia el Arduino, esto de proyectaba como un montón de resistencias en el _protoboard_. Sin contar el riesgo que conlleva la flexibilidad del microcontrolador, que permite configurar cada pin como entrada o salida, desde el software. Esto quiere decir que si el sistema arranca con los pines en modo salida, o con la resistencia interna de pull-up activada, terminaría enviando 5 volts al módulo. Así que preferí no arriesgarme y busqué una solución más prolija. Lo que me llevó a comprar un par de integrados 74HC245. Que funcionan como _buffers_ para buses de 8 bits, pueden ser alimentador con 3.3 volt y recibir entradas de 5 volts sin problemas. Pero justo cuando creía que estaba todo resuelto, me encontré con un inconveniente más: el módulo utiliza el protocolo I²C para comunicarse con el micro, y este protocolo utiliza dos líneas digitales bidireccionales. Es decir que sobre una misma conexión entre el módulo y el microcontrolador, puede ocurrir que el uno o el cero lógico sea establecido por cualquiera de las dos partes. Esto es algo poco común en la electrónica digital, pero existe cuando se quiere minimizar el uso de conexiones. En este caso hubiesen sido necesarias dos conexiones extra si no fueran bidireccionales.

## La solución

Si bien existen algunos integrados que funcionan como reguladores de nivel bidireccionales, aparentemente no son fáciles de conseguir en pequeñas cantidades en Estados Unidos. Por lo que asumo que mucho más difícil será conseguirlos en Argentina. Así que opté por una interfaz discreta que parece bastante simple, ya que utiliza un transistor de efecto de campo y dos resistencias de pull-up. La teoría de operación del circuito que voy a presentar está desarrollada en la [nota de aplicación 97055][1] de Philips, escrita por el holandés Herman Schutte en 1997. El transistor que conseguí en Buenos Aires es el BSS88, listado en el documento. Otros compatibles que no figuran ahí son el TN2106, BSS98, BSS138 y ZVNL110A, pero ninguno de esos estaba disponible.

![circuito](/2013/05/circuito.png) 

El circuito es muy simple, tiene las dos resistencias de pull-up, y responde a lo descripto en el documento señalado. Los pines de J1 deben conectarse al dispositivo de baja tensión, y los de J2 al de alta tensión. Es importante remarcar que este circuito protege la sección de baja tensión, en caso de que su alimentación se desconecte; pero no protege la sección de alta tensión. Esto último, de ser necesario, puede hacerse agregando otro transistor, y está explicado en el documento de Philips.

## La práctica

Antes de conectar el módulo al circuito, quise probarlo por dos motivos: en primer lugar sería ridículo quemar a último momento el módulo que compré, después de tanto trabajo y tiempo empleados en protegerlo. Y si bien el costo de siete dólares no es un problema, el tiempo que tarde en llegar de Hong Kong sí lo es. Y no tengo uno de repuesto. En segundo lugar quería saber hasta qué frecuencia soportaría, ya que el protocolo permite comunicación a alta velocidad, y es necesario que el circuito responda en forma adecuada. Así que utilizando este código en el Arduino UNO:

{{< highlight cpp >}}
void timer1_setup (byte mode, int prescale, byte outmode_A, byte outmode_B, byte capture_mode) {  
  // enforce field widths for sanity  
  mode &= 15 ;  
  outmode_A &= 3 ;  
  outmode_B &= 3 ;  
  capture_mode &= 3 ;
  
  byte clock_mode = 0 ; // 0 means no clocking - the counter is frozen.  
  switch (prescale) {  
    case 1: clock_mode = 1 ; break ;  
    case 8: clock_mode = 2 ; break ;  
    case 64: clock_mode = 3 ; break ;  
    case 256: clock_mode = 4 ; break ;  
    case 1024: clock_mode = 5 ; break ;  
    default:  
      if (prescale < 0)  
        clock_mode = 7 ; // external clock  
  }  
  TCCR1A = (outmode_A << 6) | (outmode_B << 4) | (mode & 3) ;  
  TCCR1B = (capture_mode << 6) | ((mode & 0xC) << 1) | clock_mode ;  
}

void setup() {  
  DDRB|=47;  
  OCR1A = 0x1;  
  timer1_setup(11, 1, 1, 0, 0);  
}

void loop() {  
}
{{< /highlight >}}

Conecté la salida de reloj (pin 9) a la entrada de 5V del circuito (J2, en verde en el osciloscopio) y la comparé con la salida en J1 (en rojo). Inicialmente para 16kHz:

![circuito-foto](/2013/05/circuito-foto.jpg)

![16khz_test](/2013/05/16khz_test.png)

Luego a 130kHz:

![130khz_test](/2013/05/130khz_test.png)

Y finalmente a 4MHz:

![4mhz_test](/2013/05/4mhz_test.png)

Claramente, al llegar a los 4MHz la señal original ya no conserva la forma de onda cuadrada, debido a la pérdida de sus armónicas. Aún así, podemos ver que el circuito reproduce la forma de onda, con un pequeño retardo, que no es simétrico entre el flanco ascendente y el descendente. Esto se debe a que el transistor que usamos tiene distinta velocidad de respuesta para la activación y para la desactivación: {{< rawhtml >}} t<sub>on</sub> es 8ns y t<sub>off</sub>{{< /rawhtml >}} es 40ns. Midiendo sobre el osciloscopio obtenemos que el flanco ascendente original es de 120ns y el reproducido por el transistor es de 139ns, es decir que es 19ns más lento.

## Conclusión

Escribí este artículo justo luego de finalizadas las pruebas descriptas. Claramente el circuito cumple su función. Pero en la práctica existirá un límite de frecuencia a partir del cual el tiempo de respuesta será un obstáculo. En todo caso, sería necesario investigar los transistores disponibles que cumplan los requisitos mencionados en la nota de aplicación, que tenga mejores tiempos de respuesta que este.

 [1]: http://ics.nxp.com/support/documents/interface/pdf/an97055.pdf
 
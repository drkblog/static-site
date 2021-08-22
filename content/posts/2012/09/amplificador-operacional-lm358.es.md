---
title: Amplificador operacional LM358
author: Leandro Fernandez
type: post
date: 2012-09-19T00:12:22+00:00
featured_image: /2012/09/lm358.jpg
categories:
  - Electrónica
tags:
  - circuito
---

_Decidí escribir una nota de aplicación del amplificador operacional LM358. De las notas técnicas del blog, esta es la primera sobre electrónica. Esperemos que no sea la última._

En electrónica el uso de amplificadores operacionales es muy común. Sobre todo porque son muy útiles en una amplia gama de circunstancias, gracias a sus distintas configuraciones. En este caso utilicé la configuración de amplificador no inversor.

Donde la tensión de salida responde a la siguiente fórmula:

{{< katex >}} V_{out} = V_{in} \left(1+\frac{R_2}{R_1}\right) {{< /katex >}}

Lo que nos permite un control simple de la ganancia, incluso con valores muy altos. Teniendo en cuenta las limitaciones técnicas: la tensión de salida del amplificador estará por debajo de la tensión de alimentación positiva. Normalmente estos amplificadores se alimentan con fuente partida, por ejemplo +12V a Vdd y -12V a Vss. Lo que permitiría amplificar una señal sinusoidal en el rango de los milivolt pico a pico, a una señal de 16Vpp fácilmente.

En este caso diseñé un circuito que nos permite amplificar una señal sinusoidal, aún sin disponer de una fuente partida. Y para el ejemplo utilicé una fuente de alimentación regulada de 5V. Para que la amplificación sea posible monté la señal sobre un nivel de tensión continua de 1.2V utilizando un divisor resistivo. Aquí hay un [calculador de divisor resistivo][1] que es muy práctico en estas circunstancias. Esto permitió que la señal de entrada nunca alcance valores negativos. La contra parte de este esquema es que la ganancia del amplificador rápidamente nos pone en la zona de saturación. Habiendo trasladado el cero a 1.2V y configurando el amplificador para una ganacia de 2, la tensión de salida en reposo es de 2.4 volts. Lo que nos deja a 1.2 volts de la saturación para nuestro circuito integrado. Por supuesto que para señales de entrada más pequeñas se podría bajar el nivel de tensión continua en la entrada, y aumentar la ganancia.

Vale la pena aclarar que el amplificador de este ejemplo tiene una disipación de potencia alrededor de los 500mW (dependiendo del encapsulado). Por lo que se deberá utilizar un transistor a la salida si es necesario trabajar con corrientes por encima de los 40 mA.

![circuito_LM358_AMP](/2012/09/circuito_LM358_AMP.png)

En el esquema podemos ver una fuente de señal sinusoidal de 212mV que representa el micrófono de carbón utilizado en el circuito real. La R1 es la resistencia que limita la corriente al micrófono. El capacitor C1 filtra el nivel de continua y la señal eléctrica del sonido se monta sobre la tensión del divisor resistivo formado por R2 y R3. Y se conecta a la entrada positiva del amplificador operacional. R4 y R5 establecen la ganancia de 2. Por lo que a un volt de la entrada, habrá dos volts en la salida. Finalmente se conecta la entrada del amplificador al canal A del osciloscopio (verde) y la salida al canal B (rojo).

![dc](/2012/09/dc.png)
  
Se puede hacer click sobre la imagen para visualizar mejor la señal y la configuración del osciloscopio. El cero se encuentra en el borde inferior de la imagen. Se aprecia claramente que a un pico de entrada de 1.7V corresponde una salida de 3.5V lo que representa una ganancia de 2,06 (un error de 3%).

La forma de onda corresponde al sonido de un tin whistle en la nota Sol de la segunda octava del instrumento, que se encuentra aproximadamente en los 1.700 Hz. Desde luego, no se trata de una forma senoidal pura, debido a los armónicos.

![ac](/2012/09/ac.png)
  
Aquí se aprecia la medición de una segunda ejecución, pero en modo alterna. Aquí el cero está en el centro de la escala. Y podemos apreciar mucho mejor como la salida respeta la forma de la señal de entrada. Por comodidad visual ambos canales están en la misma escala.

Y los canales 1 y 2 corresponden a los canales A y B del circuito esquemático respectivamente.

![prototipo](/2012/09/prototipo.jpg)

En el circuito del prototipo hay un capacitor que no está en el esquema: el de la izquierda, conectado a la salida (pata 1) del LM358. Que podría usarse para obtener la señal amplificada sin el nivel de continua de la salida del operacional.

Este experimento continúa en [Operacional LM358 - Parte 2][2] y en este [ejemplo práctico con receptor infrarrojo][3].

 [1]: https://gzalo.com/calculators/voltage-divider/
 [2]: /operacional-lm358-parte-2
 [3]: /lm358-amplificando-fototransistor-ir
---
title: LM358 amplificando fototransistor IR
author: Leandro Fernandez
type: post
date: 2013-09-15T00:48:14+00:00
categories:
  - Electrónica
tags:
  - circuito
---

_Este artículo propone un ejemplo de uso del amplificador operacional LM358N, para aumentar la tensión de una señal recibida a través de un fototransistor infrarrojo. Para una introducción a este operacional se pueden consultar los artículos [Amplificador operacional LM358][1] y [Operacional LM358 - Parte 2][2]._

## Amplificando una señal

![ir_transistor](/2013/09/ir_transistor.jpg)

La idea para esta nota surgió mientras experimentaba con un **_fototransistor_** a partir de un requerimiento para un proyecto. La luz infrarroja se utiliza en electrónica para muchas aplicaciones, incluso para la transmisión de señales. Un ejemplo cotidiano es el control remoto de los televisores o acondicionadores de aire. El control posee un LED que emite luz infrarroja (invisible al ojo humano), y el dispositivo controlado recibe la señal, la decodifica y reacciona al comando. La captación de la luz está a cargo de un _fototransistor_, un componente que permite la conducción de una corriente entre colector y emisor, en presencia de luz. Se comporta en forma análoga a un transistor tradicional pero en lugar de conducir proporcionalmente a una corriente de base, lo hace proporcional a la luz recibida en la misma. Aunque existen distintos encapsulados, el más común a simple vista puede confundirse con un LED. En el caso de los infrarrojos es distintivo el color oscuro del plástico que sirve como filtro contra la luz de longitudes de onda superiores al espectro deseado.

![ir_simple](/2013/09/ir_simple.png)

Su uso más simple consiste en conectarlo en serie con una resistencia, y el conjunto a una fuente de alimentación continua, de forma que cuando ingrese un rayo de luz infrarroja a la base, el transistor comience a conducir. Provocando una caída de tensión sobre la resistencia proporcional a la luz en la entrada. Al mismo tiempo la resistencia limita la corriente para evitar la destrucción del transistor. Para un cálculo generoso y rápido, podemos despreciar la caída de tensión entre colector y emisor, y calcular la corriente máxima dividiendo la tensión de alimentación por la resistencia. En el circuito presentado aquí, la corriente máxima teórica es de 5mA, aunque en la práctica será menor aún cuando la base esté saturada de luz y el transistor en el máximo posible de conducción.

![wf1](/2013/09/wf1.png)

Colocando el osciloscopio en el punto Vo del circuito y apuntando hacia el fototransistor con el control remoto de un televisor podemos observar el circuito en acción. Haciendo click sobre la imagen se puede acceder a una mejor visualización de la captura. La escala se encuentra en 2 volt por división, la amplitud de la señal capturada es de 2.5V aproximadamente y se obtuvo con el control remoto a 20 centímetros del fototransistor. Al alejar el mismo, la amplitud de la señal disminuye, de la misma forma que aumente si el LED del control se coloca más cerca. También se observa una disminución considerable de la señal cuando el control se apunta desde un ángulo mayor a 45º del eje frontal. Dicho esto, sabemos por experiencia propia que los controles de estos equipos funcionan a distancias de varios metros. Y en ocasiones hasta es posible controlarlos haciendo que el haz de luz rebote en una pared. De lo que se desprende que los equipos que utilizan esta tecnología amplifican la señal recibida.

![ir_opamp](/2013/09/ir_opamp.png)

Dada la frecuencia de portadora utilizada convencionalmente de 38kHz y una baja frecuencia del tren de pulsos que codifica los comandos, típicamente alrededor de los 600Hz, es una tarea que fácilmente podemos lograr con un amplificador operacional multiuso como el LM358. Utilizando una configuración no inversora clásica, con una ganancia determinada por la relación entre R2 y R3 más uno, que resulta en este caso en el aumento en 101 veces la tensión de entrada, repetimos el experimento.

![wf2](/2013/09/wf2.png)

En la pantalla del osciloscopio aparece en rojo el canal colocado en la entada positiva del amplificador, que es el mismo nodo del circuito inicial. En el canal uno que se dibuja en verde medimos el nuevo nodo Vo que representa la señal amplificada. La escala de tensión de ambos canales es la misma, con el fin de apreciar fácilmente la amplificación de tensión que tiene lugar en el circuito. La forma de onda de salida tiene 3,74V mientras que la de entrada se mantuvo en un máximo de 2,25V lo que arroja una relación de 1,66

Está claro que 1,66 es una amplificación muy lejana a las 101 veces que esperábamos según la teoría. Lo que ocurre, y que se aprecia a simple vista en la medición es que el amplificador operacional está saturando casi todo el tiempo en que hay tensión en la entrada. Lo que es lógico ya que según la hoja de datos el LM358 tiene una salida de tensión máxima de 1,5V menos que la alimentación positiva. En nuestro circuito alimentado con 5V la tensión Vo máxima posible será justamente 3,5V. Lo que implica que cualquier tensión de entrada mayor a 34,6mV saturará el circuito porque: {{< katex >}} V_{in}{max} = &#92;frac{V_{o}{max}}{101} = &#92;frac{3,5V}{101} = 34,6mV {{< /katex >}}

![wf3](/2013/09/wf3.png)

Lo que explica que la señal de 38kHz que en la entrada aparece montada sobre un nivel de continua de aproximadamente 1,2V desaparezca por completo, ya que se desarrolla en su totalidad por encima de los 34mV. Ahora repetimos la medición con el control remoto a mayor distancia. Y a un ángulo de unos 15 grados aproximadamente. De forma tal que la señal en la entrada del amplificador es suficientemente baja como para evitar saturar la salida. En la captura hemos colocado en canal dos (rojo) que lee la entrada en 50mV por división. La amplitud de la señal de entrada es de 32mV como máximo, tomada desde el cero del canal; ignoramos el desplazamiento negativo de 29mV que aparece ahora, ya que la tensión negativa de alimentación del operacional impide que el amplificador responda a ese estímulo porque la hemos conectada a tierra. A esa entrada le corresponde una salida de 3,3V lo que arroja una ganancia de tensión de 103,1 que sí se condice con lo calculado. Sabemos que hay un error de apreciación en la amplitud de la señal de salida ya que no utilizamos la escala más adecuada.

![wf4](/2013/09/wf4.png)

Haciendo una nueva medición con el control remoto a tres metros del receptor obtenemos aún una señal completamente identificable y de una amplitud de casi un volt. Aunque por falta de espacio físico y de tiempo para realizar la prueba no vamos a aumentar la ganancia del circuito y realizar una medición desde cinco metros o más, está claro que esto es perfectamente posible. Aún si los parámetros de ruido y _offset_ del LM358 nos limitaran, podríamos utilizar el segundo amplificador del mismo encapsulado para poner dos etapas en serie multiplicando así la ganancia fácilmente. Siempre teniendo en cuenta que la primera etapa de amplificación debe ser la de menor ganancia para que funcione como preamplificadora, ayudando a mejorar la relación señal ruido de la etapa siguiente.

![lm358_ir](/2013/09/lm358_ir.jpg)

 [1]: /amplificador-operacional-lm35
 [2]: /operacional-lm358-parte-2
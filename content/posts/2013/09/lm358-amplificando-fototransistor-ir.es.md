---
title: LM358 amplificando fototransistor IR
author: Leandro Fernandez
type: post
date: 2013-09-15T00:48:14+00:00
categories:
  - Electrónica
tags:
  - electrónica analógica

---
_Este artículo propone un ejemplo de uso del amplificador operacional LM358N, para aumentar la tensión de una señal recibida a través de un fototransistor infrarrojo. Para una introducción a este operacional se pueden consultar los artículos _[Amplificador operacional LM358][1]_ y [Operacional LM358 &#8211; Parte 2][2]._

## Amplificando una señal

[<img loading="lazy" class="alignleft size-medium wp-image-1720" alt="IR fototransistor" src="http://blog.drk.com.ar/wp-content/uploads/2013/09/ir_transistor-225x300.jpg" width="225" height="300" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/09/ir_transistor-225x300.jpg 225w, https://blog.drk.com.ar/wp-content/uploads/2013/09/ir_transistor.jpg 300w" sizes="(max-width: 225px) 100vw, 225px" />][3]La idea para esta nota surgió mientras experimentaba con un **_fototransistor_** a partir de un requerimiento para un proyecto. La luz infrarroja se utiliza en electrónica para muchas aplicaciones, incluso para la transmisión de señales. Un ejemplo cotidiano es el control remoto de los televisores o acondicionadores de aire. El control posee un LED que emite luz infrarroja (invisible al ojo humano), y el dispositivo controlado recibe la señal, la decodifica y reacciona al comando. La captación de la luz está a cargo de un _fototransistor_, un componente que permite la conducción de una corriente entre colector y emisor, en presencia de luz. Se comporta en forma análoga a un transistor tradicional pero en lugar de conducir proporcionalmente a una corriente de base, lo hace proporcional a la luz recibida en la misma. Aunque existen distintos encapsulados, el más común a simple vista puede confundirse con un LED. En el caso de los infrarrojos es distintivo el color oscuro del plástico que sirve como filtro contra la luz de longitudes de onda superiores al espectro deseado.

<!--more-->

[<img loading="lazy" class="alignright size-medium wp-image-1722" alt="Circuito simple IR" src="http://blog.drk.com.ar/wp-content/uploads/2013/09/ir_simple-300x225.png" width="300" height="225" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/09/ir_simple-300x225.png 300w, https://blog.drk.com.ar/wp-content/uploads/2013/09/ir_simple.png 342w" sizes="(max-width: 300px) 100vw, 300px" />][4]Su uso más simple consiste en conectarlo en serie con una resistencia, y el conjunto a una fuente de alimentación continua, de forma que cuando ingrese un rayo de luz infrarroja a la base, el transistor comience a conducir. Provocando una caída de tensión sobre la resistencia proporcional a la luz en la entrada. Al mismo tiempo la resistencia limita la corriente para evitar la destrucción del transistor. Para un cálculo generoso y rápido, podemos despreciar la caída de tensión entre colector y emisor, y calcular la corriente máxima dividiendo la tensión de alimentación por la resistencia. En el circuito presentado aquí, la corriente máxima teórica es de 5mA, aunque en la práctica será menor aún cuando la base esté saturada de luz y el transistor en el máximo posible de conducción.

[<img loading="lazy" class="alignleft size-medium wp-image-1725" alt="Forma de onda control remoto" src="http://blog.drk.com.ar/wp-content/uploads/2013/09/wf1-300x248.png" width="300" height="248" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/09/wf1-300x248.png 300w, https://blog.drk.com.ar/wp-content/uploads/2013/09/wf1-362x300.png 362w, https://blog.drk.com.ar/wp-content/uploads/2013/09/wf1.png 590w" sizes="(max-width: 300px) 100vw, 300px" />][5]Colocando el osciloscopio en el punto Vo del circuito y apuntando hacia el fototransistor con el control remoto de un televisor podemos observar el circuito en acción. Haciendo click sobre la imagen se puede acceder a una mejor visualización de la captura. La escala se encuentra en 2 volt por división, la amplitud de la señal capturada es de 2.5V aproximadamente y se obtuvo con el control remoto a 20 centímetros del fototransistor. Al alejar el mismo, la amplitud de la señal disminuye, de la misma forma que aumente si el LED del control se coloca más cerca. También se observa una disminución considerable de la señal cuando el control se apunta desde un ángulo mayor a 45º del eje frontal. Dicho esto, sabemos por experiencia propia que los controles de estos equipos funcionan a distancias de varios metros. Y en ocasiones hasta es posible controlarlos haciendo que el haz de luz rebote en una pared. De lo que se desprende que los equipos que utilizan esta tecnología amplifican la señal recibida.

[<img loading="lazy" class="alignright size-medium wp-image-1726" alt="IR amplificador operacional" src="http://blog.drk.com.ar/wp-content/uploads/2013/09/ir_opamp-300x225.png" width="300" height="225" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/09/ir_opamp-300x225.png 300w, https://blog.drk.com.ar/wp-content/uploads/2013/09/ir_opamp-400x300.png 400w, https://blog.drk.com.ar/wp-content/uploads/2013/09/ir_opamp.png 420w" sizes="(max-width: 300px) 100vw, 300px" />][6]Dada la frecuencia de portadora utilizada convencionalmente de 38kHz y una baja frecuencia del tren de pulsos que codifica los comandos, típicamente alrededor de los 600Hz, es una tarea que fácilmente podemos lograr con un amplificador operacional multiuso como el LM358. Utilizando una configuración no inversora clásica, con una ganancia determinada por la relación entre R2 y R3 más uno, que resulta en este caso en el aumento en 101 veces la tensión de entrada, repetimos el experimento.

[<img loading="lazy" class="alignleft size-medium wp-image-1728" alt="Control remoto amplificado" src="http://blog.drk.com.ar/wp-content/uploads/2013/09/wf2-300x196.png" width="300" height="196" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/09/wf2-300x196.png 300w, https://blog.drk.com.ar/wp-content/uploads/2013/09/wf2-457x300.png 457w, https://blog.drk.com.ar/wp-content/uploads/2013/09/wf2.png 782w" sizes="(max-width: 300px) 100vw, 300px" />][7]En la pantalla del osciloscopio aparece en rojo el canal colocado en la entada positiva del amplificador, que es el mismo nodo del circuito inicial. En el canal uno que se dibuja en verde medimos el nuevo nodo Vo que representa la señal amplificada. La escala de tensión de ambos canales es la misma, con el fin de apreciar fácilmente la amplificación de tensión que tiene lugar en el circuito. La forma de onda de salida tiene 3,74V mientras que la de entrada se mantuvo en un máximo de 2,25V lo que arroja una relación de 1,66

Está claro que 1,66 es una amplificación muy lejana a las 101 veces que esperábamos según la teoría. Lo que ocurre, y que se aprecia a simple vista en la medición es que el amplificador operacional está saturando casi todo el tiempo en que hay tensión en la entrada. Lo que es lógico ya que según la hoja de datos el LM358 tiene una salida de tensión máxima de 1,5V menos que la alimentación positiva. En nuestro circuito alimentado con 5V la tensión Vo máxima posible será justamente 3,5V. Lo que implica que cualquier tensión de entrada mayor a 34,6mV saturará el circuito porque:<img src="https://s0.wp.com/latex.php?latex=V_%7Bin%7D%7Bmax%7D+%3D+%5Cfrac%7BV_%7Bo%7D%7Bmax%7D%7D%7B101%7D+%3D+%5Cfrac%7B3%2C5V%7D%7B101%7D+%3D+34%2C6mV+&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="V_{in}{max} = &#92;frac{V_{o}{max}}{101} = &#92;frac{3,5V}{101} = 34,6mV " class="latex" /> 

[<img loading="lazy" class="alignright size-medium wp-image-1734" alt="Control amplificado a mayor distancia" src="http://blog.drk.com.ar/wp-content/uploads/2013/09/wf3-300x196.png" width="300" height="196" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/09/wf3-300x196.png 300w, https://blog.drk.com.ar/wp-content/uploads/2013/09/wf3-457x300.png 457w, https://blog.drk.com.ar/wp-content/uploads/2013/09/wf3.png 782w" sizes="(max-width: 300px) 100vw, 300px" />][8]Lo que explica que la señal de 38kHz que en la entrada aparece montada sobre un nivel de continua de aproximadamente 1,2V desaparezca por completo, ya que se desarrolla en su totalidad por encima de los 34mV. Ahora repetimos la medición con el control remoto a mayor distancia. Y a un ángulo de unos 15 grados aproximadamente. De forma tal que la señal en la entrada del amplificador es suficientemente baja como para evitar saturar la salida. En la captura hemos colocado en canal dos (rojo) que lee la entrada en 50mV por división. La amplitud de la señal de entrada es de 32mV como máximo, tomada desde el cero del canal; ignoramos el desplazamiento negativo de 29mV que aparece ahora, ya que la tensión negativa de alimentación del operacional impide que el amplificador responda a ese estímulo porque la hemos conectada a tierra. A esa entrada le corresponde una salida de 3,3V lo que arroja una ganancia de tensión de 103,1 que sí se condice con lo calculado. Sabemos que hay un error de apreciación en la amplitud de la señal de salida ya que no utilizamos la escala más adecuada.

[<img loading="lazy" class="alignleft size-medium wp-image-1735" alt="Conrol a tres metros" src="http://blog.drk.com.ar/wp-content/uploads/2013/09/wf4-300x196.png" width="300" height="196" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/09/wf4-300x196.png 300w, https://blog.drk.com.ar/wp-content/uploads/2013/09/wf4-457x300.png 457w, https://blog.drk.com.ar/wp-content/uploads/2013/09/wf4.png 782w" sizes="(max-width: 300px) 100vw, 300px" />][9]Haciendo una nueva medición con el control remoto a tres metros del receptor obtenemos aún una señal completamente identificable y de una amplitud de casi un volt. Aunque por falta de espacio físico y de tiempo para realizar la prueba no vamos a aumentar la ganancia del circuito y realizar una medición desde cinco metros o más, está claro que esto es perfectamente posible. Aún si los parámetros de ruido y _offset_ del LM358 nos limitaran, podríamos utilizar el segundo amplificador del mismo encapsulado para poner dos etapas en serie multiplicando así la ganancia fácilmente. Siempre teniendo en cuenta que la primera etapa de amplificación debe ser la de menor ganancia para que funcione como preamplificadora, ayudando a mejorar la relación señal ruido de la etapa siguiente.

<img loading="lazy" class="alignnone size-full wp-image-1736" alt="LM358 IR" src="http://blog.drk.com.ar/wp-content/uploads/2013/09/lm358_ir.jpg" width="600" height="450" srcset="https://blog.drk.com.ar/wp-content/uploads/2013/09/lm358_ir.jpg 600w, https://blog.drk.com.ar/wp-content/uploads/2013/09/lm358_ir-300x225.jpg 300w, https://blog.drk.com.ar/wp-content/uploads/2013/09/lm358_ir-400x300.jpg 400w" sizes="(max-width: 600px) 100vw, 600px" />

 [1]: /2012/amplificador-operacional-lm35
 [2]: /2012/operacional-lm358-parte-2
 [3]: http://blog.drk.com.ar/wp-content/uploads/2013/09/ir_transistor.jpg
 [4]: http://blog.drk.com.ar/wp-content/uploads/2013/09/ir_simple.png
 [5]: http://blog.drk.com.ar/wp-content/uploads/2013/09/wf1.png
 [6]: http://blog.drk.com.ar/wp-content/uploads/2013/09/ir_opamp.png
 [7]: http://blog.drk.com.ar/wp-content/uploads/2013/09/wf2.png
 [8]: http://blog.drk.com.ar/wp-content/uploads/2013/09/wf3.png
 [9]: http://blog.drk.com.ar/wp-content/uploads/2013/09/wf4.png
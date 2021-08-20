---
title: Amplificador operacional LM358
author: Leandro Fernández
type: post
date: 2012-09-19T00:12:22+00:00
url: /2012/amplificador-operacional-lm358
featured_image: http://blog.drk.com.ar/wp-content/uploads/2012/09/lm358.jpg
categories:
  - Electrónica
tags:
  - circuito
  - educación
  - electrónica analógica

---
_Decidí escribir una nota de aplicación del amplificador operacional LM358. De las notas técnicas del blog, esta es la primera sobre electrónica. Esperemos que no sea la última._

En electrónica el uso de amplificadores operacionales es muy común. Sobre todo porque son muy útiles en una amplia gama de circunstancias, gracias a sus distintas configuraciones. En este caso utilicé la configuración de amplificador no inversor.

<div class="wp-block-media-text alignwide is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="300" height="125" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/Op-Amp_Non-Inverting_Amplifier.png" alt="" class="wp-image-1115 size-full" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Donde la tensión de salida responde a la siguiente fórmula:
    </p>
    
    <p>
      <img src="https://s0.wp.com/latex.php?latex=V_%7Bout%7D+%3D+V_%7Bin%7D+%5Cleft%281%2B%5Cfrac%7BR_2%7D%7BR_1%7D%5Cright%29&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="V_{out} = V_{in} &#92;left(1+&#92;frac{R_2}{R_1}&#92;right)" class="latex" />
    </p>
  </div>
</div>

Lo que nos permite un control simple de la ganancia, incluso con valores muy altos. Teniendo en cuenta las limitaciones técnicas: la tensión de salida del amplificador estará por debajo de la tensión de alimentación positiva. Normalmente estos amplificadores se alimentan con fuente partida, por ejemplo +12V a Vdd y -12V a Vss. Lo que permitiría amplificar una señal sinusoidal en el rango de los milivolt pico a pico, a una señal de 16Vpp fácilmente.

<!--more-->

En este caso diseñé un circuito que nos permite amplificar una señal sinusoidal, aún sin disponer de una fuente partida. Y para el ejemplo utilicé una fuente de alimentación regulada de 5V. Para que la amplificación sea posible monté la señal sobre un nivel de tensión continua de 1.2V utilizando un divisor resistivo. Aquí hay un [calculador de divisor resistivo][1] que es muy práctico en estas circunstancias. Esto permitió que la señal de entrada nunca alcance valores negativos. La contra parte de este esquema es que la ganancia del amplificador rápidamente nos pone en la zona de saturación. Habiendo trasladado el cero a 1.2V y configurando el amplificador para una ganacia de 2, la tensión de salida en reposo es de 2.4 volts. Lo que nos deja a 1.2 volts de la saturación para nuestro circuito integrado. Por supuesto que para señales de entrada más pequeñas se podría bajar el nivel de tensión continua en la entrada, y aumentar la ganancia.

Vale la pena aclarar que el amplificador de este ejemplo tiene una disipación de potencia alrededor de los 500mW (dependiendo del encapsulado). Por lo que se deberá utilizar un transistor a la salida si es necesario trabajar con corrientes por encima de los 40 mA.<figure class="wp-block-image">

[<img loading="lazy" width="606" height="279" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP.png" alt="" class="wp-image-1131" title="Circuito LM358 / Como amplificador no inversor" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP.png 606w, https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP-300x138.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP-500x230.png 500w" sizes="(max-width: 606px) 100vw, 606px" />][2]</figure> 

En el esquema podemos ver una fuente de señal sinusoidal de 212mV que representa el micrófono de carbón utilizado en el circuito real. La R1 es la resistencia que limita la corriente al micrófono. El capacitor C1 filtra el nivel de continua y la señal eléctrica del sonido se monta sobre la tensión del divisor resistivo formado por R2 y R3. Y se conecta a la entrada positiva del amplificador operacional. R4 y R5 establecen la ganancia de 2. Por lo que a un volt de la entrada, habrá dos volts en la salida. Finalmente se conecta la entrada del amplificador al canal A del osciloscopio (verde) y la salida al canal B (rojo).

<div class="wp-block-media-text alignwide is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="300" height="188" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/dc-300x188.png" alt="" class="wp-image-1133 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/dc-300x188.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/dc-476x300.png 476w, https://blog.drk.com.ar/wp-content/uploads/2012/09/dc.png 780w" sizes="(max-width: 300px) 100vw, 300px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Se puede hacer click sobre la imagen para visualizar mejor la señal y la configuración del osciloscopio. El cero se encuentra en el borde inferior de la imagen. Se aprecia claramente que a un pico de entrada de 1.7V corresponde una salida de 3.5V lo que representa una ganancia de 2,06 (un error de 3%).
    </p>
  </div>
</div>

La forma de onda corresponde al sonido de un tin whistle en la nota Sol de la segunda octava del instrumento, que se encuentra aproximadamente en los 1.700 Hz. Desde luego, no se trata de una forma senoidal pura, debido a los armónicos.

<div class="wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="300" height="189" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/ac-300x189.png" alt="" class="wp-image-1135 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/ac-300x189.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/ac-475x300.png 475w, https://blog.drk.com.ar/wp-content/uploads/2012/09/ac.png 780w" sizes="(max-width: 300px) 100vw, 300px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Aquí se aprecia la medición de una segunda ejecución, pero en modo alterna. Aquí el cero está en el centro de la escala. Y podemos apreciar mucho mejor como la salida respeta la forma de la señal de entrada. Por comodidad visual ambos canales están en la misma escala.
    </p>
  </div>
</div>

Y los canales 1 y 2 corresponden a los canales A y B del circuito esquemático respectivamente.<figure class="wp-block-image">

[<img loading="lazy" width="796" height="562" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/prototipo.jpg" alt="" class="wp-image-1137" title="Prototipo del LM358N como amplificador no inversor" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/prototipo.jpg 796w, https://blog.drk.com.ar/wp-content/uploads/2012/09/prototipo-300x211.jpg 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/prototipo-424x300.jpg 424w" sizes="(max-width: 796px) 100vw, 796px" />][3]</figure> 

En el circuito del prototipo hay un capacitor que no está en el esquema: el de la izquierda, conectado a la salida (pata 1) del LM358. Que podría usarse para obtener la señal amplificada sin el nivel de continua de la salida del operacional.

Este experimento continúa en [Operacional LM358 &#8211; Parte 2][4] y en este [ejemplo práctico con receptor infrarrojo][5].

 [1]: https://gzalo.com/calculators/voltage-divider/
 [2]: http://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP.png
 [3]: http://blog.drk.com.ar/wp-content/uploads/2012/09/prototipo.jpg
 [4]: /2012/operacional-lm358-parte-2
 [5]: /2013/lm358-amplificando-fototransistor-ir
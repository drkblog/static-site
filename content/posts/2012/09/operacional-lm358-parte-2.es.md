---
title: Operacional LM358 – Parte 2
author: Leandro Fernández
type: post
date: 2012-09-20T14:27:09+00:00
url: /2012/operacional-lm358-parte-2
categories:
  - Electrónica
tags:
  - circuito
  - educación
  - electrónica analógica

---
_En esta nota continuaré explorando el amplificador operacional LM358N, con el circuito del artículo [Amplificador operacional LM358][1] y algunas variaciones._

## Aumentando la ganancia

<div class="wp-block-media-text alignwide is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="300" height="196" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/ac_2-300x196.png" alt="" class="wp-image-1163 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/ac_2-300x196.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/ac_2-457x300.png 457w, https://blog.drk.com.ar/wp-content/uploads/2012/09/ac_2.png 784w" sizes="(max-width: 300px) 100vw, 300px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      En una situación normal es muy probable que necesitemos una ganancia mayor a dos. Para ejercitar una configuración de ese tipo, lo primero que hice fue reducir la amplitud de la señal de entrada con un potenciómetro. Y fijé la posición para una señal de uno 60mV pico a pico.
    </p>
  </div>
</div>

Como la amplitud depende del volumen del sonido captado por el micrófono. Utilicé un método para obtener emisiones de sonido relativamente iguales, a lo largo de distintas ejecuciones. Con esta señal se pude reducir el nivel de continua en la entrada del amplificador a unos 50mV sin dificultades. Pero dada la limitación de los valores de resistencias disponibles en la práctica adopté un nivel de tensión de 187mV. Lo que además provee un amplio margen de seguridad, ya que aún si la señal superara los 30mV pico previstos, estaríamos muy por encima de tensiones negativas. Vale remarcar que el LM358N no soporta más de 300mV de tensión negativa en la entrada.<img src="https://s0.wp.com/latex.php?latex=V_%7BR2%7D+%3D+%5Cfrac%7BV%7D%7BR1%2BR2%7D+R2&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="V_{R2} = &#92;frac{V}{R1+R2} R2" class="latex" /><img src="https://s0.wp.com/latex.php?latex=%5Cmathrm%7BV_%7BR2%7D+%3D+%5Cfrac%7B5V%7D%7B1M%5COmega%2B39k%5COmega%7D+39k%5COmega+%3D+187mV%7D&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="&#92;mathrm{V_{R2} = &#92;frac{5V}{1M&#92;Omega+39k&#92;Omega} 39k&#92;Omega = 187mV}" class="latex" /> Modificado el divisor resistivo en la entrada, pude calcular fácilmente la ganancia máxima teórica posible, que permita una amplificación sin recorte de la señal. Dado que el nivel máximo a la salida es de 3,6V el nivel medio debería ser 1,8V, entonces:<img src="https://s0.wp.com/latex.php?latex=G_%7Bmax%7D+%3D+%5Cfrac%7B1%2C8V%7D%7B0.187V%7D+%3D+9.625&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="G_{max} = &#92;frac{1,8V}{0.187V} = 9.625" class="latex" /> Nuevamente por razones prácticas seleccioné un par de resistencias para la ganancia del amplificador, entre los valores que tenía disponibles. Teniendo en cuenta que mi límite superior teórico era 9,625:<img src="https://s0.wp.com/latex.php?latex=G_%7Bop%7D+%3D+1+%2B+%5Cfrac%7BR5%7D%7BR4%7D&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="G_{op} = 1 + &#92;frac{R5}{R4}" class="latex" /><img src="https://s0.wp.com/latex.php?latex=G_%7Bop%7D+%3D+1+%2B+%5Cfrac%7B12k%5COmega%7D%7B2.2k%5COmega%7D+%3D+5%2C454&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="G_{op} = 1 + &#92;frac{12k&#92;Omega}{2.2k&#92;Omega} = 5,454" class="latex" /> Con esto, transformé el circuito del artículo anterior en este: [<img loading="lazy" title="Circuito LM358 ganancia 5.45" width="851" height="309" class="alignnone size-full wp-image-1161" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP_2.png" alt="" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP_2.png 851w, https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP_2-300x108.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP_2-500x181.png 500w" sizes="(max-width: 851px) 100vw, 851px" />][2] La resistencia variable R6 permite reducir la amplitud de la señal de entrada, como expliqué anteriormente. En la práctica el potenciómetro se encontraba al 40% de su recorrido (desde tierra). En la siguiente imagen se aprecia la señal de entrada (verde) superpuesta a la de salida (roja) en alterna. Es decir, no se visualizan los niveles de tensión de cada una: La frecuencia de la señal, medida en el primer ciclo desde el centro, es de 1,21kHz. La amplitud de la salida es, para el pico central, 147mV. El mismo pico en la señal de entrada es de unos 27mV. La ganancia calculada en la práctica resulta 5,444 lo que representa un error del 0,2% con respecto a la ganancia calculada para la configuración del amplificador. Además se hace visible ahora en el osciloscopio una señal de alta frecuencia sobre la forma de onda. Esto no era tan notorio anteriormente, muy posiblemente, debido a que la ganancia era menor.

<!--more-->

## Ruido

<div class="wp-block-media-text alignwide is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="300" height="196" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/ruido-300x196.png" alt="" class="wp-image-1167 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/ruido-300x196.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/ruido-458x300.png 458w, https://blog.drk.com.ar/wp-content/uploads/2012/09/ruido.png 782w" sizes="(max-width: 300px) 100vw, 300px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Como podemos ver claramente, hablamos de una frecuencia muchísimo más alta que la fundamental del sonido, e incluso sus armónicos más importantes. Pero para asegurarnos haremos dos mediciones nuevas.
    </p>
  </div>
</div>

<div class="wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="300" height="188" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/zoom-300x188.png" alt="" class="wp-image-1166 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/zoom-300x188.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/zoom-476x300.png 476w, https://blog.drk.com.ar/wp-content/uploads/2012/09/zoom.png 780w" sizes="(max-width: 300px) 100vw, 300px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      En primer lugar bajamos la escala de tiempo, y comparamos la entrada y la salida. Tratamos de detectar si el supuesto ruido está presente en ambas. Y por lo que podemos apreciar, sí lo está.
    </p>
  </div>
</div>

<div class="wp-block-media-text alignwide is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="300" height="188" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/filtro-300x188.png" alt="" class="wp-image-1171 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/filtro-300x188.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/filtro-478x300.png 478w, https://blog.drk.com.ar/wp-content/uploads/2012/09/filtro.png 783w" sizes="(max-width: 300px) 100vw, 300px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Es importante remarcar que las escalas de tensión de cada canal se encuentran en valores distintos, ya que el canal dos tiene la señal amplificada.
    </p>
  </div>
</div>

<div class="wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="300" height="196" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/sonido_filtrado-300x196.png" alt="" class="wp-image-1172 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/sonido_filtrado-300x196.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/sonido_filtrado-457x300.png 457w, https://blog.drk.com.ar/wp-content/uploads/2012/09/sonido_filtrado.png 781w" sizes="(max-width: 300px) 100vw, 300px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Reduciendo aún más la escala de tiempo podemos tomar una medida de un período arbitrario. Vemos que ronda los 10MHz. Por lo que claramente estamos por encima del espectro de frecuencias audibles. También está claro que no visualizamos una señal concreta sino un batido de altas frecuencias que forman una onda asimétrica de baja intensidad.
    </p>
  </div>
</div>

Esta señal tiene todas las características del ruido eléctrico. Aunque no tengo pensado extenderme en ese tema ahora por dos motivos: porque es un tema muy complejo, y porque no tengo presentes todos los conceptos importantes alrededor de él. Simplemente compruebo, conectando el canal del osciloscopio a si propia masa, que ese ruido de 10MHz está presente aún (por lo menos en 1,4mV). Pero de todas formas, se puede hacer algo muy básico que podríamos considerar preventivo: podemos poner un filtro pasa bajos con una frecuencia de corte por encima del límite audible. 

<div class="wp-block-media-text alignwide is-stacked-on-mobile" style="grid-template-columns:27% auto">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="172" height="161" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/RC_Divider.png" alt="" class="wp-image-1173 size-full" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Para la prueba elegí una frecuencia de corte generosa de 40kHz, ya que el límite del oído ronda los 20kHz. <img src="https://s0.wp.com/latex.php?latex=f_c+%3D+%5Cfrac%7B1%7D%7B2+%5CPi+R+C%7D&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="f_c = &#92;frac{1}{2 &#92;Pi R C}" class="latex" /> <img src="https://s0.wp.com/latex.php?latex=%5Cmathrm%7BR+C+%3D+%5Cfrac%7B1%7D%7B2+%5CPi+40kHz%7D%7D&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="&#92;mathrm{R C = &#92;frac{1}{2 &#92;Pi 40kHz}}" class="latex" /> <img src="https://s0.wp.com/latex.php?latex=%5Cmathrm%7BC+%3D+%5Cfrac%7B3.978+%5Ctimes+10%5E-6%7D%7BR%7D+%3D+%5Cfrac%7B3.978+%5Ctimes+10%5E-6%7D%7B82%5COmega%7D+%3D+48%2C5+%5Ctimes+10%5E-9+%3D+48%2C5nF%7D&#038;bg=ffffff&#038;fg=000&#038;s=0&#038;c=20201002" alt="&#92;mathrm{C = &#92;frac{3.978 &#92;times 10^-6}{R} = &#92;frac{3.978 &#92;times 10^-6}{82&#92;Omega} = 48,5 &#92;times 10^-9 = 48,5nF}" class="latex" /> Es decir que para una resistencia de 82Ω necesito un capacitor de 48nF en el filtro pasa bajos
    </p>
  </div>
</div>

. Al conectarlo a la salida del amplificador pude apreciar una diferencia en la calidad de la señal: Está claro, al medir con el canal uno (verde) la salida del amplificador y con el dos (rojo) la salida del filtro, que se atenuó considerablemente la amplitud del ruido. La captura corresponde al micrófono en reposo, captando posiblemente en menor medida un poco de ruido sonoro del ambiente. Para asegurarnos que el filtro funciona correctamente, hacemos la misma medición y comparación, con un sonido de prueba. Comprobamos que para la frecuencia fundamental (de 1,18kHz) y sus primeros armónicos no hay atenuación considerable en el filtro. Esto lo concluimos porque la forma de ambas señales sigue siendo la misma. Además podemos asumir que el ruido remanente se debe en gran medida a la medición y a la poca protección que tiene el circuito al estar armado sobre una _protoboard_.

<div class="wp-block-media-text alignwide is-stacked-on-mobile" style="grid-template-columns:52% auto">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="300" height="255" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/filtro_en_entrada-300x255.png" alt="" class="wp-image-1180 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/filtro_en_entrada-300x255.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/filtro_en_entrada-352x300.png 352w, https://blog.drk.com.ar/wp-content/uploads/2012/09/filtro_en_entrada.png 803w" sizes="(max-width: 300px) 100vw, 300px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Una opción más recomendable es poner el filtro en la entrada del amplificador. Esto evitará que entren al mismo las señales de frecuencias que no nos interesan. Aquí se visualiza la medición de un sonido con el filtro colocado en la entrada. Si comparamos esta imagen con la anterior, a la vista, podemos concluir que el resultado final es mejor.
    </p>
  </div>
</div>

Pero recordemos que no estamos hablando del ruido que ronda los megahertz y que se debe a la medición misma, sino de componentes por encima de los 40kHz ya sean eléctricas o físicas. Por lo tanto sería bueno probar el funcionamiento del filtro con una señal de una frecuencia conocida, que esté por encima del filtro. Esto se resuelve rápidamente con un generador de funciones. Pero a falta de uno se puede armar fácilmente un generador de onda para la ocasión con un IC 555 en modo astable.

 [1]: /2012/amplificador-operacional-lm35
 [2]: http://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_LM358_AMP_2.png
---
title: 555 en configuración astable
author: Leandro Fernández
type: post
date: 2012-09-24T00:12:16+00:00
url: /2012/555-en-configuracion-astable
categories:
  - Electrónica
tags:
  - circuito
  - educación

---
Una configuración del NE555C que nos permitirá probar el filtro que utilizamos con el LM358C anteriormente.

El circuito integrado 555 (o el 556 que tiene dos 555 en un mismo encapsulado) nos permite una variedad de funciones. Una de ellas es la generación de una onda cuadrada (o rectangular) con frecuencias de hasta 500kHz. En la configuración astable se utiliza un capacitor que se cargará y descargará periódicamente, generando el ciclo activo y el pasivo de la señal. Con los valores adecuados de Ra y Rb se puede aproximar bastante a una señal con ambos hemiciclos con igual duración, pero nunca a una duración exactamente igual.

[<img loading="lazy" class="alignnone size-full wp-image-1187" title="555 astable" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/555_astable.png" alt="" width="596" height="366" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/555_astable.png 596w, https://blog.drk.com.ar/wp-content/uploads/2012/09/555_astable-300x184.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/555_astable-488x300.png 488w" sizes="(max-width: 596px) 100vw, 596px" />][1]

<!--more-->

Según los cálculos para los valores de R1, R2 y C (C1+C2) elegidos en el siguiente circuito, deberíamos obtener una señal 193kHz y un ciclo activo del 52% aproximadamente:

[<img loading="lazy" class="alignnone size-full wp-image-1190" title="Circuito NE556C 164kHz" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_164k.png" alt="" width="669" height="306" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_164k.png 669w, https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_164k-300x137.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_164k-500x228.png 500w" sizes="(max-width: 669px) 100vw, 669px" />][2]

El circuito incluye un divisor resistivo en la salida (R3 y R4) que reducirá la tensión a un 1,4% de la original. Ya que lo utilizaremos como entrada del amplificador que diseñamos anteriormente, y que está preparado para trabajar con señales de unos 60mVpp.

[<img loading="lazy" class="alignleft size-medium wp-image-1189" title="NE556C a 165kHz" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/555_165k-300x195.png" alt="" width="300" height="195" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/555_165k-300x195.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/555_165k-459x300.png 459w, https://blog.drk.com.ar/wp-content/uploads/2012/09/555_165k.png 783w" sizes="(max-width: 300px) 100vw, 300px" />][3]El simulador del circuito nos indica que la señal de salida debería ser 151kHz y estimo —ya que no pude encontrar una explicación confirmada en una fuente confiable aún— que la diferencia puede deberse a que el simulador contemple algún parámetro empírico que el cálculo no tiene en cuenta. Lo cierto es que en el protoboard, con un NE556C obtenemos una señal de 165kHz, con una amplitud de 3,66V. Esto se encuentra en un punto intermedio entra el cálculo y el simulador. Lo importante es que será más que suficiente para probar nuestro filtro.

[<img loading="lazy" class="alignright size-medium wp-image-1191" title="Salida en el divisor resistivo" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/divisor-300x188.png" alt="" width="300" height="188" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/divisor-300x188.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/divisor-477x300.png 477w, https://blog.drk.com.ar/wp-content/uploads/2012/09/divisor.png 781w" sizes="(max-width: 300px) 100vw, 300px" />][4]Aquí podemos comparar la salida del 555 (verde) con la tensión en la resistencia R4 (rojo). Ambas señales están en continua y con el cero del canal dos (rojo) en la parte inferior de la escala, a 50mV por división. La amplitud de la señal entre el ciclo activo y el pasivo es de apena 13mV. Y la amplitud del ciclo activo en continua es de 72mV aproximadamente. Esta señal se acoplará a través de una capacitor que descartará el nivel de continua sobre el que se encuentra montada, y pasará al divisor resistivo que está en la entrada del circuito del amplificador, tal como se calculó en el artículo anterior.

[<img loading="lazy" class="alignleft size-medium wp-image-1194" title="Señal de 165kHz filtrada con fc de 40kHz en un filtro RC" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/filtrado-300x196.png" alt="" width="300" height="196" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/filtrado-300x196.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/filtrado-458x300.png 458w, https://blog.drk.com.ar/wp-content/uploads/2012/09/filtrado.png 784w" sizes="(max-width: 300px) 100vw, 300px" />][5]Al conectar la señal al filtro (y al resto del circuito) y medir nuevamente pero con una escala de tensión menor. Observamos que la señal en en el divisor de salida del generador de onda (R4 del circuito del NE556C) tiene una amplitud de unos 30mV (canal uno, verde) y la misma señal disminuye a unos 11mV (canal dos, rojo) en la entrada del amplificador (habiendo pasado por el filtro). A continuación se presenta el circuito completo:

[<img loading="lazy" class="alignnone size-full wp-image-1196" title="Circuito NE556C y LM358C a 165kHz" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_y_358_165kHz.png" alt="" width="930" height="426" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_y_358_165kHz.png 930w, https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_y_358_165kHz-300x137.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_y_358_165kHz-500x229.png 500w" sizes="(max-width: 930px) 100vw, 930px" />][6]

El capacitor de acople es el C4, que deja pasar sólo la componente de alterna de la señal al divisor formado por R6 y R5. El filtro RC formador por R9 y C5 tiene calculada la frecuencia de corte a 40kHz. Por esto vemos reducida la amplitud de la señal en la entrada del amplificador. Es importante remarcar que la frecuencia de corte se considera  cuando la reducción alcanza los -3dB (aproximadamente 70% del valor original). Y que la calidad del filtro (limitada por su construcción) no anula completamente la onda, aún cuando su frecuencia es cuatro veces superior a la de corte.

[<img loading="lazy" class="alignright size-medium wp-image-1198" title="Amplificador con filtro" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/amp_con_filtro-300x196.png" alt="" width="300" height="196" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/amp_con_filtro-300x196.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/amp_con_filtro-458x300.png 458w, https://blog.drk.com.ar/wp-content/uploads/2012/09/amp_con_filtro.png 782w" sizes="(max-width: 300px) 100vw, 300px" />][7]Finalmente medimos la entrada y la salida del amplificador. Del circuito completo que presentamos anteriormente. Con el filtro RC funcionando. Está claro que la salida (en rojo) no respeta la forma de onda de entrada (en verde). Podemos ver que hay un pico de tensión positiva en la entrada que genera una pequeña distorsión en la salida, aún cuando no tiene la amplitud que la amplificación podría darle, según la teoría. Es probable que ese pico se deba al efecto del régimen transitorio en la carga del capacitor C (C1 y C2).

[<img loading="lazy" class="alignleft size-medium wp-image-1199" title="Amplificador sin filtro" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/amp_sin_filtro-300x188.png" alt="" width="300" height="188" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/amp_sin_filtro-300x188.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/amp_sin_filtro-476x300.png 476w, https://blog.drk.com.ar/wp-content/uploads/2012/09/amp_sin_filtro.png 781w" sizes="(max-width: 300px) 100vw, 300px" />][8]Ahora realizamos la misma medición sin el filtro RC en la entrada. Claramente el amplificador está respondiendo a la señal de entrada. Tanto en este gráfico como en el anterior, la escala del canal dos (rojo) es cinco veces más grande que la del canal uno (verde). Por lo que se cumple la amplificación de 5,4 que habíamos configurado en este circuito, en el artículo anterior. Aunque la forma de onda de la señal de salida no corresponde tan claramente con la entrada. Esto se debe al ancho de banda del amplificador, que responde a la siguiente curva:

<img loading="lazy" class="alignright size-full wp-image-1200" title="Respuesta en frecuencia del LM358" src="http://blog.drk.com.ar/wp-content/uploads/2012/09/respuesta_en_frecuencia_LM358.png" alt="" width="343" height="341" srcset="https://blog.drk.com.ar/wp-content/uploads/2012/09/respuesta_en_frecuencia_LM358.png 343w, https://blog.drk.com.ar/wp-content/uploads/2012/09/respuesta_en_frecuencia_LM358-150x150.png 150w, https://blog.drk.com.ar/wp-content/uploads/2012/09/respuesta_en_frecuencia_LM358-300x298.png 300w, https://blog.drk.com.ar/wp-content/uploads/2012/09/respuesta_en_frecuencia_LM358-301x300.png 301w" sizes="(max-width: 343px) 100vw, 343px" /> 

La señal cuadrada tiene armónicos impares partiendo desde la frecuencia fundamental, por lo que los tres primeros serían 165kHz, 495kHz y 825kHz. Todas estas frecuencias se encuentran sobre el último tramo de la curva, donde la ganancia desciende rápidamente deformando la señal. Adicionalmente nuestra señal no es tan pura como desearíamos.

 [1]: http://blog.drk.com.ar/wp-content/uploads/2012/09/555_astable.png
 [2]: http://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_164k.png
 [3]: http://blog.drk.com.ar/wp-content/uploads/2012/09/555_165k.png
 [4]: http://blog.drk.com.ar/wp-content/uploads/2012/09/divisor.png
 [5]: http://blog.drk.com.ar/wp-content/uploads/2012/09/filtrado.png
 [6]: http://blog.drk.com.ar/wp-content/uploads/2012/09/circuito_556_y_358_165kHz.png
 [7]: http://blog.drk.com.ar/wp-content/uploads/2012/09/amp_con_filtro.png
 [8]: http://blog.drk.com.ar/wp-content/uploads/2012/09/amp_sin_filtro.png
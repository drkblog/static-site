---
title: 555 en configuración astable
author: Leandro Fernandez
type: post
date: 2012-09-24T00:12:16+00:00
categories:
  - Electrónica
tags:
  - circuito
---

Una configuración del NE555C que nos permitirá probar el filtro que utilizamos con el LM358C anteriormente.

El circuito integrado 555 (o el 556 que tiene dos 555 en un mismo encapsulado) nos permite una variedad de funciones. Una de ellas es la generación de una onda cuadrada (o rectangular) con frecuencias de hasta 500kHz. En la configuración astable se utiliza un capacitor que se cargará y descargará periódicamente, generando el ciclo activo y el pasivo de la señal. Con los valores adecuados de Ra y Rb se puede aproximar bastante a una señal con ambos hemiciclos con igual duración, pero nunca a una duración exactamente igual.

![555_astable](/2012/09/555_astable.png)

Según los cálculos para los valores de R1, R2 y C (C1+C2) elegidos en el siguiente circuito, deberíamos obtener una señal 193kHz y un ciclo activo del 52% aproximadamente:

![circuito_556_164k](/2012/09/circuito_556_164k.png)

El circuito incluye un divisor resistivo en la salida (R3 y R4) que reducirá la tensión a un 1,4% de la original. Ya que lo utilizaremos como entrada del amplificador que diseñamos anteriormente, y que está preparado para trabajar con señales de unos 60mVpp.

![555_165k](/2012/09/555_165k.png)

El simulador del circuito nos indica que la señal de salida debería ser 151kHz y estimo —ya que no pude encontrar una explicación confirmada en una fuente confiable aún— que la diferencia puede deberse a que el simulador contemple algún parámetro empírico que el cálculo no tiene en cuenta. Lo cierto es que en el protoboard, con un NE556C obtenemos una señal de 165kHz, con una amplitud de 3,66V. Esto se encuentra en un punto intermedio entra el cálculo y el simulador. Lo importante es que será más que suficiente para probar nuestro filtro.

![divisor](/2012/09/divisor.png)

Aquí podemos comparar la salida del 555 (verde) con la tensión en la resistencia R4 (rojo). Ambas señales están en continua y con el cero del canal dos (rojo) en la parte inferior de la escala, a 50mV por división. La amplitud de la señal entre el ciclo activo y el pasivo es de apena 13mV. Y la amplitud del ciclo activo en continua es de 72mV aproximadamente. Esta señal se acoplará a través de una capacitor que descartará el nivel de continua sobre el que se encuentra montada, y pasará al divisor resistivo que está en la entrada del circuito del amplificador, tal como se calculó en el artículo anterior.

![filtrado](/2012/09/filtrado.png)

Al conectar la señal al filtro (y al resto del circuito) y medir nuevamente pero con una escala de tensión menor. Observamos que la señal en en el divisor de salida del generador de onda (R4 del circuito del NE556C) tiene una amplitud de unos 30mV (canal uno, verde) y la misma señal disminuye a unos 11mV (canal dos, rojo) en la entrada del amplificador (habiendo pasado por el filtro). A continuación se presenta el circuito completo:

![circuito_556_y_358_165kHz](/2012/09/circuito_556_y_358_165kHz.png)

El capacitor de acople es el C4, que deja pasar sólo la componente de alterna de la señal al divisor formado por R6 y R5. El filtro RC formador por R9 y C5 tiene calculada la frecuencia de corte a 40kHz. Por esto vemos reducida la amplitud de la señal en la entrada del amplificador. Es importante remarcar que la frecuencia de corte se considera  cuando la reducción alcanza los -3dB (aproximadamente 70% del valor original). Y que la calidad del filtro (limitada por su construcción) no anula completamente la onda, aún cuando su frecuencia es cuatro veces superior a la de corte.

![amp_con_filtro](/2012/09/amp_con_filtro.png)

Finalmente medimos la entrada y la salida del amplificador. Del circuito completo que presentamos anteriormente. Con el filtro RC funcionando. Está claro que la salida (en rojo) no respeta la forma de onda de entrada (en verde). Podemos ver que hay un pico de tensión positiva en la entrada que genera una pequeña distorsión en la salida, aún cuando no tiene la amplitud que la amplificación podría darle, según la teoría. Es probable que ese pico se deba al efecto del régimen transitorio en la carga del capacitor C (C1 y C2).

![amp_sin_filtro](/2012/09/amp_sin_filtro.png)

Ahora realizamos la misma medición sin el filtro RC en la entrada. Claramente el amplificador está respondiendo a la señal de entrada. Tanto en este gráfico como en el anterior, la escala del canal dos (rojo) es cinco veces más grande que la del canal uno (verde). Por lo que se cumple la amplificación de 5,4 que habíamos configurado en este circuito, en el artículo anterior. Aunque la forma de onda de la señal de salida no corresponde tan claramente con la entrada. Esto se debe al ancho de banda del amplificador, que responde a la siguiente curva:

![respuesta_en_frecuencia_LM358](/2012/09/respuesta_en_frecuencia_LM358.png)

La señal cuadrada tiene armónicos impares partiendo desde la frecuencia fundamental, por lo que los tres primeros serían 165kHz, 495kHz y 825kHz. Todas estas frecuencias se encuentran sobre el último tramo de la curva, donde la ganancia desciende rápidamente deformando la señal. Adicionalmente nuestra señal no es tan pura como desearíamos.

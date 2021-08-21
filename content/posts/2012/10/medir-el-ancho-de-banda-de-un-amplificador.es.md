---
title: Medir el ancho de banda de un amplificador
author: Leandro Fernandez
type: post
date: 2012-10-23T03:46:05+00:00
categories:
  - Electrónica
tags:
  - circuito
---

_Este artículo es una excusa para probar un módulo generador de funciones que adquirí para el Arduino. Está basado en el AD9850 y puede genera ondas sinusoidales y cuadradas de hasta 40MHz. En la práctica el módulo no tiene pérdida de amplitud hasta 1MHz, y a partir de esa frecuencia comienza a descender._

![dds_arduino](/2012/10/dds_arduino.jpg)

El procedimiento para medir el ancho de banda es muy simple y es el mismo para cualquier tipo de amplificador o filtro. Se inyecta una señal en la entrada y se mide su amplitud en la salida. Se varía la frecuencia y se calcula la ganancia para distintos puntos del espectro. En este caso, por cuestiones de comodidad, utilizaremos un amplificador operacional LM358N. Y compararemos los resultados con los valores de la hoja de datos del componente. Pero esto se podría realizar con amplificadores de distinto tipo y configuración.

Para la medición del ancho de banda de un amplificador operacional, se utiliza un circuito con ganancia de unidad (_unity-gain_). Es decir que la tensión de salida es igual a la tensión de entrada. Esto se debe a que intrínsecamente estos amplificadores disminuyen su ancho de banda para ganancias mayores a uno, progresivamente a medida de la ganancia aumenta. De esta forma se mide el mayor ancho de banda posible del componente. Tomado de referencia un circuito propuesto en la hoja de datos por el fabricante, configuramos el amplificado operacional de la siguiente manera:

![unity-gain](/2012/10/unity-gain.png)

Iniciamos el experimento con una frecuencia de 1kHz que es la frecuencia central (por convención) para aplicaciones de audio. Según el fabricante este amplificador tiene un ancho de banda de 1MHz para ganancia de unidad. Esto implica que a esa frecuencia la salida caerá a -3dB (decibelios). Comprobamos en el osciloscopio que la entrada y la salida son iguales para 1kHz.

![bw_lm358n_1khz](/2012/10/bw_lm358n_1khz.png)

Ahora podemos variar la frecuencia de la señal de entrada hasta que notemos una diferencia con la salida. Si comenzamos por ir a frecuencias menores, por tratarse de un amplificador operacional, no encontraremos una frecuencia de corte inferior. La frecuencia de corte es aquella para la cual la ganancia cae a -3dB. Esto sí ocurriría con otro tipo de amplificadores. En el caso de probar con frecuencias superiores, efectivamente encontraremos la frecuencia de corte tanto en este como en otros.

![250khz_response](/2012/10/250khz_response.png)

Cuando llegamos, por ejemplo, a 250kHz con la señal de entrada podemos observar una diferencia en la salida. Si bien la amplitud (y por lo tanto la ganancia) se mantiene, la forma de onda no se corresponde. Esto ocurre por la incapacidad del amplificador operacional, para seguir los cambios que ocurren en la entrada. Esta capacidad es conocida como _slew rate_ y es especificada por el fabricante para cada amplificador operacional. En nuestro caso, en la hora de datos del componente disponemos del siguiente gráfico.

![slew_rate_lm358](/2012/10/slew_rate_lm358.png)

Aquí podemos ver que para un pulso de 3 volts en la entrada, el amplificador tarda 10µs en responder con su salida. A 250kHz la cresta desde el máximo negativo al máximo positivo es de 2µs por lo que es obvio que este amplificador no podrá imitarla con su salida. Y esta incapacidad se refleja en la deformación de la señal. Dependiendo del uso que le demos al circuito, esto puede o no representar un inconveniente. Si nuestro circuito finalmente requiriese medir la frecuencia fundamental de la señal de entrada, podríamos prescindir de la forma de onda. Si se tratase de, por ejemplo, un amplificador de audio y encontrásemos este problema a 10kHz, definitivamente no nos serviría el componente.

![frecuencia_corte_superior](/2012/10/frecuencia_corte_superior.png)

Para poder continuar y encontrar la frecuencia de corte superior de nuestro amplificador, necesitamos detectar el momento en que la tensión de salida cae a -3dB. Esto es, cuando la salida es aproximadamente el 70% de la entrada (0.70794). En nuestro caso buscaremos 708mV. En el experimente esta frecuencia de corte resultó ubicarse en 384kHz. Bastante por debajo de 1MHz especificado en la hoja de datos. De hecho, a 1MHz la tensión a la salida es de 233mV pico a pico. Esto se debe principalmente a que el circuito que utilizamos es un amplificador con ganancia uno, pero no es el circuito usado por el fabricante para la medición del ancho de banda. A los fines prácticos, podríamos decir que nuestro circuito es más realista si nos interesa el ancho de banda para la amplificación de señales. Sin olvidar que esta frecuencia de corte aparecerá antes en el espectro en la medida en que nuestra ganancia aumente. También hay que tener en cuenta que si la señal de entrada no es un seno, estará compuesta por series de armónicos. Los que rápidamente alcanzan valores de frecuencia muy superiores a la fundamental de su onda. Y la limitación del ancho de banda del amplificador afectará a estos armónicos deformando la señal (independientemente del slew rate del componente). En el caso de una señal de audio, la pérdida de armónicos afectará directamente la fidelidad.

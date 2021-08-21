---
title: Operacional LM358 – Parte 2
author: Leandro Fernandez
type: post
date: 2012-09-20T14:27:09+00:00
categories:
  - Electrónica
tags:
  - circuito
---

_En esta nota continuaré explorando el amplificador operacional LM358N, con el circuito del artículo [Amplificador operacional LM358][1] y algunas variaciones._

## Aumentando la ganancia

![ac_2](/2012/09/ac_2.png)
  
> En una situación normal es muy probable que necesitemos una ganancia mayor a dos. Para ejercitar una configuración de ese tipo, lo primero que hice fue reducir la amplitud de la señal de entrada con un potenciómetro. Y fijé la posición para una señal de uno 60mV pico a pico.

Como la amplitud depende del volumen del sonido captado por el micrófono. Utilicé un método para obtener emisiones de sonido relativamente iguales, a lo largo de distintas ejecuciones. Con esta señal se pude reducir el nivel de continua en la entrada del amplificador a unos 50mV sin dificultades. Pero dada la limitación de los valores de resistencias disponibles en la práctica adopté un nivel de tensión de 187mV. Lo que además provee un amplio margen de seguridad, ya que aún si la señal superara los 30mV pico previstos, estaríamos muy por encima de tensiones negativas. Vale remarcar que el LM358N no soporta más de 300mV de tensión negativa en la entrada.

{{< katex >}} V_{R2} = {{V} \over {R1+R2}} R2 {{< /katex >}}

{{< katex >}} V_{R2} = {{5V} \over {1M\Omega+39k\Omega}} 39k\Omega = 187mV {{< /katex >}}

Modificado el divisor resistivo en la entrada, pude calcular fácilmente la ganancia máxima teórica posible, que permita una amplificación sin recorte de la señal. Dado que el nivel máximo a la salida es de 3,6V el nivel medio debería ser 1,8V, entonces:

{{< katex >}} G_{max} = {{1,8V} \over {0.187V}} = 9.625 {{< /katex >}}

Nuevamente por razones prácticas seleccioné un par de resistencias para la ganancia del amplificador, entre los valores que tenía disponibles. Teniendo en cuenta que mi límite superior teórico era 9,625:

{{< katex >}} G_{op} = 1 + \frac{R5}{R4} {{< /katex >}}

Con esto, transformé el circuito del artículo anterior en este:

![circuito_LM358_AMP_2](/2012/09/circuito_LM358_AMP_2.png)

La resistencia variable R6 permite reducir la amplitud de la señal de entrada, como expliqué anteriormente. En la práctica el potenciómetro se encontraba al 40% de su recorrido (desde tierra). En la siguiente imagen se aprecia la señal de entrada (verde) superpuesta a la de salida (roja) en alterna. Es decir, no se visualizan los niveles de tensión de cada una: La frecuencia de la señal, medida en el primer ciclo desde el centro, es de 1,21kHz. La amplitud de la salida es, para el pico central, 147mV. El mismo pico en la señal de entrada es de unos 27mV. La ganancia calculada en la práctica resulta 5,444 lo que representa un error del 0,2% con respecto a la ganancia calculada para la configuración del amplificador. Además se hace visible ahora en el osciloscopio una señal de alta frecuencia sobre la forma de onda. Esto no era tan notorio anteriormente, muy posiblemente, debido a que la ganancia era menor.

## Ruido

![ruido](/2012/09/ruido.png)

> Como podemos ver claramente, hablamos de una frecuencia muchísimo más alta que la fundamental del sonido, e incluso sus armónicos más importantes. Pero para asegurarnos haremos dos mediciones nuevas.

![zoom](/2012/09/zoom.png)
  
En primer lugar bajamos la escala de tiempo, y comparamos la entrada y la salida. Tratamos de detectar si el supuesto ruido está presente en ambas. Y por lo que podemos apreciar, sí lo está.

![filtro](/2012/09/filtro.png)
  
Es importante remarcar que las escalas de tensión de cada canal se encuentran en valores distintos, ya que el canal dos tiene la señal amplificada.

![sonido_filtrado](/2012/09/sonido_filtrado.png)
  
Reduciendo aún más la escala de tiempo podemos tomar una medida de un período arbitrario. Vemos que ronda los 10MHz. Por lo que claramente estamos por encima del espectro de frecuencias audibles. También está claro que no visualizamos una señal concreta sino un batido de altas frecuencias que forman una onda asimétrica de baja intensidad.

Esta señal tiene todas las características del ruido eléctrico. Aunque no tengo pensado extenderme en ese tema ahora por dos motivos: porque es un tema muy complejo, y porque no tengo presentes todos los conceptos importantes alrededor de él. Simplemente compruebo, conectando el canal del osciloscopio a si propia masa, que ese ruido de 10MHz está presente aún (por lo menos en 1,4mV). Pero de todas formas, se puede hacer algo muy básico que podríamos considerar preventivo: podemos poner un filtro pasa bajos con una frecuencia de corte por encima del límite audible. 

![RC_Divider](/2012/09/RC_Divider.png)

Para la prueba elegí una frecuencia de corte generosa de 40kHz, ya que el límite del oído ronda los 20kHz.

{{< katex >}} f_c = \frac{1}{2 \Pi R C} {{< /katex >}}

{{< katex >}} \mathrm{C = \frac{3.978 \times 10^{-6}}{R} = \frac{3.978 \times 10^{-6}}{82\Omega} = 48,5 \times 10^{-9} = 48,5nF} {{< /katex >}}

Es decir que para una resistencia de 82Ω necesito un capacitor de 48nF en el filtro pasa bajos. Al conectarlo a la salida del amplificador pude apreciar una diferencia en la calidad de la señal: Está claro, al medir con el canal uno (verde) la salida del amplificador y con el dos (rojo) la salida del filtro, que se atenuó considerablemente la amplitud del ruido. La captura corresponde al micrófono en reposo, captando posiblemente en menor medida un poco de ruido sonoro del ambiente. Para asegurarnos que el filtro funciona correctamente, hacemos la misma medición y comparación, con un sonido de prueba. Comprobamos que para la frecuencia fundamental (de 1,18kHz) y sus primeros armónicos no hay atenuación considerable en el filtro. Esto lo concluimos porque la forma de ambas señales sigue siendo la misma. Además podemos asumir que el ruido remanente se debe en gran medida a la medición y a la poca protección que tiene el circuito al estar armado sobre una _protoboard_.

![filtro_en_entrada](/2012/09/filtro_en_entrada.png)
  
Una opción más recomendable es poner el filtro en la entrada del amplificador. Esto evitará que entren al mismo las señales de frecuencias que no nos interesan. Aquí se visualiza la medición de un sonido con el filtro colocado en la entrada. Si comparamos esta imagen con la anterior, a la vista, podemos concluir que el resultado final es mejor.

Pero recordemos que no estamos hablando del ruido que ronda los megahertz y que se debe a la medición misma, sino de componentes por encima de los 40kHz ya sean eléctricas o físicas. Por lo tanto sería bueno probar el funcionamiento del filtro con una señal de una frecuencia conocida, que esté por encima del filtro. Esto se resuelve rápidamente con un generador de funciones. Pero a falta de uno se puede armar fácilmente un generador de onda para la ocasión con un IC 555 en modo astable.

 [1]: /amplificador-operacional-lm35
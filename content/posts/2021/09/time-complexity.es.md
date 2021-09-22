---
title: ¿Qué es la complejidad temporal?
description: Una explicación simple sobre la complejidad temporal
author: Leandro Fernandez
type: post
date: 2021-09-21
cover: "/2021/09/literals.png"
categories:
  - Programación
tags:
  - algoritmos
  - java
draft: true
---

En _ciencias de la computación_ se estudian las propiedades de los algoritmos. La **complejidad temporal** es una de estas propiedades y se utiliza mucho en la práctica porque la eficiencia de los algoritmos que creamos es un factor muy importante. Ya que se traduce en un costo directo en la operación de un sistema o aplicación. Si un algoritmo puede realizar el mismo trabajo que otro pero utilizando menos recursos vamos a usarlo para reemplazar al menos eficiente.

La **complejidad temporal** no es una medida de cuánto tarda en ejecutarse un algoritmo sino de cómo varía el tiempo de ejecución cuando existe una variación en la cantidad de datos de entrada. Es decir, no nos importa si el algoritmo realiza su trabajo en un minuto o en dos horas, sino cuánto más tarda en correr cuando hay diez datos en la entrada comparador con cuánto tarda con dos datos en la entrada. Desde luego que los número que acabamos de utilizar son arbitrarios e irrelevantes. Lo importante es el concepto. La **complejidad temporal** no tiene unidad, es una medida relativa.

> Además de la **complejidad temporal** existe también la **complejidad espacial** que representa la variación del consumo de memoria del algoritmo según la variación en la cantidad de datos de entrada. Si comprendemos correctamente la primera vamos a haber comprendido la segunda en forma indirecta porque la idea detras de ellas es idéntica. Por supuesto que cuando estudiamos el algoritmo vamos a hacer observaciones diferentes para calcular cada una. Pero al igual que la **complejidad temporal**, la **complejidad espacial** no tendrá una unidad de medida (como por ejemplo _bytes_) porque es una medida relativa.

Imaginemos un algoritmo del cual no nos importan sus detalles internos por el momento. Lo consideraremos una caja negra de la cual sabemos la cantidad de datos de entrada que recibe y el tiempo que tarda en finalizar su ejecución. Con esto podemos perfectamente estudiar la **complejidad temporal** realizando una serie de ejecuciones y sacando una conclusión. Esta no es la forma típica en la que se calcula la complejidad de un algoritmo. Pero es ideal para poder explicar el concepto sin tener que entrar ahora mismo en los detalles engorrosos.

Empecemos por ejecutar el algoritmo para un dato de entrada. Aquí vamos a hablar de una cantidad de datos de entrada asumiendo que estos son equivalentes entre sí. Por ejemplo en un algoritmo que ordena números enteros la cantidad de datos de entrada sería la cantidad de números enteros que pasamos al algoritmo para que ordene. En general a esta cantidad la llamamos `n`. Si el algoritmo puede recibir un número variables de dos tipos de datos distintos, a uno lo llamaremos `n` y al otro `m`. Y así a medida que existan más tipos de entradas relevantes. No nos interesan otras entradas que no vaya a afectar el tiempo de ejecución. Si el algoritmo recibe un nombre de archivo para escribir la salida, ese dato no es relevante.

![figura-1](/2021/09/time-complexity-1.png)

Definamos como `t1` al tiempo que le tomó al algoritmo ejecutarse para un dato de entrada. Luego ejecutemos el algoritmo para otras cantidades:

![figura-2](/2021/09/time-complexity-2.png)

De donde obtendremos `t2` y `t10` también. Como ya explicamos no nos importa realmente el valor en unidad de tiempo de cada una de estas medidas. Lo que queremos es comprarlas entre ellas. Así que imaginemos que `t1`, `t2` y `t10` dieron el mismo tiempo. Es decir que no hubo variación en el tiempo de ejecución a pesar de la variación en la cantidad de datos de entrada. Estamos ante un algoritmo de **complejidad temporal constante**. Es básicamente la mejor complejidad temporal que podemos tener. En notación Big O se representa como `O(1)`

Supongamos que se cambia el algoritmo y se vuelven a ejecutar los tres casos anteriores. Pero ahora `t1` dió un tiempo al que llamaremos `x`, `t2` dió `2x` y `t10` dió `10x`. Podemos observar que al duplicar la cantidad de datos de entrada se duplicó el tiempo de ejecución. Y al multiplicar por 10 la cantidad de datos de entrada el algoritmo tardó diez veces más que para uno.

![figura-3](/2021/09/time-complexity-3.png)

Si graficamos la respuesta en tiempo en función de la cantidad de datos de entrada tendremos una líneas recta. La **complejidad temporal** en este caso es lineal. Ya que el tiempo de ejecución varía linealmente con las variaciones en la cantidad de datos de entrada. En notación Big O se representa como `O(n)`. Y este complejidad es la ideal de las que son esperables encontrarnos. Ya que no es muy común que un algoritmo no varíe el tiempo de ejecución a pesar de la variación de la cantidad de datos de entrada. Por lo general eso significa que no está utilizando esos datos.
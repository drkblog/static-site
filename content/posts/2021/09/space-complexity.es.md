---
title: ¿Qué es la complejidad espacial?
description: Una explicación simple sobre la complejidad espacial
author: Leandro Fernandez
type: post
date: 2021-09-22
cover: "/2021/09/memory.jpg"
categories:
  - Programación
tags:
  - algoritmos
  - java
---

Ya dijimos cuando explicamos [qué es la complejidad temporal]({{< relref path="/posts/2021/09/time-complexity.es.md" lang="es" >}}) que en _ciencias de la computación_ se estudian las propiedades de los algoritmos. La **complejidad espacial** y la **complejidad temporal** son algunas de estas propiedades y se utilizan mucho en la práctica porque la eficiencia de los algoritmos que creamos es un factor muy importante. El tiempo de CPU y la cantidad de memoria que utiliza un programa se traducen en uno de los principales costos de operación. Poder elegir algoritmos basados en estas propiedades es crucial.

La **complejidad espacial** no es una medida de cuánta memoria utiliza un algoritmo al ejecutarse sino de cómo varía dicho consumo cuando existe una variación en la cantidad de datos de entrada. Es decir, no nos importa si el algoritmo realiza su trabajo utilizando 10KB o 3GB, sino cuánto más consume cuando hay diez datos en la entrada comparado con cuánto consume con dos datos en la entrada. Desde luego que los número que acabamos de utilizar son arbitrarios e irrelevantes. Lo importante es el concepto. La **complejidad espacial** no tiene unidad, es una medida relativa.

Imaginemos un algoritmo del cual no nos importan sus detalles internos por el momento. Lo consideraremos una caja negra de la cual sabemos la cantidad de datos de entrada que recibe y la cantidad de memoria que utiliza para su ejecución. Con esto podemos perfectamente estudiar la **complejidad espacial** realizando una serie de ejecuciones y sacando una conclusión. Esta no es la forma típica en la que se calcula la complejidad de un algoritmo. Pero es ideal para poder explicar el concepto sin tener que entrar ahora mismo en los detalles engorrosos.

Empecemos por ejecutar el algoritmo para un dato de entrada. Aquí vamos a hablar de una cantidad de datos de entrada asumiendo que estos son equivalentes entre sí. Por ejemplo en un algoritmo que elige el mayor entre un conjunto de números enteros la cantidad de datos de entrada sería la cantidad de números enteros que pasamos al algoritmo. En general a esta cantidad la llamamos `n`. Si el algoritmo puede recibir un número variables de dos tipos de datos distintos, a uno lo llamaremos `n` y al otro `m`. Y así a medida que existan más tipos de entradas relevantes. No nos interesan otras entradas que no vaya a afectar el consumo de memoria. Si el algoritmo recibe un nombre de archivo para escribir la salida, ese dato no es relevante. Además no se consider parte del consumo de memoria el espacio necesario para almacenar los datos de entrada. Sólo contamos la memoria que el algoritmo necesite en forma adicional.

![figura-1](/2021/09/space-complexity-1.png)

Definamos como `m1` a la cantidad de memoria que usó el algoritmo para un dato de entrada. Luego ejecutemos el algoritmo para otras cantidades:

![figura-2](/2021/09/space-complexity-2.png)

De donde obtendremos `m2` y `m10` también. Como ya explicamos no nos importa realmente el valor en unidad de almacenamiento de cada una de estas medidas. Lo que queremos es comprarlas entre ellas. Así que imaginemos que `m1`, `m2` y `m10` dieron la misma cantidad de bytes. Es decir que no hubo variación en la cantidad de memoria utilizada a pesar de la variación en la cantidad de datos de entrada. Estamos ante un algoritmo de **complejidad espacial constante**. Es básicamente la mejor complejidad espacial que podemos tener. En notación Big O se representa como `O(1)`

Supongamos que se cambia el algoritmo y se vuelven a ejecutar los tres casos anteriores. Pero ahora `m1` dió una cantidad de espacio al que llamaremos `x`, `m2` dió `2x` y `m10` dió `10x`. Podemos observar que al duplicar la cantidad de datos de entrada se duplicó el consumo de memoria. Y al multiplicar por 10 la cantidad de datos de entrada el algoritmo usó diez veces más memoria que para uno.

![figura-3](/2021/09/space-complexity-3.png)

Si graficamos el _consumo de memoria_ en función de la cantidad de datos de entrada tendremos una línea recta. La **complejidad espacial** en este caso es lineal. Ya que el consumo de memoria varía linealmente con las variaciones en la cantidad de datos de entrada. En notación **Big O** se representa como `O(n)`.

Si nuestro algoritmo presenta una variación en el consumo de memoria como la descripta en la siguiente tabla:

```
 Datos | Memoria
=======|=========
   1   |     x
   2   |    4x
   4   |   16x
  10   |  100x
```

Estamos ante una **complejidad espacial cuadrática**. Que nuestro algoritmo presente esta complejidad temporal es bastante preocupante. Excepto que sepamos que no existe una mejor forma de resolver el problema. Desde luego existen problemas que se resuelven con esta complejidad en el mejor de los casos. Y también otros que se resuelven con peor complejidad como `O(n^2)` u `O(n!)` sólo por nombrar dos ejemplos.

![figura-4](/2021/09/space-complexity-4.png)

> Insisto en usar una `x` para representar el consumo de memoria correspondiente a la ejecución de un elemento para luego expresar el resto en función de éste. Porque de esa forma queda más claro que estamos evaluando la variación relativa entre ejecuciones y no el consumo concreto.

## Conclusión

Hasta aquí pudimos entender conceptualmente la **complejidad espacial**. Hemos dejado muchas cosas fuera de la explicación para mantenerla simple y accesible. No profundizamos en todas las complejidad típicas, no explicamos cómo podemos estudiar un algoritmo (incluso en pseudocódigo) para determinar su complejidad sin necesidad de ejecutarlo realmente. No explicamos qué es exactamente la notación **Big O**. Estas cuestiones las trataremos por separado en otros artículos.

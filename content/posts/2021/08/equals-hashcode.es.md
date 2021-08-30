---
title: Contrato equals-hashCode en Java
description: Qué ocurre cuando no respetamos el contrato equals-hashCode
author: Leandro Fernandez
type: post
date: 2021-08-29
cover: "/2021/08/contrato-equals-hashcode.png"
categories:
  - Programación
tags:
  - java
  - hash
  - hashmap
  - hashset
draft: true
---

A pesar de ser un tema fundamental en Java y una típica pregunta en entrevistas laborales, el contrato `equals()-hashCode()` muchas veces es ignorado por programadores con cierta experiencia en el lenguaje. Creo que esto se debe a que el impacto de no respetar esta condición sólo se hace visible si utilizamos los contenedores `HashMap` y `HashSet` o alguna biblioteca de terceros cuya lógica se base en este contrato. Fuera de eso nuestra clase "puede andar por la vida" sin enterarse de que no está cumpliendo el contrato ya que no verá consecuencias. Pero en cuanto las vea, serán desastrosas.

## Qué dice el contrato

> Cuando sobreescribimos el método `equals()` en nuestra clase para cambiar la lógica que se hereda de la clase Object, tenemos que sobreescribir el método `hashCode()` de manera que si dos instancias de nuestra clase son iguales según la nueva lógica en `equals()`, el método `hashCode()` deberá retornar el mismo valor si lo llamo para dichas instancias. Si la lógica de `equals()` dice que las instancias son distintas el método `hashCode()` puede retornar cualquier valor al ser llamado para cada instancia. Es decir puede retornar el mismo valor o no.

Podemos armar una tabla para expresar este contrato con dos instancias imaginarias `o1` y `o2`:

| `o1.equals(o2)` | `o1.hashCode() == o2.hashCode()` |
| --- | --- |
| `true` | `true` |
| `false` | `true o false` |

## Porqué existe el contrato

La necesidad de este contrato viene dada por el uso de ***hash tables*** en los contenedores `HashMap` y `HashSet` del paquete de clases **Collections**.

### Función hash

Un **hash table** es una estructura de datos que nos permite agrupar objetos (o valores si lo pensamos más general) en base a una función **hash**. A su vez, una función hash es una función que recibe un valor y nos devuelve otro valor relacionado a la entrada pero en un dominio reducido. Y garantiza que para cualquier valor de entrada el valor de salida será siempre el mismo. Aunque es posible que para dos o más valores de entrada devuelva el mismo valor a la salida. Idealmente el dominio de salida de la función hash es finito o mucho más chico que el dominio de entrada.

Un ejemplo de una función hash podría ser el módulo de dos. Aunque no es una función hash muy útil, es perfectamente válida. El dominio de entrada serían todo los número enteros. Y el dominio de salida sería 0 y 1. Ya que son los dos únicos valores posibles de aplicar módulo de dos a un entero.

| Entrada | Módulo de dos |
| --- | --- |
| 0 | 0 |
| 1 | 1 |
| 2 | 0 |
| 3 | 1 |
| 4 | 0 |
| 5 | 1 |
| ... | ... |

### Hash table

Dijimos que un hash table me permite organizar valores utilizando una función hash. Este es uno de los usos de ese tipo de funciones. Se crea una tabla de dos columnas donde los valores posibles de la primera (los que pondremos en las líneas de nuestra tabla) será el valor retornado al aplicar la función hash a un valor que queremos organizar. Y la segunda columna contendrá uno o más valores.

Para que el ejemplo sea más interesante tomaremos una nueva función hash que sea módulo de diez. Esta función puede retornar los enteros del cero al nueve para cualquier número natural. Vamos a suponer que tenemos que organizar los valores `3, 35, 23, 612, 0, 30, 17, 28, 64` así que tomaremos cada uno, le aplicaremos el módulo de diez y guardaremos ese valor en la línea de la tabla que corresponda a la salida esa función.

| Índice | Valores |
| --- | --- |
| 0 | 0, 30 |
| 1 | |
| 2 | 612 |
| 3 | 3, 23|
| 4 | 64 |
| 5 | 35 |
| 6 | |
| 7 | 17 |
| 8 | 28 |
| 9 | |

La utilidad de esta organización es poder verificar la presencia de los valores en la tabla rápidamente. Si queremos saber si el 39 está en la tabla, le aplicamos la función hash nos dará 9, iremos a la línea nueve y veremos que no está el 39. Si preguntásemos por el 23 aplicaríamos la función hash y nos daría 3, iríamos a la línea 3 y recorreríamos la lista de valores y efectivamente verificaríamos que está.

Claro que con tan poco valores y una función hash que sólo nos permite tener 10 líneas en la tabla esto parece tener poco sentido. Pero si tuviésemos cientos de miles de valores y una función hash que nos permitiese 100 líneas (por poner un ejemplo), ganaríamos muchísima velocidad comparado con tener los cientos de miles de valores en una lista y tener que recorrerla para saber si un valor está o no. Y en el otro extremo, si usáramos un array cuyo índice permita ubicar todos los posible valores (y marcáramos el array con unos y ceros para decir que un valor está presente), si bien la velocidad de acceso sería ideal el consumo de memoria sería muy poco eficiente.

El **hash table** es una buena solución de compromiso entre esos dos extremos. Y es fundamental la elección de una función **hash** que tenga pocas colisiones y al mismo tiempo permita armar un índice de tamaño razonable. Los conceptos de hash table y función hash son mucho más profundos de lo que vimos brevemente en este artículo. Esto es sólo una introducción para poder comprender lo que sigue.

### Función hash en Java

En Java se decidió darle a las clases la responsabilidad de definir la función hash que más se adecúe a ellas. Por eso todas las clases de Java heredan de la clase Object una implementación del método `int hashCode()` que retorna un entero a partir de la posición de memoria donde se encuentra el objeto. Y esto se debe a que la implementación por defecto de `equals()` compara las posiciones de memoria para saber si es la misma instancia, y en ese caso retornar verdadero. Y en caso contrario, falso:

{{< highlight java >}}
public boolean equals(Object obj) {
    return (this == obj);
}
{{< /highlight >}}

> Recordemos que Java utiliza referencias para los objetos. En el código anterior `obj` y `this` son referencias y pueden apuntar a la misma posición de memoria o no. Si lo hacen, entonces el objeto apuntado por `obj` y el objeto que está recibiendo la llamada a `equals()` son el mismo objeto (la misma instancia).

De esa forma se asegura directamente el cumplimiento del contrato. La implementación por defecto de `equals()` sólo retorna verdadero si las dos referencias recibidas apuntan a la misma instancia. Y de esa forma el método `hashCode()` (que por defecto es nativo) retornará el mismo valor para ambas. Entonces si creamos una clase y sobreescribimos el `equals()` para establecer una lógica distinta tenemos que sobreescribir `hashCode()` para asegurar que se mantiene el contrato.

## Un ejemplo correcto de sobreescritura de equals() y hashCode()

{{< highlight java >}}
public boolean equals(Object obj) {
    return (this == obj);
}
{{< /highlight >}}
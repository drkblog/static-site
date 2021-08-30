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

La necesidad de este contrato viene dada por el uso de ***hash tables*** en los contenedores `HashMap` y `HashSet` del paquete de clases **Collections**. A continuación entraremos en muchos detalles interesantes para entender todo esto. Pero si sos una persona que prefiere ver un video en lugar de leer te recomiendo esta [explicación del contrato entre equals-hashCode](https://www.youtube.com/watch?v=k-YhxnFHYl8)

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

Claro que con tan poco valores y una función hash que sólo nos permite tener 10 líneas en la tabla esto parece tener poco sentido. Pero si tuviésemos cientos de miles de valores y una función hash que nos permitiese 100 líneas (por poner un ejemplo), ganaríamos muchísima velocidad comparado con tener los cientos de miles de valores en una lista y tener que recorrerla para saber si un valor está o no. Lo que tendría una [complejidad temporal](https://www.youtube.com/watch?v=gH4tfaZaLZk) lineal O(n). Y en el otro extremo, si usáramos un array cuyo índice permita ubicar todos los posible valores (y marcáramos el array con unos y ceros para decir que un valor está presente), si bien la velocidad de acceso sería ideal ([complejidad temporal](https://www.youtube.com/watch?v=gH4tfaZaLZk) constante O(1)) el consumo de memoria sería enorme, muy poco eficiente o directamente imposible.

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

{{< highlight java "linenos=table" >}}
class Book {
  private String title;
  private String author;
  private long isbn;

  @Override
  public boolean equals(final Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    final Book book = (Book) o;
    return isbn == book.isbn;
  }
}
{{< /highlight >}}

Tomemos como ejemplo esta clase **Book** hecha específicamente para el artículo. Definitivamente no es una clase completa y el uso de `long` para el atributo que representa el **ISBN** del libro no es ideal. Pero será más que suficiente a los fines didácticos. Tiene tres atributos de los cuales sólo uno se utiliza en el método `equals()` que ya está sobreescrito.

> Podemos decir que la implementación por defecto del método `equals()` nos devuelve la ***identidad*** del objeto. Nos dice si es o no el mismo objeto. Que es lo que hace el comparador `==`. Pero usualmente lo sobreescribimos para que nos devuelva la ***equivalencia***. Es decir, si dos instancias valen lo mismo a pesar de ser distintas instancias.

La nueva lógica de **equivalencia** se basa en que dos objetos de esta clase que tengan en mismo valor de ISBN serán considerados el mismo libro. La línea 8 es un atajo que devuelve verdadero el método recibió la misma instancia sobre la cual se llama el método (un caso de `obj.equals(obj)`). No tiene sentido seguir adelante ya que si es la misma instancia el **ISBN** será el mismo. La línea 9 descarta casos en que nos pasen `null` o un objeto de otra clase ya que nunca podrán ser equivalentes en esos casos. Finalmente se hace un _cast_ del objeto al tipo **Book** y se comparan los valores del atributo **isbn**. Es decir que mientras recibamos una instancia de la misma clase (que no sea nuestra propia instancia) diremos que son equivalentes si los **ISBN** son iguales.

Esa es una buena implementación de `equals()` pero la clase **Book** no podrá ser usada dentro de un **HashSet** o **HashMap** correctamente. Porque el método `hashCode()` por defecto sólo asegura retornar el mismo valor si la instancia es la misma. No existe garantía alguna de que dos instancias distintas vayan a retornar el mismo valor. Si dos instancias retornan el mismo valor de hash es sólo por una colisión. Y no porque exista una equivalencia entre ellas. Más concretamente, dos instancias de **Book** tal como está arriba pueden retornar verdadero de la llamada `i1.equals(i2)` y al mismo tiempo retornar (casi con seguridad) distintos _hash_ `i1.hashCode() != i2.hashCode()`. Esto impedirá que los contenedores mencionados puedan almacenar estos objetos correctamente.

A los fines de la explicación vamos a pensar en una implementación de **HashSet** que no corresponde necesariamente con la implementación en los JDK disponibles pero es equivalente para lo que nos interesa. Si el **HashSet** almacena los objetos de la clase Book en un hash table podríamos tener la siguiente situación. Donde el contenedor recibió cinco instancias de **Book** y las almacenó preguntándole a cada una su `hashCode()`:

| Índice | Valores |
| --- | --- |
| 0 | |
| 1 | |
| 2 | Book(1004) |
| 3 | Book(3047)|
| 4 | Book(10) |
| 5 | Book(31664) |
| 6 | Book(600)|
| 7 | |

Donde el número entre paréntesis es el valor de ISBN de cada instancia. Y los índices son arbitrarios pero corresponderían a lo que nos retorna la función `hashCode()` que heredamos de **Object**. Si creamos una nueva instancia de la clase con el ISBN de igual al de una de las instancias ya almacenadas (por ejemplo Book(10)) y le preguntamos al HashSet si ya tiene el libro pasándole esta nueva instancia. El contenedor tomará la instancia y le preguntará su `hashCode()`. Entonces irá a la fila correspondiente y preguntará a cada una de las instancias allí, si es equivalente a esta otra instancia que le pasamos. Al hacer eso el contenedor recibirá un _hash_ que casi con seguridad no será 4 (el que debería recibir para funcionar correctamente). Terminaría contestando que no tiene un libro equivalente al que le pasamos cuando en realidad sí lo tiene. Es decir que si no implementamos correctamente la función `hashCode()` después de sobreescribir `equals()` estos contenedores sólo podrían funcionar bien de pura casualidad.

Para corregir este problema podemos escribir:

{{< highlight java "linenos=table" >}}
class Book {
  private String title;
  private String author;
  private long isbn;

  @Override
  public boolean equals(final Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    final Book book = (Book) o;
    return isbn == book.isbn;
  }

  @Override
  public int hashCode() {
    return (int)isbn;
  }
}
{{< /highlight >}}

Aunque esta no es la mejor función de _hash_ partiendo de un `long` en **Java**, sería funcionalmente correcta. Es decir, nos alcanzaría para cumplir el contrato. Al convertir el atributo **isbn** a entero y devolverlo como _hash_ garantizo que dos instancias con el mismo valor en este atributo devolverán el mismo valor de _hash_. A partir de este momento los objetos de **Book** podrán almacenarse en un **HashSet** o **HashMap**. Volviendo al ejemplo anterior:

| Índice | Valores |
| --- | --- |
| 0 | |
| 1 | |
| 2 | Book(1004) |
| 3 | Book(3047)|
| 4 | Book(10) |
| 5 | Book(31664) |
| 6 | Book(600)|
| 7 | |

Si ahora pasamos una instancia nueva de **Book** con **ISBN** `10` el contenedor recibirá `4` como _hash_ cuando se lo pida a esta nueva instancia. Y esto lo afirmamos porque si la instancia con **ISBN** `10` está en la línea `4` quiere decir que eso es lo que devolvió su `hashCode()`. El HashSet irá a esa línea, le preguntará a la instancia que encuentre si es equivalente llamando `instanciaEnSet.equals(instanciaNueva)` y recibirá verdadero. Finalmente nos dirá que sí, ya tiene un libro equivalente al que le pasamos.

## Conclusión

Hemos aprendido que existe un contrato entre los métodos `equals()` y `hashCode()` que debemos mantener. Siempre que sobreescribamos uno debemos sobreescribir el otro para garantizar que si dos instancias de nuestra clase son equivalente según la nueva lógica en `equals()`, el método `hashCode()` deberá retornar el mismo valor si lo llamo para dichas instancias. Y que si son distintas puede retornar el mismo valor o no. Entendimos como funciona un hash table y cómo lo usa un HashSet y un HashMap para reducir el espacio de memoria ocupada pero al mismo tiempo tener la posibilidad de acceder a los elementos en **O(1)**. Y cómo estos contenedores fallarían si no respetamos el contrato.
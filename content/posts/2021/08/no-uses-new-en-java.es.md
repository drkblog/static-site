---
title: ¡No uses new en Java!
author: Leandro Fernandez
type: post
date: 2021-08-10T03:30:49+00:00
categories:
  - Programación
tags:
  - cache
  - static factory
  - static factory method
---
_Siempre prefiere static factory methods al uso de constructores._

Hay dos circunstancias distintas donde debemos seguir esta máxima: _cuando creamos una clase y definimos cómo se van a crear sus instancias, y cuando creamos instancias de otras clases que no hemos definido nosotros._

<div class="wp-block-media-text alignwide is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="512" height="512" src="http://blog.drk.com.ar/wp-content/uploads/2021/08/forbidden-new.png" alt="No uses new" class="wp-image-2728 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2021/08/forbidden-new.png 512w, https://blog.drk.com.ar/wp-content/uploads/2021/08/forbidden-new-300x300.png 300w, https://blog.drk.com.ar/wp-content/uploads/2021/08/forbidden-new-150x150.png 150w" sizes="(max-width: 512px) 100vw, 512px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      <meta charset="utf-8" />
      Creo que la mayor parte del tiempo tenemos esto presente cuando estamos definiendo nuestra clase. Y no tanto cuando creamos objetos de otras. En especial si esa clase tiene constructores públicos.
    </p>
  </div>
</div>

<!--more-->

## Clases no propias

Es por eso que primero quiero enfocarme en ese caso. Debemos acostumbrarnos a buscar siempre métodos estáticos que pueda proveernos la clase para crear sus instancias. Porque no sólo nos quitara cierta responsabilidad o nos evitará cierto esfuerzo de mantenimiento en el futuro. Sino porque algunas clases implementan internamente un mecanismo de _cache_. Y nos perderíamos de ese beneficio si creamos instancias con constructores. Veamos algunos ejemplos:

### String

{{< highlight java >}}
String str1 = new String("Hola");
    String str2 = new String("Hola");

    System.out.println(str1 == str2);

    String str3 = String.valueOf("Hola");
    String str4 = String.valueOf("Hola");

    System.out.println(str3 == str4);
{{< / highlight >}}

El bloque de código de arriba nos dar la siguiente salida:

{{< highlight generic >}}
false
true
{{< / highlight >}}

Nótese que estamos comparando las referencias y no estamos haciendo una comparación lógica con `equals()`. Esto se debe a que nos interesa saber si se trata de dos referencias a una misma instancia o dos instancias distintas. Y no queremos probar si el contenido de las cadenas es el mismo. Eso ya lo sabemos.

El motivo por el que obtenemos una misma instancia al utilizar `valueOf()` en lugar del constructor es que ese _static factory method_ que llamamos en las líneas seis y siete implementa un _cache_ que nos devolverá una instancia ya existente de la clase si se trata de una cadena para la cual esa instancia existe. En cambio cuando usamos el operador `new` como en las dos primeras líneas estamos obligando al compilador a crear un nueva instancia de la clase.

En aplicaciones que carguen muchos cadenas a memoria y donde la repetición de las mismas sea una posibilidad, esto puede hacer una gran diferencia a la hora del uso de memoria y el costo de procesamiento para la creación de instancias.

### Integer

De forma similar a lo que ocurre con String las clases numérica suelen tener algún cache para una cantidad limitada de valores:

{{< highlight java >}}
Integer val1 = new Integer(127);
    Integer val2 = new Integer(127);

    System.out.println(val1 == val2);

    Integer val3 = 127;
    Integer val4 = 127;

    System.out.println(val3 == val4);
{{< / highlight >}}

El primer bloque nos dirá que se trata de instancias distintas tal como explicamos anteriormente, debido al uso de `new`. Sin embargo no ocurre lo mismo con las líneas seis y siete. Aunque aquí no estamos llamando al método estático. Y es que entra en juego otra característica de **Java** llamada _autoboxing_. Según la cual el lenguaje se toma el trabajo de llamar al método `valueOf()` de la clase ante la presencia de un literal. Por supuesto esto funciona con clases cuyos valores pueden escribirse como literales en **Java**. Es decir que a los fines prácticos estas líneas seis y siete son equivalentes a la del ejemplo de `String`. E incluso podríamos hacer lo mismo en ese caso.

{{< highlight java >}}
Integer val3 = 128;
    Integer val4 = 128;
{{< / highlight >}}

La limitación en el caso de la clase `Integer` está en que el cache almacena 256 valores (desde -128 a +127) solamente. Por lo que según el ejemplo de arriba lo que obtendremos son dos instancias diferentes por el simple hecho de usar un valor por encima del 127.

Es importante aclarar que este comportamiento es completamente dependiente de la implementación de estas clases en la biblioteca estándar. Si la documentación de la clase o la biblioteca menciona la existencia del cache, podemos asumir que siempre estará presente. Pero puede haber casos en que el _cache_ esté implementado sin que la documentación se comprometa al mismo. Y eso implicaría que podría ser eliminado sin advertencia en un futuro. Así que hay que tener cuidado si nuestro código asumirá la existencia del _cache_.

### Otras clases

La clase `Long` también recomienda utilizar `valueOf()` en caso de no requerir una nueva instancia. Pero la documentación hace una aclaración importante:

<blockquote class="wp-block-quote">
  <p>
    If a new Long instance is not required, this method should generally be used in preference to the constructor Long(long), as this method is likely to yield significantly better space and time performance by caching frequently requested values. Note that unlike the corresponding method in the Integer class, this method is not required to cache values within a particular range.
  </p>
  
  <cite>JavaDoc for JDK 1.8</cite>
</blockquote>

Lo que dice es que este método tendrá en el _cache_ los valores más utilizados. Pero que a diferencia de la clase `Integer` no está obligada a mantener un _cache_ de los valores dentro de cierto rango. Es decir, no podemos asumir que si pedimos la instancia de `Long` de valor 1 se tratará de una instancia en el _cache_. Al contrario de lo que pasa con `Integer`.

La clase `BigInteger` tiene un _cache_ para valores entre -16 y +16 pero su documentación no especifica el rango. Sólo dice que provee un _cache_. La clase `Double`, en la versión 1.8 al menos, es un caso interesante ya que la documentación dice que proveerá un cache y sin embargo este es el cuerpo del método:

{{< highlight java >}}
public static Double valueOf(double d) {
        return new Double(d);
    }
{{< / highlight >}}

Claramente no hay un cache y esto nos dará una nueva instancia de la clase. La lección aquí es que muchas veces no alcanza con ver la documentación, sino que es necesario ver el código fuente.

`Boolean` tiene dos instancias (por supuesto) que nos retorna si usamos el método estático. `Character` tiene un cache de 0 a 127.

## Clases propias

Cuando creamos nuestras clases es importante que utilicemos _static factory methods_ siempre que tenga sentido. En primer lugar porque podríamos implementar un _cache_ como lo hacen las clases que mencionamos en la primera parte del artículo. Pero también por las otras ventajas que podemos obtener.

Si nuestra clase tiene una complejidad mediana o alta, o si cierto procesamiento de los valores recibidos es necesario, utilizar un método estático nos provee el espacio para realizar estas tareas. Y si por algún motivo la creación no es posible, es mucho más natural arrojar una excepción desde un método. Pero por sobre todo vamos a encapsular esta complejidad en ese método y nos permitirá luego mantenerla con el costo de modificar este detalle en un sólo lugar. A diferencia de lo que ocurriría si el usuario de nuestra clase tuviese que hacer eso en cada parte del código que construye una instancia de nuestra clase.

Adicionalmente podemos usar este patrón para una jerarquía de clases donde queremos la libertad de poder modificar la instancia concreta que se fabricará en el futuro. Es decir, podemos declarar un método estático que tiene como tipo de retorno una interfaz. Y el cuerpo del método retorna un objeto de una clase que implementa esa interfaz. 

{{< highlight java >}}
Impresora crearImpresora() {
  return new ImpresoraLaser();
}
{{< / highlight >}}

Luego será muy fácil modificar la clase concreta que se retorna sin que quienes llaman a este método sepan lo que está ocurriendo.

{{< highlight java >}}
Impresora crearImpresora() {
  return new ImpresoraTermica();
}
{{< / highlight >}}

No importa en cuantos lugares estemos llamando al método. Sólo modificando una línea nuestro sistema empezará a utilizar una clase distinta.

Este patrón puede implementarse de una forma más compleja aún. Y nos permite mayor flexibilidad o más formalidad. Pero ese caso de uso escapa a la intención de este artículo.

## Fin

Espero que la nota haya sido útil. Te invito a dejar tu comentario o crítica aquí abajo.
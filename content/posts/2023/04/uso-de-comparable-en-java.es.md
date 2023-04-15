---
title: Ordenando objetos en Java
description: Cómo utilizar la interfaz Comparable para ordenar objetos en Java
author: Leandro Fernandez
type: post
date: 2023-04-14
slug: uso-de-interfaz-comparable-en-java
cover: "/logo/java.png"
categories:
  - Programación
tags:
  - programación
  - java
---

## Introducción

En la programación orientada a objetos, es común la necesidad de comparar objetos de una misma clase. La interfaz `Comparable` es una herramienta útil en **Java** que nos permite ordenar objetos de una clase específica. En este artículo, se explicará detalladamente cómo utilizar la interfaz `Comparable`.

Implementación de la **Interfaz Comparable**:

Para poder utilizar la interfaz `Comparable`, primero necesitamos implementarla en nuestra clase. Para hacer esto, debemos agregar la siguiente línea de código:

{{< highlight java "linenos=table" >}}
public class MiClase implements Comparable<MiClase> {
  ...
}
{{< /highlight >}}

En esta línea, estamos diciéndole a Java que nuestra clase implementa la interfaz `Comparable` y que va a ser comparable con objetos de la misma clase.

Una vez que hemos implementado la interfaz `Comparable`, debemos sobrescribir el método `compareTo()`. Este método es el que se va a encargar de comparar los objetos de nuestra clase. El método debe devolver un número entero que indica si el objeto actual es menor, igual o mayor que el objeto que se está comparando.

El método `compareTo()` tiene la siguiente firma:

{{< highlight java "linenos=table" >}}
public class MiClase implements Comparable<MiClase> {
  ...
  public int compareTo(MiClase objeto) {
    ...
  }
}
{{< /highlight >}}

Dentro de este método, debemos comparar los campos de nuestra clase para determinar cuál objeto es mayor. Si el objeto actual es mayor que el objeto que se está comparando, se debe devolver un número positivo. Si los objetos son iguales, se debe devolver cero. Y si el objeto actual es menor que el objeto que se está comparando, se debe devolver un número negativo.

Por ejemplo, si estamos comparando dos objetos de la clase Persona, podríamos implementar el método así:

{{< highlight java "linenos=table" >}}
@Override
public int compareTo(Persona otraPersona) {
    return this.edad - otraPersona.getEdad();
}
{{< /highlight >}}

En este ejemplo, estamos comparando las edades de dos personas. Si la edad de la persona actual es menor que la edad de la otra persona, el método devuelve un número negativo. Si las edades son iguales, devuelve cero. Y si la edad de la persona actual es mayor que la edad de la otra persona, devuelve un número positivo.

Utilización de la **Interfaz Comparable**:

Una vez que hemos implementado el método `compareTo()`, podemos utilizar la interfaz Comparable para ordenar objetos de nuestra clase. Podemos hacerlo utilizando el método `sort()` de la clase Arrays o de la clase Collections, dependiendo del tipo de estructura de datos que estemos utilizando.

Por ejemplo, si tenemos un `ArrayList` de Personas, podemos ordenarlo así:

{{< highlight java "linenos=table" >}}
ArrayList<Persona> personas = new ArrayList<>();
// Agregamos algunas personas al ArrayList...

Collections.sort(personas);
{{< /highlight >}}

En este ejemplo, estamos utilizando el método `sort()` de la clase **Collections** para ordenar el `ArrayList` de _Personas_. Como hemos implementado la interfaz Comparable en la clase _Persona_ y hemos sobrescrito el método `compareTo()`, Java sabe cómo comparar los objetos de la clase _Persona_ y los ordena de manera adecuada.

## Conclusiones

En conclusión, la interfaz `Comparable` es una herramienta útil en **Java** que nos permite ordenar objetos de una clase específica. Para utilizar la interfaz `Comparable`, debemos implementarla en nuestra clase y sobrescribir el método `compareTo()`. Este método debe devolver un número entero que indica si el objeto actual es menor, igual o mayor que el objeto que se está comparando. Una vez que hemos implementado el método `compareTo()`, podemos utilizar la interfaz Comparable para ordenar objetos de nuestra clase utilizando el método `sort()` de la clase Arrays o de la clase **Collections**.
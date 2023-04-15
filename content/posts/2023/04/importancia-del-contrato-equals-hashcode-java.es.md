---
title: Importancia del equals-hashCode contract en Java
description: Por qué debemos respetar el contrato entre equals y hashCode
author: Leandro Fernandez
type: post
date: 2023-04-14
slug: importancia-del-contrato-equals-hashcode-java
cover: "/logo/java.png"
categories:
  - Programación
tags:
  - programación
  - java
---

## Contrato

En **Java**, las implementaciones de los métodos `equals()` y `hashCode()` están estrechamente relacionadas y deben cumplir un contrato bien definido para garantizar que funcionen correctamente en conjunto. El contrato establece que si dos objetos son iguales según el método `equals()`, entonces **deben tener el mismo** valor de hash según el método `hashCode()`. Cuando dos objetos no son iguales según el método `equals()` **pueden o no tener el mismo** valor de hash.

La razón por la cual es importante cumplir este contrato es que muchos algoritmos y estructuras de datos en Java se basan en el método `hashCode()` para optimizar su funcionamiento. Las implementaciones **HashSet** y **HashMap** utilizan el valor de hash para almacenar y recuperar elementos de manera eficiente. Si un objeto tiene una implementación incorrecta de `equals()` y `hashCode()`, puede ocurrir que se almacene en un lugar diferente al que debería, lo que podría llevar a comportamientos inesperados de las mismas. Estas dos implementaciones son muy utilizadas así que el impacto de no cumplir el contrato es estadísticamente alto.

Por lo tanto, para garantizar que los objetos se comporten correctamente en colecciones y otros algoritmos de Java, es importante seguir el contrato entre `equals()` y `hashCode()` y asegurarse de que el valor de hash de un objeto sea coherente con su método `equals()`.

## Ejemplos

Un ejemplo de una implementación incorrecta del contrato entre `equals()` y `hashCode()` en Java podría ser el siguiente:

{{< highlight java "linenos=table" >}}
public class Persona {
    private String nombre;
    private int edad;
 
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
 
    @Override
    public boolean equals(Object obj) {
        if (obj == null) return false;
        if (!(obj instanceof Persona)) return false;
        Persona p = (Persona)obj;
        return nombre.equals(p.nombre) && edad == p.edad;
    }
 
    @Override
    public int hashCode() {
        return nombre.hashCode();
    }
}
{{< /highlight >}}

En este ejemplo la implementación de `equals()` compara tanto el nombre como la edad de dos objetos de `Persona`, mientras que `hashCode()` solo utiliza el nombre. Esto significa que dos objetos de `Persona` que tengan el mismo nombre tendrán el mismo valor de hash, independientemente de su edad.

Esto puede llevar a comportamientos inesperados cuando se utilizan estructuras de datos que se basan en `hashCode()`, como **HashSet** y **HashMap**. Si se agregan dos objetos de `Persona` con el mismo nombre pero diferentes edades a un HashSet, ambos objetos se almacenarán en el mismo cubo interno del HashSet debido a que tienen el mismo valor de hash. Esto podría llevar a comportamientos inesperados al intentar recuperar los objetos de la colección, ya que el HashSet no podrá distinguir entre ellos.

Para cumplir el contrato, el método `hashCode()` debería tener en cuenta tanto el nombre como la edad de la persona, por ejemplo:

{{< highlight java "linenos=table" >}}
@Override
public int hashCode() {
    int hash = 17;
    hash = hash * 31 + nombre.hashCode();
    hash = hash * 31 + edad;
    return hash;
}
{{< /highlight >}}

Con esta implementación, dos objetos de **Persona** que sean iguales según `equals()` tendrán el mismo valor de hash, y por lo tanto se almacenarán en el mismo cubo interno del **HashSet** si se agregan a la colección.

## Errores comunes

- Mucha gente piensa que estos métodos se llaman entre sí. Pero la única relación entre ellos es el contrato que explicamos anteriormente.
- También es un error común pensar que las implementaciones de estos métodos en la clase **Object** utilizan los atributos de la clase para retornar su valor. Pero desde luego eso no es correcto. La implementación por defecto de `equals()` simplemente compara las referencias (las posiciones de memoria de los dos objetos) y devuelve verdadero si son iguales. Es decir, si se trata literalmente del mismo objeto. Sin importar el estado de la instancia. Análogamente el método `hashCode()` computa un valor a partir de la referencia de la instancia. Asegurando así cumplir el contrato.
- Tampoco existe relación entre el ordenamiento natural que en Java se organiza a través de la implementación de la interfaz `Comparable`, con los métodos `equals()` y `hashCode()`. Aunque se recomienda mantener la consistencia entre el retorno de `equals()` para dos objetos con el resultado de `compareTo()`. Por ejemplo si `a.compareTo(b) == 0` retorna el mismo valor que `a.equals(b)` existe consistencia. Y esto puede evitar problemas en ciertas colecciones como _sorted sets y maps_.
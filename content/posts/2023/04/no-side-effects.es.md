---
title: No side effects
description: Evitar los efectos secundarios
author: Leandro Fernandez
type: post
date: 2023-04-13
slug: no-side-effects
#cover: "/logo/java.png"
categories:
  - Programación
tags:
  - programación
  - buenas prácticas
---

El principio de _no side effects_ (o "sin efectos secundarios" en español) es un concepto en programación que se refiere a la idea de que una función o método no debe causar cambios en el estado del sistema fuera de su propio ámbito local. En otras palabras, una función no debe modificar ninguna variable global o cambiar el estado de cualquier objeto o recurso externo a su propia ejecución.

La idea detrás de este principio es que, al limitar el alcance de las funciones y métodos y mantenerlos autocontenidos, es más fácil razonar sobre su comportamiento y evitar errores y bugs. También hace que el código sea más fácil de entender, probar y mantener.

Un ejemplo de una función que viola el principio de _no side effects_ sería una función que modifica una variable global en lugar de devolver un valor. Por ejemplo:

{{< highlight java "linenos=table" >}}
int x = 0;

public void incrementX() {
    x++;
}
{{< /highlight >}}

Esta función tiene un efecto secundario al modificar la variable global x. En su lugar, una función que cumpla el principio de no side effects podría ser la siguiente:

{{< highlight java "linenos=table" >}}
public int increment(int x) {
    return x + 1;
}
{{< /highlight >}}

Esta función no modifica ninguna variable global y devuelve un valor en función de su entrada. Por lo tanto, es más fácil de entender y mantener.

## Clases

El principio de _no side effects_ también se puede aplicar a los métodos de una clase en Java. Cuando se aplica este principio, se espera que un método no altere el estado del objeto fuera de su propio ámbito local, si devuelve algún valor.

En otras palabras, si un método tiene efectos secundarios que cambian el estado del objeto, se espera que estos cambios se limiten a su propio ámbito local. Si el método devuelve un valor, el resultado debe depender únicamente de sus parámetros de entrada y no del estado del objeto o de cualquier otro factor externo.

Por ejemplo, considera la siguiente clase **Persona**:

{{< highlight java "linenos=table" >}}
public class Persona {
    private String nombre;
    private int edad;

    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }
}
{{< /highlight >}}

En este ejemplo, la clase **Persona** tiene un método `getEdad()` que devuelve la edad de la persona. Este método no tiene efectos secundarios y solo devuelve un valor en función de su estado interno.

Por otro lado, si tuviéramos un método `envejecer()` que aumentara la edad de la persona en uno, y este método se llamara desde fuera de la clase, se estaría violando el principio de no side effects. En lugar de eso, es mejor hacer que este método devuelva un nuevo objeto **Persona** con la edad incrementada en uno, sin modificar el estado del objeto original.

{{< highlight java "linenos=table" >}}
public Persona envejecer() {
    return new Persona(nombre, edad + 1);
}
{{< /highlight >}}

De esta manera, el método `envejecer()` no altera el estado del objeto original y cumple con el principio de no side effects.

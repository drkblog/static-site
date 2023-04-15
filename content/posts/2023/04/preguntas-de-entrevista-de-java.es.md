---
title: Preguntas de entrevista de Java
description: Cinco preguntas de entrevista de Java
author: Leandro Fernandez
type: post
date: 2023-04-15
slug: cinco-preguntas-de-entrevista-de-java
cover: "/logo/java.png"
categories:
  - Programación
tags:
  - programación
  - java
---

## Preguntas

¿Qué son los streams en Java 8 y cómo se utilizan?
¿Cuál es la diferencia entre una interfaz y una clase abstracta en Java?
¿Qué es la sobrecarga de métodos en Java y cómo funciona?
¿Qué son los generics en Java y cómo se utilizan?
¿Qué es la reflexión en Java y cómo se utiliza?

### Streams en Java 8 y cómo se utilizan

Los streams en Java 8 son una forma de procesar colecciones de objetos de manera declarativa y funcional. Los streams permiten realizar operaciones como filtrar, mapear y ordenar datos de manera eficiente y sin tener que escribir bucles. Aquí hay un ejemplo de cómo utilizar un stream para filtrar una lista de números y luego calcular la suma de los elementos que cumplen con el filtro:

{{< highlight java "linenos=table" >}}
List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

int suma = numeros.stream()
                .filter(n -> n % 2 == 0)
                .mapToInt(Integer::intValue)
                .sum();

System.out.println(suma); // imprime "30"
{{< /highlight >}}

### Diferencia entre una interfaz y una clase abstracta en Java

Una **interfaz** en Java es una colección de métodos abstractos y constantes. Una clase abstracta, por otro lado, puede tener métodos concretos y no concretos y puede tener campos de instancia. Una clase abstracta se utiliza cuando se desea proporcionar una implementación común para un conjunto de subclases relacionadas, mientras que una interfaz se utiliza para proporcionar una funcionalidad común a clases no relacionadas. Aquí hay un ejemplo de una interfaz y una clase abstracta en Java:

{{< highlight java "linenos=table" >}}
public interface Calculadora {
    double calcular(double num1, double num2);
}

public abstract class Operacion implements Calculadora {
    public double calcular(double num1, double num2) {
        double resultado = realizarOperacion(num1, num2);
        return resultado;
    }

    protected abstract double realizarOperacion(double num1, double num2);
}

public class Suma extends Operacion {
    protected double realizarOperacion(double num1, double num2) {
        return num1 + num2;
    }
}
{{< /highlight >}}

### Sobrecarga de métodos en Java y cómo funciona

La **sobrecarga** de métodos en Java se produce cuando hay varios métodos con el mismo nombre en una clase, pero con diferentes parámetros. Esto permite que los métodos realicen diferentes operaciones en función de los argumentos que se les pasan. Aquí hay un ejemplo de sobrecarga de métodos en Java:

{{< highlight java "linenos=table" >}}
public class Calculadora {
    public int sumar(int num1, int num2) {
        return num1 + num2;
    }

    public int sumar(int num1, int num2, int num3) {
        return num1 + num2 + num3;
    }
}
{{< /highlight >}}

### Generics en Java

Los **generics** en Java permiten que las clases, interfaces y métodos puedan ser parametrizados con un tipo de datos. Esto permite que el código sea más genérico y reutilizable. Aquí hay un ejemplo de cómo utilizar los generics en una clase en Java:

{{< highlight java "linenos=table" >}}
public class Lista<T> {
    private List<T> elementos = new ArrayList<>();

    public void agregar(T elemento) {
        elementos.add(elemento);
    }

    public T obtener(int indice) {
        return elementos.get(indice);
    }
}
{{< /highlight >}}

### Reflection en Java

La **reflexión** en Java se refiere a la capacidad de un programa para examinar y modificar su propia estructura y comportamiento en tiempo de ejecución. En otras palabras, la reflexión permite que un programa inspeccione objetos, clases y métodos, así como también modifique sus propiedades y comportamientos en tiempo de ejecución. Aquí hay un ejemplo de cómo utilizar la reflexión para obtener información sobre los campos de una clase en Java:

{{< highlight java "linenos=table" >}}
public class Persona {
    private String nombre;
    private int edad;

    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    public String getNombre() {
        return nombre;
    }

    public int getEdad() {
        return edad;
    }
}

public class Main {
    public static void main(String[] args) throws NoSuchFieldException {
        Persona persona = new Persona("Juan", 25);
        Class clasePersona = persona.getClass();

        Field[] campos = clasePersona.getDeclaredFields();
        for (Field campo : campos) {
            System.out.println(campo.getName());
        }
    }
}
{{< /highlight >}}

Este ejemplo utiliza la reflexión para obtener información sobre los campos de la clase Persona. Se utiliza el método `getClass()` para obtener el objeto **Class** que representa la clase de la instancia persona. Luego se utiliza el método `getDeclaredFields()` para obtener un arreglo de los campos de la clase. Finalmente, se itera sobre el arreglo de campos y se imprime el nombre de cada campo en la consola.


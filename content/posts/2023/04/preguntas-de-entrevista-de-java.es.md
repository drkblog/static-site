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

 Los **generics** de Java son una característica del lenguaje que permiten la creación de clases, interfaces y métodos que pueden trabajar con diferentes tipos de datos de manera segura y eficiente. La idea detrás de los generics es proporcionar una forma de parametrizar clases, interfaces y métodos con tipos de datos reales, sin tener que crear una versión diferente de la clase o el método para cada tipo posible.

En Java, los generics se implementan utilizando parámetros de tipo, que se definen entre corchetes angulares (< y >). Estos parámetros de tipo pueden ser cualquier identificador válido, como T, E, K o V, y se utilizan para especificar el tipo de dato que se utilizará en la clase, interfaz o método. Por ejemplo:

{{< highlight java "linenos=table" >}}
public class MiLista<T> {
    private T[] elementos;

    public MiLista(T[] elementos) {
        this.elementos = elementos;
    }

    public T get(int indice) {
        return elementos[indice];
    }

    public void set(int indice, T elemento) {
        elementos[indice] = elemento;
    }
}
{{< /highlight >}}

En este ejemplo, la clase **MiLista** utiliza un parámetro de tipo T para especificar el tipo de datos que se almacenarán en la lista. El constructor de la clase toma un arreglo de tipo T como parámetro y lo almacena en un campo de la clase. Los métodos `get` y `set` también utilizan el parámetro de tipo T para trabajar con elementos de la lista.

Una de las ventajas de los generics es que proporcionan una forma segura de trabajar con diferentes tipos de datos, ya que el compilador de Java puede verificar que se utilice el tipo correcto en cada lugar donde se utiliza el parámetro de tipo. Además, los generics pueden mejorar la legibilidad del código y reducir la cantidad de código repetitivo, ya que no es necesario crear una versión separada de una clase o método para cada tipo posible.

Los generics se utilizan ampliamente en las colecciones de Java, como `ArrayList`, `HashMap` y `LinkedList`, así como en muchas otras partes del lenguaje, como los tipos de retorno genéricos de los métodos, las interfaces genéricas y los límites de tipo. En general, los generics son una característica importante de Java que pueden mejorar la seguridad, la eficiencia y la legibilidad del código.

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


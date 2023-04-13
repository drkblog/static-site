---
title: Clase sellada en Java
description: Uso de clase sellada en Java
author: Leandro Fernandez
type: post
date: 2023-04-13
slug: clase-sellada-en-java
cover: "/logo/java.png"
categories:
  - Programación
tags:
  - programación
  - java
---

La **clase sellada** (_Sealed Class_) es una característica introducida en Java 15 y posteriormente mejorada en Java 17. Una clase sellada es una clase que tiene restricciones en la jerarquía de clases y controla qué clases pueden extender o implementar una clase sellada.

Para definir una clase sellada, se utiliza la palabra clave "_sealed_" antes de la definición de la clase, seguida de la palabra clave "_permits_" y la lista de clases permitidas para extender o implementar la clase sellada. Por ejemplo:

{{< highlight java "linenos=table" >}}
public sealed class Shape permits Circle, Square, Triangle {
    // ...
}
{{< /highlight >}}

En este ejemplo, la clase "_Shape_" es sellada y permite que las clases "_Circle_", "_Square_" y "_Triangle_" la extiendan o la implementen. Cualquier otra clase que intente extender o implementar la clase "Shape" dará como resultado un error de compilación.

Además, para extender o implementar una clase sellada, las clases permitidas deben cumplir con ciertas restricciones. Se pueden especificar estas restricciones utilizando la palabra clave "non-sealed" seguida de la definición de la clase. Por ejemplo:

{{< highlight java "linenos=table" >}}
public non-sealed class Circle extends Shape {
    // ...
}
{{< /highlight >}}

En este ejemplo, la clase "_Circle_" extiende la clase sellada "_Shape_", pero se declara como no sellada, lo que significa que cualquier clase puede extender la clase "_Circle_".

Un beneficio de las clases selladas es que pueden ser utilizadas en lugar del patrón de fábrica, ya que las restricciones en la jerarquía de clases permiten una mejor encapsulación. Por ejemplo:

{{< highlight java "linenos=table" >}}
public sealed class Shape permits Circle, Square, Triangle {
    public static Shape create(String shapeType) {
        if (shapeType.equals("Circle")) {
            return new Circle();
        } else if (shapeType.equals("Square")) {
            return new Square();
        } else if (shapeType.equals("Triangle")) {
            return new Triangle();
        } else {
            throw new IllegalArgumentException("Invalid shape type: " + shapeType);
        }
    }
}
{{< /highlight >}}

En este ejemplo, la clase sellada "_Shape_" tiene un método de fábrica que crea objetos de las clases permitidas. Esto proporciona una mejor encapsulación, ya que no se puede crear un objeto de una clase que no esté permitida para extender o implementar la clase sellada.

## Nuevo en Java 17

Java 17 es la última versión de Java SE (Standard Edition) lanzada en septiembre de 2021. Esta versión presenta varias nuevas características y mejoras, algunas de las cuales se enumeran a continuación:

Cambios en el modelo de lanzamiento: Java 17 presenta un nuevo modelo de lanzamiento a largo plazo (LTS) que proporciona soporte a largo plazo (hasta 17 años) para cada versión LTS de Java. También hay un nuevo modelo de lanzamiento de corto plazo (STS) que se lanzará cada seis meses.

Patrones de coincidencia de instancias: Java 17 introduce la sintaxis de patrones de coincidencia de instancias, que permite a los desarrolladores realizar coincidencias de patrones y extracciones de datos en una sola declaración.

Mejoras en la memoria: Java 17 presenta varias mejoras en la gestión de la memoria, incluyendo una nueva opción de línea de comandos (-XX:SoftMaxHeapSize) que permite especificar un límite suave en la cantidad máxima de memoria de heap.

Soporte de Clase Sellada: Java 17 presenta una nueva característica llamada Clase Sellada, que permite a los desarrolladores restringir la jerarquía de clases y controlar qué clases pueden extender o implementar una clase.

Mejoras en la seguridad: Java 17 presenta varias mejoras de seguridad, incluyendo la eliminación de la herramienta "keytool -keypasswd", la eliminación de la compatibilidad con el cifrado RSA de 1024 bits, y la eliminación de la compatibilidad con el protocolo TLS 1.0 y 1.1.

Mejoras en el rendimiento: Java 17 incluye varias mejoras en el rendimiento, incluyendo la mejora del rendimiento de la biblioteca de subprocesos paralelos de Java (JEP 387), y la implementación de nuevas optimizaciones para la interpretación de código.

Mejoras en el soporte de archivos JAR: Java 17 presenta mejoras en el soporte de archivos JAR, incluyendo la eliminación de la restricción que limita el número de entradas de archivos JAR.
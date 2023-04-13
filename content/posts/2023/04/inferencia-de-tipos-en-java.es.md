---
title: Inferencia de tipos en Java
description: Uso de var en Java para inferencia de tipos
author: Leandro Fernandez
type: post
date: 2023-04-12
slug: inferencia-de-tipos-en-java
cover: "/logo/java.png"
categories:
  - Programación
tags:
  - programación
  - java
---

La palabra reservada `var` se utiliza para declarar variables locales de forma simplificada, utilizando la inferencia de tipos. La inferencia de tipos es un proceso en el cual el tipo de datos de una variable se determina automáticamente en tiempo de compilación en función del valor que se le asigna.

Antes de la introducción de la palabra reservada `var`, los desarrolladores de Java tenían que declarar explícitamente el tipo de datos de una variable local. Por ejemplo, para declarar una variable de tipo String, se utilizaba la siguiente sintaxis:

{{< highlight java "linenos=table" >}}
String myString = "Hello World";
{{< /highlight >}}

Con la palabra reservada `var`, la sintaxis se simplifica y se utiliza la inferencia de tipos para determinar automáticamente el tipo de datos de la variable. Por ejemplo:

{{< highlight java "linenos=table" >}}
var myString = "Hello World";
{{< /highlight >}}

En este caso, el compilador determina que la variable `myString` es de tipo String, basándose en el valor que se le asigna ("Hello World").

Es importante tener en cuenta que la palabra reservada `var` solo se puede utilizar para declarar variables locales y no puede utilizarse para declarar variables de instancia, parámetros de métodos, variables de clase, etc. Además, la inferencia de tipos no significa que la variable sea de tipo Object, sino que el compilador determina el tipo de datos más específico posible que se adapte al valor asignado.

## Nuevo en Java 11

Java 11 es una versión importante de **Java SE** (_Standard Edition_) que fue lanzada en septiembre de 2018. Algunas de las nuevas características de Java 11 incluyen:

Módulos: Java 11 presenta la funcionalidad de módulos, que permite a los desarrolladores dividir sus aplicaciones en componentes más pequeños y separados, lo que ayuda a simplificar el mantenimiento y mejorar la seguridad.

HTTP Client: Java 11 incluye un cliente HTTP nativo y de alto rendimiento que permite a los desarrolladores enviar solicitudes HTTP de forma síncrona o asíncrona, lo que hace que el proceso de comunicación con otros servicios web sea más eficiente.

Depreciación de Java EE y CORBA: Java 11 ha eliminado las tecnologías Java EE y CORBA, lo que significa que estas tecnologías ya no están disponibles en Java 11.

ZGC (Z Garbage Collector): Java 11 presenta un nuevo recolector de basura experimental llamado ZGC que puede manejar grandes conjuntos de datos de memoria de forma más eficiente y con menos tiempo de inactividad.

Varibles locales con inferencia de tipo: Ahora, en Java 11, los desarrolladores pueden utilizar la palabra clave "var" para declarar variables locales en lugar de tener que especificar explícitamente el tipo de la variable. La inferencia de tipo permite un código más conciso y legible.

Epsilon GC: Java 11 también incluye un nuevo recolector de basura experimental llamado Epsilon GC, que es un recolector de basura sin memoria que se utiliza para pruebas y pruebas de rendimiento.

TLS 1.3: Java 11 incluye soporte para la última versión del protocolo de seguridad de transporte, TLS 1.3, que mejora la seguridad de las conexiones en línea.
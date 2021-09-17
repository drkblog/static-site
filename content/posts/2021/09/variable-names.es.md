---
title: Cómo nombrar las variables y los atributos
description: Por qué es necesario utilizar nombres de variables y atributos adecuados
author: Leandro Fernandez
type: post
date: 2021-09-17
cover: "/2021/09/variable-names.png"
categories:
  - Programación
tags:
  - legibilidad
  - código limpio
  - java
draft: true
---

Cuando escribimos código debemos contemplar que vamos a leerlo muchas veces después. Y seguramente no seamos las únicas personas que leerán ese código. Por lo que asegurarnos de que sea fácil de leer y comprender es de suma importancia. Nos ahorrará muchísimo tiempo en el futuro. Y reducirá las probabilidades de que se introduzcan errores.

Los atributos y variables que utilizamos en nuestro código están destinados a guardar algún valor que tiene sentido dentro de la lógica del método, función o clase en la que se encuentran. Su nombre tiene que describir el valor que guardarán. No tiene que describir otras cosas, como el tipo de dato (en especial en lenguajes fuertemente tipados), ni el alcance o el use que le damos a la variable o atributo. Mucho menos debe tener un nombre críptico que no nos da ningún tipo de información.

Respetar esta simple guía nos permite escribir código mucho más limpio, claro y legible. Porque estamos hablando de la diferencia entre `foo` y `precioPromedio`.

> Si bien cada lenguaje tiene su propio estilo recomendado. Todos nos permiten de alguna manera escribir nombres descriptivos. En **Java** es _lower camel case_, pero también se puede utilizar _snake case_ como en **C** y otros lenguajes, lo que quedaría `precio_promedio`.

{{< highlight java "linenos=table" >}}
int a = 1;
int b = 1;
int c = 2;

System.out.println(a == b);
System.out.println(a == c);
{{< /highlight >}}
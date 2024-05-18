---
title: Por qué existen las excepciones en Java
description: La lógica detrás de la forma en que se manejan los errores en Java
author: Leandro Fernandez
type: post
date: 2024-05-17
slug: por-que-existen-las-excepciones-en-java
# cover: "/2023/09/redflag.jpg"
categories:
  - Programación
tags:
  - programación
  - java
---

> Lenguajes anteriores a **Java**, como por ejemplo **C** y **PASCAL**, no tenían el concepto de __excepción__. Si una función encontraba una situación de error simplemente retornaba un valor específico para indicarlo.

De esta forma, la función `open()` intenta abrir un archivo y retorna un entero que representa el _file descriptor_ del sistema operativo para el mismo.

{{< highlight c "linenos=table" >}}
  ...
  int fd;

  // Intentamos abrir un archivo
  fd = open("example.txt", O_RDONLY);
  
  // Comprobamos si ha habido un error
  if (fd == -1) {
      // Si fd es -1, ha ocurrido un error al intentar abrir el archivo
      perror("Error al abrir el archivo");
      return 1;
  }

  // Aquí iría el código para trabajar con el archivo
  ...
{{< /highlight >}}

En la línea 8 el código imprime información a la salida de error si el valor del _file descriptor_ (guardado en la variable `fd`) es **-1**. Los file descriptors del sistema operativo está representados por enteros positivos. Por lo que el autor de la función decidió usar el **-1** para retornar un valor del tipo correcto según la declaración de la función. Pero que sirva para indicarle al código que llamó a `open()` que la apertura falló. Por tratarse C de un lenguaje fuertemente tipado, no se puede retornar otro tipo para indicar el error. Es decir, no se podría retornar un `boolean` o `null` aún si esos tipos existieran en C. 

Si bien esto funciona y el lenguaje fue utilizado por décadas e incluso en el actualidad, esta práctica tiene algunos problemas:

🚩 Si nuestra función necesita poder retornar (potencialmente) todos los valores enteros como resultados correctos, no quedaría un valor de retorno libre para indicar el error.

{{< highlight c "linenos=table" >}}
  ...
  unsigned int file_size(const char * path) {
    ...
  }
  ...
{{< /highlight >}}

Una función declarada como `file_size()` en este ejemplo tendría dificultades para indicar, por ejemplo, que el archivo no fue encontrado o no se pudo leer.

Este es el problema con el que todo programador de C se encontró muchas veces. Pero hay más.

🚩 Como la forma de indicar el error estaba supeditada a encontrar un valor que estuviera fuera del universo válido de retorno, distintas funciones (incluso del mismo autor) utilizaban diferentes valores para indicar el error. Haciendo el uso de las mismas propenso a errores debido a la falta de consistencia. 

🚩 Además, con suerte era posible indicar que hubo un error. Prácticamente era imposible pasar información detallada sobre el error. A menos que se recurriera a estructuras de datos adicionales.

🚩 Si una función encontraba una situación de error tenía que retornar a su vez un valor que indicase el error hace afuera de la misma. Si ya era difícil detallar un error, mucho más lo era poder propagar ese error hacia las capas superiores a la vez que se agregara información.

## Excepciones

Las excepciones en **Java** permite resolver todos estos problemas.

{{< highlight c "linenos=table" >}}
public int divide(int a, int b) throws ArithmeticException {
    if (b == 0) {
        throw new ArithmeticException("División por cero");
    }
    return a / b;
}

public void performDivision() {
    try {
        int result = divide(10, 0);
        System.out.println("Resultado: " + result);
    } catch (ArithmeticException e) {
        System.out.println("Error: " + e.getMessage());
    }
}
{{< /highlight >}}

En la línea 2 la función `divide()` verifica que no se intente dividir por cero. Y si ese es el caso, en la línea 3 lanza una excepción. Esto corta el flujo y la línea 5 ya no se ejecuta. La función no retorna y por lo tanto tampoco se completa la ejecución de la línea 10. El flujo del programa pasa a la línea 13 directamente.

En el bloque _catch_ correspondiente tenemos una variable `e` con la información de detalle del error. Que puede ser tan compleja como haga falta. Esto permite comunicar mucho mejor la situación a la que se llegó.

Se pueden poner distintos bloques _catch_ para distintos tipo de excepción. De forma que es muy fácil escribir código especializado para tratar distintos tipos de problema.

Y como las excepciones son clases es posible crear los tipos que sean necesarios. Y a su vez reutilizar estos tipos en distintas partes del código. Es decir, se puede usar la `FileNotFoundException` exception en cualquier lugar donde se necesite expresar que un archivo no pudo encontrarse.

Las excepciones además pueden "burbujuearse" hacia las capas superiores sin demasiada complejidad. Esto permite escribir código en una capa superior. Y tratar excepciones con esa lógica independientemente de dónde venga la misma.

> Como lectura complementaria se recomienda entender la diferencia entre Checked y Non-Checked exceptions.



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
---

Cuando escribimos código debemos contemplar que vamos a leerlo muchas veces después. Y seguramente no seamos las únicas personas que leerán ese código. Por lo que asegurarnos de que sea fácil de leer y comprender es de suma importancia. Nos ahorrará muchísimo tiempo en el futuro. Y reducirá las probabilidades de que se introduzcan errores.

Los atributos y variables que utilizamos en nuestro código están destinados a guardar algún valor que tiene sentido dentro de la lógica del método, función o clase en la que se encuentran. Su nombre tiene que describir el valor que guardarán. No tiene que describir otras cosas, como el tipo de dato (en especial en lenguajes fuertemente tipados), ni el alcance o el use que le damos a la variable o atributo. Mucho menos debe tener un nombre críptico que no nos da ningún tipo de información.

Respetar esta simple guía nos permite escribir código mucho más limpio, claro y legible. Porque estamos hablando de la diferencia entre `foo` y `precioPromedio`.

> Si bien cada lenguaje tiene su propio estilo recomendado. Todos nos permiten de alguna manera escribir nombres descriptivos. En **Java** es _lower camel case_, pero también se puede utilizar _snake case_ como en **C** y otros lenguajes, lo que quedaría `precio_promedio`.

Tomemos el siguiente segmento de código en **Java**. Para quienes conozcan el lenguaje aclaro que la anotación `@Value` es de [Lombok]( {{< relref path="/content/posts/2020/09/escribir-menos-codigo-y-mas-legible.es.md" lang="es" >}}) y nos provee constructores y getters. Para los que no conoce Java pero sí algún lenguaje con sintaxis similar será posible tener una idea de lo que se intenta hacer ya que el código no es muy complicado. Y aclararé luego las partes menos intuitivas. Lo importante es que nos tomemos unos minutos para leerlo y tratar de entender qué ocurre ahí:

{{< highlight java "linenos=table" >}}
    @Value
    class User {
        final String n;
        final int a;
    }

    public int ca(final List<User> us) {
        int a = 0;
        int c = 0;
        for (User u : us) {
            a += u.getA();
            c++;
        }
        return a/c;
    }
{{< /highlight >}}

Quienes puedan entender el código de arriba pueden saltear este párrafo. El código declara una clase `User` con dos atributos, uno de tipo cadena de text y el otro entero llamados `n` y `a` respectivamente. Este clase tiene getters para acceder a los atributos definidos por la anotación de la línea 1. Y podemos ver que se utiliza el _getter_ par obtener el atributo `a` en la línea 11. Luego tenemos un método llamado `ca` que recibe una lista de objetos de tipo `User` llamada `us` y luego define dos variables enteras `a` y `c` respectivamente. En la línea 10 hay un bucle que iterará todos los elementos de la lista. Por cada elemento se suma el valor retornado por el _getter_ del atributo `a` en la variable `a`. Y se incrementa la variable `c` en uno. Finalmente se retorna la división entera de `a` en `c`.

Seguramente tendremos distintas opiniones pero en general este código se puede entender después de analizarlo un poco. No es imposible. Sin embargo nunca será más claro que la versión del mismo código que pondremos a continuación donde se hizo un renombrado de atributos, argumentos y variables:

{{< highlight java "linenos=table" >}}
    @Value
    static class User {
        final String name;
        final int age;
    }

    public int calculateAgeAverage(final List<User> userList) {
        int accumulatedAge = 0;
        int userCount = 0;
        for (User user : userList) {
            accumulatedAge += user.getAge();
            userCount++;
        }
        return accumulatedAge/userCount;
    }
{{< /highlight >}}

Por empezar pusimos un nombre descriptivo al método que ahora nos dice claramente qué hace. La traducción literal es **calcular edad promedio**. Aunque esto lo veremos en otro artículo sobre código limpio, aquí podemos ver la ganancia de este cambio de todas formas. Ya no tengo que leer el cuerpo del método para saber cual es su función o intención. Ya sé que va a calcular la edad promedio de los usuarios que reciba en la lista. Y ni siquiera necesito documentar esto. Su nombre y el argumento que recibe, combinados, no dejan lugar a dudas.

Por otro lado ahora los atributos de la clase `User` se llaman `name` y `age` dejando claro que representan el nombre y la edad del usuario respectivamente. Dentro del cuerpo del método las variables tienen los nombres **edad acumulada** y **cantidad de usuarios** respectivamente. No necesitamos ver cómo se usan en las líneas subsiguientes para saber qué información se guardará en ella. Y de hecho al leer las líneas 20 y 21 corroboramos que ese uso tiene sentido según el nombre de las variables ya que en la primera se acumula la edad de cada usuario y en la segunda se incrementa el valor en uno por cada usuario procesado. Lo que implica que al final tendrá como valor la cantidad de usuarios en la lista. Sí, nos podríamos haber ahorrado ese contador ya que la lista de Java me puede decir la cantidad de elementos directamente. 

Y por último se calcula la división del acumulado de edades sobre la cantidad de usuarios. Que es justamente cálculo del promedio de una cantidad arbitraria de valores.

Es imposible negar cuanto más rápido se puede entender el código sólo por haber utilizado nombres descriptivos en las variables, atributos, argumentos, nombres de clases y métodos. El código legible no necesita documentación. Imaginemos el código que llama al método que calcula el promedio tanto para el primer como el segundo ejemplo.

{{< highlight java "linenos=table" >}}
...
// Calculate user age average
obj.ca(ul);
...
obj.calculateAgeAverage(users);
...
{{< /highlight >}}

De nuevo la ganancia salta a la vista. Una regla general para saber si nuestro código es legible es detectar comentarios que explican lo que hace el código. En principio el código no debería tener comentarios. Pero si los tiene sólo deberían explicar el por qué y no el qué. Está bien que ponga un comentario explicando por qué necesito calcular el promedio de las edades. Pero no está bien que tenga que comentar que estoy haciendo ese cálculo. Lo que el código hace debe estar claro al leer el código.
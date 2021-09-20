---
title: Por qué hay que evitar usar literales en el código
description: Por qué es necesario reemplazar los literales en el código con constantes
author: Leandro Fernandez
type: post
date: 2021-09-20
cover: "/2021/09/literals.png"
categories:
  - Programación
tags:
  - legibilidad
  - código limpio
  - java
  - javascript
---

Cuando escribimos código debemos contemplar que vamos a leerlo muchas veces después. Y seguramente no seamos las únicas personas que leerán ese código. Por lo que asegurarnos de que sea fácil de leer y comprender es de suma importancia. Nos ahorrará muchísimo tiempo en el futuro. Y reducirá las probabilidades de que se introduzcan errores.

Cuando decimos que no hay que usar valores literales en el código nos referimos a que no hay que usarlos directamente en las llamadas a funciones o métodos. Es muy común que necesitemos utilizar legítimamente valores literales. Pero si los escribimos directamente cuando llamamos a una función el código se hace menos legible. Porque el lector no necesariamente sabe por qué pusimos ese literal. Además es muy probable que terminemos escribiendo el mismo literal más de una vez. Y eso es mucho peor porque implica que mantener ese código es más costoso y riesgoso: en una actualización del valor puedo olvidarme de actualizar una de las copias.

> Es importante remarcar que sólo debemos usar literales cuando sabemos que ese valor no tiene chances de cambiar durante el ciclo de vida de nuestra aplicación. O es un valor que por algún motivo sólo queremos que cambie cuando volvemos a compilar el código. En el resto de los casos, de ser posible, hay que utilizar variables cuyos valores vengan desde el sistema de configuración del programa.

En el siguiente extracto de **Javascript** utilizamos dos literales. En ambos casos los pasamos directo a funciones como argumentos. De hecho se necesita un comentario en la línea 3 para aclarar qué es el `5000`.

{{< highlight javascript "linenos=table" >}}
const controller = new AbortController()

// 5 second timeout:
const timeoutId = setTimeout(() => controller.abort(), 5000)

fetch("https://www.drk.com.ar/verification", { signal: controller.signal }).then(response => {
...
})
{{< /highlight >}}

Este código será más legible si utilizamos constantes para esos literales de la siguiente manera:

{{< highlight javascript "linenos=table" >}}
const five_seconds = 5000
const verification_url = "https://www.drk.com.ar/verification"

const controller = new AbortController()

const timeoutId = setTimeout(() => controller.abort(), five_seconds)

fetch(verification_url, { signal: controller.signal }).then(response => {
...
})
{{< /highlight >}}

Ahora pudimos deshacernos del comentario ya que está claro que el tercer argumento representa cinco segundos. Al poner una constante para la URL hacemos que la línea 8 quede más corta. Y las URLs suelen ser utilizadas en más de un lugar de una aplicación así que prevenimos que se duplique el literals. Por supuesto, todas las secciones que lo quiera usar deberán tener acceso a la constante.

Algo similar se puede hacer utilizando tipos especiales en algunos lenguajes que nos permiten ser más verborrágicos a la hora de especificar un valor para ellos. En Java podemos usar el tipo `Period` para guardar un período de tiempo (usualmente de días o unidades mayores). Y se prefiere ese tipo a guardar un entero del que implícitamente sabemos la unidad.

{{< highlight java "linenos=table" >}}
class Course {
    private String name;
    private String teacher;
    private int duration;
}
...
new Course("Algorithms", "John Doe", 90);
{{< /highlight >}}

Al ver el código de arriba nos vamos a preguntar en qué unidad de tiempo se está guardando la duración del curso. Es muy posible que se terminen agregando comentarios para aclararlo. Pero los comentarios pueden no estar, pueden no actualizarse cuando se hacen cambios, no son ideales. En esos casos podemos reemplazar el entero por el tipo `Period`:

{{< highlight java "linenos=table" >}}
class Course {
    private String name;
    private String teacher;
    private Period duration;
}
...
new Course("Algorithms", "John Doe", Period.ofDays(90));
{{< /highlight >}}

Aquí independizamos el atributo de la unidad de tiempo porque ahora la unidad está resuelta por el propio tipo. En al inicialización no hay dudas de que estamos hablando de 90 días. Y luego, en el uso, podemos pedirle al objeto que nos dé el tiempo que representa en la unidad que más nos guste.

{{< highlight java "linenos=table" >}}
class Course {
    private String name;
    private String teacher;
    private Period duration;
}
...
course.getDuration().getMonths();
{{< /highlight >}}
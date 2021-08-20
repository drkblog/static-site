---
title: Jugando con threads en C++11
author: Leandro Fernandez
type: post
date: 2015-09-13T19:44:24+00:00
featured_image: http://blog.drk.com.ar/wp-content/uploads/2015/09/threads.png
categories:
  - Programación
tags:
  - C/C++
  - concurrencia
  - featured
  - mutex
  - thread

---
<div class="wp-block-columns">
  <div class="wp-block-column" style="flex-basis:66.66%">
    <p>
      Una buena noticia de C++11 es que se incorporó la biblioteca <strong>pthreads</strong> al nuevo estándar. Esto quiere decir que ya no es necesario implementar un encapsulamiento propio como hacíamos algunos años atrás. Este artículo (breve) ilustra el uso de la nueva clase <strong>threads</strong> y permite jugar un poco con el comportamiento del multitasking para comprender algunas particularidades que debemos tener en cuenta a la hora de crear aplicaciones concurrentes.
    </p>
  </div>
  
  <div class="wp-block-column" style="flex-basis:33.33%">
    <blockquote class="wp-block-quote">
      <p>
        Si te interesa este artículo te recomiendo leer también <a href="https://blog.drk.com.ar/2020/problema-de-redondeo-con-float-en-golang" data-type="post" data-id="2553">esta nota sobre problemas con float en Golang</a>. Cuyos conceptos también aplican a C++.
      </p>
    </blockquote>
  </div>
</div>

El siguiente programa crea dos hilos de ejecución, los objetos _t1_ y _t2_ del tipo **std::thread,** y pasa un puntero a función con argumentos utilizando la función **std::bind**. Cada llamada a función se ejecutará en un hilo de ejecución separado. Aunque la función es la misma, cada llamada recibe uno de los dos vectores _even_ y _odd_. Dentro de _f()_ hay un **std::mutex** declado&nbsp;_static_, por lo que todas las llamadas a _f()_ comparten el mismo objeto _m_ y esto permite sincronizar la escritura a salida estándar a través de las distintas llamadas. Luego de crear los objetos, la función _main()_ espera la finalización de cada hilo llamando al método _join()_. El constructor de la clase **std::thread** lanza el hilo sin necesidad de más interacción desde la función que lo crea. &nbsp;Finalmente la función _f()_ itera el vector e imprime un elemento por línea, a salida estándar.

<!--more-->

{{< highlight cpp >}}
#include&lt;iostream>
#include&lt;vector>
#include&lt;thread>
 
void f(std::vector&lt;int>& v);
 
int main()
{
  std::vector&lt;int> even = {0, 2, 4, 6, 8};
  std::vector&lt;int> odd = {1, 3, 5, 7, 9};
 
  /* Lanza dos threads */
  std::thread t1{std::bind(f, even)};
  std::thread t2{std::bind(f, odd)};
 
  /* Espera que finalicen */
  t1.join();
  t2.join();
}
 
 
void f(std::vector&lt;int>& v) {
  /* Este mutex será compartido por todas las llamadas
   * a f() y servirá para atomizar la salida a stdout
   */
  static std::mutex m;
 
  /* Imprime cada elemento */
  for (std::vector&lt;int>::iterator it = v.begin();
        it != v.end();
        ++it) {
    m.lock();
    std::cout &lt;&lt; *it &lt;&lt; std::endl;
    m.unlock();
  }
}
{{< / highlight >}}

IMPORTANTE: El código usa un objeto en una variable estática dentro de _f()_. Este objeto se inicializa en la primera llamada a la función, en tiempo de ejecución. En programas con concurrencia es un poco difícil determinar cuándo ocurrirá eso. Ambos hilos podría lanzarse a (casi) el mismo tiempo y la inicialización de m podría correr dos veces o un hilo podría usar _m_ cuando no está inicializado completamente. El compilador GCC por defecto agrega el código necesario para asegurara una inicialización thread-safe para estas variables. En otros compiladores podría ser necesario que el thread sea global o sea pasado a la función _f()_ para segurar que su inicialización no corre riesgos.

Al compilar y ejecutar el programa _obtuve_ el siguiente resultado:

{{< highlight generic >}}
$ g++ -std=c++0x -pthread nosleep.cc -o nosleep
$ ./nosleep
0
2
4
6
8
1
3
5
7
9
{{< / highlight >}}

Antes de ver qué ocurrió es necesario destacar que esta salida puede o no variar a lo largo de distintas ejecuciones en mi equipo. Y a lo largo de ejecuciones en otros equipos con distinto hardware y sistemas operativos. Por lo que si el lector ejecutó el programa y obtuvo una salida distinta no debe alarmarse.

En este caso podemos ver que el hilo creado por t1 se ejecutó primero y finalizó antes del hilo creado por t2. Pero de ninguna manera podemos suponer o esperar que esto se repita si ejecutamos nuevamente el programa. O si lo hacemos en un equipo con un procesador distinto. Tras realizar varios intentos obtuve esta salida:

{{< highlight shell >}}
$ ./nosleep
0
2
1
3
5
7
9
4
6
8
{{< / highlight >}}

Es posible que en un equipo determinado el comportamiento a lo largo de las ejecuciones del mismo binario se mantengan mucho más estable y sea muy difícil encontrar una variación como esta. El equipo que usé tiene un procesador **AMD A4-5300 APU dual core**. Tener más de una CPU o tener CPU multicore normalmente agrega diferencias sustanciales en el comportamiento del código que utiliza concurrencia. Además de factores fijos como el hardware y el sistema operativo, la carga de trabajo actual del equipo también puede afectar los el orden de los eventos en la línea de tiempo. El mejor consejo para quien va a programar aplicaciones con más de un hilo de ejecución es: **no asumir nada**. No asumir que un hilo se lanzará inmediatamente, por ejemplo es un error creer que cuando se comienza a ejecutar la línea 14, ya comenzó la ejecución del hilo _t1_. Es posible que no se haya iniciado, que sí se haya iniciado, o incluso que ya haya finalizado por completo. También podría ocurrir que ninguno de los dos hayan comenzado su ejecución cuando el hilo principal llega a la línea 17. En efecto, aunque resulte obvio, las llamadas a _join()_ de cada hilo está para asegurar que ambos hilos finalicen antes de que se termine la ejecución de la función _main()_. Sin esto, podría ocurrir que el proceso sea terminado por el sistema operativo antes de que termine uno o ambos hilos.

Con una modificación al código presentado anteriormente podríamos intentar que la salida contenga en forma alternada los elementos impresos por cada hilo. No ahorraré en advertencias, esto puede o no funcionar por todo lo expuesto anteriormente. En un equipo multicore o multicpu es mucho más probable que funcione, en especial si no hay otras tareas que consuman mucha CPU ejecutándose.

{{< highlight cpp >}}
#include&lt;iostream>
#include&lt;vector>
#include&lt;thread>
 
void f(std::vector&lt;int>& v);
 
int main()
{
  std::vector&lt;int> even = {0, 2, 4, 6, 8};
  std::vector&lt;int> odd = {1, 3, 5, 7, 9};
 
  /* Lanza dos threads con diferencia de 500ms */
  std::thread t1{std::bind(f, even)};
  usleep(500000);
  std::thread t2{std::bind(f, odd)};
 
  /* Espera que finalicen */
  t1.join();
  t2.join();
}
 
 
void f(std::vector&lt;int>& v) {
  /* Este mutex será compartido por todas las llamadas
   * a f() y servirá para atomizar la salida a stdout
   */
  static std::mutex m;
 
  /* Imprime cada elemento y espera un segundo después
   * de liberar el mutex
   */
  for (std::vector&lt;int>::iterator it = v.begin();
        it != v.end();
        ++it) {
    m.lock();
    std::cout &lt;&lt; *it &lt;&lt; std::endl;
    m.unlock();
    sleep(1);
  }
}
{{< / highlight >}}

Se agregó una llamada a _usleep()_ para forzar una diferencia de (al menos) 500 milisegundos entre la creación de objeto **std::thread** con la esperanza de que el arranque de cada hilo ocurra cerca (en el tiempo) de la ejecución de las líneas 13 y 15. Y se agregó una pausa de al menos un segundo posterior a la impresión de cada elemento. En mi caso la salida es:

{{< highlight generic >}}
$ g++ -std=c++0x -pthread sleep.cc -o sleep
$ ./sleep
0
1
2
3
4
5
6
7
8
9
{{< / highlight >}}

Otro detalle imporante a tener en cuenta es que la aparición de los elementos en pantalla, que en este ejemplo ocurre a una velocidad perceptible por el ojo humano, no es necesariamente una indicación de la ocurrencia en el tiempo de la llamadas a **std::cout**. La salida tiene un _buffer_ por lo que varios envíos distintos pueden aparecer en lo que el humano interpreta como un evento atómico.

A partir de este ejemplo el lector puede realizar sus propias modificaciones para estudiar el comportamiento de los hilos. Y, de tener la posibilidad, puede llevar el código a distinto tipo de hardware para comprobar las variaciones. Aunque pueda parece un poco tonto, experimentar esta realidad con un código ultra simple puede ser una inversión de tiempo. Y sus frutos, ahorrarse el indecible sufrimiento que puede implicar lanzarse a la programación de una aplicación con concurrencia si entender qué es lo que ocurre realmente por debajo del código.
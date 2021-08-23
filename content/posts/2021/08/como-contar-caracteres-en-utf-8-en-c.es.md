---
title: Cómo contar caracteres en UTF-8 en C++
author: Leandro Fernandez
type: post
date: 2021-08-15T12:41:05+00:00
categories:
  - Programación
tags:
  - C/C++
  - utf-8
---

**UTF-8** es una codificación de texto muy versátil y difundida. En particular para casos donde se necesita soportar cualquier caracter **Unicode** pero no se quiere pagar un costo alto de almacenamiento. Ya que **Unicode** es enorme no hay manera de codificar todas las posibilidades en un sólo _byte_. Al mismo tiempo, utilizar dos o cuatro _bytes_ para cada caracter puede ser un desperdicio si la mayoría de los caracteres que usamos entrarán en uno o dos _bytes_. Ahí es donde UTF-8, que es una codificación con caracter de ancho variable, entra en juego. Ya que nos permite utilizar uno o dos bytes para los caracteres más comunes como **ASCII** y **Latin-1.** Pero al mismo tiempo utilizará más bytes si aparecen caracteres de codificaciones menos frecuentes.

  ![utf-8](/2021/08/utf8-cpp.png)
  
> La dificultad extra que nos agrega es que no podemos saber de antemano cuántos caracteres hay en una cadena de texto codificada en**UTF-8** sólo contando cuantos ***bytes*** ocupa. Tenemos que recorrerla y procesarla para poder contar los caracteres.

Una forma simple de contar los caracteres es recorrer la cadena hasta encontrar un byte en cero (que señalará el final en el caso de C/C++) y contar los caracteres cuyos dos primeros bits no son 10. Y esto es porque en cada caracter posible en este representación sólo habrá un byte que no empiece con 10.

La posibles configuraciones de bytes son:  
```
0xxxxxxx
110xxxxx 10xxxxxx
1110xxxx 10xxxxxx 10xxxxxx
11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

Aquí un pequeño programa en C++ que resuelve el problema y también realiza una prueba de performance entre la función `strlen()` de la biblioteca estándar de C y la función que presentamos para contar caracteres en **UTF-8**:

{{< highlight cpp >}}
#include <stdio.h>
#include <string.h>
#include <time.h>
 
#define STRINGS 8
#define TIMES 1000000
 
// Be sure your locale is set to "en_US.UTF-8" or whatever language with UTF-8
 
size_t utf8len(const char *s);
void print_diff(const char *func, int times, struct timespec *s, struct timespec *e);
 
const char * list[] = {"english", "español", "עברית", "Ελληνικά", "Українська", "한국어", "ﻑﺍﺮﺳی", "日本語"};
 
int main(int argc, char ** argv)
{
  int i;
  struct timespec start, end;
 
  for(i=0; i < STRINGS; ++i)
    printf("%s\nstrlen(): %zu \t utf8len(): %zu\n", list[i], strlen(list[i]), utf8len(list[i]));
 
 
  clock_gettime(CLOCK_REALTIME, &start);
  for(i=0; i<TIMES; ++i)
    strlen(list[i%STRINGS]);
  clock_gettime(CLOCK_REALTIME, &end);
  print_diff("strlen", TIMES, &start, &end);
 
  clock_gettime(CLOCK_REALTIME, &start);
  for(i=0; i<TIMES; ++i)
    utf8len(list[i%STRINGS]);
  clock_gettime(CLOCK_REALTIME, &end);
  print_diff("utf8len", TIMES, &start, &end);
 
  return 0;
}
 
 
size_t utf8len(const char *s)
{
  size_t len = 0;
  while(*s)
    len += (*(s++)&0xC0)!=0x80;
  return len;
}
 
// Aux
 
void print_diff(const char *func, int times, struct timespec *s, struct timespec *e)
{
  printf("Average %s time was: %6.3f nanoseconds\n", func, ((double)((e->tv_sec-s->tv_sec)*1000000000 ) + (e->tv_nsec-s->tv_nsec)) / times);
}
{{< / highlight >}}

Si ejecuto el programa en mi laptop obtengo los siguientes valores. Desde luego los tiempos que vemos a continuación van a variar si se ejecuta el programa en una computadora más o menos potente.

{{< highlight generic >}}
english
strlen(): 7      utf8len(): 7
español
strlen(): 8      utf8len(): 7
עברית
strlen(): 10     utf8len(): 5
Ελληνικά
strlen(): 16     utf8len(): 8
Українська
strlen(): 20     utf8len(): 10
한국어
strlen(): 9      utf8len(): 3
ﻑﺍﺮﺳی
strlen(): 14     utf8len(): 5
日本語
strlen(): 9      utf8len(): 3
Average strlen time was:  1.654 nanoseconds
Average utf8len time was: 22.784 nanoseconds
{{< / highlight >}}

Desde luego, la función `strlen()` de la biblioteca estándar es más rápida pero también es inútil para contar la cantidad de caracteres en una cadena codificada en **UTF-8**.
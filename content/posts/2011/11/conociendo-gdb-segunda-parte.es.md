---
title: Conociendo GDB segunda parte
author: Leandro Fernandez
type: post
date: 2011-11-05T16:56:47+00:00
categories:
  - Programación
tags:
  - C/C++
  - depuración
  - gnu

---

## Objetivo

Continuar con la exploración de las diferentes posibilidades de GDB, tal como se adelantó en el [artículo inicial de esta serie][2].

<!--more-->

## Breakpoints condicionales

En el artículo anterior vimos cómo colocar un _breakpoint_ en una línea de código arbitraria. Experimentamos la ejecución del programa con GDB y la consecuente detención en el punto indicado. La diferencia entre un _breakpoint_ regular y uno condicional es que la herramienta de depuración no se detiene en él a menos que se cumpla la condición asociada. De hecho en GDB la aplicación de la condición al breakpoint regular es lo que hace un breakpoint condicional. Tomemos el código del programa rand.c:

[c]  
#include <stdio.h>  
#include <stdlib.h>  
#include <time.h>  
#include <string.h>

int main(int argc, char ** argv) {  
int i, x;  
char str[100];

printf("Inicio\n");

srand(time(NULL));  
memset(str, 0, sizeof(str));  
for(i = 0; i < 100; ++i) {  
x = rand();  
str[i] = (x > RAND_MAX/2) ? &#8216;I&#8217; : &#8216;O&#8217;;  
}

printf("FIN\n");

return 0;  
}  
[/c]

  1. Ejecutamos el programa con **GDB**: 
    <pre>GNU gdb (GDB) 7.0.1-debian
Copyright (C) 2009 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later &lt;http://gnu.org/licenses/gpl.html&gt;
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
and "show warranty" for details.
This GDB was configured as "i486-linux-gnu".
For bug reporting instructions, please see:
&lt;http://www.gnu.org/software/gdb/bugs/&gt;...
Reading symbols from /home/leandro/taller/sandbox/rand...done.
(gdb)</pre>

  2. Ponemos un breakpoint en la línea 16: 
    <pre>(gdb) br rand.c:16
Breakpoint 1 at 0x80484ec: file rand.c, line 16.</pre>

  3. Hasta aquí tenemos un breakpoint regular. Ahora asociamos una condición al mismo. Por ejemplo que sólo se detenga si la variable i vale 50. 
    <pre>(gdb) cond 1 i==50</pre>

  4. El comando cond recibe dos parámetros, el primero es el número de breakpoint que GDB asignó —visible cuando se crea—, y el segundo es la condición que debe cumplirse para que el breakpoint surta efecto. Si ahora ejecutamos el programa: 
    <pre>(gdb) run
Starting program: /home/leandro/taller/sandbox/rand
Inicio

Breakpoint 1, main (argc=1, argv=0xbffff894) at rand.c:16
16          str[i] = (x &gt; RAND_MAX/2) ? 'I' : 'O';</pre>

  5. Si preguntamos el valor de i, debería ser 50: 
    <pre>(gdb) p i
$1 = 50</pre>

  6. Esto implica que la herramienta de depuración pasó cincuenta veces por el breakpoint antes de detenerse. Tal como la condición lo pedía.

La herramienta de breakpoint condicional es muy útil cuando necesitamos detener la ejecución a partir de un determinado punto del programa. Es decir, a partir de un estado arbitrario de sus variables. Es muy común que un error en el código sólo sea observable en determinadas condiciones, por ejemplo cuando una cadena de texto supera una longitud determinada. En el breakpoint condicional podemos detener la ejecución en una parte del código, pero también bajo una condición de datos determinada.

## Volcado de memoria (dump)

Para probar el comando que permite volcar en pantalla una parte de la memoria utilizaremos el siguiente programa:

[c]  
#include <stdio.h>  
#include <stdlib.h>  
#include <string.h>

int main(int argc, char ** argv) {  
char fijo\[2\]\[10\];  
char ** variable;

printf("Inicio\n");

memset(fijo, 0, sizeof(fijo));  
variable = malloc(2 \* sizeof(char\*));  
variable[0] = malloc(8);  
variable[1] = malloc(8);

strcpy(fijo[0], "Primera");  
strcpy(fijo[1], "Segunda");  
strcpy(variable[0], "Primera");  
strcpy(variable[1], "Segunda");

free(variable[0]);  
free(variable[1]);  
free(variable);

printf("FIN\n");

return 0;  
}  
[/c]

Aquí se crearán dos _arrays_ de caracteres. Uno de tamaño fijo (en tiempo de compilación) y otro variable con memoria dinámica. Si bien ambos _arrays_ son similares y se puede utilizar de la misma manera veremos que la ubicación de los datos en memoria es distinta en cada caso.

  1. Ejecutamos el programa con **GDB**: 
    <pre>GNU gdb (GDB) 7.0.1-debian
Copyright (C) 2009 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later &lt;http://gnu.org/licenses/gpl.html&gt;
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
and "show warranty" for details.
This GDB was configured as "i486-linux-gnu".
For bug reporting instructions, please see:
&lt;http://www.gnu.org/software/gdb/bugs/&gt;...
Reading symbols from /home/leandro/taller/sandbox/array...done.
(gdb)</pre>

  2. Ponemos un breakpoint en la línea 21, justo antes de comenzar a liberar la memoria dinámica: 
    <pre>(gdb) br 20
Breakpoint 1 at 0x804857d: file array.c, line 20.</pre>

  3. Ejecutamos el programa: 
    <pre>(gdb) run
Starting program: /home/leandro/taller/sandbox/array
Inicio

Breakpoint 1, main (argc=1, argv=0xbffff894) at array.c:21
21        free(variable[0]);</pre>

  4. La ejecución se detiene y en este momento los dos arrays fueron inicializados y contiene las cadenas &#8220;Primera&#8221; y &#8220;Segunda&#8221;. Si pedimos a GDB que muestre en contenido de ellos veremos que efectivamente son diferenciados: 
    <pre>(gdb) p fijo
$1 = {"Primera\000\000", "Segunda\000\000"}
(gdb) p variable
$2 = (char **) 0x804a008</pre>

  5. En el caso de un array de tamaño fijo, la memoria se reserva en forma completa en una sola secuencia de bytes del tamaño indicado. Como en este caso sabemos que se trata de 20 bytes, vamos a ver la memoria con el comando **x**. Utilizaremos también dos modificadores para especificar la cantidad de unidades que deseamos y el tipo. Comenzaremos pidiendo 20 caracteres: 
    <pre>(gdb) x/20c fijo
0xbffff7b8:     80 'P'  114 'r' 105 'i' 109 'm' 101 'e' 114 'r' 97 'a'  0 '\000'
0xbffff7c0:     0 '\000'        0 '\000'        83 'S'  101 'e' 103 'g' 117 'u' 110 'n' 100 'd'
0xbffff7c8:     97 'a'  0 '\000'        0 '\000'        0 '\000'</pre>

  6. Luego de la barra de división que sigue al comando se indica la cantidad de unidades y luego el tipo. En este caso fue **c** para caracteres. Vemos que efectivamente se encuentran la primera y segunda línea del array en forma continua. Esto no ocurre con el array **variable**: 
    <pre>(gdb) x/20c variable
0x804a008:      24 '\030'       -96 '\240'      4 '\004'        8 '\b'  40 '('  -96 '\240'      4 '\004'        8 '\b'
0x804a010:      0 '\000'        0 '\000'        0 '\000'        0 '\000'        17 '\021'       0 '\000'        0 '\000'      0 '\000'
0x804a018:      80 'P'  114 'r' 105 'i' 109 'm'</pre>

  7. Lo que vemos en este caso es parte de la memoria del HEAP. En la dirección de **variable**no están las cadenas sino que hay dos punteros. Por casualidad, dentro de los 20 bytes subsiguientes está también parte de la cadena &#8220;Primera&#8221;. Para inspeccionar la memoria de este array debemos entonces pedir que se muestren dos punteros. 
    <pre>(gdb) x/2xw variable
0x804a008:      0x0804a018      0x0804a028</pre>

  8. Ahora vemos en los punteros las dos direcciones de memoria que retornaron los malloc() que hicimos en las líneas 13 y 14. Usando el segundo podemos inspeccionar esa sección: 
    <pre>(gdb) x/8c 0x0804a028
0x804a028:      83 'S'  101 'e' 103 'g' 117 'u' 110 'n' 100 'd' 97 'a'  0 '\000'</pre>

  9. Es importante remarcar que en el paso 7 utilizamos un modificador de formato **x** y uno de tamaño **w**. El primero especifica que se desea formato hexadecimal y el segundo que cada unidad tiene el tamaño de un _word_. Dado que el sistema operativo es de 32 bits es suficiente en nuestro caso. Si se utiliza uno de 64 bits deberá especificarse 8 byes con el modificador **g**.
 10. Para ver otras opciones de este comando podemos referirnos a la ayuda en línea: 
    <pre>(gdb) help x
Examine memory: x/FMT ADDRESS.
ADDRESS is an expression for the memory address to examine.
FMT is a repeat count followed by a format letter and a size letter.
Format letters are o(octal), x(hex), d(decimal), u(unsigned decimal),
  t(binary), f(float), a(address), i(instruction), c(char) and s(string).
Size letters are b(byte), h(halfword), w(word), g(giant, 8 bytes).
The specified number of objects of the specified size are printed
according to the format.

Defaults for format and size letters are those previously used.
Default count is 1.  Default address is following last thing printed
with this command or "print".</pre>

 11. Finalizamos el programa con el comando **continue**: 
    <pre>(gdb) cont
Continuing.
FIN

Program exited normally.</pre>

Hasta aquí hemos cubierto la gran mayoría de los comandos más utilizados en GDB para depurar aplicaciones de un sólo hilo de ejecución (_monothread_). En la tercera parte veremos cómo inspeccionar la cantidad de hilos existente y cómo pasar de un hilo a otro para inspeccionar sus respectivos _stacks_.

<div style="text-align: center;">
 **Leandro Fernandez**
</div>

<div style="text-align: center;">
  <a href="http://creativecommons.org/licenses/by-sa/2.5/ar/" rel="license"><img src="http://creativecommons.org/images/public/somerights20.png" alt="Creative Commons License" /></a>
</div>

<div style="text-align: center;">
  Conociendo GDB is licensed under a<br /> <a href="http://creativecommons.org/licenses/by-sa/2.5/ar/" rel="license">Creative Commons Attribution-Share Alike 2.5 Argentina License</a>.
</div>

 [1]: http://blog.drk.com.ar/wp-content/uploads/2011/10/gnu.jpg
 [2]: http://blog.drk.com.ar/2009/conociendo-gdb "Conociendo GDB primera parte"
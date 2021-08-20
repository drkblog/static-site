---
title: Conociendo GDB
author: Leandro Fernández
type: post
date: 2009-07-23T23:00:56+00:00
url: /2009/conociendo-gdb
categories:
  - Programación
tags:
  - C/C++
  - depuración
  - gnu

---
### <span style="font-size: small;">GNU Debugger</span>

**Objetivo**

Introducir al lector en el uso de GDB como herramienta para inspeccionar la ejecución de un programa.

**Introducción**

A medida que la complejidad de un programa crece se hace más difícil predecir todos los posibles escenarios para una línea de código determinada. Los valores de cada variable en tiempo de ejecución pueden hacer que una porción del programa, que parece estar bien programada, produzca la finalización del proceso por &#8220;violación de segmento&#8221;. Basta con utilizar un entero con un valor mal calculado como índice de un array o como puntero a un objeto (si trabajamos con C++) para que la violación se produzca. O lo que es peor: que no se produzca pero que la aplicación continúe corriendo con valores que definitivamente impactarán en el resultado erróneo de una operación posterior.  
Como programadores estamos limitados en nuestra capacidad de reconstruir cada una de las posibles situaciones en nuestra mente. Es por ello que necesitamos una herramienta que nos ayude a ver qué ocurre durante la ejecución. Son herramientas que existen y se llaman _debuggers_ en inglés algo así como eliminadores de insectos, ya que se utiliza la palabra bug para denominar a los insectos y también a los errores que se encuentran en un programa. Herramientas que debemos aprender a utilizar para facilitar nuestro trabajo.

<!--more-->

**¿Por qué GDB?**

Porque es software de código abierto —es decir que podemos ver cómo está programado—, porque es gratis, porque nos permite realizar una serie de inspecciones y modificaciones en tiempo de ejecución que superan la capacidad de herramientas similares y porque es ampliamente utilizado —hecho que asegura su actualización constante—.  
Otra ventaja que tiene GDB es que está disponible para tres plataformas ampliamente utilizadas actualmente: Linux, donde nació; MacOS X, soportado en forma nativa ya que está basado en Unix; y Windows, donde lo podemos utilizar a través de cygwin.

**Funcionamiento**

Para que GDB nos permita inspeccionar la ejecución de un programa, detenerlo en una línea arbitraria, que nos indique el momento en que se modifica una zona de la memoria del proceso, etcétera es necesario que se incluya, al momento de la compilación, información extra en el archivo ejecutable generado. Es decir que el compilador debe indicar cada porción del código binario que corresponde a cada línea de texto del código fuente. Así a GDB le es posible relacionar el lenguaje de máquina con el de nivel superior en el que realmente fue programado.  
Es indispensable que al compilar utilicemos una herramienta que sea capaz de crear un binario con información de debug con una nomenclatura compatible con GDB. Para esto vamos a utilizar GCC y G++ en el ámbito de este artículo.

**Entrando al mundo GDB**

Para comenzar a empaparnos en este tema utilizaremos una estrategia altamente práctica. Por lo tanto recomiendo al lector que a partir de ahora realice en una máquina cada paso descripto en el texto para ver por sí mismo los resultados e incorporar los conocimientos más rápidamente.  
En mi caso particular estaré utilizando un equipo de 32 bits con Debian (Linux), GCC 4.1.2 20061115 y GDB 6.4.90-debian. Pero deberían obtenerse los mismos resultados en Windows con cygwin.

  1. Crear un directorio de trabajo y volcar en él [los fuentes][1] de éste artículo.
  2. Compilar el ejemplo llamado gdbt.c ejecutando  **$ gcc -ggdb -O0 -o gdbt gdbt.c**  
    Tener en cuenta que estamos indicándole a GCC que incluya información de debug para gdb [-ggdb] y que no realice optimizaciones en el código generado [-O0]
  3. Ejecutar GDB indicándole que inspeccionaremos el binario generado (gdbt)  **$ gdb  gdbt **
  4. GDB se ejecutará y cargará el binario en memoria lista para inspeccionar. Luego nos presentará una línea de comandos propia donde podremos, por ejemplo, indicarle que ejecute el programa simplemente. Esto lo haremos con el comando **run**
  5. <pre><span style="color: #cccccc;"><span style="color: #000000;">(gdb) run</span> </span></pre>

  6. El programa se ejecutará sin detenerse hasta el final, a menos que una violación de segmento interrumpa la ejecución. Esto no ocurrirá en este ejemplo.
  7. En pantalla veremos algo como esto: 
    <pre>(gdb) run
Starting program: /home/leandro/gdbt
Paso 1
[12345]
Paso 2</pre>

  8. Donde podemos ver la salida del programa en las líneas posteriores a la que indica que se inicia el mismo. Este comando sólo no nos es de mucha utilidad a menos que esperemos que la aplicación se detenga por sí misma. Es decir que el procedimiento mostrado hasta aquí es habitual si el programa que estamos inspeccionado estaba arrojando una advertencia de violación de segmento por parte del sistema operativo.

Supongamos que, viendo el código fuente de este ejemplo, decidimos detener la ejecución del programa en la línea 10 y continuar paso por paso hasta el final. Debemos indicarle a GDB, previo al inicio del programa, que se detenga en esa línea. Para eso utilizamos el comando **br** (break point, que significa punto de interrupción) y cuya función es establecer un punto en el cual se detendrá la ejecución de la aplicación cuando la inspeccionemos.

  1. Ejecutar GDB como lo hicimos en el paso tres inicial. Así obtendremos la línea de comandos de GDB y tendremos el ejecutable listo para inspeciconar.
  2. Establecemos un break point en la línea diez de gdbt.c  **<span style="color: #cccccc;"><span style="color: #000000;"> (gdb) br gdbt.c:10 </span></span>**
  3. Observemos que la forma en la que indicamos el punto de interrupcion es <nombre de archivo fuente>:<número de línea>. Hay otras formas de indicar un punto de pausa que veremos más adelante.
  4. En la pantalla vemos: 
    <pre>(gdb) br gdbt.c:10
Breakpoint 1 at 0x80483e1: file gdbt.c, line 10.</pre>

  5. Cada break point está numerado consecutivamente desde el número uno. El número obtenido nos servirá para deshabilitarlo de ser necesario. También servirá para que GDB nos diga el motivo por el cual la ejecución se detiene. El número hexadecimal nos indica la posición de memoria a la que se asoció la línea de código en cuestión.
  6. Iniciamos el programa con **run**
  7. Automáticamente GDB se detiene al llegar a la línea diez: 
    <pre>Starting program: /home/leandro/gdbt
Paso 1
Breakpoint 1, main () at gdbt.c:10
10              unNivel(5, "1234567890");</pre>

  8. GDB nos avisa que debido al break point uno, se detuvo en la línea diez de gdbt.c y nos muestra dicha línea de código. Ésta no fue ejecutada aún, por lo que sólo vemos la línea de texto Paso 1 en pantalla.
  9. Ahora le diremos a GDB que ejecute esta línea de código exclusivamente. Es decir que deberá ejecutarla y detenerse de inmediato. Para esto usamos el comando **n** (next, siguiente):
 10. <pre><span style="color: #cccccc;"><span style="color: #000000;"> (gdb) n </span></span></pre>

 11. Vemos que GDB ejecuta la línea y se detiene nuevamente. La línea once se saltea porque no tiene código ejecutable: 
    <pre>[12345]
12              printf("Paso 2\n");</pre>

 12. Si queremos volver a ejecutar el comando **n** podemos escribir **n** y presionar **Enter** o bien presionar **Enter** sin escribir nada. Esto repite el último comando ingresado por el usuario.
 13. Vemos que nuevas líneas de código fuente en blanco son salteadas: 
    <pre>Paso 2
14              return 0;</pre>

 14. Estamos en la última línea del programa, a punto de retornar cero como código de salida al sistema operativo. Aunque casi no tiene sentido, ahora le diremos a GDB que continúe la ejecución de la aplicación sin detenerse excepto que encuentre un punto de interrupción u otra situación que lo amerite. Utilizamos ahora el comando **cont** (continue, continuar)
 15. El programa termina: 
    <pre>(gdb) cont
Continuing.Program exited normally.</pre>

 16. Si queremos salir de GDB debemos ingresar el comando **quit** (salir).
 17. Veamos que ocurriría si en lugar de ejecutar la línea 10 deseáramos entrar en la función unNivel() y ejecutarla paso a paso. Como experimentamos en el punto diez, si utilizamos el comando **n** pasaremos a la línea 12 directamente.
 18. Ejecutemos todos los pasos del uno al nueve pero utilicemos esta vez el comando **s** (step, paso) que a diferencia de **n** ingresará a cada función si el código fuente está disponible.
 19. Ahora la línea siguiente a la 10 es la 21, dentro de la función unNivel(): 
    <pre>(gdb) s
unNivel (x=5, str=0x804857f "1234567890") at gdbt.c:21
21              if (x &gt;= strlen(str))</pre>

 20. Si ahora avanzamos nuevamente con **n**: 
    <pre>(gdb) n
24              duplicado = strdup(str);
(gdb) n
25              duplicado[x] = 0;
(gdb) n
26              printf("[%s]\n", duplicado);
(gdb) n
[12345]
27      }
(gdb) n
main () at gdbt.c:12
12              printf("Paso 2\n");</pre>

 21. Notamos que la última línea que ejecutamos dentro de la función unNivel() es la salida representada por la llave en la línea 27. Luego sí pasamos a la línea 12. Hemos regresado a la función main()
 22. Así, alternando entre **n**ext y **s**tep podemos recorrer la aplicación con el nivel de profundidad deseado. Más adelante veremos otros comandos que nos permiten manejar la pila de llamadas a función.

**Inspeccionando el mundo que nos rodea**

Aprendimos a inspeccionar un programa, hacer que la ejecución se detenga en un punto arbitrario y luego ejecutar paso a paso. Pero hay algo fundamental que necesitamos hacer cuando detenemos la ejecución de un programa: ver el estado. Conocer los valores de las variables que intervienen y cómo estos se alteran con el avance del programa. Es la forma en la que típicamente descubrimos un error. Cuando una variable adquiere un valor que no tiene sentido para el programa.  
Vamos a adquirir los conocimientos necesarios para descubrir los valores de nuestras variables e incluso modificarlos.

  1. Compilamos el ejemplo variables.c con la línea de comandos  **gcc -ggdb -O0 -o vars variables.c**
  2. Lo ejecutamos con **GDB** y antes de iniciarlo establecemos un _break point_ en la línea 24
  3. La ejecución se detiene: 
    <pre>(gdb) run
Starting program: /home/leandro/gdb_article/vars
Inicio
Entero = 4433
Caracter = GBreakpoint 1, main () at variables.c:24
24              printf("Texto = %s\n", texto);
(gdb)</pre>

  4. Para inspeccionar las variables **GDB** cuenta con el comando **p**(print, imprimir) al cual le puedo pasar el nombre de una variable: 
    <pre>(gdb) p entero
$1 = 4433</pre>

  5. Como podremos comprobar **GDB** nos indica que el valor de la variable llamada _entero_ es 4433. Podemos inspeccionar el resto de las variables: 
    <pre>(gdb) p caracter
$2 = 71 'G'
(gdb) p str
$3 = 0x0
(gdb) p texto
$4 = 0x8048548 "Un texto."</pre>
    
    Vale notar que en el caso de un puntero se adjunta la dirección de memoria en la salida. Y en particular 0x0 indica que el puntero es nulo.</li> 
    
      * **GDB** representará cada variable adecuadamente según el tipo. Incluso podemos preguntarle el tipo de la variable con el comando **ptype** (print type, imprimir tipo): 
        <pre>(gdb) ptype caracter
type = char
(gdb) ptype texto
type = char *
(gdb) ptype entero
type = int</pre>
    
      * Volviendo a las bondades del comando **p** es importante recordar que admite expresiones y no sólo nombres de variable. Es decir que puedo pedirle que imprima el resultado de una expresión. Probemos con un **cast**.(gdb) p (int)caracter 
        <pre>$5 = 71
(gdb) p (char)entero
$6 = 81 'Q'</pre>
        
        Como se observa al convertir el entero en un carácter se tomó el último byte. El valor 4433 es 0x1151 en hexadecimal y 0x51 es 81.</li> 
        
          * También podemos pedir la dirección de memoria de cualquier expresión: 
            <pre>(gdb) p &entero
$10 = (int *) 0xbfbce9a4
(gdb) p &caracter
$11 = 0xbfbce9b3 "GÐé¼¿\030ê¼¿¨îã·"</pre>
        
          * Las direcciones de memoria de estas variables corresponde a la pila. No confundir esta dirección con aquella a la que apunta un puntero. Éste tiene dos direcciones de memoria (por así decirlo): una es la del puntero, donde almacena su valor; y la otra es a la que él apunta, ya que el valor del puntero debe ser una dirección de memoria. Veamos la dirección de memoria donde se almacena el puntero _texto_: 
            <pre>(gdb) p &texto
$13 = (char **) 0xbfbce9ac</pre>
        
          * Ahora veamos la dirección a la que apunta (su propio valor): 
            <pre>(gdb) p texto
$14 = 0x8048548 "Un texto."</pre>
        
          * Vamos lo mismo para _str_: 
            <pre>$15 = (char **) 0xbfbce9a8
(gdb) p str
$16 = 0x0</pre>
        
          * Adicionalmente inspeccionemos la estructura llamada _registro_ del tipo _rec_: 
            <pre>(gdb) p registro
$2 = {nombre = ".ïè·\031ëò·ô\217õ·x\025û¿ \203\004\bô\217õ·t
\226\004\b\210\025", edad = 20, sexo = 77 'M'}</pre>
        
          * Vemos que **GDB** encerró los tres valores del _registro_ entre llaves e indicó cada valor con el nombre del miembro (_nombre, edad, sexo_). También podemos ver un miembro en particular utilizando el operador punto: 
            <pre>(gdb) p registro.edad
$3 = 20</pre>
        
          * Si tuviésemos un puntero a una estructura deberíamos utilizar el operador &#8220;->&#8221;: 
            <pre>(gdb) p (&registro)-&gt;edad
$4 = 20</pre>
        
          * En este caso obtuve primero el puntero con el operador & (_ampersand_) porque no tengo un puntero a la estructura, pero la funcionalidad es idéntica si lo tengo. Claro que ya no utilizaría el _ampersand_.
          * Por último vamos a conocer una característica sumamente útil del comando **p**. La capacidad de modificar la memoria en medio del proceso. Sabemos, si le damos una mirada al código del ejemplo, que si lo dejamos correr ahora mismo con el comando **cont** veremos en pantalla: 
            <pre>Texto = Un texto.
STR = (null)
FIN
Program exited normally.</pre>
        
          * Pero podemos hacer que la salida cambie si, por ejemplo, hacemos que _str_ apunte a la dirección de memoria de texto. Entonces se repetiría su impresión en la salida. Para esto escribimos: 
            <pre>(gdb) p str=texto
$17 = 0x8048548 "Un texto."</pre>
        
          * **GDB** ejecuta la expresión que le pasamos al comando **p**, que ahora es una asignación, y a su vez retorna el valor resultante. Es por esto que lo vemos impreso en la salida $17. Ahora dejamos correr el ejemplo con la variable _str_ modificada: 
            <pre>(gdb) cont
Continuing.
Texto = Un texto.
STR = Un texto.
FIN
Program exited normally.</pre>
        
          * Ahora _str_ apunta al mismo espacio de memoria que _texto_ y por lo tanto la función printf() repite la salida en la línea STR&#8230;
          * Esta última característica del comando **p** nos habilita a realizar pruebas de ejecución con valores de variables distintos a los que el programa llegó. Muchas veces nos deja ver que la finalización del programa es correcta con el cambio. Y entonces sólo resta corregir el código que dio lugar al valor original, incorrecto.</ol> 
        
        **La pila de llamadas o backtrace**
        
        Es un hecho que al momento de recurrir a **GDB** para solucionar un problema tendremos un código mucho más complejo. La cantidad de variables y funciones se habrá multiplicado. La línea de código donde nuestra aplicación arroje una violación de segmento estará en lo más profundo del código. En el sentido de que la llamada consecutiva de una función a otra y ésta a otra más nos dejará debajo de una &#8220;pila de funciones&#8221;. O mejor dicho, de llamadas a funciones.  
        No es mi intención explicar qué es la pila de llamadas. Simplemente resumiremos que con cada llamada a una función se guarda el estado en la pila, se pasan también los argumentos, se ejecuta la función y cuando esta termina se retoma la ejecución de la función anterior.  
        Para ver cómo **GDB** representa esto compilaremos el ejemplo onion.c y lo ejecutaremos sin puntos de interrupción porque sabemos que provoca una violación de segmento.
        
          1. Ejecutamos el programa con **GDB** y se detiene de la siguiente manera: 
            <pre>(gdb) run
Starting program: /home/leandro/gdb_article/onion
Failed to read a valid object file image from memory.
InicioProgram received signal SIGSEGV, Segmentation fault.
0x080484a7 in nivel_4 (c=0xbf80c5d8, str=0xbf80c5df "1234")
at onion.c:49
49              str[65535] = 123;</pre>
        
          2. Nos indica que se produjo la violacion en la línea 49 de inion.c, tal como esperábamos. Nos muestra la línea de código en cuestión, pero más importante para este apartado es que nos dice en qué función estamos y cuales son sus parámetros. Se trata de la línea que dice &#8220;**0x080484a7 in nivel_4 (c=0xbf80c5d8, str=0xbf80c5df &#8220;1234&#8221;)**&#8221;  
            La función nivel_4() recibe dos argumentos, un puntero a entero y un puntero a carácter. GDB nos muestra ambos valores, direcciones de memoria, y en el caso del puntero a carácter intenta mostrar la cadena de texto a la que apunta.
          3. Si nos referimos al código fuente vemos que para haber llegado a nivel_4() debimos traspasar las llamadas a las funciones homólogas anteriores. Para pedirle a **GDB** esta información usamos el comando **bt**(backtrace): 
            <pre>(gdb) bt
#0  0x080484af in nivel_4 (c=0xbfe76448, str=0xbfe7644f "1234")
at onion.c:51
#1  0x08048484 in nivel_3 (c=0xbfe76448, str=0xbfe7644f "1234")
at onion.c:43
#2  0x0804844f in nivel_2 (c=0xbfe76448, str=0xbfe7644f "1234")
at onion.c:35
#3  0x08048422 in nivel_1 (c=0xbfe76448, str=0xbfe7644f "1234")
at onion.c:28
#4  0x080483ca in main () at onion.c:16</pre>
        
          4. **GDB** representa la pila de llamadas en forma inversa. El nivel más profundo aparece primero y se numera con cero. Y secuencialmente las llamadas anteriores reciben números mayores hasta llegar al **frame** número cuatro. Y las negritas de la palabra frame están para recordarnos que es el nombre de un comando de **GDB** que me permite moverme hasta una de las llamadas. Se puede utilizar en conjunto con los comandos **up** y **down** que me llevan hacia arriba y abajo respectivamente.
          5. Probamos ir hacia arriba: 
            <pre>(gdb) up
#1  0x0804847c in nivel_3 (c=0xbf80c5d8, str=0xbf80c5df "1234")
at onion.c:41
43              nivel_4(c, str);</pre>
        
          6. Ahora nos encontramos en la función nivel\_3() justo en la línea que llamó a nivel\_4(). Esto nos permitiría inspeccionar variables que se encuentren en el contexto de la función nivel\_3() y que no puedo ver desde nivel\_4(). Por ejemplo la variable _dummy_: 
            <pre>(gdb) p dummy
$1 = 3.14159203</pre>
        
          7. En todo momento que nos encontramos en la línea de comandos de GDB y el programa está en mitad de la ejecución podemos pedir el listado del código fuente con el comando **l**(list): 
            <pre>(gdb) l
38      void nivel_3(int * c, char * str) {
39
40              float dummy = 3.141592f;
41
42              str[(*c)++]='3';
43              nivel_4(c, str);
44      }
45
46      void nivel_4(int * c, char * str) {
47</pre>
        
          8. **GDB** muestra el código alrededor de la línea en la que nos encontramos (la cuarenta y tres). Ahora podemos ver que en este _scope_ existe la variable _dummy_. Si queremos ver código más arriba o más abajo podemos usar la **l**seguida de un signo menos o más, respectivamente: 
            <pre>(gdb) l -
28              nivel_2(c, str);
29      }
30
31
32      void nivel_2(int * c, char * str) {
33
34              str[(*c)++]='2';
35              nivel_3(c, str);
36      }
37</pre>
        
          9. Si queremos ver el código en una línea determinada podemos pasar el número como argumento del comando: 
            <pre>(gdb) l 47
42              str[(*c)++]='3';
43              nivel_4(c, str);
44      }
45
46      void nivel_4(int * c, char * str) {
47
48              str[(*c)++]='4';
49              str[(*c)]=0;
50
51              str[65535] = 123;</pre>
        
         10. Si volvemos al frame cero con el comando frame y luego tratamos de ver la misma variable, fracasamos lógicamente: 
            <pre>(gdb) frame 0
#0  0x080484af in nivel_4 (c=0xbffc7d98, str=0xbffc7d9f "1234")
at onion.c:51
51              str[65535] = 123;
(gdb) p dummy
No symbol "dummy" in current context.</pre>
        
        La importancia del comando **bt** se hace mucho más evidente cuando en nuestra aplicación tenemos decenas de funciones que son llamadas por otras tantas y el error sólo se presenta en ciertas circunstancias. Imaginemos una funcion invertirCadena(char * str) que funciona en algunos casos y falla en otros. Es esperable suponer que la falla esté en la función que le pasa la cadena. Para encontrarla basta con utilizar **GDB** y el comando **bt**.
        
        **Otras formas de break point**
        
        Existen otras formas de indicarle a **GDB** el momento en que debe interrumpir la ejecución. Vimos anteriormente la forma más simple que consta de indicar el nombre de archivo fuente y el número de línea.
        
        <span style="text-decoration: underline;">Nombre de función</span>
        
        Nos ocurre en algunas circunstancias que no sabemos el número de línea pero conocemos el nombre de una función sobre la cual queremos trabajar. Le podemos indicar a **GDB** directamente el nombre de la función como argumento del comando **br**. Veamos cómo hubiera sido en el primer ejemplo de este artículo:
        
        <pre>(gdb) br unNivel
Breakpoint 1 at 0x8048416: file gdbt.c, line 21.</pre>
        
        El resultado es que **GDB** obtiene la primer línea ejecutable del a función y coloca en ella el _break point_:
        
        [c]  
        #include <stdio.h>  
        #include <string.h>
        
        void unNivel(int x, char * str);
        
        int main(int argc, char ** argv) {
        
        printf("Paso 1\n");
        
        unNivel(5, "1234567890");
        
        printf("Paso 2\n");
        
        return 0;  
        }
        
        void unNivel(int x, char * str) {
        
        char * duplicado;
        
        if (x >= strlen(str))  
        return;
        
        duplicado = strdup(str);  
        duplicado[x]= 0;  
        printf("[%s]\n", duplicado);  
        }  
        [/c]
        
        Esta línea es por supuesto la veintiuno. Ya que la anterior, la diecinueve por ejemplo, sólo declara una variable pero no realiza operaciones.
        
        <span style="text-decoration: underline;">Dirección de memoria</span>
        
        También podemos indicar una posición de memoria del segmento de código (_code segment_) de nuestra aplicación. Esto no es muy común, pero se puede hacer sin problemas. Veamos un ejemplo arbitrario:
        
        <pre>(gdb) br main
Breakpoint 1 at 0x80483d5: file gdbt.c, line 8.
(gdb) br *0x80483e5
Breakpoint 2 at 0x80483e5: file gdbt.c, line 10.</pre>
        
        Primero ponemos un break point en la primera línea de main() y así conocemos la posición de memoria 0x80483d5. Luego le decimos a GDB que coloque otro en la dirección de memoria que está diez y seis bytes más adelante. Para esto paso la dirección como argumento de **br** anteponiendo un asterisco.
        
        **Resumen**
        
        Repasamos los comandos más importantes de **GDB** a la vez que practicamos su forma de uso sobre ejemplos específicos. La cantidad de funcionalidad que dejé fuera del artículo es grande, pero no tiene sentido extenderse en variantes que sólo complicarían la comprensión. Por una lado invito a los lectores a experimentar nuevos comandos o variantes por su cuenta. Se puede recurrir al manual mismo de **GDB** disponible en varios sabores en la dirección: [http://www.gnu.org/software/gdb/documentation/][2]{#z9f2}  
        Por otro lado, y a modo de proyecto personal, existe la posibilidad de que me siente a redactar otro artículo similar a éste. Me gustaría abordar temas como los _conditional break point_ (puntos de interrupción condicional) que nos permiten detener la ejecución en una línea sólo bajo ciertas circunstancias, dump (volcado) de memoria que muestra en pantalla libremente partes arbitrarias de la memoria del proceso y los comandos que nos permiten realizar inspección en aplicaciones con varios hilos de ejecución (_multithread_).
        
        **Adjuntos**
        
        El archivo con [los fuentes][1] para este artículo.
        
        <div style="text-align: center;">
          <strong>Leandro H. Fernández</strong>
        </div>
        
        <div style="text-align: center;">
          <strong></strong><a href="http://creativecommons.org/licenses/by-sa/2.5/ar/" rel="license"><img src="http://creativecommons.org/images/public/somerights20.png" alt="Creative Commons License" /></a>
        </div>
        
        <div style="text-align: center;">
          Conociendo GDB is licensed under a<br /> <a href="http://creativecommons.org/licenses/by-sa/2.5/ar/" rel="license">Creative Commons Attribution-Share Alike 2.5 Argentina License</a>.
        </div>

 [1]: http://www.drk.com.ar/docs/files/source/conociendo_gdb_src.tar.gz
 [2]: http://www.gnu.org/software/gdb/documentation/ "http://www.gnu.org/software/gdb/documentation/"
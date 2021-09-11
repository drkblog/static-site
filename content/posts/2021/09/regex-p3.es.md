---
title: ¡Basta de temerle a las regex! - Parte 3
author: Leandro Fernandez
type: post
date: 2021-09-01
cover: "/2021/09/xkcd-1171.png"
categories:
  - Programación
tags:
  - regex
  - java
---

En la [nota anterior sobre expresiones regulares]({{< relref path="/content/posts/2021/08/regex-p2.es.md" lang="es" >}}) vimos cómo expresar cantidades variables de caracteres para una posición en nuestra **regex**. Y cómo escribir una regex que nos permita capturar palabras dentro de un contexto (caracteres específicos delante y detrás de ella). Pero también nos encontramos con que ese contexto es considerado parte de la coincidencia y que necesitamos evitar eso. Así que ahora aprenderemos cómo solucionarlo.

---

## Grupos de captura

Cuando escribimos una regex podemos designar partes de la misma como un grupos de captura. Estos no variarán qué partes del texto de entrada serán capturadas por la expresión entera. Pero sí nos permitirá acceder a las partes que agrupamos en forma independiente. Es decir que podemos obtener un subconjunto de caracteres del total encontrado. En el artículo anterior habíamos usado la expresión `/[a-z>]\s\w+[\s;]/` para encontrar nombres de variables en una sección de código fuente. Pero esta expresión regular encuentra también los caracteres que están antes y después. Si quisiéramos obtener el nombre de la variable en cada coincidencia, no podríamos. Porque, por ejemplo, para la entrada `int value = 1;` encuentra `t value `. Trae una `t` y dos espacios de más.

Si encerramos entre paréntesis la parte de la expresión que capturará sólo el nombre de la variable habremos definido un grupo de captura. La nueva `regex` sería `/[a-z>]\s(\w+)[\s;]/` ya que sólo nos interesa agrupar y acceder a los caracteres de palabra y no a la letra y espacio que está antes ni al espacio o punto y coma posteriores.

Pero hasta aquí, dependiendo de cómo utilizamos nuestra `regex`, es posible que no veamos cambio alguno. Es que las expresiones regulares nos pueden servir para tres cosas: validar que una cadena cumple cierto formato, encontrar subcadenas con cierta lógica y hacer reemplazos dentro de un texto. Para el primer uso los grupos de captura no aportan valor agregado. En los otros dos casos sí porque en una búsqueda voy a poder acceder a todos los grupos de captura que haya definido una vez que la expresión regular coincidió satisfactoriamente en el texto de entrada. Y en un reemplazo voy a poder reutilizar el contenido de los grupos de captura en la especificación del reemplazo.

### Uso en reemplazos

Empezamos por este caso de uso debido a que es el más común si tomamos en cuenta el uso de expresiones regulares tanto en programación como en herramientas que las soportan. Un procesador de texto digno nos permitirá hacer búsquedas y reemplazos interpretando nuestra entrada como una expresión regular. Y en esta situación los grupos de captura sólo  tendrán sentido cuando hacemos reemplazos. En cambio en el caso de uso de una regex en un programa tenemos la posibilidad de aprovecharlos en ambos casos.

[En el primer artículo]({{< relref path="/content/posts/2021/08/regex.es.md" lang="es" >}}) dije que una **regex** siempre está encerrada entre dos barras pero eso no es cierto. Cuando escribimos una regex de reemplazo utilizamos una barra más para separar la expresión regular de búsqueda de la parte que indica con qué vamos a reemplazar. Así que lo normal es escribir una expresión regular de reemplazo como `/regex/reemplazo/` donde la primera parte es una expresión tal como las que hemos aprendido hasta aquí. Y la segunda es (en principio) una cadena de texto literal con lo que reemplazamos lo encontrado por la primera parte. Cuando nos encontramos en un procesador de texto, la interfaz típica provee dos campos, uno para lo que buscamos y otro para lo que reemplazará lo que buscamos. Al activar el soporte de regex vamos a poner el reemplazo en el campo correspondiente y no usaremos esta sintáxis.

Al final de la segunda parte de esta serie hicimos un reemplazo sin escribir la expresión con este formato que acabamos de explicar. Podemos decir que si aplicamos `/[a-z>]\s\w+[\s;]/xyz/` al código:

{{< highlight java >}}
...
int value = 1;
String text;

if (condition.equals("value")) {
  HashMap<Integer, String> map = new HashMap();
}
...
{{< /highlight >}}

Obtenemos este reemplazo brutal, ya que todo lo que coincide con la primera parte es reemplazado por la segunda:

{{< highlight java >}}
...
inxyz= 1;
Strinxyz

if (condition.equals("value")) {
  HashMap<Integer, Stringxyz= new HashMap();
}
...
{{< /highlight >}}

Pero si utilizamos **grupos de captura **para reproducir el contexto (los caracteres antes y después del nombre de variable) en la salida podemos reemplazar sólo la parte que nos interesa. Así que cambiamos la regex a `/([a-z>]\s)\w+([\s;])/$1xyz$2/` y el código reemplazado queda:

{{< highlight java >}}
...
int xyz = 1;
String xyz;

if (condition.equals("value")) {
  HashMap<Integer, String> xyz = new HashMap();
}
...
{{< /highlight >}}

Si bien este reemplazo puede no tener sentido para el código de ejemplo, nos sirve para ilustrar el uso de la **regex**. En primer lugar definimos dos grupos de captura: uno que atrapa los dos caracteres que coincidimos antes de `\w+` y otro que agrupa el caracter que coincidimos después (que puede ser un espacio o un punto y coma). Ese es el único cambio en la primera parte. Ahora en la segunda parte agregamos `$1` y `$2`. Esta es la forma en que indicamos que se debe escribir en esa parte del reemplazo lo que sea que se haya capturado en el grupo. Y el número indica qué grupo en particular según el orden de aparición en la **regex** (`$1` es el primer paréntesis y `$2` el segundo).

> Si bien dijimos que los grupos de captura se numeran según el orden de aparición. La numeración se puede complicar si anidamos grupos de captura (lo que es completamente válido y puede ser muy útil). En el estándar que utilizo cada paréntesis que se abre recibe el siguiente número de grupo. Pero esto podría variar en otro estándares. También existen herramientas que utilizan una barra invertida seguida del índice de grupo en lugar del signo pesos, resultando en `/([a-z>]\s)\w+([\s;])/\1xyz\2/`.

## Uso en búsquedas

Este caso de uso tiene sentido si escribimos una expresión regular dentro de un programa. Y aquí podemos encontrarnos variaciones en el estándar soportado y en la forma en que accedemos a las capturas dependiendo del lenguaje. Vamos a limitarnos a un ejemplo con **Java**. En muchos casos lo que veremos aquí será similar a lo que nos encontremos en otros lenguajes. 

Continuando en el código de ejemplo anterior, escribamos un bloque de código **Java** que imprima los nombres de las variables encontradas en la salida estándar.

{{< highlight java "linenos=table" >}}
final String input = "int value = 1;\n" +
    "String text;\n" +
    "\n" +
    "if (condition.equals(\"value\")) {\n" +
    "  HashMap<Integer, String> map = new HashMap();\n" +
    "}";
String[] lines = input.split("\\R");

Pattern pattern = Pattern.compile(".*?[a-z>]\\s(\\w+)[\\s;].*?");
Matcher matcher = pattern.matcher("");
for (String line : lines) {
  matcher.reset(line);
  if (matcher.matches()) {
    System.out.println(matcher.group(1));
  }
}
{{< /highlight >}}

Definimos un _string_ `input` con nuestro código de ejemplo y lo dividimos por línea en la variable `lines`. Para eso usamos el método `split()` de la clase **String** que soporta también **regex** como entrada. Y a partir de **Java 8** el símbolo `\R` coincide con un fin de línea sin importar si es `\r` o `\n` o ambos.

Creamos el objeto `pattern` con nuestra expresión regular adaptada para Java. En primer lugar tenemos que escapar la barra invertida con una barra extra en el código fuente. Y además tenemos que poner dos secuencias para coincidir todo lo que esté antes y después de lo que captura eventualmente nuestra **regex**. Porque Java nos obliga a coincidir el total de la entrada. Existen otras formas de manejar esto pero creo que es la más simple. Utilizamos una expresión de captura _non-greedy_ `.*?` que coincidirá cualquier cosa pero dará prioridad a las otras secuencias dentro de la regex. Si usáramos la secuencia _greedy_ que es más conocida `.*` esta aceptaría todo incluyendo aquello que potencialmente coincidiría con lo que buscamos.

Luego creamos un `matcher` que es el objeto al cual le pasaremos cada línea de entrada (esto ocurre en la línea 12) y preguntamos si hubo coincidencia en la línea 13. Si esto pasó la línea 14 le pedirá al `matcher` el contenido del grupo de captura `1`. Este método recibe como argumento el índice del grupo. Si le pasamos `0` nos dará la captura total de la **regex** y de uno en adelante los grupos que definimos.

Este programa nos dará la salida:

```
value
text
map

Process finished with exit code 0
```

## Conclusión

En esta ocasión aprendimos cómo definir grupos de captura en nuestra expresión regular para enfocarnos en una o más partes de nuestra regex y al mismo tiempo poder ignorar otras que estamos forzados a indicar para asegurarnos de encontrar lo que buscamos. Vimos que esto lo hacemos agrupando entre paréntesis las partes que nos interesan. Y que luego las podemos usar en la sección de reemplazo de una regex o a través de los métodos o funciones de una biblioteca si estamos programando.

---
[Imagen de xkcd.com](https://xkcd.com/1171/) bajo licencia [CC-BY-NC2.5](https://creativecommons.org/licenses/by-nc/2.5/) reformateada para este sitio.

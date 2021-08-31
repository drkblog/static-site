---
title: ¡Basta de temerle a las regex! - Parte 3
author: Leandro Fernandez
type: post
date: 2021-08-31
cover: "/2021/09/xkcd-1171.png"
categories:
  - Programación
tags:
  - regex
  - java
draft: true
---

En la [nota anterior sobre expresiones regulares]({{< relref path="/content/posts/2021/08/regex-p2.es.md" lang="es" >}}) vimos cómo expresar cantidades variables de caracteres para una posición en nuestra *regex*. Y cómo escribir una regex que nos permita capturar palabras dentro de un contexto (caracteres específicos delante y detrás de ella). Pero también nos encontramos con que ese contexto es considerado parte de la coincidencia y que necesitamos evitar eso. Así que ahora aprenderemos cómo solucionarlo.

---

## Grupos de captura

Cuando escribimos una regex podemos designar partes de la misma como un grupos de captura. Estos no variarán qué partes del texto de entrada serán capturadas por la expresión entera. Pero sí nos permitirá acceder a las partes que agrupamos en forma independiente. Es decir que podemos obtener un subconjunto de caracteres del total encontrado. En el artículo anterior habíamos usado la expresión `/[a-z>]\s\w+[\s;]/` para encontrar nombres de variables en una sección de código fuente. Pero esta expresión regular encuentra también los caracteres que están antes y después. Si quisiéramos obtener el nombre de la variable en cada coincidencia, no podríamos. Porque, por ejemplo, para la entrada `int value = 1;` encuentra `t value `. Trae una `t` y dos espacios de más.

Si encerramos entre paréntesis la parte de la expresión que capturará sólo el nombre de la variable habremos definido un grupo de captura. La nueva `regex` sería `/[a-z>]\s(\w+)[\s;]/` ya que sólo nos interesa agrupar y acceder a los caracteres de palabra y no a la letra y espacio que está antes ni al espacio o punto y coma posteriores.

Pero hasta aquí, dependiendo de cómo utilizamos nuestra `regex`, es posible que no veamos cambio alguno. Es que las expresiones regulares nos pueden servir para tres cosas: validar que una cadena cumple cierto formato, encontrar subcadenas con cierta lógica y hacer reemplazos dentro de un texto. Para el primer uso los grupos de captura no aportan valor agregado. En los otros dos casos sí porque en una búsqueda voy a poder acceder a todos los grupos de captura que haya definido una vez que la expresión regular coincidió satisfactoriamente en el texto de entrada. Y en un reemplazo voy a poder reutilizar el contenido de los grupos de captura en la especificación del reemplazo.

### Uso en reemplazos

Empiezo por este caso de uso debido a que es el más común si tomamos en cuenta el uso de expresiones regulares tanto en programación como en herramientas que soportan su uso. Un procesador de texto digno nos permitirá hacer búsquedas y reemplazos interpretando nuestra entrada como una expresión regular. Y en esta situación los grupos de captura sólo  tendrán sentido cuando hacemos reemplazos. En cambio en el caso de uso de una regex en un programa tenemos la posibilidad de aprovecharlos en ambos casos.

En el primer artículo dije que una **regex** siempre está encerrada entre dos barras pero eso no es cierto. Cuando escribimos una regex de reemplazo utilizamos una barra más para separar la expresión regular de búsqueda de la parte que indica con qué vamos a reemplazar. Así que es estándar escribir una expresión regular de reemplazo como `/regex/reemplazo/` donde la primera parte es una expresión tal como las que hemos aprendido hasta aquí. Y la segunda es (en principio) una cadena de texto literal con lo que reemplazamos lo encontrado por la primera parte.

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

Pero si utilizamos grupos de captura para reproducir el contexto (los caracteres antes y después del nombre de variable) en la salida podemos reemplazar sólo la parte que nos interesa. Así que cambiamos la regex a `/([a-z>]\s)\w+([\s;])/$1xyz$2/` y el código reemplazado queda:

{{< highlight java >}}
...
int xyz = 1;
String xyz;

if (condition.equals("value")) {
  HashMap<Integer, String> xyz = new HashMap();
}
...
{{< /highlight >}}

Si bien este reemplazo puede no tener sentido para el código de ejemplo, nos sirve para ilustrar el uso de la **regex**. En primer lugar definimos dos grupos de captura: uno que atrapa los dos caracteres que coincidimos antes de `\w+` y otro que agrupo el caracter que coincidimos después (que puede ser un espacio o un punto y coma). Ese es el único cambio en la primera parte. Ahora en la segunda parte agregamos `$1` y `$2`. Esta es la forma (o una de las formas) en que decimos que se debe escribir en esa parte del reemplazo lo que sea que se haya capturado en el grupo. Y el número indica al grupo según el orden de aparición en la **regex** (`$1` es el primer paréntesis y `$2` el segundo).

> Si bien dijimos que los grupos de captura se numeran según el orden de aparición. La numeración se puede complicar si anidamos grupos de captura (lo que es completamente válido y puede ser muy útil). En el estándar que utilizo cada paréntesis que se abre recibe el siguiente número de grupo. Pero esto podría variar en otro estándares. También existen herramientas que utilizan una barra invertida seguida del índice de grupo en lugar del signo pesos, resultando en `/([a-z>]\s)\w+([\s;])/\1xyz\2/`.



---
[Imagen de xkcd.com](https://geek-and-poke.com/geekandpoke/2013/12/3/yesterdays-regex) (https://xkcd.com/1171/) bajo licencia [CC-BY-NC2.5](https://creativecommons.org/licenses/by-nc/2.5/) reformateada para este sitio.

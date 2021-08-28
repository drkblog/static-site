---
title: ¡Basta de temerle a las regex! - Parte 2
author: Leandro Fernandez
type: post
date: 2021-08-28
cover: "/2021/08/yesterdays-regex.jpg"
categories:
  - Programación
tags:
  - regex
  - java
---

En la [primera nota sobre expresiones regulares]({{< relref path="/content/posts/2021/08/regex.es.md" lang="es" >}}) vimos cómo podemos escribir una regex que coincida caracteres específicos (o grupos de caracteres) en ciertas posiciones. De manera que es múy fácil crear una **regex** que encuentra una `x` seguida de un espacio en blanco, seguida de una `y`. Pero qué si necesitamos encontrar una `a` seguida de entre cuatro y seis dígitos, seguidos de una `b`. Esto es posible y vamos a ver cómo se hace.

---

### Coincidir un número variable de caracteres

Con lo que aprendimos en la primera parte estamos obligados a indicar qué queremos aceptar en cada posición de la subsecuencia de caracteres que buscamos. Pero si quier escribir una **regex** que encuentre declaraciones de variables en un código fuente de Java no hay forma de saber qué cantidad de caracteres va a tener el nombre de la variable. Tomemos el siguiente código:

{{< highlight java >}}
...
int value = 1;
String text;

if (condition.equals("value")) {
  HashMap<Integer, String> map = new HashMap();
}
...
{{< /highlight >}}

Para pensar un regex debo observar detenidamente en qué contexto aparece lo que busco. El nombre de una variable (en especial en el código de ejemplo) es una secuencia variable de letras minúsculas. Si simplemente esa condición fuese suficiente (no lo és, pero a los fines de aprender hagamos el ejercicio) podría escribir `/\w+/`. Ya sabemos que `\w` representa cualquier caracter válido de palabra. Es decir las letras del abecedario. El signo más se interpreta como cuantificador (indicador de cantidad), y puntualmente éste indica que aceptaremos uno o más caracteres. Es decir que coincidirá `a` en `2a3`, `aa` en `2aa3`, `abcde` en `*abcde-`. No necesito escribir una, dos o cinco veces `\w`. Puedo usar el `+` para indicar que acepto cualquier cantidad de letras (pero al menos una). Y puedo aplicar el cuantificador a literales de manera que `/x+y+z+/` encontrará una secuencia de `x` seguida de una secuencia de `y` seguida de una de `z`. Por ejemplo `xyz`, `xxxyyzzzz`, pero no `xzz` porque no hay al menos una `y` entre la `x` y las `z`. Pero si utilizo esta **regex** en el código de ejemplo coincidirá cualquier secuencia de letras. Además de `value`, `text` y `map` que son las que me interesan, coincidirá `new`, `condition` y cualquier otra. Entonces nuestra regex es por el momento muy permisiva.

Para restringir lo que la regex pueda encontrar tendré que especificar qué cosas pueden estar alrededor de la secuencia de palabras. Si observamos el código vemos que delante de los nombres de variables siempre hay un espacio. Pero también hay un espacio delante de `HashMap` y de `new`. Sin embargo si especificamos lo que puede haber a continuación tenemos que los caracteres posibles en los casos que nos interesa coincidir son un espacio o un punto y coma. Si cambiamos la regex original a `/\s\w+[\s;]/` vamos a obtener menos coincidencias pero todavía alguna que no deseamos. Ya que `new` y `String` aparecerán entre las coincidencias porque están rodeadas de caracteres considerados espacios en blanco. Antes de continuar la evolución de nuestra expresión regular tenemos que explicar qué función cumplen los corchetes. Nuestra última versión de regex comienza con un `\s` sin cuantificador, lo que coincidirá un espacio en blanco exactamente. Sigue con `\w+` lo que coincidirá una o más letras y termina con `[\s;]` sin cuantificador. Lo que coincidirá exactamente un espacio en blanco o un punto y coma. Esta nueva estructura (uno o más literales encerrados entre corchetes) coincide cualquiera de los literales dentro de los corchetes en esa posición. Sin cuantificador coincidirá uno de todos los posibles y nada más. Es decir que `/[xyz]/` coincidirá sólo la `y` en la secuencia `ayzzza`. Para que coincida las tres `z` siguientes debería poner un cuantificador, por ejemplo `/[xyz]+/`. Para ver más cuantificadores referirse a la [tabla de cuantificadores más comunes](#cuantificadores-más-usados).

### Más sobre los corchetes

Aunque no lo necesitamos para evolucionar nuestra regex vale la pena hacer una pausa para aprender un poco más sobre los corchetes. Si bien los hemos usado como una lista dentro de la cual puedo poner una cantidad de literales o [meta secuencias]({{< relref path="/content/posts/2021/08/regex.es.md#algunas-meta-secuencias-típicas" lang="es" >}}) y sólo coincidirá una de ellas, tiene la capacidad de manejar rangos.

Si por ejemplo quiera capturar una fecha desconocida pero con un formato español `DD-MM-AAAA` donde el día tiene dos cifras, el mes tiene dos cifras y el año tiene cuatro. Y sabiendo que esa fecha es al menos del año 2000, puedo escribir `/[0-3]\d-[01]\d-[2-9]\d{3}/` donde espero encontrar un dígito entre 0 y 3 seguido de un dígito (del 0 al 9) para el día, un guion, un dígito que sólo puede ser 0 o 1 seguido de otro cualquiera para el mes, seguido de un guion, un dígito entre 2 y 9 y luego tres dígitos cualesquiera. Aquí aprovecho que los días pueden tener como mucho un tres en el primer dígito, los meses un 1, para evitar leer fechas en formato `MM-DD-AAAA`. Esto no será completamente útil ya que sólo no coincidirá si en la cuarta posición hay un número mayor o igual a dos. Algunas fechas en formato americano no cumplen eso. Es decir, no hay forma de distinguir si `03-10` es día 10 de marzo o día tres de octubre. Pero detectará fechas con días del 20 en adelante. Y a poner que el primer dígito del último grupo tiene que ser entre 2 y 9 evito tomar casos como `21-10-1999`. Estos rangos también funcionan con otros caracteres, entonces `/[0-9a-f]{2}/` coincidirá un número hexadecimal de dos cifras como `e2` o `38` ya que espera encontrar dos caracteres del `0` al `9` o de la `a` a la `f`. No coincidirá `F3` porque las regex distinguen entre mayúsculas y minúsculas así que puedo arreglar esa regex así: `/[0-9a-fA-F]{2}/`. Con esto queda claro que dentro de los corchetes puedo poner literales, meta secuencias y rangos, y puedo poner varios de ellos.

### Terminemos de evolucionar la regex

Habíamos llegado a que `/\s\w+[\s;]/` podía coincidir secuencias de letras en cierto contexto pero todavía es demasiado amplia e incluye casos que no queremos. Así que trataremos de poner un poco más de contexto. Limitemos no sólo el caracteres que puede estar adelante de la palabra sino el anterior también. Si miramos lo casos `value`, `text` y `map` en el código:

{{< highlight java >}}
...
int value = 1;
String text;

if (condition.equals("value")) {
  HashMap<Integer, String> map = new HashMap();
}
...
{{< /highlight >}}

Vemos que delante del espacio siempre hay una letra o un signo mayor. Aquí podemos usar los corchetes nuevamente y tendremos `/[a-z>]\s\w+[\s;]/` y eso impedirá que coincida `new` porque delante de él hay un espacio, pero antes un signo igual. Y nuestra regex dice que sólo vale una letra o un mayor (`>`). Eso ocurre en el caso de `value` y `text` porque hay una letra `t` y una `g` respectivamente, y en `map` porque hay un `>`. Y esas tres son las únicas coincidencias para esta expresión regular. Pero es importante entender que al agregar este contexto a la regex estamos variando cuánto del texto de entrada se considera la captura de la regex. Este concepto no lo mencionamos hasta el momento pero lo veremos más adelante. Sin embargo no puedo dejar de mencionar que existe. Ya que cuando usamos una expresión regular queremos hacer algo con la coincidencia. La herramienta que usemos nos dirá si existe una o más coincidencia para nuestra regex en el texto. Pero también nos dirá donde están para que podamos hacer algo con ella. O incluso podemos pedirle al motor de regex que directamente haga un reemplazo. Cosa que también aprenderemos luego. Pero si nosotros usamos la regex que obtuvimos y le pedimos que al motor que haga un reemplazo por `xyz` obtendremos:

{{< highlight java >}}
...
inxyz= 1;
Strinxyz

if (condition.equals("value")) {
  HashMap<Integer, Stringxyz= new HashMap();
}
...
{{< /highlight >}}

Antes de seguir leyendo tomate un minuto para pensar qué ocurrió allá y por qué. Es posible que lo deduzcas.

Dado que el contexto es parte de la expresión, el reemplazo incluye esos caracteres que agregamos adelante y atrás de lo que nos interesaba originalmente, que eran los nombres de variable. Así entonces la `t` y el espacio en blanco delante de `value` y el espacio en blanco detrás son reemplazados por `xyz` quedando `inxyz= 1;`. Esto tiene solución y la aprenderemos en el siguiente artículo.

> **Cuidado:** Si bien nuestra regex sirve para encontrar nombres de variables en la porción de código presentada como ejemplo, seguramente fallaría si incluyéramos más código Java donde los nombres de variable aparezcan en otras circunstancias no contempladas por nuestra regex. También es cierto que no sabemos si `condition` en el código de ejemplo es una variable o un atributo. Y arbitrariamente la dejé afuera pero eso sería objetable si nuestra regex fuera a usarse en la vida real.

#### Cuantificadores más usados

| Cuantificador | Significado |
| --- | --- |
| `?` | Cero o uno |
| `*` | Cero o más |
| `+` | Uno o más |
| `{n}` | Exactamente n (Por ejemplo `{4}`) |
| `{n,}` | n o más (Ejemplo `{2,}`) |
| `{n,m}` | Entre n y m (`{3,5}` cincidirá entre tres y cinco caracteres) |


## Conclusión

Aprendimos a expresar cantidades variable de caracteres para una posición en nuestras *regex*. Y experimentamos la evolución de una expresión regular que nos permitió capturar palabras dentro de un contexto (caracteres específicos delante y detrás de ella). Pero también sabemos que ese contexto es considerado parte de la coincidencia y puede que necesitamos evitar eso. Sabemos que es posible pero aprenderemos a hacer en la continuación de este artículo.

---
[Imagen de geek-and-poke.com](https://geek-and-poke.com/geekandpoke/2013/12/3/yesterdays-regex) bajo licencia [CC-BY3.0](https://creativecommons.org/licenses/by/3.0/) reformateada para este sitio.

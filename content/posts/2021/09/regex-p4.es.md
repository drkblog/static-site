---
title: ¡Basta de temerle a las regex! - Parte 4
author: Leandro Fernandez
type: post
date: 2021-09-03
cover: "/2021/09/regex-meme.jpg"
categories:
  - Programación
tags:
  - regex
  - java
---

En la [nota anterior sobre expresiones regulares]({{< relref path="/content/posts/2021/09/regex-p3.es.md" lang="es" >}}) explicamos cómo definir grupos de captura en nuestra expresión regular para enfocarnos en una o más partes de nuestra **regex** y al mismo tiempo poder ignorar otras que estamos forzados a incluir para asegurarnos de encontrar lo que buscamos. Y con eso cubrimos las tres patas fundacionales de las expresiones regulares: coincidencia de caracteres (con literales y metasecuencias), cuantificadores y grupos de captura. Estas herramientas nos permitirán escribir una cantidad más que digna de regex. Pero en pos de hacer el aprendizaje accesible hemos dejado varios detalles de lado. Vamos a empezar a cubrir esas áreas a partir que ahora.

---

## Coincidencia desde el principio y hasta el final

Salvo algunas excepciones, siempre que utilizamos una regex obtendremos un resultado exitoso si esta coincide al menos en una porción del texto de entrada. Por ejemplo `/cuantas/` coincidirá exitosamente al se aplicada a `unas cuantas palabras` aún cuando la expresión no tiene descripto coincidir espacios ni los caracteres que están antes y después de "cuantas". Pero qué ocurre si nuestra intención es encontrar la palabra "cuantas" solamente si está al principio del texto como en `cuantas y cuantos`. Y no queremos que coincida en el texto de ejemplo del principio de este párrafo.

Tenemos que utilizar el símbolo de anclaje `^` (circunflejo) que indica el principio del texto. Entonces nuestra regex se transformará en `/^cuantas/` y sólo será exitosa si se aplica a una cadena que comience con esa palabra. Si en cambio nos interesa que esa palabra sea encontrada sólo si está al final podemos usar el anclaje `$` de forma que `/cuantas$/` ya no sería exitosa en ninguno de los textos de ejemplo anteriores, pero sí en `son unas cuantas`.

Desde luego que podemos combinar estos anclajes con lo que aprendimos anteriormente. Entonces si quisiéramos capturar el contenido de oraciones que comienzan con `Las` y terminan con `verdes.` podríamos escribir `/^Las (.*?) verdes.$/` y aplicarlo a cada línea en:

```
Las casas verdes.
Los cascos verdes.
Las hojas que no son verdes.
```

Sólo coincidiría en la primera y la tercera. Y el grupo de captura valdría `casas` y `hojas que no son` respectivamente.

## Invertir la lógica de los corchetes

Otro detalle que quedó fuera cuando expliqué el uso de corchetes para coincidir uno de varios caracteres o meta secuencias es la negación. En ocasiones es mucho más fácil describir los caracteres que queremos en una posición indicando los que no queremos. Por ejemplo podríamos necesitar encontrar números que no tengan ningún dígito en `5` en una entrada que tiene sólo números y con los conocimientos que tenemos hasta aquí lo expresaríamos como `/[0-46-9]+/` porque indicaríamos los dos rangos que sí aceptamos (del cero al 4 y del 6 al nueve) pero en cambio podemos expresarlo por el opuesto diciendo `/[^5]+/` que significa cualquier caracter excepto el `5`. Pero cuidado que esto sirve porque dijimos que la entrada son sólo números. Si en la entrada hubiese cualquier otro caracter que no sea un dígito decimal también coincidiría con la lógica "_cualquier caracter que no sea 5_".

El circunflejo niega el total del contenido de los corchetes. Es decir que si escribimos `/[^aeiouAEIOU]{3}/` va a coincidir tres caracters que no sean vocales. Eso incluye consonantes y cualquier otro caracter. Y si escribimos `/[^a-zA-Z]+/` coincidirá uno o más caracteres que no sean letras.

### Inversión de meta secuencias

La inversión vale también para meta secuencias. Por lo que `/[^\w]/` coincidirá cualquier caracter que no sea de palabra. Pero muchas meta secuencias tiene una meta secuencia opuesta con nombre propio y que suele ser la letra mayúscula que corresponde a la meta secuencia original. Entonces la regex anterior es idéntica a `/[\W]/` y la ventaja es que no tengo que definir todo el corchete como negado. Y puedo especificar la coincidencia de un caracter que no sea de palabra o una `x` escribiendo `/[\Wx]/`.

## Grupo sin captura

En ocasiones podemos utilizar un grupo y no estar interesados en la captura. Por ejemplo si queremos coincidir números con una cantidad par de dígitos podríamos usar un grupo así `/^(\d{2})+$/gm` para indicar que la coincidencia de dos dígitos `\d{2}` puede repetirse una o más veces `(...)+` y esto coincide desde el principio al final de la línea (por el indicador `m` al final). El indicador `g` permite que la regex coincida más de una vez en el texto de entrada. Pero el problema es que esos pares de dígitos agrupados ocuparían memoria del motor de regex y utilizarían índices para poder ser referenciados cuando no lo agregué con ese fin. 

Podemos definir un grupo que no se capturará con la construcción `(?:...)`. Es decir simplemente iniciando lo que está dentro de los paréntesis con `?:` y la expresión quedará `/^(?:\d{2})+$/gm`.

## Conclusión

Con este breve extra terminamos de aprender algunos detalles que sumados al contenido de las tres primeras partes no dan la posibilidad de escribir expresiones regulares medianamente simples pero con utilidad real. Para demostrar esta afirmación escribamos una expresión que coincida el dominio de una URL que sería válida en un navegador de internet. Vamos a limitar la validación a los siguientes casos para mantener el ejemplo acotado que aceptar las primeras cuatro líneas y rechazar las cuatro últimas:

```
http://www.drk.com.ar
https://www.drk.com.ar
https://www.drk.com.ar/
https://www.dr-k.com.ar/
...
https://www.ddk-.com.ar
https://www.-ddk.com.ar
http://.ddk.com.ar/
https://aew.ddk.com.
```

Que lograríamos con `/^http[s]?:\/\/(?:\w+[\w-]*\w+\.?)+(?:\w+[\w-]*\w+)\/?$/` donde:

- `^` obliga a coincidir desde el principio.
- `http` es literal así que serán los cuatro primeros caracteres de cualquier coincidencia.
- `[s]?` coincide cero o una `s`
- `:\/\/` literalmente coincide `://` sólo que tenemos que escapar la barra.
- `(?:\w+[\w-]*\w+\.?)+` este grupo no capturante podrá aparecer uno o más veces y es para capturar todas las partes del dominio salvo la última.
    - `\w+` una o más letras
    - `[\w-]*` cero o más letras o guiones
    - `\w+` una o más letras
    - `\.?` cero o un punto
- `(?:\w+[\w-]*\w+)+` este grupo es igual al anterior pero no admite un punto al final y es para capturar la última parte del dominio
- `\/?` opcionalmente una barra
- `$` obliga a coincidir hasta el final

En las siguientes notas de esta serie vamos a realizar otros ejercicios con los conocimientos adquiridos y luego iremos incorporando algunos nuevos. También veremos que la expresión que acabamos de presentar no contempla que el máximo de caracteres de una parte del nombre de dominio es 63 y que no puede haber un guion en la tercera y cuarta posición al mismo tiempo. Y cómo solucionarlo.



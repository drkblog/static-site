---
title: ¡Basta de temerle a las regex! - Parte 4
author: Leandro Fernandez
type: post
date: 2021-09-01
cover: "/2021/09/xkcd-1171.png"
categories:
  - Programación
tags:
  - regex
  - java
draft: true
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

## Conclusión


---
[Imagen de xkcd.com](https://geek-and-poke.com/geekandpoke/2013/12/3/yesterdays-regex) (https://xkcd.com/1171/) bajo licencia [CC-BY-NC2.5](https://creativecommons.org/licenses/by-nc/2.5/) reformateada para este sitio.

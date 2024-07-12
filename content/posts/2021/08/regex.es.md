---
title: ¡Basta de temerle a las regex!
author: Leandro Fernandez
type: post
date: 2021-08-25
cover: "/2021/08/stop-fearing-regex.png"
categories:
  - Programación
tags:
  - regex
  - java
---

> ¡No es chiste! Los desarrolladores le temen a las **expresiones regulares**. Y sí, lo entiendo. Se ven horrible. Pero son poderosas.

Y es mucho más difícil leerlas que escribirlas. Lo que no es ideal. Pero al menos te podés beneficiar escribiendo **regex** aquí y allá. Posiblemente sea buena idea documentarlas con un comentario significativo en el código para tu futuro yo. Aprender a escribir algunas regex simples y, aún así, poderosas no es imposible y estoy escribiendo este artículo para probarlo.

## Prefacio

Hay al menos cuatro estándares en uso para **regex**:

- POSIX BRE (_Basic Regular Expressions_)
- POSIX ERE (_Extended Regular Expressions_)
- Perl
- _Perl Compatible Regular Expressions_

Hasta donde sé todos estos tienen diferencias pero también son muy similares y basado en mi experiencia, cada lenguaje o herramienta utiliza uno de estos o una variante de los mismos. Nunca traté de aprender cada uno. Usé **PCRE** (Perl Compatible Regular Expressions) por años y siempre me las arreglé para hacer funcionar los otros cuando lo necesité, leyendo la documentación. Por eso no voy a entrar en detalles sobre los estándares y usaré para este articulo las que funcionan con **Java** ya que mucho del contenido del este sitio se refiere a **Java**.

Para seguir este artículo ter recomiendo tener una herramienta para probar el conocimiento que adquirís mientras leés. Si querés aprender **regex** para una herramienta o lenguaje específicos tal vez quieras usar eso. Pero puede que el estándar que soporte no coincida con el usado aquí. Podés buscar "online regex" en _Google_ y obtendrás un montón de opciones. Usá la que más te guste.

## Empecemos

En Perl tenes que escribir las regex encerradas entre barras como `/[0-9]+/`, lo que implica que nada antes de la primera barra o después de la última son parte de la regex. Podés escribir hasta siete indicadores después de la última barra `/[0-9]+/gmisxuU` donde, por ejemplo, `m` quiere decir multilínea y permitirá que la regex coincida más de una línea (lo que no es el comportamiento por defecto). Algunas herramientas o lenguajes hacen que estas barras sean opcionales y reciben los indicadores por otro lado.

### La regex más simple

La **expresión regular** más simple que podé escribir es un literal. Una regex va a coincidir literalmente si escribís cualquier cosa que no sea significativa para el motor de expresiones regulares. Si querés encontrar la palabra ejemplo podés escribir `/ejemplo/` y esto coincidirá la palabra en una cadena como `"Esto es un ejemplo"` y también en `"unejemplosinespacios"`.

Acabás de aprender tu primer expresión regular. Y podrías argumentar que no necesitás aprender regex para poder buscar una palabra literal en una cadena. Fácilmente podés crear un algoritmo que encontraría una palabra en una cadena en tu lenguaje de programación preferido o utilizar una herramienta que te permite buscar una palabra. Y es correcto. Vas a usar regex cuando la lógica de búsqueda sea más compleja. No querés el costo extra que imprime un motor de expresiones regulares si estás buscando algo literal.

Este es un punto muy importante. Las regex son costosas en cuanto al uso de CPU. Tenés que estar atento a eso. Todo ese poder viene con un precio a pagar. Si vas a usar una regex en un bucle que se ejecutará muchas veces por segundo tal vez quieras buscar una alternativa.

### Una más útil

Hemos visto como la regex `/ejemplo/` coincidiría la palabra _ejemplo_ como secuencia de caracteres en una cadena como `"unejemplosinespacios"`. Qué pasa si querés encontrar la palabra ejemplo. En el sentido de una palabra en un texto. Hay una regex adecuada para ese caso pero aprendamos mientras llegamos a ella. Podríamos inocentemente agregar espacios antes y después de la palabra en la regex porque sabemos que los literales van a ser encontrados como tales. Tendríamos entonces `/ ejemplo /` que ya no coincidiría en `"unejemplosinespacios"`. Ahora coincidiría en una cadena como `"otro ejemplo aquí"` pero qué si tuviésemos tabulaciones en vez de espacios. En este punto los literales en regex se vuelven inútiles. Pero existen las **meta secuencias (meta sequences)** que coincidirán más de un caracter con un criterio específico. Para coincidir **espacios en blanco** en el más amplio sentido de la frase podemos poner `\s` en nuestra regex donde quiera que deseemos coincidir un caracter que se pueda interpretar como espacio en blanco. Cambiando nuestra regex a `/\sejemplo\s/` coincidirá la palabra ejemplo precedida y seguida por un espacio en blanco, una tabulación o incluso el fin de línea.

Hemos obtenido nuestra primera **expresión regular** útil pero puede ser mejorada porque esta no coincidiría en una cadena como `un ejemplo.` o `ejemplo de`. El punto y los límites de la cadena no se consideran espacios en blanco. Por suerte hay otra meta secuencia `\b` que específicamente coincide los límites de una palabra. Y convertir nuestra regex en `/\bejemplo\b/` lo resolverá. Ahora, tenés que reconocer que programar este típo de búsqueda manualmente es factible pero llevaría mucho más trabajo que una búsqueda literal.

> Hasta aquí hemos aprendido dos símbolos reservados para expresiones regulares: la barra `/` y la barra invertida `\`. Siempre que tengamos que coincidir estos u otros símbolos reservados literalmente deberemos _escaparlos_ un una barra invertida. Para coincidir una barra o una barra invertida escribiremos `/\//` y `/\\/` respectivamente.

#### Algunas meta secuencias típicas

| Meta secuencia | Coincide |
| --- | --- |
| `.` | Cualquier caracter |
| `a\|b` | `a` o `b` (literal) |
| `\s` | Cualquier espacio en blanco |
| `\S` | Cualquier caracter que no sea espacio en blanco |
| `\d` | Cualquier dígito |
| `\D` | Cualquier caracter que no sea dígito |
| `\w` | Cualquier caracter de palabra |
| `\W` | Cualquier caracter que no sea de palabra |

## Conclusión

La intención es que este sea el primero de varios textos cubriendo **expresiones regulares**. Dependiendo de cuándo leas este artículo los que continúan pueden estar publicados ya o no. Veamos qué se puede hacer con lo que aprendimos hasta ahora.

Tomemos el siguiente texto como ejemplo:

> Albert Einstein; (14 March 1879 – 18 April 1955) was a German-born theoretical physicist, widely acknowledged to be one of the greatest physicists of all time.

Y escribamos algunas regex para capturar partes arbitrarias del mismo.

| Capturar... | Regex |
| --- | --- |
| Años | `/\d\d\d\d/` |
| Días | `/\D\d\d\D/` |
| La palabra `the` | `/\bthe\b/` |
| Cualquier secuencia `the` | `/the/` |
| Cualquier día de abril | `/\d\d\sApril/` |
| Todas las palabras de tres letras | `/\b\w\w\w\b/` |

Luego veremos que muchas de [estas expresiones pueden reescribirse en forma más concisa y flexible]({{< relref path="/posts/2021/08/regex-p2.es.md" lang="es" >}}).

---
[Imagen de xkcd](https://xkcd.com/208/)

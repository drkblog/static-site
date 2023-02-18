---
title: Closure en Javascript
description: Qué es un closure en Javascript
author: Leandro Fernandez
type: post
date: 2023-02-16
slug: javascript-closure
cover: "/logo/js.png"
categories:
  - Programación
tags:
  - programación
  - javascript
---

💡 ¿Qué salida veremos si ejecutamos esta porción de Javascript? ¿Por qué?

{{< highlight javascript "linenos=table" >}}
function createCounter(n) {
  return function() {
    return n++;
  }
}

const counter = createCounter(0);

console.log(counter());
console.log(counter());
console.log(counter());
{{< /highlight >}}

La  explicación de la salida que veremos radica en el concepto de closure que  existe en Javascript. Closure es el paquete formado en Javascript por una función y el entorno que la rodea. Las variables  externas a las que tiene acceso.

Ese código imprimirá en pantalla:

{{< highlight "linenos=table" >}}
0
1
2
{{< /highlight >}}

Porque la función `createCounter(n)` retorna una función anónima que tiene acceso al argumento n con el que se llamó a `createCounter`. Javascript guarda la variable `n` en un bundle junto a la función retornada. Ese paquete se llama `closure`.

✅ Un closure es una función que "recuerda" las variables que estaban disponibles en el ámbito en el momento en que fue creada, incluso si la función se ejecuta en un ámbito diferente. En otras palabras, un closure permite que una función tenga acceso a las variables y argumentos de otra función que la rodea, incluso después de que la función externa haya terminado de ejecutarse.

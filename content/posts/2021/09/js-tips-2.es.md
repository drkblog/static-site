---
title: Consejos rápidos para Javascript II
description: Las cosas que tenés que saber para mejorar tu rendimiento
author: Leandro Fernandez
type: post
date: 2021-09-28
cover: "/2021/09/js.jpg"
categories:
  - Programación
tags:
  - javascript
---

Este artículo no es una guía para aprender **Javascript**. Es una lista breve de consejos útiles para programadores que utilizan **Javascript**. Incluso aquellos que recién comienzan.

## let y const vs var

Ya mencionamos anteriormente que no hay que utilizar `var`. A partir del estándar **ECMAScript 2015 (ES6)** existen `let` y `const` para declarar variables y constantes con alcance de bloque. Veamos un ejemplo práctico de cómo esto nos ayuda a detectar errores más temprano. Veamos el siguiente código que utiliza `var`:

{{< highlight javascript "linenos=table" >}}
function operation(aggregation) {
  var values = [1, 2, 3];
  var message = 'Result = ';

  if (aggregation === 'min') {
    var result = Math.min(...values);
    message = message + result;
  } else if (aggregation === 'max') {
    var reslut = Math.max(...values);
    message = message + result;
  } else if (aggregation === 'sum') {
    var result = values.reduce((acc, value) => {
      return acc + value;
    }, 0)
    message = message + result;
  }

  console.log(message);
}
{{< /highlight >}}

Las líneas 6, 9 y 12 declaran una variable que sólo se utiliza dentro del bloque. Es para almacenar temporalmente el resultado de la operación. Y luego concatenarlo en el mensaje. Pero este código tiene un error en la línea 9 donde la variable declarada fue escrita como `reslut`. Por lo que no es utilizada en la concatenación de la línea 10. Sin embargo el intérprete no muestra ningún tipo de error. Y esto es debido al _hoisting_.

En **Javascript** existe un comportamiento llamado _hoisting_ que consiste en mover todas las declaraciones de variables y funciones al inicio del script o de la función actual. Por lo tanto aunque en la línea 9 hay un error de tipeo la variable `result` existe porque la declaración de la línea 6 se mueve (internamente a nivel del intérprete) al inicio de la función `operation()`. Entonces está presente en todos los bloques `if`. Cuando el intérprete ejecuta la línea 10 no se queja porque la variable result existe. Sólo que no tendrá valor definido porque no se habrá ejecutado la línea 6. Cuando se mueve la declaración de la variable al principio no se mueve su inicialización. Esta permanece en su lugar.

Este comportamiento es muy problemático porque eclipsa errores de programación que de otra forma podrían detectarse y corregirse más temprano. Afortunadamente a partir de **ECMAScript 2015 (ES6)** lo podemos evitar.

{{< highlight javascript "linenos=table,hl_lines=10" >}}
function operation(aggregation) {
  const values = [1, 2, 3];
  let message = 'Result = ';

  if (aggregation === 'min') {
    let result = Math.min(...values);
    message = message + result;
  } else if (aggregation === 'max') {
    let reslut = Math.max(...values);
    message = message + result;
  } else if (aggregation === 'sum') {
    let result = values.reduce((acc, value) => {
      return acc + value;
    }, 0)
    message = message + result;
  }
  console.log(message);
}
{{< /highlight >}}

Al utilizar `let` el intérprete se encuentra con que la variable `result` no existe en la línea 10. Esto presenta un error detectable y nos permite solucionarlo. Ahora la variable result sólo existe en los bloques de las líneas 6, 7 y 12, 13, 14, 15. Además son dos variables realmente distintas.
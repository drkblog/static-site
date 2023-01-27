---
title: Lo básico de Javascript
description: Qué tengo que aprender de Javascript si ya soy programador
author: Leandro Fernandez
type: post
date: 2023-01-26
slug: javascript-basico
cover: "/logo/js.png"
categories:
  - Programación
tags:
  - programación
  - javascript
---

## Los principales conceptos a aprender

✅ Variables: lugares de almacenamiento para valores que pueden ser accedidos y modificados por el programa.

✅ Tipos de datos: el tipo de valor que almacena una variable, como una cadena, número o booleano.

✅ Operadores: símbolos que realizan operaciones en uno o varios valores, como la adición o comparación.

✅ Sentencias condicionales: estructuras de control que permiten que el programa tome decisiones basadas en ciertas condiciones.

✅ Bucles: estructuras de control que permiten que el programa repita un bloque de código varias veces.

✅ Funciones: bloques de código reutilizables que se pueden llamar varias veces con diferentes entradas.

✅ DOM (Modelo de Objeto del Documento): la estructura de una página web y la forma en que JavaScript puede acceder y manipular el contenido y diseño de la página.

✅ Eventos: acciones o ocurrencias que suceden en el navegador, como un clic de botón o carga de página, que se pueden utilizar para activar código JavaScript.

✅ Programación orientada a objetos (POO): un paradigma de programación que organiza el código en objetos que tienen propiedades y métodos.

✅ ES6: la última versión de JavaScript, que introdujo nuevas características como funciones flecha, literales de plantilla y desestructuración.

### Variables

En **JavaScript**, una variable es un espacio en la memoria del ordenador donde se puede almacenar un valor. Las variables se pueden declarar utilizando la palabra clave `var`, `let` o `const` y se pueden asignar un valor utilizando el operador de asignación "=".

Por ejemplo:

{{< highlight javascript "linenos=table" >}}
var x = 5;
let y = 10;
const z = 15;
{{< /highlight >}}

La diferencia entre `var`, `let` y `const` es el alcance y la capacidad de reasignación.

`var` tiene un alcance global o de función y se puede reasignar.
`let` tiene un alcance de bloque y se puede reasignar.
`const` tiene un alcance de bloque y no se puede reasignar.
Es recomendado utilizar `let` y `const` en lugar de `var` para evitar problemas con el alcance y la reasignación accidental.


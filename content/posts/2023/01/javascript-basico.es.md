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

### Tipos de dato

**JavaScript** es un lenguaje de programación con tipado dinámico, lo que significa que las variables no tienen que ser declaradas con un tipo específico de datos y pueden cambiar a diferentes tipos de datos a lo largo del tiempo.

Los tipos de datos en JavaScript incluyen:

✅ `number`: para números, tanto enteros como de punto flotante.

✅ `string`: para cadenas de caracteres.

✅ `boolean`: para valores verdadero o falso.

✅ `object`: para objetos, que pueden tener propiedades y métodos.

✅ `function`: para funciones, que son bloques de código que se pueden ejecutar.

✅ `symbol`: Un tipo de datos reciente de javascript que representa un valor único e inmutable

✅ `undefined`: para valores que no han sido asignados o no existen.

✅ `null`: para valores que son explícitamente nulos.

**JavaScript** también proporciona una función built-in llamada typeof para determinar el tipo de una variable.

💡 Los tipos en JavaScript son utilizados para determinar el tipo de datos con el que se está trabajando, lo que permite al lenguaje realizar operaciones y funciones específicas en esos datos. Por ejemplo, si se tiene una variable con un tipo de número, se pueden realizar operaciones matemáticas con ella, mientras que si tiene un tipo de cadena, se pueden usar métodos para manipular y manipular la cadena.

Los tipos también ayudan a evitar errores en tiempo de ejecución al asegurarse de que el código está operando en los tipos de datos correctos. Si se intenta sumar un número con una cadena, el lenguaje devolverá un error en lugar de intentar realizar la operación y dar un resultado incorrecto.

Además, los tipos también son importantes para el proceso de inferencia de tipos en algunos sistemas de tipado estático como **TypeScript**, ya que ayudan a detectar posibles errores en el código antes de su ejecución.

### Operadores

Los operadores en JavaScript son símbolos especiales que se utilizan para asignar valores, comparar valores, realizar cálculos matemáticos, y para controlar el flujo de un programa.
Algunos ejemplos de operadores en **JavaScript** incluyen:

✅ Asignación: =, +=, -=, *=, /=, %=

✅ Comparación: ==, ===, !=, !==, >, <, >=, <=

✅ Matemáticos: +, -, *, /, %

✅ Lógicos: &&, ||, !

✅ Condicionales: ? :

✅ typeof

✅ instanceof

✅ in

✅ delete

✅ new

Cada uno de estos operadores tiene una función específica en el lenguaje y se utilizan de manera diferente. Por ejemplo, el operador de asignación se utiliza para asignar un valor a una variable, mientras que el operador de comparación se utiliza para comparar dos valores y determinar si son iguales o no.

💡 La precedencia de operadores es el orden en el que se evalúan los operadores en una expresión matemática o lógica. Los operadores con mayor precedencia se evalúan primero, seguidos por los operadores con menor precedencia.

En JavaScript, existe una jerarquía de operadores, donde algunos operadores tienen mayor precedencia que otros. Por ejemplo, los operadores matemáticos (como `+` y `*`) tienen mayor precedencia que los operadores de comparación (como `<` y `>`), y los operadores de comparación tienen mayor precedencia que los operadores lógicos (como `&&` y `||`).

🌟 Si se desea cambiar el orden de evaluación se pueden utilizar paréntesis para indicar la prioridad que se quiere dar a una expresión.

### Sentencias condicionales

Los condicionales en JavaScript permiten ejecutar código de manera condicional, es decir, dependiendo de si se cumple o no una determinada condición. Los condicionales más comunes son `if-else` y `switch-case`.

El condicional `if-else` se utiliza para ejecutar un bloque de código si se cumple una determinada condición, y otro bloque de código en caso contrario. Por ejemplo:

{{< highlight javascript "linenos=table" >}}
if (x > 5) {
  console.log("x es mayor que 5");
} else {
  console.log("x es menor o igual a 5");
}
{{< /highlight >}}

El condicional `switch-case` se utiliza para ejecutar un bloque de código dependiendo del valor de una variable. Por ejemplo:

{{< highlight javascript "linenos=table" >}}
switch (x) {
  case 1:
    console.log("x es 1");
    break;
  case 2:
    console.log("x es 2");
    break;
  default:
    console.log("x es otro valor");
}
{{< /highlight >}}

En ambos casos, la condición que se evalúa debe ser una expresión que devuelve un valor booleano (verdadero o falso).

Es importante mencionar que cualquiera de estos condicionales puede ser combinado con operadores lógicos (`&&`, `||`, `!`) para hacer comparaciones mas complejas.

### Bucles

Los bucles en JavaScript permiten ejecutar un bloque de código varias veces, dependiendo de una determinada condición. Los bucles más comunes son `for`, `while` y `do-while`.

El bucle `for` se utiliza para ejecutar un bloque de código un número determinado de veces. La sintaxis básica de un bucle `for` es la siguiente:

{{< highlight javascript "linenos=table" >}}
for (inicialización; condición; actualización) {
  // código a ejecutar
}
{{< /highlight >}}

Por ejemplo:

{{< highlight javascript "linenos=table" >}}
for (let i = 0; i < 5; i++) {
  console.log(i);
}
{{< /highlight >}}

El bucle `while` se utiliza para ejecutar un bloque de código mientras se cumpla una determinada condición. La sintaxis básica de un bucle `while` es la siguiente:

{{< highlight javascript "linenos=table" >}}
while (condición) {
  // código a ejecutar
}
{{< /highlight >}}

Por ejemplo:

{{< highlight javascript "linenos=table" >}}
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
{{< /highlight >}}

El bucle `do-while` es similar al bucle `while`, pero con una pequeña diferencia: se ejecuta al menos una vez antes de comprobar la condición. La sintaxis básica de un bucle `do-while` es la siguiente:

{{< highlight javascript "linenos=table" >}}
do {
  // código a ejecutar
} while (condición);
{{< /highlight >}}

Por ejemplo:

{{< highlight javascript "linenos=table" >}}
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
{{< /highlight >}}

Es importante mencionar que en todos estos bucles, la condición que se evalúa debe ser una expresión que devuelve un valor booleano (verdadero o falso), y que también se pueden utilizar las sentencias `break` y `continue` para controlar el flujo del bucle.

### Funciones

Una función es un bloque de código que se puede reutilizar varias veces. Las funciones pueden tomar entrada (conocida como parámetros) y pueden devolver una salida (conocida como valor de retorno). Las funciones se definen utilizando la palabra clave `función`, seguida de un nombre para la función, una lista de parámetros entre paréntesis y un bloque de código entre llaves. El código dentro de la función se puede ejecutar llamando a la función y pasando la entrada necesaria.
Ejemplo:

{{< highlight javascript "linenos=table" >}}
function sumar(a, b) {
   return a + b;
}

let resultado = sumar(3, 4);
console.log(resultado); // Salida: 7
{{< /highlight >}}

En este ejemplo, `sumar` es el nombre de la función, `a` y `b` son los parámetros, y el código dentro de las llaves se ejecuta cuando se llama a la función. La función toma dos valores de entrada (3 y 4), los suma y devuelve el resultado (7) que se almacena en la variable `resultado` y se imprime en la consola.


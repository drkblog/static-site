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

### DOM

El **Document Object Model** (DOM) es una representación en forma de árbol del documento **HTML** o **XML**. El DOM permite a los programas acceder y modificar el contenido, estructura y estilo de un documento.

El DOM se divide en varios niveles, cada uno de los cuales representa una parte diferente del documento. El nivel más alto es el documento en sí mismo, seguido de elementos como etiquetas, atributos y contenido de texto. Cada elemento del documento se convierte en un objeto en el DOM, y cada objeto tiene propiedades y métodos que se pueden utilizar para acceder y modificar el contenido del documento.

En JavaScript, el DOM permite interactuar con el HTML o XML, se puede acceder a los elementos del documento, modificar su contenido, añadir nuevos elementos y eliminar elementos existentes. También se pueden aplicar eventos a los elementos del DOM, como hacer clic en un botón o cambiar el valor de una caja de texto.

En resumen, el DOM es una interfaz de programación de aplicaciones (**API**) que permite acceder y manipular los elementos del HTML o XML, permitiendo que los programas interactúen con la estructura, estilo y contenido de un documento.

### Eventos

Los eventos son acciones o situaciones que ocurren en el navegador, como hacer click en un botón, cargar una página, mover el mouse, ingresar texto en un campo de formulario, etc. Los eventos permiten que los programas interactúen con el usuario y respondan a las acciones del usuario de manera adecuada.

Para manejar eventos en JavaScript, se utiliza el modelo de _handlers_ de eventos. Un handler de eventos es una función que se ejecuta cuando se produce un evento específico. Por ejemplo, se puede asignar un handler de eventos al botón de un formulario para que se ejecute una función específica cuando el usuario haga clic en el botón.

Existen varias formas de asociar eventos y _handlers_ de eventos a los elementos del DOM. Una forma común es utilizando el método addEventListener() en el elemento del DOM, el cual recibe dos parámetros: el tipo de evento y la función que atiende el evento.

Ejemplo:

{{< highlight javascript "linenos=table" >}}
let button = document.getElementById("myButton");
button.addEventListener("click", function() {
   console.log("The button was clicked!");
});
{{< /highlight >}}

En este ejemplo, se asocia el evento `click` con el elemento del botón mediante el método `addEventListener`, y cuando el usuario haga clic en el botón, se ejecutará la función y se imprimirá "The button was clicked!" en la consola.

Los eventos son fundamentales para la interacción del usuario con una página web y para la construcción de aplicaciones web interactivas.

### Programación Orientada a Objetos

La programación orientada a objetos (OOP en inglés) es un paradigma de programación en el que se modelan los objetos y sus interacciones como si fueran objetos del mundo real. La OOP se basa en la **encapsulamiento**, la **herencia** y el **polimorfismo** para modelar la lógica de un programa.

En JavaScript la programación orientada a objetos se basa en la utilización de objetos y en la creación de clases. Pero está implementada como una capa fina sobre el paradigma **prototípico**. Que es el fundacional de Javascript. A esto se le llama _syntactic sugar_ porque la orientación a objetos está sólo en la sintaxis del lenguaje. Lo que escribimos es interpretado y trasladado al lenguaje Javascript básico para producir el efecto que tendríamos con la OOP.

Un objeto es una colección de propiedades (también conocidas como atributos) y métodos (funciones) que describen una entidad y su comportamiento. Una clase es una plantilla para crear objetos.

Para crear un objeto en javascript se puede utilizar la notación de llaves `{}` y se puede asignar atributos y métodos a los mismos, también es posible utilizar el constructor para crear una clase especifica, esto se hace con la palabra clave `class` y la notación de constructor.

{{< highlight javascript "linenos=table" >}}
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
    start() {
        console.log(`The ${this.make} ${this.model} is running`);
    }
}

let myCar = new Car("Toyota", "Camry");
myCar.start(); 
// output: The Toyota Camry is running
{{< /highlight >}}

En este ejemplo se crea una clase `Car` con un constructor que recibe dos parámetros: make y model. La clase también tiene un método `start` que imprime en consola. Luego se crea un objeto `myCar` a partir de la clase `Car` y se utiliza el método `start` para iniciar el carro.

La POO en javascript también permite la herencia y la sobre escritura de métodos, la cual permite una mayor organización y reutilización del código, permitiendo crear una jerarquía de clases y objetos, donde una clase puede heredar de otra y puede sobreescribir o ampliar su funcionalidad.

En resumen, la programación orientada a objetos en JavaScript se basa en la creación de objetos y clases, y en el uso de la encapsulamiento, la herencia y el polimorfismo para modelar la lógica de un programa.

### ECMAScript 6

**ECMAScript 6 (ES6)** es una versión actualizada del estándar _ECMAScript_, que es la base de JavaScript. ES6 introdujo varias nuevas características, como:

- `let` y `const` (para declarar variables)
- **arrow functions** (una forma concisa de escribir funciones)
- **clases** (para programación orientada a objetos)
- **template literals** (para concatenar cadenas de manera más fácil)
- **módulos** (para organizar el código)

Estas características hacen que el código JavaScript sea más fácil de escribir, leer y mantener. Sin embargo, no todos los navegadores soportan ES6, por lo que es necesario utilizar un transpilador (como Babel) para convertir el código ES6 a una versión compatible con todos los navegadores.

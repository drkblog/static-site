---
title: Uso de prototipos en Javascript
description: Cómo reusar código en Javascript con prototipado
author: Leandro Fernandez
type: post
date: 2023-02-01
slug: javascript-prototipo
cover: "/logo/js.png"
categories:
  - Programación
tags:
  - programación
  - javascript
---

## Paradigma prototípico

El **prototipado** es una característica de **JavaScript** que permite reutilizar código a través de la creación de objetos a partir de otros objetos. Esto se logra asignando un objeto como prototipo de otro objeto. En contraste con la reutilización de código del paradigma de orientación a objetos donde el código y los atributos a reutilizar están en una clase. Y los objetos se crean a partir de la clase.

Para utilizar el **prototipado** en JavaScript, se puede seguir los siguientes pasos:

Crear un objeto `prototipo`: este objeto contiene las propiedades y métodos que se desean reutilizar.

{{< highlight javascript "linenos=table" >}}
var objetoPrototipo = {
  propiedad1: valor1,
  metodo1: function() {
    // código del método
  }
};
{{< /highlight >}}

Crear un objeto nuevo a partir del objeto prototipo: este objeto hereda las propiedades y métodos del objeto prototipo.

{{< highlight javascript "linenos=table" >}}
var nuevoObjeto = Object.create(objetoPrototipo);
{{< /highlight >}}

Modificar el objeto nuevo según sea necesario: se pueden agregar nuevas propiedades y métodos al objeto nuevo sin afectar el objeto prototipo.

{{< highlight javascript "linenos=table" >}}
nuevoObjeto.propiedad2 = valor2;
nuevoObjeto.metodo2 = function() {
  // código del método
};
{{< /highlight >}}

De esta manera, se puede reutilizar código de un objeto a otro sin tener que copiar y pegar. Además, si se realiza un cambio en el objeto prototipo, se verá reflejado en todos los objetos que lo hayan heredado.

### Un ejemplo más realista

{{< highlight javascript "linenos=table" >}}
const person = {
  name: "",
  birthdate: Date(),
  age: function () {
    const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
    return (Date.now() - this.birthdate) / millisecondsPerYear;
  }
};

const p = Object.create(person);
p.name = 'Leandro';
p.birthdate = Date.parse('01 Jan 1970 00:00:00 GMT')

console.log(p.age());
{{< /highlight >}}

## OOP en Javascript

En Javascript la orientación a objetos está implementada como una capa ficticia de sintaxis que permite describir clases y objetos. Pero el lenguaje internamente crea prototipos y objetos a partir de estos. En el lenguaje no existen realmente las clases.
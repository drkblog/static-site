---
title: Código espagueti vs no espagueti
description: Ejemplo práctico de mejora de código en Javascript
author: Leandro Fernandez
type: post
date: 2023-02-04
cover: "/2023/02/spaghetti-fork.jpg"
slug: codigo-espagueti-vs-no-spagueti
categories:
  - Programación
tags:
  - programación
  - legibilidad
  - diseño
  - buenas prácticas
---

## Espagueti

Este es un ejemplo evidente de **código espagueti**. Simplemente leelo para experimentar por vos mismo las consecuencias:

{{< highlight javascript "linenos=table" >}}
const people = [
  { name: 'John', age: 24 },
  { name: 'Jane', age: 10 },
  { name: 'BOB', age: 65 },
  { name: 'mary', age: 17 }
];

// Spaghetti code

function process(list) {
  table = {};
  for (let i = 0; i < people.length; i++) {
    table[people[i].name.charAt(0)] ||= 0;
    table[people[i].name.charAt(0)]++;
  }
  let max = 0, resini = undefined;
  for (let initial in table) {
    if (table[initial] > max) {
      max = table[initial];
      resini = initial;
    }
  }
  return resini;
}

for (let i = 0; i < people.length; i++) {
  if (people[i].age < 18) {
    people[i].young = true;
  } else {
    people[i].young = false;
  }
  people[i].name = people[i].name.toLowerCase();
}
let ini = process(people);

console.log(ini);
console.log(people);
{{< /highlight >}}

# No espagueti

Ahora veremos la reproducción exacta de la funcionalidad anterior pero escrita siguiendo **buenas prácticas** y **estructurando bien** el código:

{{< highlight javascript "linenos=table" >}}
const people = [
  { name: 'John', age: 24 },
  { name: 'Jane', age: 10 },
  { name: 'BOB', age: 65 },
  { name: 'mary', age: 17 }
];

// Non-spaghetti code

function setYouth(person) {
  person.young = person.age < 18;
  return person;
}

function normalizeName(person) {
  person.name = person.name.toLowerCase();
  return person;
}

function getPersonInitial(person) {
  return person.name.charAt(0);
}

function incrementInitial(context, initial) {
  context.acc[initial]||=0;
  context.acc[initial]++;
}

function trackMaxInitial(context, initial) {
  if (context.acc[initial] > context.maximum) {
    context.maximum = context.acc[initial];
    context.initial = initial;
  }
}

function initialCounterReducer(context, person) {
  const initial = getPersonInitial(person);
  incrementInitial(context, initial);
  trackMaxInitial(context, initial);
  return context;
}

const context = { acc: {}, maximum: 0 };
const peopleFixed = people.map(setYouth).map(normalizeName);
const initial = peopleFixed.reduce(initialCounterReducer, context).initial;

console.log(initial);
console.log(peopleFixed);
{{< /highlight >}}

El proceso de **refactorización** consistió en extraer unidades lógica de procesamiento en funciones con nombres descriptivos. Se puede apreciar que el código en el cuerpo de estas funciones es mayormente idéntico al del código original.

Luego en dos líneas se puede obtener el resultado buscado utilizando un estilo declarativo aunque no realmente immutable.
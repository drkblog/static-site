---
title: "#desafiofibonacci"
description: "Cómo implementar Fibonacci"
date: 2022-03-14
type: post
slug: "desafiofibonacci"
comments: false
---

## Enunciado

_Dada la implementación de una función que retorna el valor de la secuencia de Fibonacci para la posición dada, utilizando recursividad. Salvar el problema del stack overflow o timeout que tengo para valores grandes de n como por ejemplo 200._

## Detalles

- La secuencia de Fibonacci se construye sumando los dos últimos números de la secuencia para formar el siguiente.
- Se puede comenzar en 0 o en 1: `0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...`
- Consideramos `n` a la posición del número que queremos obtener.
- La implementación con recursividad es impracticable para valores grandes como por ejemplo `n = 200`.
- Hay varios tipo de solución y este desafío esta orientado a una de ellas pero cualquier tipo de solución es aceptable.

## Videos

- [Enunciado](https://www.tiktok.com/@drkbugs/video/7075060302403898630)

## Implementación recursiva de referencia

{{< highlight javascript "linenos=table" >}}
function fib(num) {
    if (num < 2) {
        return num;
    }
    return fib(num - 2) + fib(num - 1);
}

for(let i = 0; i < 200; i++) {
    console.log(`${i}: ${fib(i)}`);
}
{{< /highlight >}}

## Ejemplos

### Entrada
```
fib(10)
```
> Resultado: **55**

### Entrada
```
fib(200)
```
> Resultado: **2.8057117299251016e+41**

## Cómo enviar respuestas

Para enviar respuestas largas o que contengan código (no sólo para este desafío sino en las redes sociales en general) se puede utilizar:

- https://pastebin.com/
- https://gist.github.com/

Luego pegar la URL en un comentario del video o enviar un mail.


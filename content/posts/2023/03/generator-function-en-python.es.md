---
title: Python - Generator function
description: Funciones generadoras en Python
author: Leandro Fernandez
type: post
date: 2023-03-03
slug: generator-function-en-python
cover: "/logo/python.png"
categories:
  - Programación
tags:
  - programación
  - python
---

## Python generator function

🌟 Un generador en **Python** es una función que utiliza la palabra clave "_yield_" para producir una secuencia de valores que pueden ser iterados. En lugar de devolver un valor único como lo haría una función normal, un generador devuelve una especie de iterador que se utiliza con la función `next()`.

Una generator function retorna un _lazy iterator_ que tiene su propio estado. Cada vez que se llama a `next()` pasando ese iterador se ejecuta el código de la función generador hasta yield. Y `next()` devuelve entonces el valor pasado por yield.

{{< highlight python "linenos=table" >}}
def pares(n):
    i = 0
    n = n if n < 10 else 10
    while i < n:
        yield i * 2
        i += 1

top = 100   
g = pares(top)

print(top)
for i in range(15):
  print(next(g))
{{< /highlight >}}

En este ejemplo la variable g recibe un generador de pares hasta 100. Cada llamada a `next(g)` ejecuta el código de `pares()` hasta la línea 4. Devolviendo el valor de i * 2. Por lo tanto la línea 9 imprime 0 y la 10 imprime 2. El iterador en g mantiene el estado (es decir el valor de i).

Si continuamos llamando `next(g)` obtendremos todos los pares hasta el 98 y en la siguiente llamada recibiremos None. Cada llamada a `pares()` crea un iterador independiente con si límite n y su estado de i.


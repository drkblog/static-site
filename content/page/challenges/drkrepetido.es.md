---
title: "#drkrepetido"
description: "Desafío #drkrepetido"
slug: "drkrepetido"
comments: false
---

Dado un arreglo de números enteros **consecutivos desordenados** elaborar un algoritmo que pueda encontrar el único elemento repetido.
Solo será válida la solución que tenga como máximo complejidad temporal lineal `O(n)`, complejidad espacial constante `O(1)` y no utilice una cantidad de memoria comparable a los valores máximos de N aunque sea constante.

- El arreglo tiene N elementos
- N está limitado a `2 < N < 10.000.000`
- Es una secuencia de números **consecutivos desordenados** comenzando en `1` y terminando en `N - 1`
- Tiene exclusivamente **un número de la secuencia repetido**.

Por ejemplo serían entradas válidas:

- [1, 2, 3, 4, 5, **6**, **6**, 7, 8, 9]
- [8, 2, 4, 3, 5, **6**, 7, **6**, 1, 9]
- [1, 2, **999**, 3, ...998, **999**, 1000, ...9.000.000]
- [1, **2**, **2**]

Y no serían válidas:

- [4, 5, **6**, **6**, 7, 8]
- [2, 2]
- [1, 2, 3, 4, 5]
- [1, 2, 3, -4, 5, **6**, **6**, 7, 8, 9]
- [1, 2, 3, ..., 100.000.000]

Explicación del enunciado y solución temporal `O(n²)`.

https://www.youtube.com/watch?v=--QUAiYXClo

Explicación de la solución con la fórmula de Gauss en temporal `O(n)` y espacial `O(1)`.

https://www.youtube.com/watch?v=rv8C-xEhCgk

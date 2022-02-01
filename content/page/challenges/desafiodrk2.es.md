---
title: "#desafiodrk2"
description: "Desafío drk 2"
slug: "desafiodrk2"
comments: false
---

## Enunciado

_Dada una lista de personas con el año de su nacimiento y su muerte encontrar el primer año con la mayor cantidad de personas vivas._

## Detalles

- Se recibe una arreglo (_array_) de **pares de años**.
- Cada par corresponde a una persona, el primer año es el nacimiento y el segundo es la muerte.
- Todos los años están entre **1900 y 2000, inclusive**.
- La entrada **siempre es válida** según la reglas del enunciado.
- La cantidad de personas vivas el enésimo año se computa como el total de personas nacidas ese año o cualquier año anterior y que hayan muerto cualquier año posterior.
- Una persona nacida y muerta el mismo año **no computará como persona viva** para ese año.
- Si hay más de un año con el máximo número de personas vivas **devolver el primero**.
- El arreglo de entrada tendrá como **mínimo un elemento** (un par de años) y como **máximo un millón** de pares (1.000.000)

## Ejemplos

- Entrada `[[1990, 1992], [1995, 1999], [1992, 2000], [1990, 1996]]`
  - Resultado: **1995**
- Entrada `[[1950, 1960], [1900, 2000], [1910, 1990], [1920, 1930], [1921, 1940], [1950, 1960], [1950, 1960], [1950, 1960]]`
  - Resultado: **1950**
- Entrada `[[1910, 1930], [1910, 1920], [1910, 1915], [1920, 1930], [1921, 1930], [1922, 1930]]`
  - Resultado: **1910**

## Análisis de algoritmo

Si llamamos `n` a la cantidad de pares de años.
Se espera:

- Complejidad temporal máxima `O(n)`
- Complejidad espacial máxima `O(1)`
- Se pueden utilizar arreglos auxiliares cuyo tamaño no depende de `n`.

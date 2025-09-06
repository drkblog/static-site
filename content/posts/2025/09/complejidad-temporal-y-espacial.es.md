---
title: Complejidad espacial y temporal
description: La relevancia de la complejidad temporal y espacial en el desarrollo de software
author: Leandro Fernandez
type: post
date: 2025-09-06
slug: complejidad-espacial-y-temporal
categories:
  - Programación
tags:
  - programación
  - java
---

## La relevancia de la complejidad temporal y espacial en el desarrollo de software

[Complejidad temporal]({{< relref path="/posts/2021/09/time-complexity.es.md" lang="es" >}}) es cómo varía el tiempo de ejecución de un algoritmo cuando cambia la cantidad de datos de entrada. No importa cuánto tarda en términos absolutos; lo relevante es si ese tiempo crece linealmente, cuadráticamente o se mantiene constante al aumentar la entrada 

Por su parte, la [Complejidad espacial]({{< relref path="/posts/2021/09/space-complexity.es.md" lang="es" >}}) mide cómo cambia el consumo de memoria adicional de un algoritmo al variar el volumen de datos. Al igual que la complejidad temporal, es una medida relativa, no se trata de cuántos bytes exactos usa, sino cómo ese uso crece —o no— conforme aumentan los datos 

### ¿Por qué ambas son fundamentales?

Eficiencia y escalabilidad: Un algoritmo con baja complejidad temporal (por ejemplo, O(n)) puede procesar grandes conjuntos de datos rápidamente, mientras que uno con O(n²) se volverá inusable a gran escala. Lo mismo aplica al uso de memoria: un enfoque con O(1) espacio puede ser viable en dispositivos con pocos recursos, mientras que uno con O(n) podría saturar la memoria disponible.

Costos operativos y rendimiento: En sistemas en producción, el tiempo de ejecución impacta directamente en la experiencia del usuario y en los costos de infraestructura. La memoria ocupada limita la cantidad de procesos que podemos correr simultáneamente.

Diseño y arquitectura de software: Conocer ambas complejidades guía decisiones clave: elección de estructuras de datos, paralelización, optimización de recursos, etc.

### Ejemplos prácticos

1. Ejemplo de complejidad temporal: búsqueda lineal

Imaginemos un algoritmo que busca un elemento en un arreglo no ordenado:

{{< highlight python "linenos=table" >}}
def buscar(arr, valor):
    for item in arr:
        if item == valor:
            return True
    return False
{{< /highlight >}}

Complejidad temporal: En el peor caso, recorre todo el arreglo, es decir, O(n).

Complejidad espacial: No usa memoria extra, por lo que es O(1).

Este ejemplo muestra cómo un enfoque simple — aunque eficiente en memoria— puede escalar de forma aceptable en tiempo, pero no óptima si se requiere mayor rapidez.

2. Ejemplo de complejidad espacial: copia de datos en procesamiento

Consideremos una función que, para procesar una lista de números, primero crea una copia y luego la transforma:

{{< highlight python "linenos=table" >}}
def duplicar_y_sumar(arr):
    copia = arr.copy()
    return [x * 2 for x in copia]
{{< /highlight >}}

Complejidad temporal: Hace una copia (O(n)) y recorre los datos otra vez para duplicarlos (O(n)), así que en total O(n).

Complejidad espacial: Al crear una copia completa, utiliza O(n) memoria adicional.

Este ejemplo ilustra claramente cómo un algoritmo puede ser eficiente en tiempo, pero costoso en memoria, lo cual puede ser crítico cuando se procesan muchos datos o se trabaja en entornos con recursos limitados.

### Conclusión

La complejidad temporal y espacial no son solo conceptos académicos: son herramientas esenciales para construir software eficiente, escalable y sostenible. Mientras la complejidad temporal nos muestra si un algoritmo seguirá siendo viable al crecer los datos, la espacial nos alerta sobre posibles cuellos de botella de memoria. Integrar estas métricas en nuestras decisiones de diseño permite evitar sistemas lentos, costosos o que fallen en producción.
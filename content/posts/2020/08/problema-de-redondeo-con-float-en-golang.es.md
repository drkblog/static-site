---
title: Problema de redondeo con float en Golang
author: Leandro Fernandez
type: post
date: 2020-08-30T02:31:59+00:00
cover: "/2020/09/floating-point.png"
categories:
  - Programación
tags:
  - float
  - go
---
 

_Mientras escribía el artículo sobre FunnyStrings necesité usar la función de valor absoluto de Go y me crucé nuevamente con el viejo y conocido problema de redondeo de la aritmética de punto flotante en computadoras._

Para resolver el problema mencionado necesitaba comparar los valores absolutos de diferencias entre caracteres. Para esto usé la función `math.Abs()` de la biblioteca estándar. Y sólo hay una versión que recibe `float64` como tipo de entrada. Así que tuve que convertir las diferencias que tenía en ese tipo de punto flotante para utilizarla en una comparación. En ese caso pude hacerlo sin preocuparme demasiado porque estaba convirtiendo un `integer` en `float` sólo para obtener el valor absoluto. Sin hacer ningún tipo de cálculo con esos valores. Pero es cierto que no es una buena idea comparar valores de punto flotante. Porque si se trata de un valor calculado puede acumular errores de redondeo importantes.

Estos errores no son nada nuevo ni mucho menos exclusivos de Go. Se desprenden del estándar IEEE 754-1985 (o la revisión 2008) que es utilizado para la representación de números reales en las computadoras. Y que por limitaciones intrínsecas del formato introducen errores de redondeo que pueden ser muy significativos al acumularse o en sustracciones de números muy aproximados entre sí.

Más allá del uso que le dí [en el artículo](/como-optimizar-recorrido-de-arrays) y en [el video][1], quería ver qué ocurría si utilizaba un reemplazo de la función de la biblioteca estándar. Así que escribí el siguiente programa para probar la performance de cada caso.

{{< highlight golang >}}
package main
import (
	"fmt"
	"math"
	"time"
)

func main() {
	const EXECUTIONS = 1000000000
	fmt.Println("Running ", EXECUTIONS, " for each kind.")
	start := time.Now()
	for i := 0; i < EXECUTIONS; i++ {
		math.Abs(-0.11111111)
	}
	duration := time.Since(start)
	fmt.Println("Total time math.Abs(): ", duration)
	start = time.Now()
	for i := 0; i < EXECUTIONS; i++ {
		branchingAbs(-0.11111111)
	}
	duration = time.Since(start)
	fmt.Println("Total time branching: ", duration)
}

func branchingAbs(value float64) float64 {
	if value < 0 {
		return value * -1
	}
	return value
}
{{< / highlight >}}

El programa simplemente ejecuta mil millones de veces la llamada a la función utilizando un valor arbitrario fijo. Y mide el tiempo que toma el proceso. En la línea 15 está el bloque que lo hace con la biblioteca estándar y en la 23 el que llama a la función `branchingAbs()` que definí en la línea 31. Ésta utiliza una condición para multiplicar el número por menos uno en caso de que el valor sea negativo. Y de esa forma retorna el valor absoluto. Esto asumiendo que la multiplicación de un `flota64` por un `integer` es segura. De todas formas lo interesante es que me encontré con este resultado:

```
Running 1000000000 for each kind.
Total time math.Abs(): 4.6536071s
Total time branching: 2.8782882s
```

Había leído en stackoverflow que usar la condición era más rápido que la función de la biblioteca. Pero sinceramente creí que había algo mal en la prueba que había hecho la persona que lo mencionó. Es decir, que esta prueba también la hice porque había visto eso, debo confesar. Pero volviendo a lo que nos ocupa es importante resaltar que la función con la condición es un 60% más rápida. Así que busqué cómo estaba [implementada la de la biblioteca](https://github.com/golang/go/blob/master/src/math/abs.go#L12)

{{< highlight golang >}}
func Abs(x float64) float64 {
	return Float64frombits(Float64bits(x) &^ (1 << 63))
}
{{< / highlight >}}

Lo que hace es transformar el `float64` en bits y poner en cero el más significativo (que es el usado para representar el signo, y un valor de 1 representa el negativo). Es lo más lógico y lo que esperaba ver. Aunque tenía dudas después del resultado de la medición. Pero esto me planteó otro interrogante. ¿Porqué es tanto más lento? 

Un amigo me sugirió probar clonar las funciones de math en el package de mi programa. Pero eso no ayudó mucho. Sin embargo al quitar las llamadas a función `Float64frombits` y `Float64bits` reemplazándolas por el código equivalente obtuve un resultado mucho más lógico. 

```
Running 1000000000 for each kind.
Total time math.Abs(): 4.7603039s
Total time branching: 3.1445622s
Total time clone function: 3.5305924s
```

El tiempo de la función con la condición y la copia de la biblioteca con todo el código inline terminaron siendo muy similares. Aunque todavía el branching es más rápido. Queda un interrogante abierto: qué hace Go con la multiplicación de un `float64` por menos uno. No pude encontrar eso en el código fuente. Asumo que no hace nada más que pasarle el cálculo al procesador. Y que este simplemente realiza el cálculo sin introducir errores porque no tiene que modificar los dígitos sino solamente el signo. Pero no estoy completamente seguro. Abajo el código de la función copiada como referencia.

{{< highlight golang >}}
func absClone(x float64) float64 {
    const sign = 1 << 63
    float64bits := ((*(*uint64)(unsafe.Pointer(&x))) &^ sign)
    return float64(float64bits)
}
{{< / highlight >}}

Mi recomendación para quien esté utilizando Go u otro lenguaje que no tiene una versión de la función de valor absoluto para tipos enteros se crear una función propia que utilice la lógica mostrada más arriba. Dejo dos alternativas para el caso de Go. Ambas funcionan y son casi idénticas en cuanto a performance aunque `absIntegerBitwise` es apenas un poco más rápida.

{{< highlight golang >}}
func absIntegerBitwise(x int64) int64 {
	if x < 0 {
		return ^x + 1
	}
	return x
}

func absInteger(x int64) int64 {
	if x < 0 {
		return x * -1
	}
	return x
}
{{< / highlight >}}

 [1]: https://www.youtube.com/watch?v=6mVvV6dnld4
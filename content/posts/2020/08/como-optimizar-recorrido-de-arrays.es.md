---
title: Cómo optimizar recorrido de arrays
author: Leandro Fernandez
type: post
date: 2020-08-28T04:07:43+00:00
featured_image: http://blog.drk.com.ar/wp-content/uploads/2020/08/funnyStrings-672x372.png
categories:
  - Programación
tags:
  - algoritmo
  - cadena de texto
  - como optimizar recorrido de arrays
  - complejidad temporal
  - featured
  - optimizar recorrido de arrays
  - recorrer un array
  - valores ascii

---
 

## Recorrer un array en forma eficiente es uno de los principales problemas de fondo en ejercicios de competencias de programación o en entrevistas laborales.

Este es un ejemplo práctico paso a paso que parte de la solución más obvia hasta llegar a la más óptima. Para eso tomamos un problema presentado en **HackerRank** como FunnyStrings.

El enunciado dice que nuestro programa recibirá **una cadena de texto** y deberá determinar si es Funny creando una copia invertida, restando a cada caracter el caracter siguiente (en la cadena original y en la invertida) usando sus valores ASCII y tomando el resultado en valor absoluto. Si la secuencia de resultados de restas es la misma en ambos casos es &#8220;Funny&#8221; y si no es &#8220;Not Funny&#8221;.

Si recibe la cadena &#8220;_lmnop_&#8221; su cadena invertida será &#8220;_ponml_&#8221; y los **valores ASCII** de la original serán [108, 109, 110, 111, 112] y de la invertida [112, 111, 110, 109, 108]. La resta en valores absolutos para la primera será [1, 1, 1, 1] y para la segunda [1, 1, 1, 1]. Por lo tanto el algoritmo deberá retornar Funny. En cambio si la cadena de entrada es &#8220;_bcxz_&#8221; (la invertida será &#8220;_zxcb_&#8220;) los valores ASCII de la primera [98, 99, 120, 122] y de la invertida [122, 120, 99, 98]. Y las respectivas restas darán [1, 21, 2] y [2, 21, 1]. Por ser distintas esta cadena resultará en &#8220;Not Funny&#8221;.

<!--more-->

La solución más obvia consiste en hacer exactamente lo que plantea el enunciado. Recibir la cadena y crear una copia invertida. Luego recorrer la primera calculando la diferencia entre cada caracter y el que le sigue y guardando el valor absoluta de dicha resta en un nuevo array. Repitiendo la operación con la cadena invertida. Finalmente recorrer ambos arrays con los resultados de las diferencias absolutas comparando los valores entre sí. Y retornando el resultado en función de que haya aparecido un resultado distinto para alguna posición de los arrays de diferencias.

{{< highlight golang >}}
func funnyString(s string) string {

	// Convertimos a tipo rune (Sólo necesario por Golang)
	original := []rune(s)
	largo := len(original)

	// Creamos un segundo array y copiamos los caracteres en orden inverso
	invertida := make([]rune, largo)
	for indice, caracter := range original {
		invertida[largo-indice-1] = caracter
	}

	// Creamos los dos arrays para guardar las diferencias
	diferenciasOriginal := make([]float64, largo-1)
	diferenciasInvertida := make([]float64, largo-1)

	// Calculamos diferencias
	for i := 0; i &lt; largo-1; i = i + 1 {
		diferenciasOriginal[i] = math.Abs(float64(original[i] - original[i+1]))
	}
	for i := 0; i &lt; largo-1; i = i + 1 {
		diferenciasInvertida[i] = math.Abs(float64(invertida[i] - invertida[i+1]))
	}

	// Comparamos resultados
	notFunny := false
	for i := 0; i &lt; largo-1; i = i + 1 {
		if diferenciasOriginal[i] != diferenciasInvertida[i] {
			notFunny = true
		}
	}

	// Retornamos
	if notFunny {
		return "Not Funny"
	}
	return "Funny"
}
{{< / highlight >}}

El programa anterior está implementado en Go pero lo importante es el algoritmo que podría implementarse igual en Java o C/C++, por ejemplo. Con las mismas consecuencias en cuanto a la velocidad y el espacio de memoria. En este sentido analicemos la complejidad temporal y espacial brevemente. Convengamos que n es la cantidad de caracteres de la cadena recibida. Tengamos que cuenta que en Go los strings se convierten a un array de tipo rune para asegurar que los símbolos de Unicode que ocupan varios bytes son tratados como un elemento único. De todas formas también podemos asumir que sólo recibiremos cadenas de caracteres ASCII.

<p class="has-black-color has-light-gray-background-color has-text-color has-background" style="font-size:14px">
  La comparación de floats con <strong>==</strong> o <strong>!=</strong> no es una buena práctica porque es un tipo de dato de aproximación que no puede representar todos los valores posibles y acumula errores de redondeo. En este caso no nos afecta porque las diferencias son siempre enteras. Y estamos obligados a usar el float por la función <strong>abs()</strong>.
</p>

En la línea nueve recorremos la cadena de entrada una vez [_n_]. En las líneas 18 y 21 recorremos un caracter menos cada vez [_2*(n-1)_]. En la 27 volvemos a recorrer uno menos que el largo original (_n-1_). La complejidad temporal resulta **n + 3 (n-1)**. Si bien esto equivale a Big O(n) y es bastante bueno para un algoritmo. Es mejorable en cuanto a la complejidad temporal aunque seguirá siendo simplemente lineal.

En cuanto a la complejidad espacial tenemos una copia de la cadena de entrada [_n_]. Luego dos arrays extra para las diferencias, con un elemento menos [_2*(n-2)_]. Lo que nos queda **n + 2 (n-1)** y también es lineal en notación Big O pero mejorable en términos absolutos.

Veamos desde el final hacia el principio qué optimizaciones son posibles. Por empezar no tiene sentido recorrer y comparar todos los elementos del array de diferencias. Ya que simplemente al encontrar un caso donde no coincidan ya podemos retornar &#8220;Not Funny&#8221;. Eso no va a ahorrar una variable booleana y va a mejorar el caso promedio. Ya no recorreremos _n-1_ para detectar la diferencia salvo cuando efectivamente sean todos los elementos iguales. Lo que sería nuestro peor caso para esa sección. Pero en promedio muchas veces cortará antes.

Ahora si miramos el código de las línea 18 a la 23 tenemos dos bucles calculando las diferencias y guardándolas en memoria para luego compararlas. Pero no hay necesidad de esta sobrecarga de tiempo y memoria. Dado que la variable de control de ambos bucles es idéntica podríamos usar uno solo. Adicionalmente podemos comparar las diferencias obtenidas de ambas cadenas en el momento (en lugar de guardarlas). Esto elimina la necesidad del bucle de la línea 27. Y nos exime de crear dos arrays extra. Antes de continuar veamos cómo quedaría el código hasta aquí.

{{< highlight golang >}}
func funnyString(s string) string {

	// Convertimos a tipo rune (Sólo necesario por Golang)
	original := []rune(s)
	largo := len(original)

	// Creamos un segundo array y copiamos los caracteres en orden inverso
	invertida := make([]rune, largo)
	for indice, caracter := range original {
		invertida[largo-indice-1] = caracter
	}

	// Calculamos diferencias
	for i := 0; i &lt; largo-1; i = i + 1 {
		if math.Abs(float64(original[i]-original[i+1])) != math.Abs(float64(invertida[i]-invertida[i+1])) {
			return "Not Funny"
		}
	}
	return "Funny"
}
{{< / highlight >}}

No sólo ahorramos tiempo y espacio sino que el código queda reducido y mucho más claro. Pero todavía podemos seguir mejorándolo. Si recorremos la cadena de adelante hacia atrás, nada nos impide hacerlo también de atrás hacia adelante. Es decir, no necesitamos una copia con la cadena invertida. Podemos recorrer la cadena original de atrás hacia adelante restándole a cada ítem el ítem que aparece adelante. 

Si lo pensamos un segundo esto también quiere decir que una vez que llegamos a la mitad de la cadena ya no tiene sentido continuar. Porque en términos de comparación de elementos de un array empezando con el primero y el último y continuando hacia el centro. Una vez que se llegó ahí todas las comparaciones posibles ya fueron realizadas.

Pensemos en las diferencias como elementos de un array, tal como estaban en el primer código. Usemos por ejemplo un array A = [a, b, c, d, e, f]. Si comparo a &#8211; f, b &#8211; e, c &#8211; d ya llegué al centro. Y si continúa tengo d &#8211; c, e &#8211; b, f &#8211; a. Pero como me importa el valor absoluto de la resta, está garantizado que abs(a &#8211; f) = abs(f &#8211; a). Es decir que no tiene sentido seguir. Eso nos ahorraría toda memoria extra ya que no vamos a crear arrays en función del tamaño de la entrada. Y sólo recorremos el array **n/2**. Es decir que aunque la complejidad temporal en notación Big O no cambió y sigue siendo **O(n)**, la complejidad espacial es ahora constante **O(1)**. Veamos el código final.

{{< highlight golang >}}
func funnyString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i &lt; len(runes)/2; i, j = i+1, j-1 {
		if math.Abs(float64(runes[i]-runes[i+1])) != math.Abs(float64(runes[j]-runes[j-1])) {
			return "Not Funny"
		}
	}
	return "Funny"
}
{{< / highlight >}}

No estoy contabilizando la memoria extra consumida por el array runes debido a que estoy obligado a esta conversión por el lenguaje. Y si usara Java o C/C++ no pasaría esto.
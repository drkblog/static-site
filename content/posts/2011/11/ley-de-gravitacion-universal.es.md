---
title: Ley de gravitación universal
author: Leandro Fernández
type: post
date: 2011-11-26T01:19:58+00:00
url: /2011/ley-de-gravitacion-universal
categories:
  - Programación
tags:
  - 3D
  - canvas
  - html5
  - javascript

---
Simulación de la **ley de gravitación universal**. Implementada en 3D con la biblioteca [Three.js][1], para Javascript. Con fines didácticos se posicionó una partícula con masa mucho mayor al resto y se fijó en el escenario para que cumpla el rol de sol.  
<!--more-->

<div id="container">
</div>

Esta programa sólo funciona con las últimas versiones de Chrome, Firefox o cualquier navegador compatible con HTML 5.

La ley de gravitación universal establece que entre dos cuerpos separados a una distancia **d**, existe una fuerza de atracción mutua **f** determinada según la siguiente fórmula:

<img src="https://s0.wp.com/latex.php?latex=%5Cvec%7Bf%7D+%3D+G+%5Cfrac%7Bm_1+m_2%7D%7B%5Cvec%7Bd%7D%5E2%7D&#038;bg=ffffff&#038;fg=000&#038;s=2&#038;c=20201002" alt="&#92;vec{f} = G &#92;frac{m_1 m_2}{&#92;vec{d}^2}" class="latex" /> 

Donde m1 y m2 son las masas de los cuerpos y G es la constante de gravitación universal:

<img src="https://s0.wp.com/latex.php?latex=G+%3D+%286%7B%2C%7D693%5Cpm+0%7B%2C%7D048%29+%5Ccdot+10%5E%7B-11%7D%7E%5Cmathrm%7B%5Cfrac%7Bm%5E3%7D%7Bkg+%5Ccdot+s%5E2%7D%7D&#038;bg=ffffff&#038;fg=000&#038;s=2&#038;c=20201002" alt="G = (6{,}693&#92;pm 0{,}048) &#92;cdot 10^{-11}~&#92;mathrm{&#92;frac{m^3}{kg &#92;cdot s^2}}" class="latex" /> 

Para la simulación se crea un conjunto de partículas con posiciones y masas aleatorias. Y se comienza a calcular la fuerza de atracción entre todas ellas. En cada iteración del cálculo, la velocidad de la partícula varía con la actuación de las fuerzas. Y esto da el movimiento al sistema.

 [1]: https://github.com/mrdoob/three.js/
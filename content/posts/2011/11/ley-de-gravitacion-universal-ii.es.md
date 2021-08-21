---
title: Ley de gravitación universal II
author: Leandro Fernandez
type: post
date: 2011-11-26T21:01:08+00:00
categories:
  - Programación
tags:
  - 3D
  - canvas
  - html5
  - javascript

---
Segunda versión de esta simulación de la **ley de gravitación universal**. Implementada en 3D con la biblioteca [Three.js][1], para Javascript. Con fines didácticos se posicionó una partícula con masa mucho mayor al resto y se fijó en el escenario para que cumpla el rol de sol. Está disponible el [código fuente][2] con licencia GPL.  

<!--more-->

{{< rawhtml >}}
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="/2011/11/Three.js"></script>
<script type="text/javascript" src="/2011/11/gravitacion_2.js"></script>
<div id="container">
</div>

<table>
  <tr>
    <td width="40%" nowrap="nowrap">
      Edad: <span id="txtEdad"></span> años
    </td>
    
    <td width="60%" nowrap="nowrap">
      Zoom: <input type="button" value=" + " id="zoomIn" /><input type="button" value=" - " id="zoomOut" />
    </td>
  </tr>
</table>
{{< /rawhtml >}}

Esta programa sólo funciona con las últimas versiones de Chrome, Firefox o cualquier navegador compatible con HTML 5.

La ley de gravitación universal establece que entre dos cuerpos separados a una distancia **d**, existe una fuerza de atracción mutua **f** determinada según la siguiente fórmula:

{{< katex >}} \vec{f} = {G \cdot { m1 \cdot m2 \over d^2}} {{< /katex >}} 

Donde m1 y m2 son las masas de los cuerpos y G es la constante de gravitación universal:

{{< katex >}} G = { (6.693 \pm 0.48) \cdot 10^{-11} { m^3 \over {kg \cdot s^2}}} {{< /katex >}}

Para la simulación se crea un conjunto de partículas con posiciones y masas aleatorias. Y se comienza a calcular la fuerza de atracción entre todas ellas. En cada iteración del cálculo, la velocidad de la partícula varía con la actuación de las fuerzas. Y esto da el movimiento al sistema.

 [1]: https://github.com/mrdoob/three.js/
 [2]: http://www.drk.com.ar/library/gravitacion_2.js
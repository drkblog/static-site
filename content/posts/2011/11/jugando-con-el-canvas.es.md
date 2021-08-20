---
title: Jugando con el Canvas
author: Leandro Fernández
type: post
date: 2011-11-21T03:44:26+00:00
url: /2011/jugando-con-el-canvas
categories:
  - Programación
tags:
  - canvas
  - html5
  - javascript

---
Este es un pequeño ejemplo de lo que se puede hacer con HTML 5. Más específicamente con el objeto _Canvas_ (lienzo en inglés) y Javascript. Una simulación de física básica, bidimensional. Arrastrando las figuras con el mouse se pueden lanzar unas contra otras.  
<!--more-->

  
<canvas id="screen" style="border: thin solid black;" width="600" height="420"></canvas>

<table>
  <tr>
    <td colspan="2">
      <input id="addFigure" type="button" value="Nueva figura" />
    </td>
  </tr>
  
  <tr>
    <td>
      Gravedad: <span id="txtG">9.8</span> m/s<span style="vertical-align: super; font-size: 80%;">2</span>
    </td>
    
    <td>
      <input id="moreG" type="button" value=" + " /><input id="lessG" type="button" value=" - " /><input id="resetG" type="button" value="Tierra" /><input id="resetMG" type="button" value="Luna" /><input id="resetSG" type="button" value="Sol" /><input id="resetNull" type="button" value="Nula" />
    </td>
  </tr>
</table>

Esta programa sólo funciona con las últimas versiones de Chrome, Firefox o cualquier navegador compatible con HTML 5.
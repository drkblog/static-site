---
title: Consejos rápidos para Javascript I
description: Las cosas que tenés que saber para mejorar tu rendimiento
author: Leandro Fernandez
type: post
date: 2021-09-24
cover: "/2021/09/js.jpg"
categories:
  - Programación
tags:
  - javascript
draft: true
---

Este artículo no es una guía para aprender **Javascript**. Es una lista breve de consejos útiles para programadores que utilizan **Javascript**. Incluso aquellos que recién comienzan.

## Depuración (Debugging)

Cuando se trata de depurar nuestro código (en casi cualquier lenguaje) existen dos métodos utilizados por la inmensa mayoría de los desarrolladores. 

- Debugging
- Logging

### Debugging

Este es el método _correcto_ de depuración. Es el primer método que un programador debería aprender, y el primero que debería utilizar cuando tiene que resolver un problema, salvo que no sea posible hacerlo. Se trata de una funcionalidad que para el caso de Javascript pertenece al intérprete (que podría ser típicamente _Chrome_ u otro navegador web). En **Java**, por ejemplo, está en la **Java Virtual Machine** y para una aplicación nativa programada en **C/C++** el compilador agrega código para _debugging_ adicionalmente al código que escribimos para poder realizar esta tarea utilizando alguna herramienta extra para controlar el proceso de depuración.

El depurador detendrá la ejecución del programa al llegar a un punto de control (o _breakpoint_) que ubicaremos en una línea del código fuente que sea de interés. Y nos permitirá visualizar los valores de las variables y objetos en ese punto. Avanzar el programa paso a paso y algunas cosas más.

![js-chrome-debugger](/2021/09/js-chrome-debugger.png)

Como no es la intención de este artículo explicar cómo depurar, escribiré uno que sí entre en ese detalle y lo enlazaré desde aquí más adelante (paciencia).

### Logging

El _logging_ es una práctica independiente de la depuración que consiste en escribir mensajes con información relevante cuando la aplicación pasa por una línea de código específica. Y sirve para analizar el comportamiento del programa durante su ejecución. Pero también podemos usar esto para ver el contenido de las variables y atributos en un punto en particular. Para esto utilizamos `console.log(...)` y pasamos como argumento lo que sea que deseemos imprimir en la consola. Y por consola nos referimos a la del navegador web. En caso de estar usando **Chrome** podemos hacer visible esta consola presionando `Ctrl-Shift-I` en **Windows** (otros sistemas operativos u otros navegadores tendrán shortcuts diferentes). Si no hacemos visible la consola no podremos ver el efecto del botón de que describimos a continuación.

{{< highlight javascript "linenos=table" >}}
const testButton = document.querySelector("#test")
testButton.onclick = async (event) => {
  console.log({ event })
}
{{< /highlight >}}

En esta misma página hemos incluido las líneas de **Javascript** que mostramos arriba. La línea 1 obtiene el botón que que sigue a este párrafo del modelo DOM del documento HTML. La línea 2 configura un `_listener_` del evento _click_ del botón para que ejecute la función anónima cuyo cuerpo está en la línea 3. Y que simplemente utiliza el método `log()` del objeto `console` para imprimir el objeto `event` que recibió. Es decir que cuando presionamos el botón se ejecuta la línea 3.

{{< rawhtml >}}
<div>
<button id="test" type="button">Probar console.log()</button>
<script type="text/javascript">
const testButton = document.querySelector("#test")
testButton.onclick = async (event) => {
  console.log({ event })
}
</script>
</div>
{{< /rawhtml >}}

En la consola aparecerá un ítem que podremos expandir y que se verá similar a esto:

![js-chrome-debugger](/2021/09/js-chrome-console.png)
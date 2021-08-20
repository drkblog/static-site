---
title: UTF-8
author: Leandro Fernandez
type: post
date: 2009-01-27T19:00:41+00:00
categories:
  - Tecnología
tags:
  - estándar
---

Más de seis meses atrás pensé en escribir esto y no lo hice.
Supuse que era algo que todo el mundo ya sabía y que yo me había enterado tarde por no dedicarle quince minutos a la lectura de algún ***paper***.
Hoy saco dos conclusiones: esto no es algo que todo el mundo sepa, y en efecto es algo que debí enterarme mucho antes.
Y como lo segundo no tiene remedio voy a tratar de echar un poco de luz sobre el primer asunto desde mi humilde lugar.

Partamos por darle un significado al acrónimo.
Al contrario de lo que algunos ***gamers*** fanáticos de los FPS podrían suponer no se trata del &#8220;Unreal Tournamet Fiercest 8&#8221;.
UTF-8 significa ***8-bit Unicode Transformation Format*** (Formato de codificación de 8 bits para Unicode).
Claro que ahora tengo que explicar qué es**Unicode**y qué es un formato de codificación de ocho bits.
Voy a tratar de mantener todo esto lo más sencillo posible.

Unicode es un estándar de computación que permite unificar la forma en que las computadoras manejan el texto.
Tiene su origen en el intento de solucionar un problema histórico: a lo largo de los años de desarrollo informático cada compañía de hardware y software estableció su propio conjunto de caracteres de texto y los ordenó de la forma que mejor le pareció.
Con el catastrófico resultado que muchos conocen.
Así que un buen día un grupo de entusiastas del orden se juntó y dijo &#8220;vamos a hacer una lista de todos los caracteres existentes de todos los idiomas que hay o hubo sobre la tierra.
Y por las dudas dejemos lugar para los que puedan surgir en el futuro o venir desde otros planetas&#8221;.
Y así fue que nació el Unicode como una lista en la cual cada símbolo de texto conocido tiene un número de orden único.
Y esta lista no tiene una limitación en cuanto al total de caracteres ya que todo el tiempo se pueden ir agregando nuevos símbolos al final, cada uno con su identificador.

Ya era hora, pero cómo podemos representar los**100.713**símbolos que actualmente forman Unicode.
Los archivos de texto que manejan el 80% de las computadoras utilizan caracteres de 8 bits.
Esto nos deja con 256 símbolos representables (sin contar que necesitamos algunas combinaciones para propósitos especiales).

Aquí se presenta la otra cara del problema cuya solución adelanté, al menos en nombre, al principio.
Para representar miles de caracteres necesitamos más de un byte por símbolo.
Esto se soluciona estableciendo que nuestros archivos de texto utilicen dos o más bytes por cada símbolo visible.
Y naturalmente esta solución fue propuesta e implementada oportunamente.
Dando origen a las codificaciones**UTF-16**y**UTF-32**entre otras.
Las mencionadas utilizan dos y cuatro bytes por símbolo respectivamente.

Hagamos una pausa para aclarar algo que puede ser confuso.
Hay una separación importante entre la lista de símbolos y la forma en que se codifican los mismos en un archivo.
Las codificaciones UTF-16 y UTF-32 son simplemente una forma de codificar cadenas de símbolos Unicode.
La primera tiene la limitación obvia de que sólo podrá hacer referencia a los caracteres que van desde el 0 al 32.535 y no servirá entonces para escribir archivos de texto cuyos caracteres Unicode estén fuera del rango.
Pero sin embargo se la utiliza por la simple razón de que en textos que sí puede representar ahorrará dos bytes por cada símbolo.
O viéndolo al revés, si utilizo UTF-32 para escribir un texto en inglés tendré tres bytes en cero por cada letra o espacio del texto.

Podemos decir que Unicode acabó con el problema de que cada quien ordene los símbolos a su manera.
Ahora es el referente de qué número de orden lleva cada símbolo existente.
Pero trajo una nueva discusión sobre la mesa.
De qué manera conviene codificar un archivo que referencia caracteres Unicode sin desperdiciar una cantidad de memoria monstruosa.

El final de la historia es que todos quedaron conformes cuando se diseño **la codificación UTF-8** que utiliza cantidad de bytes variable por cada símbolo.
Es decir, algunos símbolos necesitarán un byte para ser representados, otros necesitarán dos, tres y así mientras sea necesario.
En UTF-8 los 127 caracteres del estándar US-ASCII se escriben igual que un archivo ASCII puro.
Cada símbolo utiliza un byte por lo que un archivo UTF-8 que sólo contiene caracteres ASCII será idéntico a un archivo US-ASCII.

En la actualidad la codificación UTF-8 se hizo popular por su flexibilidad, ya que nos permite escribir texto en cualquier idioma utilizando el menor espacio posible.
Es la forma recomendada para escribir los archivos, los sitios web y cualquier representación informática del texto.
Los programas de computadora, por su parte, utilizan en memoria distintas estrategias ya que el costo de manipular caracteres de largo variable es alto.

---
title: Código espagueti
description: ¿Qué es el código espagueti y cómo lo evitamos?
author: Leandro Fernandez
type: post
date: 2022-12-11
cover: "/2022/12/spaghetti.jpg"
categories:
  - Programación
tags:
  - programación
  - legibilidad
  - diseño
  - buenas prácticas
---

## Qué es el código espagueti

**Código espagueti** se refiere a código que está desordenado y difícil de entender debido a una mala estructuración, un uso excesivo de anidamientos de estructuras de control, una falta de comentarios y una falta de nombres claros para variables y funciones.

El término viene por la analogía de que el código es tan desordenado como un plato de espagueti.

En los lenguajes no estructurados (como `BASIC`, por ejemplo) el uso de la sentencia **GOTO** era la causa principal de código espagueti. El programador inexperto simplemente hacía saltar el hilo de ejecución a una parte del código que le resultaba conveniente (en el contexto mental en el que estaba escribiendo esas líneas de código). La falta de una visión macro. El no detenerse a pensar en la estructura del programa en general. Son las causas de ese tipo de decisión.

Sí, muchas veces el código escrito cumple su cometido. Pero eso no es suficiente. Porque ese código necesitará ser mantenido tarde o temprano. Y en ese momento se pagarán las consecuencias. No obstante, cuando se acumulan estas decisiones en el código suele llegarse a un callejón sin salida. Donde un salto arbitrario más ya no puede resolver el problema.

En código orientado a objetos también se produce cuando una clase tienen muchas responsabilidades. O existen muchas clases innecesarias. También cuando no se mantiene coherencia y se implementa lógica similar de una forma distinta en cada lugar donde es necesaria.

## Cómo evitarlo

Hay varias técnicas que puedes usar para evitar escribir código espagueti:

Mantener el código limpio y legible, siguiendo buenas prácticas de programación. Nombrando correcta y descriptivamente las clases, métodos, variables, funciones y demás. Estructurando el código (ya sea en clases o módulos o subrutinas) siempre respetando el principio de responsabilidad única.

Usar funciones y métodos para separar la lógica en pequeñas y manejables secciones. Donde resulte obvio para un programador que no conoce el código, dónde encontrará cierta lógica particular. O dónde debe agregar una lógica nueva en función de cómo está organizado el programa.

Imaginemos que nos dan el libro "El banquete" de Platón. Y tenemos que guardarlo en una biblioteca. Si nos encontramos con estantes desordenados, de distintos tamaños, libros en el piso, diccionarios junto a novelas policiales, nos resultará imposible saber dónde debería ir. En cambio si encontramos un lugar organizado, una estantería donde hay libros de filosofía. Y nos damos cuenta de que están ordenados alfabéticamente por el título. Nos tomará segundos ubicarlo en el lugar correcto. Lo mismo ocurre con el código.

Utilizar patrones de diseño conocidos, como el patrón MVC, para organizar el código y mantenerlo estructurado es de gran utilidad. Porque estos patrones tiene convenciones que nos llevan a escribir ciertas partes de la aplicación en clases con nombres específicos y convencionales. Y ya no tenemos que decidir dónde ponemos cada parte del programa porque está dado por el mismo patrón.

Evitar el acoplamiento excesivo entre componentes de código, mediante la inyección de dependencias y la creación de interfaces. Segregando éstas correctamente. Manteniéndolas sólo con los métodos indispensables. Nos ayudará a evitar los atajos en la programación, que usualmente llevan al código espagueti.

La experiencia. Finalmente en gran medida lo que nos ayuda a evitar el código espagueti es tener mucha experiencia. O tener una revisión de nuestro código hecha por una persona con experiencia que pueda identificar los lugares donde nuestro código puede comenzar a enredarse.
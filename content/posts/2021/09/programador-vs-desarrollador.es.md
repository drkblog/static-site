---
title: Programador versus desarrollador
description: Conocimientos de sistemas operativos como una de las diferencias entre programador y desarrollador
author: Leandro Fernandez
type: post
date: 2021-09-30
cover: "/2021/09/binary-keyboard-mac.jpg"
categories:
  - Programación
tags:
  - desarrollo
---

Una de las cosas que descubrí al crear mi [cuenta orientada a la ingeniería de software](https://www.tiktok.com/@drkbugs) en **TikTok** es un interés masivo en la diferencia entre **programador** y **desarrollador**. Sinceramente es algo en lo que no pensaba mucho en el pasado. Pero que por supuesto estaba presente como conocimiento convencional en mi mente. Y debido a la interacción con los usuarios en la red social estuve pensando detenidamente en qué cosas diferencian a un programador de un desarrollador.

> Antes que nada es importante entender que no se trata de etiquetar a las personas odiosamente. Es que tenemos términos para describir el conocimiento de los individuos y estos dos no son más que eso. Formas de describir una cierta cantidad de conocimientos en un área específica.

Si queremos dar una descripción extremadamente simple podemos decir que un desarrollador es un programador pero con más conocimientos en varios rubros extra comparado con el programador. Uno de ellos es **sistemas operativos**.

No es necesario ser un experto en profundidad en cada uno de los rubros. Pero usualmente un desarrollador conocerá bastante bien algunos de los aspectos de la mayoría de ellos. Con mayor o menor detalle, un desarrollador debería poder describir los siguientes puntos.

Kernel
: Es el corazón del sistema operativo. Una capa de software que interactúa en forma directa con el hardware del equipo. Y es el intermediario entre este y las aplicaciones de usuario.

Permisos
: El kernel del sistema operativo tiene varias funciones pero al ser en medio de acceso al hardware tiene como tarea fundamental ejercer control sobre las acciones del usuario y las aplicaciones a través del sistema de permisos. La implementación de permisos varía entre diferentes sistemas operativos pero comunmente definen usuarios y grupos que serán los sujetos de los permisos. Y luego tipos de acceso a los recursos que podrán limitar a qué recurso y con qué acciones se puede acceder.

Proceso
: Es una unidad de ejecución dentro del sistema operativo. Muchas veces es un programa o aplicación. Pero también existen procesos surgidos de drivers o el propio sistema operativo. Cada proceso tiene un identificador y el sistema operativo mantiene información respecto del proceso para poder administrar el uso de la CPU, memoria y dispositivos.

Multitasking
: En sistemas operativos como **Windows**, **Linux**, **OSX** y otros se utiliza una técnica que permite ejecutar varias aplicaciones virtualmente al mismo tiempo. Y decimos virtualmente porque si el procesador del equipo tiene una sola CPU no existe una ejecución en paralelo real. Lo que ocurre es el multitasking. Que consiste en entregar el control de la CPU a cada aplicación por un período de tiempo corto. Y de esta forma permitir que cada una de un pequeño paso en su ejecución. Repitiendo esta procedimiento tán rápido que el usuario percibe que las aplicaciones se ejecutan todas al mismo tiempo.

Context switch
: En sistemas operativos _multitasking_ el procesador (o cada procesador presente) es prestado a cada proceso por un momento. Desde el punto de vista del proceso, éste recibe acceso a la CPU para realizar su trabaja periódicamente. Pero la aplicación no tiene código para manejar esa situación. El proceso ocurre en forma transparente. Porque el sistema operativo realiza la tarea de _context switching_. Durante la cual almacena el estado de la CPU antes de quitarle el acceso al proceso. Y lo recupera justo antes de volver a prestarle la CPU.

Core/Threads
: Si bien este es un aspecto del hardware creo que entra en la lista por estar íntimamente ligado al sistema operativo. Los _cores_ del procesador de la computadora son CPUs y están presente en procesadores multicpu. Básicamente se trata de varias CPUs integradas en un sólo chip a diferencia de los antiguos procesadores que contenías sólo una. Un equipo con procesador multicore puede ejecutar tantas operaciones simultáneas como cores disponga. Obteniendo una ejecución en paralela real a diferencias de un procesador _single core_. Aunque por supuesto el _multitasking_ sigue ocurriendo porque usualmente hay más aplicaciones y programas para ejecutar que cantidad de cores. Por otra parte _thread_ viene de la tecnología **SMT** o **Hyperthreading**. Y se trata de utilizar los cores de una forma que podría duplicar su rendimiento en un caso ideal. Aunque en la práctica se suele obtener un 50% de mejora con respecto a no usar la tecnología. Y depende mucho del tipo de procesamiento que se realice.

Cache de disco
: Es un cache de la información del disco que el kernel almacena en la memoria RAM no utilizada por los procesos. De esta forma el kernel puede obtener información del disco en forma virtual (ya que la obtiene realmente de la RAM) o una velocidad substancialmente superior. Y esto es transparente a los procesos, de forma que ellos no puede saber la diferencia. Los detalles del concepto que acabamos de describir pueden variar entre los distintos sistemas operativos. También existe lo que se llama _disk buffer_ pero que muchas veces es confundido con el _disk cache_. El primero es una memoria RAM de entre 8 y 256MiB ubicada en la placa controladoras del disco o SSD. Y que es controlada por el propio disco y no por el sistema operativo.

Cache de CPU
: Otro tema puro de hardware pero muy relacionado con el sistema operativo es el conjunto jerárquico de caches que existe dentro a la CPU y que almacenan porciones de la memoria principal tanto para datos como para instrucciones. Los distintos niveles de cache utilizan distintas estrategias y cumplen distintas funciones. Pero todas tienen como fin aumentar la performance disminuyendo al cantidad de accesos a memoria que tiene que hacer la CPU.

Concurrencia
: Para poder proteger recursos en programación concurrente se necesitan **mutex** y otros artefactos similares o derivados. Para poder implementarlos el sistema operativo utiliza instrucciones atómicas provistas por el procesador. Y sobre ella construye los distintos tipos de protecciones. Que luego será utilizadas por las aplicaciones _multithread_.

File descriptors
: Como orquestador del equipo, el sistema operativo lleva el control de los archivos (y dependiendo del sistema operativo, otros dispositivos) siendo accedidos por un proceso en particular. A esto se le llama _file descriptors_ y se mantiene una tabla por cada proceso.

Pipes
: Varían con cada sistema operativo pero se comportan usualmente como archivos que pueden ser abiertos por más de un proceso y estos pueden intercambiar información a través de los mismos. No son archivos y los datos enviados a ellos no terminan en el disco sino el el proceso que se encuentre en el otro extremo. Es una canal de comunicación y por eso se los llama pipes (tubos).

La lista podría seguir pero la idea no es ser exhaustivos sino ejemplificar a alto nivel cuantos temas existen sobre los que un desarrollador conocerá (con mayor o menor profundidad). Y que lo diferencian del programador, quien puede tener estos conocimientos pero no son necesarios para poder llamarse programador. De hecho si un programador tiene conocimientos sobre los temas listados está en camino a ser un desarrollador.

---
Imagen de [Gerd Altmann](https://pixabay.com/users/geralt-9301)
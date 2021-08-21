---
title: Borrar definitivamente archivos de un disco
author: Leandro Fernandez
type: post
date: 2014-05-18T22:41:33+00:00
categories:
  - Tecnología
tags:
  - sistemas operativos

---
Aunque podemos sorprendernos, hay muchas personas que utilizan computadoras y no saben que cuando eliminan un archivo (incluso cuando lo eliminan de la papelera de reciclaje) la información no se borra del disco realmente. Para quien ha llegado aquí sin saber esto, aclaro. Lo que ocurre en realidad es que el sistema operativo marca el archivo como eliminado y ya no lo muestra cuando se inspecciona el disco. Pero la información permanece allí. Y sólo se pierde realmente cuando, durante el proceso de guardar nueva información en el disco, el sistema operativo se ve obligado a escribir sobre el espacio en donde antes había un archivo.

Pero lo que originó este breve artículo no fue este dato sobre el conocimiento de las usuarios inexpertos, sino una pregunta que encontré en un sitio de usuarios avanzados. Donde alguien estaba preocupado por encontrar una forma de eliminar la información de un dispositivo de almacenamiento SSD (también conocido como disco de estado sólido). Ya que conocía el funcionamiento de los sistemas operativos y quería asegurarse de que la persona que le había comprado su dispositivo no pudiese recuperar la información que había guardado. Y proponía un método que consistía en escribir treinta y cinco veces cada sector del dispositivo con un cero. Pero al mismo tiempo temía que eso pudiera dañarlo.

La forma más efectiva y simple de asegurar la privacidad de la información que alguna vez contuvo un disco rígido, SD, SDD o cualquier otro medio de almacenamiento consiste en formatearlo y luego copiar en el información irrelevante hasta ocupar el 100% de su espacio. Para un usuario doméstico este proceso es suficiente. Porque asegura que nadie podrá recuperar la información a menos que cuente que lo posibilidad de utilizar técnicas muy avanzadas y complejas para intentar lograrlo. Y es improbable que alguien con esa capacidad esté interesado en la información que podría haber en un disco viejo de un usuario común.

Vale aclarar que el formato de un disco hace que algunos sectores nunca sean utilizados (o sea muy difícil asegurarnos de que fueron utilizados). Y eso podría implicar que a pesar de formatearlo y llenarlo con datos, aún seria posible recuperar la información de algunos sectores. También existen técnicas que permiten recuperar (potencialmente) información de un sector sobreescrito en almacenamientos magnéticos. Pero muy pocas personas tienen acceso a esas técnicas.

Para usuarios cuya información podría ser blanco de intentos de espionaje existen métodos un poco más avanzados. Y claro, nada impide que cualquier usuario que lo desee los utilice. El estándar **DoD 5220.22-M** del departamento de defensa de los EEUU define como mecanismo seguro la escritura de cada sector del disco con una secuencia completa de ceros, luego una secuencia completa de unos y finalmente un patrón binario aleatorio. Una extensión de este estándar llamada **DoD 5220.22-M ECE** realiza siete pasadas en lugar de tres. Y existen herramientas disponibles que llevan esta idea a extremos de varias decenas de escrituras. Son seguramente más efectivos pero a un alto costo en tiempo de procesamiento y desgaste de la unidad de almacenamiento.
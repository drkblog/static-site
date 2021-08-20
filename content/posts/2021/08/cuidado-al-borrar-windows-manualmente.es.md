---
title: Cuidado al borrar Windows manualmente
author: Leandro Fernandez
type: post
date: 2021-08-01T22:16:09+00:00
categories:
  - Tecnología
tags:
  - borrar archivos de programa
  - borrar windows
  - cmd
  - formatear
  - programdata
  - windows

---
Destruir la instalación de **Windows** de nuestro equipo es sorprendentemente fácil mientras intentamos eliminar **Windows** de un disco viejo.

Cuando compramos un disco más grande para nuestra PC de escritorio o reemplazamos el de nuestra notebook muchas veces nos quedamos con el anterior para guardar datos. En esta circunstancia es altamente probable que en lugar de formatear ese disco decidamos eliminar los archivos que no nos interesan manualmente. Y así ahorrarnos el trabajo de mover los datos temporalmente a otro lado mientras formateamos. Y luego volver a pasar los datos al disco. Los directorios de sistema de **Windows** (esos donde están los archivos binarios y de datos que el sistema operativo maneja) ocupan mucho espacio. Así que es una de las primeras cosas que vamos a remover.

Por supuesto que un usuario con conocimientos básicos no intentaría hacer esto. Pero con cierta experiencia y conocimiento, y sin ser expertos, es completamente esperable que intentemos esto. Y aquí es donde la cosa se pone peligrosa.

<!--more-->

Conectamos el segundo disco en el equipo y lo iniciamos desde el disco principal (posiblemente el disco nuevo que reemplazó al otro). O bien se trata de un disco cualquiera que conectamos a nuestro equipo por primera vez. Como sea, vamos a borrar los directorios **Windows**, Archivos de programa, `Program Files` si es la versión en inglés. Si intentamos hacer esto con el explorador de **Windows** nos vamos a encontrar con que no es posible debido a los permisos de los archivos. Aunque el explorador nos permite intentar cambiar el propietario de los archivos en forma recursiva, esto no es suficiente. Personalmente no profundicé como saber si es posible lograrlo desde el **Windows Explorer** a través de más cambios en los permisos. Pero creo que la mayoría de los usuarios intentando esto, en este punto, buscarán cómo hacer esto desde la terminal (`CMD`). Y en seguida se encontrarán con una receta muy simple.

_**Advierto**: si llegaste acá buscando simplemente cómo borrar estos directorios te recomiendo terminar de leer el artículos antes de usarlos._

{{< highlight shell >}}
takeown /F "Z:\Program Files" /A /R /D Y
icacls "Z:\Program Files" /T /grant administrators:F
rd /s /q "Z:\Program Files"
{{< / highlight >}}

Estos comandos tal cual se encuentran sirven para un **Windows** en inglés pero es muy fácil cambiarlos para uno en español. El primer comando cambia el propietario de todos los archivos y directorios dentro de **Program Files** (inclusive) a **Administrator**. El segundo le entrega todo tipo de permiso existente a Administrator para todo los archivos y directorios dentro de **Program Files** (inclusive). Y el último comando elimina **Program Files** y todo su contenido. Todos los comandos realizan la tarea son pedir confirmación al usuario.<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio">

<div class="wp-block-embed__wrapper">
  <span class="embed-youtube" style="text-align:center; display: block;"></span>
</div></figure> 

Hasta aquí, siempre que estemos posicionados en la unidad correcta y nunca en el C: no hay mayores peligros dado que nuestra intención es efectivamente eliminar este directorio. Pero en seguida vamos a generalizar esta receta y la aplicaremos a los otros directorios que queremos eliminar, como por ejemplo **Windows**. Y cuando hayamos terminado nos daremos cuenta de que aun hay mucho espacio ocupado en el disco. Así que buscaremos si hay archivos o directorios ocultos por sus atributos o por ser de sistema. Y no tardaremos en dar con el infame directorio llamado ****`Users\All Users\` en el raíz si se trata de un disco que tenía instalado Window 7. Pero podemos llegar a encontrarnos con una situación similar en otros directorios aunque se trate de una instalación de otra versión de Windows. Así que recomiendo no abandonar la lectura aquí.

En **Windows 7** el directorio  ****`C:\Users\All Users\` no es realmente un directorio sino un enlace simbólico. Es decir, se trata de un puntero a otro directorio. Y apunta literalmente a la ruta `C:\ProgramData`. Es decir que aún en este disco que conectamos y tiene asignada una unidad distinta (por ejemplo `E:`) este puntero redirecciona a `C:\ProgramData` y no al directorio `E:\ProgramData`.

Como ya se pueden imaginar esto es una receta para el desastre. Porque si estamos en la unidad `E:` y entramos a este directorio no vamos a darnos cuenta de que estamos viendo contenido del disco principal de nuestro equipo. Y dado que estamos intentando vaciar la unidad E: lo más posible muy probablemente apliquemos la receta anterior aquí también. Y estaremos destruyendo la instalación de **Windows** del equipo que estamos utilizando.

Para evitar este error o uno similar, ya que hay otros enlaces simbólicos que incluyen la unidad `C:`, podemos utilizar el comando `dir /aL` en la ubicación actual para obtener una lista de los enlaces simbólicos. Aquí vemos un ejemplo de **Windows 10** donde `Documents and Settings` apunta a `C:\Users`. Por lo tanto si conectara este disco en otro equipo y recibiera una letra de unidad distinta de `C` de todas formas al entrar en este directorio llegaría la unidad `C` de esa computadora (siempre que exista un directorio `Users` en la misma).<figure class="wp-block-image size-full">

[<img loading="lazy" width="676" height="197" src="https://blog.drk.com.ar/wp-content/uploads/2021/08/dir-al.png" alt="" class="wp-image-2706" srcset="https://blog.drk.com.ar/wp-content/uploads/2021/08/dir-al.png 676w, https://blog.drk.com.ar/wp-content/uploads/2021/08/dir-al-300x87.png 300w, https://blog.drk.com.ar/wp-content/uploads/2021/08/dir-al-672x197.png 672w" sizes="(max-width: 676px) 100vw, 676px" />][1]</figure> 

Podemos ver este directorio sólo si incluimos el argumento `/a` en el comando `dir`. Si omitimos `/L` vamos a verlo junto con el resto de archivos y directorio en la raíz de `C:`. El indicador `<JUNCTION>` nos muestra que se trata de un enlace simbólico y el texto entre corchetes indica a dónde apunta.

Por supuesto que estoy escribiendo este artículo desde la experiencia. Y les puedo decir que no es difícil cometer este error. De hecho, cuando me ocurrió encontré rápidamente muchas personas que habían pasado por lo mismo. En mi caso sólo llegué a cambiar el propietario de `C:\ProgramData` de mi **Windows 10**. Y el sistema operativo comenzó a funcionar mal. Sólo eso fue suficiente para tener que instalar **Windows** de nuevo. Porque el contenido de esa carpeta tiene distintos propietarios y reconstruir esa configuración fue imposible.

 [1]: https://blog.drk.com.ar/wp-content/uploads/2021/08/dir-al.png
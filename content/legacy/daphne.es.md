---
title: Daphne v2.04
description: "Reemplazo del administrador de tareas de Windows"
date: 2014-09-29
slug: "daphne-administrador-tareas-windows-reemplazo"
type: page
---

## Descripción
Daphne es una pequeña aplicación para matar, controlar e inspeccionar procesos en Windows.
Actualmente se considera un reemplazo del administrador de tareas de Windows, pero nació en el año 2005 para terminar programas en forma automática.
Se pueden terminar aplicaciones arrastrando el mouse sobre sus ventanas, seleccionado el proceso en la lista de tareas, o escribiendo el nombre con el comando "Matar todos por nombre".
Daphne puede modificar la ventana de cualquier aplicación para que sea transparente, siempre en primer plano, habilitarla, et cetera.

La ventana principal muestra una lista de las tareas en ejecución actualmente, con información sobre: Uso de procesador [CPU], Identificador de proceso [PID], Nombre, Ruta completa (y argumentos), Prioridad, Clase (Proceso / Servicio), Uso de memoria actual, Pico de uso de memoria, Uso de memoria de intercambio actual, Pico de uso de memoria de intercambio y Número de hilos de procesamiento.

![daphne](/downloads/legacy/daphne/ScreenShot_1_201.png)

## Gracias
A Magnus Hansson y Vitaliy Dovgan por la ayuda probando en sistemas operativos de 32 bits y con Windows XP.
Al "Equipo de traducción" - Giacomo Margarito, Arno Krumpholz, Gin, Marc Cueni, 風逸蘭, He Zhenwei, Forth Bunny, Vicent Adam, Michał Trzebiatowski, Jangir Ganeev, Paulo Guzmán, Renato Euclides da Silva, Asabukuro Dongorosu, Abdurrahman Aborazmeh y Jim Lineos.
A Zach Hudock por covertir a Daphne en una aplicación portable en el proyecto PortableApps
A Barry Cleave por escribir una nota sobre Daphne llamada " Daphne - Modifica, Controla & elimina procesos de Windows con tu Mouse"

## Descargas
[Daphne-setup 32 bits](/downloads/legacy/daphne/Daphne_setup_x86.msi) - [MD5](/downloads/legacy/daphne/Daphne_setup_x86.msi.md5) - [SHA1](/downloads/legacy/daphne/Daphne_setup_x86.msi.sha1) - 6.4MB - September 26, 2014

[Daphne-portable 32 bits](/downloads/legacy/daphne/Daphne_setup_x86.zip) - [MD5](/downloads/legacy/daphne/Daphne_setup_x86.zip.md5) - [SHA1](/downloads/legacy/daphne/Daphne_setup_x86.zip.sha1) - 6.0MB - September 26, 2014

[Daphne_setup 64 bits](/downloads/legacy/daphne/Daphne_setup_x64.msi) - [MD5](/downloads/legacy/daphne/Daphne_setup_x64.msi.md5) - [SHA1](/downloads/legacy/daphne/Daphne_setup_x64.msi.sha1) - [MD5] - [SHA1] - 6.6MB - September 26, 2014

[Daphne-portable 64 bits](/downloads/legacy/daphne/Daphne_portable_x64.zip) - [MD5](/downloads/legacy/daphne/Daphne_portable_x64.zip.md5) - [SHA1](/downloads/legacy/daphne/Daphne_portable_x64.zip.sha1) - 6.1MB - September 26, 2014

Daphne is licensed under the GNU General Public License

Source code distribution:
[Daphne-src.7z](/downloads/legacy/daphne/Daphne-src.7z)) - 309KB - Daphne v2.04 - September 26, 2014

## Características
* Información de recursos
* Lista de procesos detallada
* Ubicar/terminar el procesos dueño de una ventana
* Ubicar una ventana en el árbol de ventanas del proceso
* Activar/desactivar la propiedad "Primer plano" de una ventana
* Establecer el tamaño de una ventana ingresando un número (ej. 640x480)
* Ocultar por completo una aplicación mientras sigue corriendo
* Recordar la posición y tamaño de cualquier ventana
* Resaltado ajustable de procesos
* Agendado de mensajes emergentes, finalización de procesos, o apagado del equipo
* Trampas que ejecutan acciones sobre los procesos durante su inicio
* Copiar al portapapeles el nombre, ruta completa, PID, hash Md5 o SHA1 de un proceso
* Ubicar la carpeta que contiene el ejecutable
* Permite revisar el árbol jerárquico de procesos utilizando la opción "Mostrar árbol de procesos" en el ícono de la bandeja de sistema. Árbol de procesos
* Propiedades de una proceso muestra: nombre y PID del padre, tipo de ejecutable, usuario propietario, módulos, variables de entorno, árbol de ventanas e información de E/S.
* Soporte para la base de datos de procesos de DRK para la búsqueda y el aporte de información.
* Maneja prioridad y máscara de afinidad de CPUs del proceso.
* Herramienta para buscar proceso por ventana: identifica el proceso al que pertenece una ventana seleccionada visualmente.
* Trampas: se puede enstablecer trampas para aplicar ciertos cambios a procesos en el momento en que comienzan a ejecutarse.
* Matar todos por nombre: Elimina todos los procesos con un nombre determinado.
* Menú matar: Menú configurable, cada ítem tiene una lista de procesos que será eliminada cuando se active dicho ítem.
* Inspector de controles para revelar contraseñas ocultas.
* Mira arrastrable para matar, poner transparencia, habilitar controles y poner ventanas en primer plano.
* Agregar o quitar programas es una lista de las aplicaciones instaladas similar a la que viene con el sistema operativo, pero más rápida. Software instalado
* La configuración de Daphne se puede hacer portable utilizando archivo INI en lugar del registro de Windows.
* Funcionalidad múltiples escritorios: permite usar hasta cuatro escritorios distintos al mismo tiempo con la combinación de teclas WindowsKey + F5 a F8.
* Internacionalización: Español, Italiano, Alemán, Francés, Chino, Valenciano, Polaco, Ruso, Portugués, Sueco, Japonés, Árabe y Griego.
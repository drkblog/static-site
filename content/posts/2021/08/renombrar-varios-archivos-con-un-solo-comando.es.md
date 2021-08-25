---
title: Renombrar varios archivos con un solo comando
author: Leandro Fernandez
type: post
date: 2021-08-24
cover: "/2021/08/rename-multiple-files.png"
excerpt: 'Cómo renombrar varios archivos con un solo comando utilizando un patrón.'
categories:
  - Programación
tags:
  - shell
  - terminal
  - regex
---

Cualquiera que haya estado trabajando un poco en el área de sistemas u otras tareas fuertemente asistidas por computadora ha tenido **la necesidad de renombrar muchos archivos con un criterio único**. Y sin una herramienta que facilite el trabajo se trata de un proceso manual, monótono y aburrido.

Cuando tenemos un conjunto de archivos que tienen una parte en común, ya sea prefijo, sufijo o incluso una sección en medio del nombre, es posible que necesitemos cambiar esa parte común en todos ellos. Y en cuanto empezamos a realizar esa tarea manualmente entendemos que debería automatiazrse sin lugar a dudas. Ya que existe una lógica fija a aplicar a cada archivo. Pero los sistemas operativos más populares no nos ofrecen una herramienta que esté disponible por defecto o bien la tienen pero no son muy conocidas, o tiene alguna alternativa que no es muy flexible.

A continuacón explico la forma que me parecen más potente para realizar este tipo de trabajo.

## Utilitario Rename basado en Perl

Existe una herramienta basada en **Perl** que nos permite utilizar una expresión regular para el renombrado. Sé que mucha gente le teme a las expresiones regulares. Pero la potencia que le imprime esta característica a la herramienta es insuperable. Y hasta podemos utilizarla en Windows con un poco de trabajo extra.

### Instalación

Elige tu sistema operativo:

- [Linux](#linux)
- [MacOS](#macos)
- [Windows](windows)

#### Linux

Aunque personalmente utilizo los administradores de paquetes natvios en Linux, en este caso creo que Homebrew puede simplificar las cosas. Si estás utilizando Ubuntu, existe el paquete ***rename*** en `http://archive.ubuntu.com/ubuntu focal/universe amd64 Packages`. Pero no sé si es fácil de obtener en otras distribuciones. Así que recomiendo [instalar Homebrew](https://brew.sh/) y luego:
```
$ brew update
$ brew install rename
```

#### MacOS

Directamente [instalar Homebrew](https://brew.sh/) y luego:
```
$ brew update
$ brew install rename
```

#### Windows

Sé que esto va a parecer un poco extremo pero aquí recomiendo activar el Subsistema para Linux de Windows e instalar Ubuntu. Luego simplemente referirse a cómo instalar **rename** en Linux. No estoy sugiriendo instalar un sistema operativo completo sólo para usar una herramienta. Sino que esto nos habilita el acceso a muchas otras herramientas de productividad de las que Windows carece.

De todas formas pongo a disposición de quienes no quieran o no puedan utilizar esta opción, algunas [formas de renombrado nativas](#renombrado-nativo-en-windows). Si realmente no vamos a utilizar una instalación de Ubuntu en nuestro subsistema para Linux podemos obtener [la misma potencia con **PowerShell**](#renombrado-con-powershell).

### Uso de rename

A los fines de ejemplificar comencemos con un conjunto de tan sólo diez archivos con un prefijo común.

{{< highlight shell >}}
total 0
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:21 .
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:21 ..
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0000.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0001.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0002.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0003.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0004.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0005.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0006.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0007.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0008.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-0009.jpg
{{< /highlight >}}

Imaginemos que tenemos que cambiar `imagen` por `foto`:

{{< highlight shell >}}
➜   rename 's/imagen/foto/' *
➜   ls -la
total 0
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:25 .
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:25 ..
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0000.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0001.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0002.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0003.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0004.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0005.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0006.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0007.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0008.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0009.jpg
{{< /highlight >}}

Simplemente utilizamos una expresión regular de reemplazo cuya estructura es `s/<patrón>/<reemplazo>/` y donde `<patrón>` es una secuencia de caracteres de expresión regular que sirven para seleccionar una parte del texto y `<reemplazo>` es el texto a utilizar en lugar de lo seleccionado.

En su forma más básica esta expresión puede utilizarse escribiendo literalmente lo que queremos encontrar en el lugar del **patrón** y aquello con lo que queremos reemplazarlo en **reemplazo**. Sólo debemos tener en cuenta que no podemos utilizar caracteres especiales que tienen valor propio en una expresión regular como por ejemplo `[, ], *, ., -, etc`. 

Podríamos necesitar agregar un sufijo al nombre de los archivos. Y si bien existe más de una forma creo que lo más simple sería:

{{< highlight shell >}}
➜  rename 's/.jpg/-foto.jpg/' *
➜  ls -la
total 0
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:36 .
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:36 ..
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0000-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0001-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0002-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0003-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0004-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0005-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0006-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0007-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0008-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-0009-foto.jpg
{{< /highlight >}}

Como podemos ver no tuve problemas a pesar de utilizar caracteres reservados de expresiones regulares. Pero eso es sólo porque no utilicé una combinación válida. Ya llegaremos a eso.

Ahora digamos que quiero encerrar los números entre corchetes, por ejemplo  `[0007]` y entonces necesitaré capturar el número de alguna manera e indicarle al utilitario cómo usar esa captura en el reemplazo. Para esto vamos a escribir una expresión regular que pueda capturar cualquier número de cuatro cifras `[0-9]{4}` y además vamos a indicar que queremos capturar ese valor para usarlo en la salida:

{{< highlight shell >}}
➜  rename 's/([0-9]{4})/[$1]/' *
➜  ls -la
total 0
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:41  .
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:41  ..
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0000]-foto.jpg'
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0001]-foto.jpg'
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0002]-foto.jpg'
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0003]-foto.jpg'
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0004]-foto.jpg'
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0005]-foto.jpg'
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0006]-foto.jpg'
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0007]-foto.jpg'
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0008]-foto.jpg'
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 'foto-portada-[0009]-foto.jpg'
{{< /highlight >}}

Cada bloque de expresión regular encerrado entre parentesis es una captura que se numera a partir de 1 y que puedo referenciar en la salida como $1, $2, etc. Dicho esto, vale resaltar que al utilizar caracteres especiales en los nombres de archivo podemos comprarnos un problema así que recomiendo no hacerlo en la vida real.

Si ahora quisiera reemplazar lo corchetes de apertura por una X podría intentar:

{{< highlight shell >}}
➜  rename 's/[/X/' *
Unmatched [ in regex; marked by <-- HERE in m/[ <-- HERE / at (user-supplied code).
{{< /highlight >}}

Aquí es donde queda claro que utilizar un caracter reservado de expresión regular puede impedirme el renombrado. Pero esto se soluciona muy fácilmente indicando que el caracter no debe interpretarse (lo que es inglés llamamos _escaping_) anteponiendo una barra invertida:

{{< highlight shell >}}
➜  rename 's/\[/X/' *
➜  ls -la
total 0
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:46 .
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:46 ..
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0000]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0001]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0002]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0003]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0004]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0005]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0006]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0007]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0008]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 foto-portada-X0009]-foto.jpg
{{< /highlight >}}

Por defecto la expresión regular reemplazará sólo una vez por archivo. Es decir que si ahora reemplazamos `foto` por `imagen`:

{{< highlight shell >}}
➜  rename 's/foto/imagen/' *
➜  ls -la
total 0
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:47 .
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:47 ..
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0000]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0001]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0002]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0003]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0004]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0005]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0006]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0007]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0008]-foto.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0009]-foto.jpg
{{< /highlight >}}

Aún nos queda la palabra foto en el sufijo. Para indicar que el reemplazo tiene que ejecutarse para todas las posibles coincidencias agregamos la letra g al final. Este es un indicador especial y por eso se coloca después de la tercer barra:

{{< highlight shell >}}
➜  rename 's/foto/imagen/g' *
➜  ls -la
total 0
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:50 .
drwxr-xr-x 1 leandro leandro 512 Aug 25 01:50 ..
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0000]-imagen.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0001]-imagen.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0002]-imagen.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0003]-imagen.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0004]-imagen.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0005]-imagen.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0006]-imagen.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0007]-imagen.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0008]-imagen.jpg
-rw-r--r-- 1 leandro leandro   2 Aug 25 01:21 imagen-portada-X0009]-imagen.jpg
{{< /highlight >}}

El límite de lo que podemos hacer con esta herramienta está dado por los propios límites de las expresiones regulares. Así que será dificil que nos encontremos con casos que no podamos resolver. Excepto que necesitemos incluir aritmética en la lógica de reemplazo.

### Renombrado nativo en Windows

Existen un par de alternativas para renombrar múltiples archivos en Windows. Pero no son muy flexibles o son muy complejas. Por lo que me pareció interesante destacarlas. Además, en Windows utilizar **rename** implica activar el WSL (_Windows Subsystem for Linux_) es instalar **Ubuntu** o alguna otra distribución de **Linux**.

#### Renombrado múltiple con Explorador de Archivos

Con el Explorador de Archivos en Windows 10 es posible renombrar varios archvos al mismo tiempo seleccionándolos y presionando el botón **Cambiar nombre** de la solapa **Inicio**.

![windows-explorer-rename](/2021/08/windows-explorer-rename.png)

Pero lo que en realidad hace Windows es ponerle a todos los archivos el mismo nombre (el que ingresamos) y numerarlos con un paréntesis extra.

![windows-explorer-rename-ugly](/2021/08/windows-explorer-rename-ugly.png)

Por lo que perdemos la estructura original e incluso la identidad de los archivos. Lo bueno es que podemos presionar Ctrl+Z y deshacer la operación.

#### Renombrado desde CMD

El comando **rename (ren)** de CMD tiene una implementación propietaria, compleja y poco flexible de comodines. No es posible capturar una parte del nombre original y ubicarla en un lugar arbitrario del nombre destino. Sólo es posible utilizar parte del nombre original en la posición exacta en la que ya se encuentra.

Tomé algunos ejemplos de explicaciones que están en línea pero no voy a detallar cómo funciona:

```
ren  *  A?Z*
  a        -> AZ
  ab       -> AbZ
  a.txt    -> AZ.txt
  ab.txt   -> AbZ.txt
  abcd.txt -> AbZd.txt
```

Básicamente podemos dejar pasar uno o más caracteres de la entrada utilizando `?` y `*` respectivamente. Y es posible escribir patrones un poco más complejos pero con una muy limitada potencia.

#### Renombrado con PowerShell

Aquí tenemos la posibilidad de utilizar expresiones regulares en el reemplazo. Se podría argumentar que esto es equivalente a mi propuesta de **rename**. Pero creo personalmente que PowerShell es una herramienta poco utilizada fuera del ámbito de los administradores de sistemas **Windows** (_Windows DevOps_). Pero es cierto que podemos utilizar esta alternativa para evitar instalar Ubuntu en nuestro Windows si no le vamos a dar otro uso.

De nuevo, no voy a explicar en detalle los comandos. Sólo a modo de ejemplo:

{{< highlight powershell >}}
PS C:\Users\Leandro\tmp> Get-ChildItem -Filter "*portada*" -Recurse | Rename-Item -NewName {$_.name -replace 'portada', 'fondo' }
PS C:\Users\Leandro\tmp> dir


    Directory: C:\Users\Leandro\tmp


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0000.jpg
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0001.jpg
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0002.jpg
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0003.jpg
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0004.jpg
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0005.jpg
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0006.jpg
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0007.jpg
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0008.jpg
-a----         8/25/2021   9:08 AM              2 imagen-fondo-0009.jpg
{{< /highlight >}}

## Conclusión

Existe una forma muy potente y flexible para renombrado de archivos, y que está disponible en las tres plataformas. En el caso de Windows podríamos no querer utilizar esa opción y existe una alternativa nativa. Pero personalmente utilizo mi propuesta inicial de **rename**. Espero que este artículo haya sido de utilidad. Compártanlo con quienes puedan encontrarlo interesante y últil.
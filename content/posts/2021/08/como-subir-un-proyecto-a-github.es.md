---
title: Cómo subir un proyecto a GitHUb
author: Leandro Fernandez
type: post
date: 2021-08-22
categories:
  - Programación
tags:
  - github
---

Quien necesita subir un proyecto a GitHub puede encontrase en distintas situaciones, y eso ppodría variar el procedimiento a seguir.
A continuación describo la secuencia de pasos que más se adapta a las variantes típicas.
Por lo tanto algunos de los pasos enumerados pueden no ser necesarios. Por ejemplo, si ya tenemos instalado el cliente de **Git**, saltearemos el paso que explica cómo instalarlo. También hay variaciones dependiendo del sistema operativo. En los casos que es necesario muestro las diferencias para Windows, Linux y MacOS. En muchos pasos hay un sólo comando que sirve para los tres sin modificaciones o que requieren cambios muy obvios que no vale la pena marcar expresamente.

![github](/2021/08/github.svg.png)

## Crear una clave SSH

Si ya tenés una clave SSH disponible [salteá esta sección](#instalar-git).

0. Crear una **par de claves ssh** para configurar la parte pública del par en GitHub como forma de validación de identidad.
    1. **Windows:** hay varias formas de generar claves ssh en Windows pero como vamos a utilizar también Git lo más práctico es utilizar [Git for Windows](https://gitforwindows.org/) que también nos proveerá un `bash` para Windows. Desde ahí podremos generar la clave igual que en Linux.
    2. **Linux:** utilizar **ssh-keygen** para crear las claves. Que por defecto quedarán en el directorio `.ssh` del home. 
    ```
    $ ssh-keygen
    ```
    3. **MacOS:** ejecutar el mismo comando que para Linux.

## Instalar Git

Si ya lo tenés instalado [salteá esta sección](#agregar-los-archivos-al-repositorio-local).

1. Debemos instalar el cliente Git de línea de comandos para nuestro sistema operativo.
    1. **Windows:** descargar el cliente correspondiente desde la [página de descargas oficial](https://git-scm.com/downloads) y luego ejecutar el instalador descargado siguiendo los pasos hasta el final.
    2. **Linux:** si bien es posible descargar el cliente desde la [página de descargas oficial](https://git-scm.com/downloads) casi todas las distribuciones de Linux tendrán disponible el cliente de Git desde el adminsitrador de paquetes propio. Recomiendo utilizar esa opción siempre que está disponibls. En Ubuntu, por ejemplo, ejecutaremos:
    ```
    $ sudo apt-get install git
    ```
    3. **MacOS:** también es posible descargar el cliente desde la [página de descargas oficial](https://git-scm.com/downloads) pero personalmente prefiero utilizar [Hombrew](https://brew.sh/) cuando utilizo MacOS. De elegir esa alternativa ejecutaremos:
    ```
    $ sudo brew install git
    ```
2. Confirmar que se instaló correctamente Git ejecutando el cliente desde la terminal de nuestro sistema operativo:
```
git --version
```

## Agregar los archivos al repositorio local

Si ya tenés un repositorio Git local con el proyecto o si todavía no existe el proyecto [salteá esta sección](#crear-cuenta-en-github).

3. Hacer una **copia de respaldo** de nuestro código. Ya que vamos a crear un repositorio en el lugar donde se encuentra nuestro código fuente es importante tomar una medida de seguridad. Aún cuando el procedimiento en sí es bastante seguro. Siempre podemos cometer un error. Para evitar problemas comprimir todo el contenido del proyecto en un archivo ZIP o similar y guardarlo en lugar seguro.
4. Utilizando la terminal posicionarse en el directorio **raíz de nuestro proyecto**. El contenido de este directorio será el que subiremos al raíz de nuestro proyecto en **GitHUb**.
5. Crear un repositorio Git en ese lugar. Este procedimiento no eliminará ni afectará los archivos y directorios que existan en el lugar.
```
git init
```
6. Seleccionar los archivos que agregaremos al repositorio local que acabamos de crear. Este paso puede variar dependiendo de si tenemos que agregar el total de archivos y directorios o sólo una parte de ellos. Y esto a su vez dependerá del proyecto en particular. Usualmente no queremos incluir archivos binarios que se generan a partir del código fuente (típico de lenguajes como Java y C/C++). En esos casos es ideal eliminarlos antes de este paso.
    1. Si hay que agregar un archivo en particular:
    ```
    git add <ruta/nombre_de_archivo>
    ```
    2. Si hay que agregar un directorio con todo su contenido:
    ```
    git add <ruta>
    ```
    3. Si hay que agregar todos los archivos y directorios:
    ```
    git add .
    ```
    4. Si agregamos un archivo y queremos revertir esa acción:
    ```
    git restore --staged <ruta/nombre_de_archivo>
    ```
7. Crear un commit para incorporar efectivamente todos los archivos seleccionados. Utilizando una descripción que se ajuste a nuestras necesidades:
```
git commit -m "Incorporación del proyecto Ejemplo"
```

## Crear cuenta en GitHub

8. Entrar en [GitHub](https://github.com/) y seguir los pasos para dar de alta una cuenta. No voy a detallarlos porque ocasionalmente hay cambios en el procedimiento y lo que pueda explicar aquí quedaría obsoleto.
9. Crear un repositorio en GitHub para nuestro proyecto. En caso de que aún no tengamos un proyecto y en la sección anterior no hayamos creado un repositorio local, recomiendo agregar un README como suele ofrecer GitHub. En caso contrario creo que es más fácil que el repositorio remoto (el que creamos en GitHub) esté completamente vacío.
10. Copiar la URL de clonación del repositorio. Normalmente aparece en el botón llamado ***Code***. Y ofrece alternativas de las cuales recomiendo la opción _SSH_. Nos dará un URL similar a esta:
```
git@github.com:drkblog/ejemplo.git
```
11. Dar de alta la **clave pública de SSH**. 
    1. En GitHub iremos a la configuración (_Settings_) desde el menú que se desprende del avatar.
    2. Elegiremos la subsección **SSH and PGP keys**.
    3. Presionaremos **New SSH key**.
    4. Le pondremos un nombre descriptivo y pegaremos con texto de la clave pública (`id_rsa.pub`).
    5. Presionaremos **Add SSH key**.

## Conectar el repositorio local con el remoto

Si no tenés repositorio local continuá con esta [sección alternativa](#mi-proyecto-aún-no-existe).

12. Agregar el repositorio creado en GitHub, como repositorio remoto en el local utilizando el alias `origin`. En la terminal y posicionados en el directorio raíz del repositorio local ejecutar, reemplazando `git@github.com:drkblog/ejemplo.git` por la URL obtenida en la sección anterior:
```
git remote add origin git@github.com:drkblog/ejemplo.git
```
13. Descagar cambios desde el repositorio remoto. Aunque este paso no debería ser necesario podría requerirse si hay archivos agregados en el repositorio de GitHub. Por ejemplo, si aceptamos que agregue el `README.md`. Indicamos al comando `pull` que queremos traer datos del remoto `origin` y de la rama `master`
```
git pull origin master
```
14. Subir los datos del repositorio local al remoto. En este caso indicamo nuevamente que el destino del `push` es remoto `origin` y rama `master`. Y por única vez le indicamos que configure este remoto como el ***upstream***. Es decir, el destino por defecto de los cambios enviados con `push`.
```
git push --set-upstream origin master
```

A partir de este momento nuestro repositorio local quedó enlazado con el remoto y podremos subir y descargar cambios del mismo.

## Mi proyecto aún no existe

Descargaremos directamente un clon del repositorio de GitHub al cual podremos agregar archivos a medida que los creemos. Utilizaremos la URL que obtuvimos en el paso 10 cuando creamos el respositorio. Y pondremos un nombre para el repositorio local (en este caso utilicé ejemplo) que será el nombre con el que creará el directorio que contendrá al repositorio. Por lo tanto conviene ejecutar el comando en una ubicación adecuada para contener a este repositorio.

```
git clone git@github.com:drkblog/ejemplo.git ejemplo
```

Si esto lo hicimos, por ejemplo, en `/home/usuario/repositorios/` ahora tendremos una ruta `/home/usuario/repositorios/ejemplo/` dentro de la cual podemos crear/copiar archivos y agregarlos al control de versiones tal como se explica en [esta sección](#agregar-los-archivos-al-repositorio-local).

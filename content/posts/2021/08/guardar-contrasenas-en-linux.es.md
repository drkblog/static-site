---
title: Guardar contraseñas en Linux
author: Leandro Fernandez
type: post
date: 2021-08-17T02:20:56+00:00
cover: "/2021/08/tux.png"
categories:
  - Programación
tags:
  - contraseña
  - shell
  - terminal
  - linux
---

_Unos días atrás expliqué [cómo evitar que tu contraseña quede expuesta en la terminal a través del historial del shell, en Mac]({{< ref "/posts/2021/08/2-comandos-para-proteger-tu-contrasena.es.md" >}}). Hoy vamos a ver cómo guardar contraseñas en form segura en Linux._

En el artículo enlazado más arriba mencionamos que es común exponer contraseñas al pasarlas como argumento en la línea de comandos. Y el compromiso de seguridad que ello implica. También puede ocurrir que tengamos que manejarnos con una cantidad decente de contraseñas y recordarlas y escribirlas todo el tiempo sea un problema. En ambas situaciones un _**keyring**_ o una _**keychain**_ es muy útil. Vamos a ver de qué se trata y cómo aprovecharlos.

Un **_keyring_** (o _keychain_) es una aplicación (usualmente nativa del sistema operativo) que nos permite almacenar contraseñas, claves PGP y certificados en forma segura. En este artículo vamos a concentrarnos sólo en las contraseñas pero esta introducción facilitará el aprender el resto de los usos más tarde.

## La idea

Se trata de almacenar las contraseñas en una aplicación que luego nos permitirá recuperarlas. Para esto nos solicitará siempre que ingresemos la contraseña que corresponde a la credencial de nuestro usuario en el sistema operativo. Para confirmar que somos nosotros quienes solicitamos recuperar la clave. Y evitar que alguien que simplemente se siente frente al teclado de nuestro equipo, aún si está desbloqueado, pueda recuperar (y ver) estas _passwords_.

Una vez almacenada una contraseña podremos evitar escribirla aprovechando el operador de reemplazo de comando (command substitution) del _shell_. Si ejecutamos una aplicación ficticia que requiere la contraseña como argumento podríamos escribir:

{{< highlight shell >}}
$ app -u miUsuario -p $(secret-tool lookup user miUsuario context app)
{{< / highlight >}}

La substitución del _shell_ hará que `secret-tool lookup user miUsuario context app` sea reemplazado por la contraseña que retornará la aplicación **secret-tool**. Y de esta forma evitamos escribirla y que quede expuesta en el historial. Pero veamos cómo funciona exactamente **secret-tool**.

## Gnome-keyring

La aplicación **secret-tool** se utiliza en conjunto con **gnome-keyring**. En _linux_ disponemos también de una alternativa relacionada con KDE llamada **KWallet**. Que cumple la misma función pero que no voy a detallar aquí. Sin embargo si continuás leyendo este artículo podrás tener el concepto y leyendo la documentación de **KWallet** podrás encontrar los comandos equivalentes a los expuestos aquí.

Al momento de escribir esto pude confirmar que el paquete **gnome-keyring** viene instalado por defecto en un Ubuntu desktop. Si este no es el caso o si el equipo donde te encontrás no lo tiene. Simplemente hay que instalarlo:

{{< highlight shell >}}
$ sudo apt-get install gnome-keyring
{{< / highlight >}}

Luego hay que instalar **secret-tool**, que no viene por defecto:

{{< highlight shell >}}
$ sudo apt install libsecret-tools
{{< / highlight >}}

Ahora ya podremos almacenar nuestra primera contraseña en el keyring. Para esto será necesario que usemos atributos (con sus valores pertinentes) para poder identificar la contraseña y luego recuperarla. Estos atributos y valores son arbitrarios pero recomiendo utilizar algo que tenga sentido para organizar las contraseñas. Personalmente creo que es indispensable escribir el nombre de usuario al que pertenece la clave y el contexto en el que se usa. Es decir, si se trata de una clave para **GitHub** podría usar &#8220;github&#8221; como contexto. También tenemos que pasar una etiqueta que será usada para mostrar la contraseña en la lista. Pero ésta no nos sirve para recuperar el _password_ desde la línea de comandos.

{{< highlight shell >}}
$ secret-tool store --label="Prueba" user leandro context artifactory
Password:
{{< / highlight >}}

Llamando a la aplicación **secret-tool** y usando el comando **store** vamos a guardar una clave. Para el ejemplo puse un atributo **user** y su valor &#8220;leandro&#8221; y otro **context** y como valor &#8220;artifactory&#8221;. Insisto en que los nombres de los atributos son arbitrarios. Yo lo puse en inglés pero podrían ser en español. El valor de los atributos puede ser cualquier cosa pero tiene sentido que pongamos valores correspondientes a lo que el atributo que elegimos representa.

Inmediatamente nos pedirá que ingresemos la contraseña que queremos guardar. Yo ingresé &#8220;miClave&#8221; en este caso. Si es la primera vez que guardamos una contraseña **gnome-keyring** creará un **_keyring_** por defecto y nos pedirá que lo protejamos con una contraseña maestra. La cual deberemos ingresar para recuperar las claves. Es posible que en una instalación con una configuración distinta a la mía esto no sea solicitado y que la propia clave del usuario del sistema operativo sirva para acceder al **_keyring_**.

![gnome-keyring](/2021/08/gnome-keyring-creation.png)

Con esto ya habremos guardado nuestra primera clave en el keyring. Ahora confirmaremos que fue guardada correctamente utilizando el comando que también nos servirá para utilizarla, por ejemplo, en un _command substitution_ de **_bash_**.

{{< highlight shell >}}
$ secret-tool lookup user leandro context artifactory
miClave
{{< / highlight >}}

Ejecutamos secret-tool con el comando lookup para buscar una contraseña en base a los atributos con los que la guardamos. Por supuesto paso los mismos atributos que antes pero no paso etiqueta. Y obtengo en la salida del programa lo que ingresé como clave cuando la guardé. Con esto ya sé que está lista para ser usada.

Un ejemplo de uso de esta clave sería al ejecutar **Maven** con una configuración que espera la contraseña del servidor de **Artifactory** en una propiedad de **Maven** llamada **server.password**.

{{< highlight shell >}}
$ mvn deploy -Dserver.id=miArtifactory -Dserver.username=leandro -Dserver.password=$(secret-tool lookup user leandro context artifactory)
{{< / highlight >}}

## Extras

La aplicación **secret-tool** tiene otros dos comandos que pueden ser útiles. Uno es para buscar todas las claves que tengan asociado cierto atributo. Si agrego otra contraseña para el mismo contexto del ejemplo anterior podría luego ejecutar el comando **search** y tener una salida de este tipo:

{{< highlight shell "linenos=table,hl_lines=4 8 9" >}}
$ secret-tool search --all context artifactory
[/org/freedesktop/secrets/collection/Default_5fkeyring/2]
label = Prueba2
secret = otra
created = 2021-08-17 02:14:17
modified = 2021-08-17 02:14:17
schema = org.freedesktop.Secret.Generic
attribute.context = artifactory
attribute.user = hernan
[/org/freedesktop/secrets/collection/Default_5fkeyring/1]
label = Prueba
secret = miClave
created = 2021-08-17 02:06:21
modified = 2021-08-17 02:06:21
schema = org.freedesktop.Secret.Generic
attribute.context = artifactory
attribute.user = leandro
{{< / highlight >}}

Si quier eliminar una de las contraseñas puedo utilizar el comando clear:

{{< highlight shell >}}
$ secret-tool clear user hernan context artifactory
$ secret-tool search --all context artifactory
[/org/freedesktop/secrets/collection/Default_5fkeyring/1]
label = Prueba
secret = miClave
created = 2021-08-17 02:06:21
modified = 2021-08-17 02:06:21
schema = org.freedesktop.Secret.Generic
attribute.context = artifactory
attribute.user = leandro
{{< / highlight >}}

En este caso eliminé la contraseña asociada con el usuario **hernan** para el contexto **artifactory**. Y al volver a listar todas las claves de ese contexto podemos ver que ya no existe una para el usuario hernan.

---
title: 2 comandos para proteger tu contraseña
author: Leandro Fernandez
type: post
date: 2021-08-13T19:31:06+00:00
excerpt: 'Cómo evitar exponer la contraseña en  la terminal a través del historial de comandos del shell en MacOS.'
categories:
  - Programación
tags:
  - artifactory
  - contraseña
  - contraseña en el historial
  - keychain
  - llaveros
  - macos
  - maven
  - password

---
_En este artículo te explico cómo evitar que tu contraseña quede expuesta en la terminal a través del historial del shell, en Mac. Pero el concepto para otros sistemas operativos es el mismo._

Como desarrolladores estamos ejecutando comandos en el _shell_ de nuestro equipo gran parte del tiempo. Algunas de las aplicaciones que ejecutamos pueden requerir que pasemos nuestra contraseña como argumento para validar el acceso a un servicio. Y si ese comando queda en el historial del _shell_, nuestra contraseña quedará expuesta.<figure class="wp-block-image size-full is-resized">

[<img loading="lazy" src="https://blog.drk.com.ar/wp-content/uploads/2021/08/keychain.png" alt="" class="wp-image-2744" width="744" height="434" srcset="https://blog.drk.com.ar/wp-content/uploads/2021/08/keychain.png 851w, https://blog.drk.com.ar/wp-content/uploads/2021/08/keychain-300x175.png 300w, https://blog.drk.com.ar/wp-content/uploads/2021/08/keychain-768x449.png 768w" sizes="(max-width: 744px) 100vw, 744px" />][1]</figure> 

Si bien muchas aplicaciones de línea de comando evitan recibir un _password_ como argumento con el fin de evitar el problema mencionado anteriormente. Puede que necesitemos escribir un _shell_ script para ejecutar muchos comandos y algunos requieran la contraseña por entrada estándar. Pero al mismo tiempo, esta no se encuentre disponible cuando ejecutamos el script. En este caso la técnica que describo a continuación también puede ser útil.

<!--more-->

Tal cómo lo menciona el título esta técnica consta de dos comandos:

  * Guardar nuestra contraseña en el **Llaveros** (**Keychain**, repositorio de claves)
  * Recuperarla cuando la necesitamos

La aplicación a utilizar en ambos casos se llama security y está disponible en nuestra **Mac** sin necesidad de hacer instalaciones o configuraciones adicionales. Para guardar una contraseña deberemos proporcionar además del password en sí, un nombre de usuario y un dominio o contexto. Este último nos permitirá saber en qué lugar tiene sentido utilizar esa contraseñas y también servirá para agrupar las que pertenezcan al mismo servicio.

{{< highlight shell >}}
$ security add-generic-password -a &lt;USUARIO> -s &lt;CONTEXTO> -w
{{< / highlight >}}

Reemplazando `<USUARIO>` con nuestro nombre de usuario (o el usuario al que corresponde el _password_) y `<CONTEXTO>` con una palabra que identifique el servicio al que pertenece la contraseña este comando nos pedirá que ingresemos la clave y al almacenará en la **Llaveros** de **MacOS**.

<div class="wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile" style="grid-template-columns:auto 45%">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="546" height="307" src="https://blog.drk.com.ar/wp-content/uploads/2021/08/keychain-pass-prompt.png" alt="" class="wp-image-2741 size-full" srcset="https://blog.drk.com.ar/wp-content/uploads/2021/08/keychain-pass-prompt.png 546w, https://blog.drk.com.ar/wp-content/uploads/2021/08/keychain-pass-prompt-300x169.png 300w" sizes="(max-width: 546px) 100vw, 546px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      El segundo paso consiste en recuperar una contraseña almacenada previamente. Tal como hicimos con el comando anterior.
    </p>
  </div>
</div>

Este comando deberíamos correrlo al menos una vez luego de agregar una contraseña para verificar que el alta fue correcta.

{{< highlight shell >}}
$ security find-generic-password -a &lt;USUARIO> -s &lt;CONTEXTO> -w
{{< / highlight >}}

Reemplazando 

<meta charset="utf-8" />

`<USUARIO>` y 

<meta charset="utf-8" />

`<CONTEXTO>` al igual que en la ejecución del primer comando, este nos mostrará en pantalla el texto de la contraseña recuperada. Para ello nos pedirá que ingresemos nuestra contraseña de usuario de **Mac**. Si lo ejecutamos para validar el alta y el texto es correcto estamos en condiciones de utilizar el _password_.

## Ejemplo de uso

Como situación hipotética digamos que hay un servidor de **Artifactory** donde tenemos que subir _artifacts_ de un proyecto manejado con **Maven**. No vamos a entrar en los detalles de configuración del proyecto. Sólo vamos a mencionar que en nuestro archivo ~/.m2/settings.xml tenemos una sección como la siguiente para configurar el servidor al cual subiremos los _artifacts_:

{{< highlight xml >}}
&lt;servers>
      &lt;server>
        &lt;id>${server.id}&lt;/id>
        &lt;username>${server.username}&lt;/username>
        &lt;password>${server.password}&lt;/password>
      &lt;/server>
  &lt;/servers>
{{< / highlight >}}

Y que normalmente deberíamos ejecutar la siguiente línea de comandos para hacer un _deploy_ a ese servidor:

{{< highlight shell >}}
$ mvn deploy -Dserver.id=miArtifactory -Dserver.username=miUsuario -Dserver.password=miPassword
{{< / highlight >}}

Y desde luego **miArtifactory**, **miUsuario** y **miPassword** son valores imaginarios donde escribimos, en la vida real, valores reales. Entonces en nuestro historial de _shell_ quedaría expuesta la clave:

{{< highlight shell >}}
$ history
...
...
236 cd proyecto
237 mvn deploy -Dserver.id=miArtifactory -Dserver.username=miUsuario -Dserver.password=miPassword
238 ls target
...
...
{{< / highlight >}}

Para evitar este problema cambiaremos el comando que ejecutamos normalmente de esta forma:

{{< highlight shell >}}
$ mvn deploy -Dserver.id=miArtifactory -Dserver.username=miUsuario -Dserver.password=$(security find-generic-password -a miUsuario -s artifactory -w)
{{< / highlight >}}

Desde luego, para que esto funcione debimos haber agregado una contraseña al **Keychain** (Llaveros) previamente para el usuario **miUsuario** y contexto **artifactory**. Al ejecutar esto, primero se ejecutará el reemplazo de _shell_, es decir, todo lo encerrado en `$(...)`. Y luego se ejecutará el comando con el resultado de la llamada a security como reemplazo justo después del igual. Con lo que el comando es idéntico al anterior a los fines prácticos para **Maven**.

## Una alternativa no muy efectiva

Si nuestro problema se limitara exclusivamente a no dejar rastros de la contraseña en el historial, siempre podemos evitar que un comando se guarde si le agregamos un espacio adelante. Si vamos a ejecutar el comando `ls`, por ejemplo, en realidad ponemos un `espacio`, luego la `l` y la `s`. Y con eso el _shell_ evitará guardarlo en el historial.

El problema con esto es que requiere que nos acordemos siempre antes de escribir cualquier comando donde se expondría la clave, que debemos precederlo con un espacio. Ciertamente algunas personas puede adquirir esta costumbre pero no es mi caso. Y lo que en el pasado me ocurría era que terminaba siempre teniendo que eliminar el comando el historial a mano.

Por este motivo creo que vale la pena el esfuerzo extra de la solución propuesta en este artículo. Espero que les sea útil. ¡Hasta la próxima!

 [1]: https://blog.drk.com.ar/wp-content/uploads/2021/08/keychain.png
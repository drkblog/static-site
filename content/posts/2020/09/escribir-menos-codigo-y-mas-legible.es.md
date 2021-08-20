---
title: Escribir menos código y más legible
author: Leandro Fernández
type: post
date: 2020-09-13T03:34:09+00:00
url: /2020/escribir-menos-codigo-y-mas-legible
categories:
  - Programación
tags:
  - buenas prácticas
  - escribir código más prolijo
  - escribir menos código y más legible
  - java
  - lombok

---
<blockquote class="wp-block-quote">
  <p>
    Claro que hay muchas cosas para hacer cuando hablamos de escribir código más legible en Java. Lo que vamos a ver a continuación es cómo utilizar la biblioteca Lombok para escribir menos código. Y como resultado tener un código fuente más legible.
  </p>
</blockquote>

## Lombok

Es una biblioteca extensa y no vamos a cubrir todas sus características en este artículo. Vamos a hacer un recorrido en el que, yo creo, es el orden de utilidad. Empezando por aquellas que más frecuentemente usaremos en un proyecto típicamente. Y ya que hablamos de opiniones personales. Vale remarcar que las bibliotecas que generan código, como lo hace **Lombok**, suelen ser criticadas justamente por utilizar ese mecanismo de funcionamiento. En lo personal no soy amante del código generado. Pero como **Lombok** no genera el código en su formato de texto sino que agrega _Java bytecode_ mientras se construyen los binarios, no tenemos el típico problema: decidir si el código generado tiene que ser agregado al control de versiones o no. Y la mayoría de los casos para los que **Lombok** ofrece una solución son los que requieren **código repetitivo** (_boilerplate code_). Código que no se ve afectado por cambios de las reglas del negocio y que escribirlo no tiene ningún valor para el desarrollador. Y que, de ser necesario, igual podremos escribir para los casos que sí lo requieran sin dejar de aprovechar **Lombok** para el resto. Y el sistema de uso además es poco invasivo ya que para utilizarla sólo es necesario agregar una **_annotation_**.



<div class="wp-block-media-text alignwide is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="800" height="400" src="http://blog.drk.com.ar/wp-content/uploads/2020/09/lombok.png" alt="lombok" class="wp-image-2662" srcset="https://blog.drk.com.ar/wp-content/uploads/2020/09/lombok.png 800w, https://blog.drk.com.ar/wp-content/uploads/2020/09/lombok-300x150.png 300w, https://blog.drk.com.ar/wp-content/uploads/2020/09/lombok-768x384.png 768w" sizes="(max-width: 800px) 100vw, 800px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Al utilizar <strong>Lombok </strong>el desarrollador puede dedicarse a escribir el código que construirá las reglas de negocio sin perder tiempo en formalismos.
    </p>
  </div>
</div>

<!--more-->

## Getters y Setters

Aunque luego quedará claro que estas no son las dos anotaciones que más seguido escribiremos, definitivamente dejaremos el 99% de los **getters** y **setters** de un proyecto en manos de Lombok. Y esto se debe a que hay otras anotaciones que también los escriben por nosotros.

Cualquiera que se haya dedicado a escribir **código de Java** por al menos un par de años respetando las buenas prácticas de **OOP** (_Object-Oriented Programming_) tiene una reacción alérgica cuando piensa en tener que escribir getters y setters para los atributos de cada clase. En efecto, casi toda IDE de Java tiene la funcionalidad necesaria para escribirlos por nosotros. Sólo que en ese caso son escritos efectivamente en líneas de código que terminan siendo incorporadas al control de versiones. Y que podemos modificar (intencionalmente o por error) en cualquier momento. Y que ocupan espacio sin, como mencioné antes, sumar valor. Además al agregar nuevos atributos tenemos que generar el código correspondiente de nuevo. Cosa que por lo general no nos pasará con Lombok excepto que usemos la anotación sobre cada atributo en vez de hacerlo a nivel de clase. Este último comentario quedará claro más adelante.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">class Customer {
    private String fullName;
    private String username;
    private String mail;
    private ZonedDateTime birthDate;
    private boolean active;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public ZonedDateTime getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}</pre>

Una clase con cinco atributos termina ocupando 47 líneas al escribir las versiones más simples de sus getters y setters. Pero podemos usar estas dos anotaciones (`@Getter` y **`@Setter`**) sobre la clase y ahorrarnos todo eso.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@Getter
@Setter
static class Customer {
    private String fullName;
    private String username;
    private String mail;
    private ZonedDateTime birthDate;
    private boolean active;
}</pre>

Sí, eso es todo. Esta versión del código tiene los mismos getters y setters que vimos anteriormente pero no podemos ver la implementación en nuestro código. De su generación se hará cargo Lombok. Incluso si agregamos un atributo automáticamente su getter y setter estarán disponibles al compilar porque las anotaciones puestas a nivel de clase valen para todos sus atributos. Pero esto no nos limita en la dirección opuesta. Si quisiéramos más granularidad podemos tenerla. Por ejemplo, podríamos querer getters para todos los atributos pero sólo setter para _active_.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@Getter
static class Customer {
    private String fullName;
    private String username;
    private String mail;
    private ZonedDateTime birthDate;
    @Setter
    private boolean active;
}</pre>

Podríamos tener un atributo con la contraseña y preferir que no tenga ni getter ni setter. No estaríamos obligados a cambiar mucho.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="9,10" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@Getter
static class Customer {
    private String fullName;
    private String username;
    private String mail;
    private ZonedDateTime birthDate;
    @Setter
    private boolean active;
    @Getter(AccessLevel.PRIVATE)
    @Setter(AccessLevel.PRIVATE)
    private byte[] password;
}</pre>

Las anotaciones getter y setter sobre un atributo sobreescriben el comportamiento de las mismas a nivel clase. Entonces lo que hacemos aquí es decir que el atributo _password_ tendrá **getter y setter privados**. Además de la anotación Lombok nos habilita a ajustar ciertas características con atributos en las mismas. En este caso podemos especificar el nivel de acceso que deseamos para el getter o el setter.

Quiero hacer una pausa antes de continuar para volver a resaltar las ventajas de Lombok. No ahorra mucho código que, aún si no tuviésemos que escribir, eventualmente tendríamos que mantener. Es poco invasivo. Y no nos limita si necesitamos mayor granularidad o casos especiales. Podríamos incluso escribir un getter.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="4, 14-16" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@Getter
static class Customer {
    private String fullName;
    @Getter(AccessLevel.NONE)
    private String username;
    private String mail;
    private ZonedDateTime birthDate;
    @Setter
    private boolean active;
    @Getter(AccessLevel.PRIVATE)
    @Setter(AccessLevel.PRIVATE)
    private byte[] password;

    public String getUsername() {
        return "[" + username + "]";
    }
}</pre>

## Constructores

Otra parte del código que resulta tediosa por lo repetitivo es el código de constructores. En especial cuando reciben varios argumentos y hay que pasarlos a los atributos con el sólo fin de inicializarlos. Y esto, si el código que escribimos respeta las buenas prácticas más básicas, debería ser el caso de la enorme mayoría de los constructores de nuestras clases. Líneas de código cuya escritura manual o mantenimiento no agregan ningún tipo de valor.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">class Customer {
    private final String fullName;
    private final String username;
    private final String mail;
    private final ZonedDateTime birthDate;
    private final boolean active;
    private final byte[] password;

    public Customer(final String fullName,
                    final String username,
                    final String mail,
                    final ZonedDateTime birthDate,
                    final boolean active,
                    final byte[] password) {
        this.fullName = fullName;
        this.username = username;
        this.mail = mail;
        this.birthDate = birthDate;
        this.active = active;
        this.password = password;
    }
}</pre>

Aunque no acumulan una cantidad de líneas extra descomunal como los getters y setters, de todas formas se trata de un mecanismo que bien podría automatizarse. Este tipo de código repetitivo es una fuente común de errores. **Lombok** nos permite simplificar esto, por empezar, con una anotación que generará el constructor por nosotros.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@AllArgsConstructor
class Customer {
    private final String fullName;
    private final String username;
    private final String mail;
    private final ZonedDateTime birthDate;
    private final boolean active;
    private final byte[] password;
}</pre>

Tal como la vemos esta clase tendrá un constructor con todos los atributos, en el orden de aparición, con argumentos nombrados igual que los atributos. Pero podríamos no querer inicializar todos los atributos de una clase eventualmente. Entonces podríamos escribir esto.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@RequiredArgsConstructor
class Customer {
    private final String fullName;
    private final String username;
    private final String mail;
    private final ZonedDateTime birthDate;
    private final boolean active;
    private byte[] password;
    private ZonedDateTime lastLogin;
}</pre>

La anotación `@RequiredArgsConstructor` sólo incluirá argumentos para inicializar los atributos declarados como `final`. Es decir que no se incluirán `password` ni `lastLogin`. A diferencia de `@AllArgsConstructor` que incluirá a todos los atributos independientemente de que sean `final` o no. Podríamos usar las dos anotaciones sobre la clase del ejemplo de arriba para generar dos constructores: uno con todos lo argumentos y otro con los `final` solamente. Y si nuestra clase no tiene argumentos `final` podemos crear un constructor sin argumentos ya que no estamos obligados a inicializarlos en el constructor.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@NoArgsConstructor
class Customer {
    private String fullName;
    private String username;
    private String mail;
    private ZonedDateTime birthDate;
    private boolean active;
    private byte[] password;
    private ZonedDateTime lastLogin;
}</pre>

A decir verdad podríamos usar esta anotación con atributos `final` si lo quisiéramos y **Lombok** los inicializaría en `0, null` ó `false`, de esta forma.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="1, 3-7" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@NoArgsConstructor(force = true)
class Customer {
    private final String fullName;
    private final String username;
    private final String mail;
    private final ZonedDateTime birthDate;
    private final boolean active;
    private byte[] password;
    private ZonedDateTime lastLogin;
}</pre>

Más allá de si esta es una buena idea o no, quería volver a hacer foco en los atributos que podemos manejar sobre las anotaciones de **Lombok**. Una cosa que suele aparecer es la necesidad de agregar alguna anotación propia o de un `framework` sobre nuestro constructor. Pero ya no tenemos en nuestro fuente una línea de código donde hacer eso. Entonces Lombok nos provee un mecanismo para solucionarlo. En el siguiente ejemplo nuestro constructor tendrá la anotación `@Autowire` (de Spring) en él.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@RequiredArgsConstructor(onConstructor = @__(@Autowired))
class Customer {
    private final String fullName;
    private final String username;
    private final String mail;
    private final ZonedDateTime birthDate;
    private final boolean active;
    private byte[] password;
    private ZonedDateTime lastLogin;
}</pre>

## @EqualsAndHashCode y @ToString

Existen tres métodos heredados de `Object` que solemos reescribir en varias de las clases de nuestros proyectos. En especial en las clases que representan los datos de nuestro sistema. O algún otro tipo de valor que se pasa entre objetos más complejos. Pero dependiendo del caso esto puede ser necesario en cualquier clase.

Por lo general reescribimos `toString()` para obtener una descripción legible para el humano sobre el objeto de la clase. Muchas veces usando esta salida en los `logs` de nuestra aplicación. No recomiendo utilizar este método para genera una representación visible al usuario. Porque todas las clases heredan la implementación por defecto que viene de `Object`. Y podría ocultar lo que de otra forma sería un error de compilación si nos olvidamos de escribir el código que genera dicha representación.

Adicionalmente tenemos los métodos `hashCode()` e `equals()` que deben sobreescribirse para cualquier clase que sea utilizada dentro de una Collection. O cualquier otra clase propia o de terceros que contemple el debido uso del contrato de esta interfaz.

<blockquote class="wp-block-quote">
  <p>
    Si dos objetos son iguales deben tener el mismo hash-code. Si dos objetos tienen el mismo hash-code pueden o no ser iguales.
  </p>
</blockquote>

Adicionalmente es recomendable utilizar amplia e uniformemente el dominio de salida de la función hash para nuestro objeto basándonos (idealmente) en sus atributos. De las misma forma que lo hacemos para determinar la igualdad. Sin entrar demasiado en detalles, queremos utilizar los atributos que representan la identidad de nuestro objeto tanto para resolver la salida de `equals()` como para generar un hash en `hashCode()`.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="1" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@ToString
@RequiredArgsConstructor
class Customer {
    private final String fullName;
    private final String username;
    private final String mail;
    private final ZonedDateTime birthDate;
    private final boolean active;
    private byte[] password;
    private ZonedDateTime lastLogin;
}

public static void main(String[] args) {
    System.out.println(
            new Customer("Leandro Fernandez",
                    "leandro",
                    "fakeAddress@drk.com.ar",
                    ZonedDateTime.parse("1976-07-23T00:00:00Z"),
                    true).toString()
    );
}</pre>

En adelante sólo presentaré la versión del código sin **Lombok** sólo en los casos donde agregue valor. En el fuente anterior podemos ver la clase que ya habíamos utilizando en la sección Constructores, pero ahora con la anotación `@ToString` y un ejemplo de uso de la clase. Que muestra en pantalla lo siguiente: 

<pre class="wp-block-preformatted">Customer(fullName=Leandro Fernandez, username=leandro, mail=fakeAddress@drk.com.ar, birthDate=1976-07-23T00:00Z, active=true, password=null, lastLogin=null)</pre>

La cadena que arma en forma automática tiene el nombre de la clase seguido por la lista de atributos con nombre y valor. En caso de que esto resulte muy extenso podemos evitar el nombre de los atributos y también excluir algunos de la cadena. Por ejemplo.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="2, 9, 11" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@RequiredArgsConstructor
@ToString(includeFieldNames = false)
class Customer {
    private final String fullName;
    private final String username;
    private final String mail;
    private final ZonedDateTime birthDate;
    private final boolean active;
    @ToString.Exclude
    private byte[] password;
    @ToString.Exclude
    private ZonedDateTime lastLogin;
}
</pre>

Que ahora genera esta cadena.

<pre class="wp-block-preformatted">Customer(Leandro Fernandez, leandro, fakeAddress@drk.com.ar, 1976-07-23T00:00Z, true)</pre>

Al igual que en las anotaciones que expliqué anteriormente vale aclarar que no estoy detallando el total de parámetros de cada una. Recomiendo consultar la documentación de **Lombok** al utilizar una anotación para conocer todo lo que implica su uso y cómo configurarla para que se adapte a las necesidades del caso. También quiero resaltar un detalle. Si se comparan los últimos ejemplos se nota que cambié el orden de las anotaciones de la clase `Customer` para poner siempre la más corta en primer lugar y luego las que le siguen en largo. Esto es intencional, creo que resulta más legible de esa forma. Pero definitivamente no es necesario.

<pre class="EnlighterJSRAW" data-enlighter-language="java" data-enlighter-theme="" data-enlighter-highlight="1, 8, 10, 12, 21, 26" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">@EqualsAndHashCode
@RequiredArgsConstructor
class Customer {
    private final String fullName;
    private final String username;
    private final String mail;
    private final ZonedDateTime birthDate;
    @EqualsAndHashCode.Exclude
    private final boolean active;
    @EqualsAndHashCode.Exclude
    private byte[] password;
    @EqualsAndHashCode.Exclude
    private ZonedDateTime lastLogin;
}

public static void main(String[] args) {
    Customer customer_v1 = new Customer("Leandro Fernandez",
            "leandro",
            "fakeAddress@drk.com.ar",
            ZonedDateTime.parse("1976-07-23T00:00:00Z"),
            true);
    Customer customer_v2 = new Customer("Leandro Fernandez",
            "leandro",
            "fakeAddress@drk.com.ar",
            ZonedDateTime.parse("1976-07-23T00:00:00Z"),
            false);
    System.out.println("customer_v1.equals(customer_v2) = " + customer_v1.equals(customer_v2));
    System.out.println("customer_v1.hashCode() = " + customer_v1.hashCode());
    System.out.println("customer_v2.hashCode() = " + customer_v2.hashCode());
}</pre>

La lógica de funcionamiento es igual que la anterior. Lombok usará todos los atributos excepto aquellos que excluí explícitamente. Por lo que la salida será:

<pre class="wp-block-preformatted">customer_v1.equals(customer_v2) = true
customer_v1.hashCode() = 1427935039
customer_v2.hashCode() = 1427935039</pre>

Ambos objetos de tipo `Customer` tienen los mismos valores para sus atributos excepto `active` que es **verdadero** en un caso y **falso** en el otro. Sin embargo la comparación usando el método `equals()` retorna que son iguales porque el código generado está comparando `fullName`, `username`, `mail` y `birthDate`. Lo mismo pasará con `hashCode()` para respetar el contrato.

Hasta aquí llegamos con esta primera parte. **Lombok** tiene mucho más para ofrecer y, aunque ya dije que no voy a abarcar todo, tengo planeado escribir un artículo continuación donde comenzaremos con las anotaciones `@Value` y `@Data`. Aprovechando para hablar un poco de inmutabilidad. Veremos la versión lazy de la anotación `@Getter`. Y también `@Builder` con sus pro y contras.
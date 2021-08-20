---
title: Cómo y cuándo usar lambdas en Java
author: Leandro Fernandez
type: post
date: 2020-09-08T15:33:44+00:00
categories:
  - Programación
tags:
  - expresiones lambda
  - functional interfaces
  - interfaces funcionales
  - java
  - java 1.8
  - legibilidad
  - operaciones terminales
  - referencia a métodos
  - streams

---
<blockquote class="wp-block-quote">
  <p>
    El soporte de expresiones Lambda apareció en Java 1.8 en Marzo de 2014. Sin embargo aún hoy muchos desarrolladores no las utilizan o sólo lo hacen como clientes de código que las acepta. Pero no escriben código que las reciba.
  </p>
</blockquote>

<div class="wp-block-media-text alignwide is-stacked-on-mobile">
  <figure class="wp-block-media-text__media"><img loading="lazy" width="600" height="300" src="http://blog.drk.com.ar/wp-content/uploads/2020/09/lambdas.png" alt="" class="wp-image-2664" srcset="https://blog.drk.com.ar/wp-content/uploads/2020/09/lambdas.png 600w, https://blog.drk.com.ar/wp-content/uploads/2020/09/lambdas-300x150.png 300w" sizes="(max-width: 600px) 100vw, 600px" /></figure>
  
  <div class="wp-block-media-text__content">
    <p class="has-normal-font-size">
      Una expresión lambda (***lambda expression***) es una función anónima. Es decir que es un bloque de código que puede recibir parámetros y devolver un valor. Pero no tiene nombre, por lo que no puede declararse y luego llamarse desde alguna parte del código. Para utilizarlas, en cambio, tenemos que definir la expresión lambda e inmediatamente pasarla al código que la utilizará.
    </p>
  </div>
</div>



Normalmente lo hacemos pasando la expresión como un argumento más de un método que la ejecutará oportunamente pasándole los valores correspondientes y tomando el resultado (si es que tiene un valor de retorno). No es imposible definir una expresión lambda y guardar la referencia en una variable. Pero ese y otros detalles los vamos a dejar para el final para enfocarnos en la forma de uso recomendada.

<!--more-->

Las expresiones lambda nos permiten escribir un método que delegue parte del procesamiento que va a realizar en el código que lo llama. Un ejemplo típico donde esto es útil es una clase que contiene un conjunto de elementos y se necesita aplicar una operación sobre estos. La clase contenedora no conoce las posibles operaciones a realizar y la clase cliente (la que usa a la contenedora) no conoce los detalles sobre cómo iterar sobre el conjunto. Este mutuo desconocimiento es el desacoplamiento deseado entre dos partes del código. La parte del código cliente puede pasar una bloque de código para que la clase contenedora lo aplique sobre los elementos utilizando una expresión lambda.

{{< highlight java "linenos=table,hl_lines=13" >}}class ValueSet {
        private Set&lt;BigDecimal> values = new HashSet&lt;>();

        public BigDecimal applyAndSum(Function&lt;BigDecimal, BigDecimal> function) {
            return values.stream()
                    .map(function::apply)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
    }

    public static void main(String[] args) {
        ValueSet values = new ValueSet();
        values.applyAndSum(value -> value.multiply(BigDecimal.valueOf(10)));
    }
{{< / highlight >}}

<p class="has-text-color has-small-font-size" style="color:#1232d2">
  En a línea 13 podemos ver que se llama al método <code>applyAndSum()</code> pasando un bloque de código que aplica una multiplicación por diez al valor que reciba. Las expresiones lambda pueden recibir cero, uno o más parámetros al ser invocadas, y pueden retornar un valor o no. Internamente el método recorre sus elementos aplicando este cálculo (ejecutando la lambda pasando el elemento como argumento) y sumando el resultado obtenido. El código de la función <code>main()</code> no conoce cómo se recorren los elementos. El código del método <code>applyAndSum()</code> no sabe qué operación se realizará. Sólo la aplica y suma el resultado para retornar finalmente la sumatoria. El código del cuerpo del método <code>applyAndSum()</code> utiliza internamente. Con fines didácticos les pediré que ignoremos los detalles de su implementación y simplemente conservemos la idea conceptual de su tarea.
</p>

Está claro que existen otros mecanismos en Java anteriores a las lambdas que también servirían en estos casos. Como por ejemplo recibir un objeto que implemente una interfaz con un método específico. Y que la clase cliente construya ese objeto y lo pase a la contenedora. O mejor aún, que en el código cliente se construya una clase interna anónima (_anonymous inner class_) con el bloque de código que necesitamos pasar. La principal ventaja de una expresión lambda contra esta alternativa es que requiere escribir mucho menos y el código resulta mucho más legible. Además, usualmente no es necesario declarar una interfaz específica ya que existe un conjunto de interfaces funcionales (_functional interfaces_) que se pueden aprovechar en casi todos los casos. Tal como ocurre en el ejemplo anterior en la línea 4. Donde se declara el método recibiendo un parámetro de tipo `Function<T, R>`.

## Como utilizarlas

Antes de aprender a **escribir un método que reciba una expresión lambda**, que es un tema en el que quiero hacer foco de todas formas, veamos más ejemplo de llamadas donde se pasan lambdas a métodos ya existentes.

<blockquote class="wp-block-quote">
  <p>
    Recordemos que un método que recibe una expresión lambda declara la forma que tendrá la misma en cuanto al número y tipo de argumentos que recibirá, si retornará un valor, y el tipo de éste.
  </p>
</blockquote>

En el uso de _streams_, que también aparecieron en Java 8, se utilizan expresiones lambda para describir la lógica que se quiere aplicar en las operaciones terminales y no terminales. El _stream_ procesa un conjunto de elementos uno tras otro aplicando las operaciones que describe el usuario tales como mapeos y filtrados. La lógica de mapeo o de filtrado es provista por el código cliente en forma de lambdas.

{{< highlight java "linenos=table,hl_lines=2 3" >}}
  items.stream()
      .filter(item -> item.getName().startsWith("A"))
      .map(item -> item.getValue())
      .reduce(BigDecimal.ZERO, BigDecimal::add);
{{< / highlight >}}

Dada una colección de items sobre la cual abrimos un _stream_, queremos seleccionar sólo aquellos cuyo nombre comienza con **&#8220;A&#8221;** y luego calcular la suma de sus valores. Para seleccionar elementos específicos del _stream_ utilizamos la operación no-terminal `filter()`. Esta operación sólo &#8220;dejará pasar&#8221; aquellos elementos para los cuales el resultado devuelto por la expresión lambda sea verdadero. La línea 2 muestra la construcción de la expresión que recibe un sólo parámetro del tipo de objeto que contiene el stream. Y devuelve el resultado del método `startsWith()` de la cadena con el nombre del item. Esta es la lógica que el código cliente contribuye al _stream_. Por su parte éste ejecutará este bloque con cada elemento que pase por esa sección. Que por ser la primera recibirá todos los elementos de la colección.

Luego la línea 3 realizará una conversión de cada elemento recibido a lo que sea que retorne la expresión lambda que pasamos. En este caso la expresión devuelve sólo el valor del ítem. Es decir que después de este paso el tipo de dato del _stream_ será **BigDecimal**. Pero el paso de la línea 3 sólo recibirá los elementos que cumplan la condición de la línea 2. Finalmente la operación termina `reduce()` sumará todos los valores.

{{< highlight java >}}
BigDecimal total = BigDecimal.ZERO;
        for (Item item : items) {
            if (item.getName().startsWith("A")) {
                total = total.add(item.getValue());
            }
        }
{{< / highlight >}}

Este es un ejemplo de cómo podríamos haber escrito un código equivalente sin utilizar _streams_ ni lambdas. Si bien aún es legible, este tipo de construcción suele tornarse complicada rápidamente cuando debemos combinar condiciones y operaciones más complicadas. La expresión lambda ayuda a escribir en forma más concisa. Pero además el _stream_ internamente puede paralelizar el procesamiento en múltiples _threads_ sin que el código escrito por nosotros cambie. En contraposición, si quisiéramos paralelizar el procesamiento utilizando la construcción antigua tendríamos que modificarlo substancialmente. Y ese es un buen ejemplo de cómo el buen uso de las expresiones lambda me permiten ocultar los detalles de implementación al los ojos del cliente. Y al mismo tiempo permitirle contribuir parte de la lógica utilizada en el procesamiento. A continuación vemos el único cambio que se requiere para paralelizar el stream.

{{< highlight java "linenos=table,hl_lines=2" >}}items.stream()
                .parallel()
                .filter(item -> item.getName().startsWith("A"))
                .map(item -> item.getValue())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
{{< / highlight >}}

## Cómo están implementadas en el lenguaje

Otro caso de uso típico es la definición de un bloque ejecutable cuando se crea un _thread_ o se utiliza la clase **ThreadPool**.

{{< highlight java "linenos=table,hl_lines=1" >}}Thread thread = new Thread(() -> System.out.println("Ejemplo"));
        thread.start();
{{< / highlight >}}

En la línea 1 se construye un objeto **Thread** pasando una expresión lambda the simplemente imprime algo en la salida estándar. Dejando de lado que no tiene utilidad alguna, lo importante es que puedo usar una expresión lambda para definir qué hará este _thread_. Pero quiero que veamos qué constructor de la clase **Thread** estamos usando.

{{< highlight java >}}
public Thread(Runnable target) {
        init(null, target, "Thread-" + nextThreadNum(), 0);
    }
{{< / highlight >}}

Este constructor existía antes de la versión 8 de Java. Sin embargo lo estamos utilizando para pasar una expresión lambda. Y esto se debe a que para implementarlas se utilizó el concepto de **Interfaces funcionales**. Cualquier interfaz que tengo sólo un método (dejando de lado métodos _default_) se considera una interfaz funcional. Y por lo tanto puede recibir una expresión lambda en lugar de un objeto que implemente dicha interfaz. Porque la interfaz tiene un sólo método el compilador puede relacionarlo con la expresión lambda. Los argumentos que declara el método serán los argumentos de la lambda, y el valor de retorno del método también definirá el retorno de la expresión.

Si bien se introdujo una anotación **@FunctionalInterface** para marcar las interfaces declaradas con este fin. Se trata de una anotación meramente informativa. Por lo que cualquier interfaz que cumpla con los requisitos es tratada eventualmente como una interfaz funcional.

Esto explica por qué podemos utilizar el constructor de la clase **Thread** que recibe un objeto que implemente la interfaz **Runnable** para pasar una expresión lambda.

{{< highlight java "linenos=table,hl_lines=14" >}}@FunctionalInterface
public interface Runnable {
    /**
     * When an object implementing interface &lt;code>Runnable&lt;/code> is used
     * to create a thread, starting the thread causes the object's
     * &lt;code>run&lt;/code> method to be called in that separately executing
     * thread.
     * &lt;p>
     * The general contract of the method &lt;code>run&lt;/code> is that it may
     * take any action whatsoever.
     *
     * @see     java.lang.Thread#run()
     */
    public abstract void run();
}
{{< / highlight >}}

La interfaz **Runnable** tiene un sólo método público que se requiere implementar para cumplir con su contrato. El método `run()` no recibe argumentos ni retorna valor. Entonces podemos pasar una expresión lambda que cumpla con dicho formato. Además esta interfaz ahora lleva la anotación.

## Cómo escribir métodos que reciban lambdas

Con lo que aprendimos hasta aquí ya podemos **escribir métodos que reciban lambdas**. Algo que no muchos programadores tienen en cuenta a la hora de diseñar clases y métodos.

Por supuesto que, como ocurre con toda herramienta, la utilidad de las expresiones lambda requiere que su uso sea oportuno. No se trata de que todos los métodos de nuestra aplicación reciban lambdas. Sino que lo hagan aquellos donde esta herramienta se aprovechará. En principio en lugares donde cierto código que es cliente de alguna otra clase necesita definir cómo se realizará parte del trabajo que se le solicita a ésta. Como vimos en los ejemplos anteriores.

Imaginemos que estamos escribiendo una clase que maneja la interacción con los botones de la pantalla de un cajero automático. Nuestro trabajo consiste en programar esta parte del sistema y no tenemos idea de qué ocurrirá cuando el usuario presione el botón. De hecho, la acción puntual en un cajero normalmente dependerá del contexto ya que los botones se reutilizan constantemente en cada menú. Asumamos, a los fines de ejemplificar, que nuestra clase tiene varios métodos que resuelve la interacción con el hardware y que ejecutarán el método `attendUserAction()` pasando el identificador del botón cuando corresponda.

{{< highlight java "linenos=table,hl_lines=18 24" >}}
enum Button {
    BUTTON_1,
    BUTTON_2,
    BUTTON_3,
    BUTTON_4,
    BUTTON_5;
  }
  
  class UserInterface {

    private final Map&lt;Button, Runnable> actionMap = new HashMap&lt;>();
    
    public void setActionForButton(final Button button, final Runnable action) {
      actionMap.put(button, action);
    }
    
    protected void attendUserAction(final Button button) {
      actionMap.get(button).run();
    }
  }

  public static void main(String[] args) {
    UserInterface userInterface = new UserInterface();
    userInterface.setActionForButton(Button.BUTTON_1, () -> System.out.println("Button 1"));
  }
{{< / highlight >}}

La línea 24 asocia una expresión lambda a un botón determinado. Por supuesto que el código alrededor de esta linea no tiene sentido. En la práctica esto debería estar en alguna parte específica y no en el punto de entrada de la aplicación. Esto debería estar, por ejemplo, en el código que inicializa un menú determinado. Y debería llamarse para cada botón que queremos asociar a una acción. A los fines del ejemplo sólo incluimos esta llamada. Y el cuerpo de la lambda simplemente imprime algo en pantalla. Aquí debería estar lo que efectivamente queremos que ocurra cuando el usuario presiona el botón.

Desde el punto de vista temporal, en algún momento posterior a la ejecución de la línea 24 el usuario podría presionar el **botón 1** y entonces se ejecutaría el método `attendUserAction()`, que en la línea 18 tomará la referencia a la lambda según el botón y ejecutará el método **run()**.

El código que establece la acción no conoce los mecanismos por los cuales se termina ejecutando. Pero sí conoce (o mejor dicho, determina) qué deberá hacer el programa cuando la acción ocurra. Y para aprovechar esto sólo necesitamos escribir un método que reciba una **interfaz funcional** como argumento. Y adicionalmente guardamos esa referencia en un mapa para poder utilizarla después. Y para poder asociar una acción distinta a cada botón.

## Referencia a métodos

Al utilizar esta herramienta eventualmente nos encontramos con dos situaciones: expresiones lambda muy complejas, y la necesidad de utilizar el mismo bloque de código en distintas expresiones. Y otra nueva herramienta llamada **referencia a métodos** (method reference) viene a ayudarnos con esto.

En lugar de escribir una expresión lambda puedo pasar una referencia a un método que, en su turno, será llamado.

{{< highlight java "linenos=table,hl_lines=4 5 10 14" >}}
public void process(Set&lt;Item> items) {
    items.stream()
        .parallel()
        .filter(this::isProcessableItem)
        .map(this::extractValue)
        .reduce(BigDecimal.ZERO, BigDecimal::add);
  }

  private boolean isProcessableItem(final Item item) {
    return item.getName().startsWith("A");
  }
  
  private BigDecimal extractValue(final Item item) {
    return item.getValue();
  }
{{< / highlight >}}

Las líneas 4 y 5 de este ejemplo (en contraposición al presentado anteriormente más arriba) pasan una referencia a métodos de la propia clase en lugar de una expresión lambda. Los métodos tienen nombres descriptivos que hacen legible la configuración del _stream_. Aún sin mirar las implementaciones de las líneas 10 y 14 tenemos una idea de lo que va a ocurrir ya que, si traducimos la 4 y 5 al español se leería algo como &#8220;filtrar-esItemProcesable&#8221; y luego &#8220;mapear-extraerValor&#8221;. Y esta es otra ganancia que tenemos al utilizar referencia a métodos. Pero si el código necesario para saber qué ítem es procesable fuese mas complicado (varias líneas de código) no estaría interfiriendo con la lectura de la configuración del _stream_. Y también podré utilizarlo en otro lugares si fuese necesario.

## Conclusión

El uso de expresiones lambda no introduce un concepto completamente nuevo sino más bien un replanteo mucho más eficiente en términos de legibilidad y organización del código. Pero esta diferencia se vio amplificada porque los desarrolladores rápidamente adoptaron su uso. Con esto también aparecieron las formas en las que no deberían utilizarse. Pero a esta altura está bastante claro cuál es el camino a seguir para sacarle provecho y beneficiarse con sus ventajas.

En mi experiencia los desarrolladores muchas veces no se toman el trabajo de investigar cómo escribir código que reciba lambdas, permitiendo a quien escriba código cliente que las utilice. Y por eso se me ocurrió escribir este artículo. Espero que haya sido de utilidad.
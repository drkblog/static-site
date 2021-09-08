---
title: Para qué sirve equals en Java
description: Por qué en Java las clases tienen un método equals si existe un comparador nativo también
author: Leandro Fernandez
type: post
date: 2021-09-08
cover: "/2021/09/equals.jpg"
categories:
  - Programación
tags:
  - java
  - equals
---

En **Java** podemos comparar dos variables para saber si son iguales. Esto lo hacemos con el operador `==` usualmente dentro de una condición `if`. Este operador retorna verdadero **si el contenido de las variables es idéntico** y falso en caso contrario. Y esto funciona perfectamente con todos los tipos de variables de Java. Sin embargo el lenguaje también establece el uso del método `equals()` que todas las clases heredan automáticamente de ***Object***. Y esto suele ser muy confuso para quienes están aprendiendo Java.

{{< highlight java "linenos=table" >}}
int a = 1;
int b = 1;
int c = 2;

System.out.println(a == b);
System.out.println(a == c);
{{< /highlight >}}

Desde luego que el programa que presentamos imprimirá verdadero para la línea 5 y falso para la 6. El lenguaje está comparando los valores de las variables entre sí y retornando verdadero o falso según corresponda. 

{{< highlight java "linenos=table" >}}
boolean a = true;
boolean b = true;
int c = 0xFF;
char d = 0xFF;

System.out.println(a == b);
System.out.println(c == d);
{{< /highlight >}}
 
Funciona con otros tipos como boolean en la línea 6 y entre tipos distintos pero compatibles en la línea 7. Aquí podemos pensar la lógica de conversión como el tipo de menor capacidad convertido al de mayor capacidad y luego comparado. Esto es importante porque el lenguaje no está ignorando los bits extra que el tipo `int` tiene comparador con `char`. Si inicializamos `c` con un número mayor a 0xFF la comparación dará **falso**.

Además de los tipos nativos para expresar booleanos, números enteros y flotantes, Java permite la declaración de variables de referencia. Son referencias a objetos en la memoria Heap. Aunque el lenguaje no expone este detalle, estas referencias son punteros. Contienen la posición de memoria del objeto. Es decir que no dejan de ser un número entero. Y como tales pueden ser comparadas con el operador `==`.

{{< highlight java "linenos=table" >}}
String a = new String("a");
String b = new String("b");

System.out.println(a == b);
{{< /highlight >}}

Tendremos un _falso_ en la línea 4 porque las variables `a` y `b` apuntan a direcciones de memoria distintas. La dirección del primer y el segundo objeto creados en las líneas 1 y 2. Y con el mismo criterio la siguiente comparación retornará _verdadero_.

{{< highlight java "linenos=table" >}}
String a = new String("a");
String b = a;

System.out.println(a == b);
{{< /highlight >}}

Porque al inicializar `b` con a estamos copiando en la referencia b la dirección de memoria referenciada por `a`. Ambas apuntan al mismo objeto y de hecho sólo se crea un objeto de tipo **String** en esa porción de código de ejemplo. Vale indicar que al usar una clase como tipo de una variable lo que estamos declarando es una referencia.

## El método equals()

Como mencionamos al principio, todas las clases en **Java** heredan de **Object** en forma automática y con esto reciben un método `equals()` que sirve para comparar instancias de las clases entre sí. Por lo tanto si creamos una clase y un par de instancias de ella podemos compararlas de dos formas:

{{< highlight java "linenos=table" >}}
@RequiredArgsConstructor
static class User {
  private final String username;
  private final String group;
}

public static void main(String[] args) {
  User a = new User("a", "g");
  User b = new User("a", "g");

  System.out.println(a == b);
  System.out.println(a.equals(b));
}
{{< /highlight >}}

> Estoy utilizando Lombok para evitar escribir el constructor de la clase User. Aquí hay un [artículo para conocer más sobre Lombok]({{< relref path="/content/posts/2020/09/escribir-menos-codigo-y-mas-legible.es.md" lang="es" >}}).

Nuevamente estamos creando dos instancias de una clase y luego comparando las referencias en la línea 11. Y esto retornará _falso_ porque son distintas. Apuntan a direcciones de memoria diferentes. Luego en la línea 12 utilizamos el método `equals()` para compararlas y también recibimos _falso_. Y eso se debe a que la implementación que Object nos provee de este método se limita a comparar las referencias. Este es el código del método:

{{< highlight java >}}
public boolean equals(Object obj) {
    return (this == obj);
}
{{< /highlight >}}

Lo confuso en este punto puede ser el hecho de que se agregue un método de comparación para los objetos que en nada difiere del comparador de variables. Pero la respuesta es que la intención de Java es que como creadores de una clase que va a ser comparada reemplacemos la lógica de la implementación en **Object** que nos habla de la identidad del objeto (nos dice si son el mismo objeto o no) por ***una lógica de equivalencia que nos diga si dos instancias de una clase son equivalentes a pesar de tratarse de distintos objetos***.

{{< highlight java "linenos=table" >}}
@RequiredArgsConstructor
static class User {
  private final String username;
  private final String group;

  public boolean equals(Object obj) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    final User user = (User) o;
    return username.equals(user.username);
  }
}

public static void main(String[] args) {
  User a = new User("a", "g");
  User b = new User("a", "g");

  System.out.println(a == b);
  System.out.println(a.equals(b));
}
{{< /highlight >}}

Nuestra implementación de `equals()` comienza por retornar _verdadero_ si la referencia recibida apunta al mismo objeto al cual se llamó el método (el caso `a.equals(a)`). Luego retorna _falso_ si se recibió `null` o una referencia a una clase diferente de la propia, porque no existe la posibilidad de establecer equivalencia entre objetos de clases diferentes (no tiene sentido). Al llegar a la línea 9 ya se sabe que la referencia recibida no es nula y es de la propia clase por lo cual es seguro realizar el _cast_ y luego retornar verdadero o falso para la equivalencia dependiendo de que el atributo `username` tenga el mismo valor para cada instancia.

Aquí estamos definiendo el concepto de equivalencia de nuestra clase en función del valor de un atributo. Decimos que dos instancias de la clase **User** son equivalentes si sus atributos `username` tienen el mismo valor. Independientemente de los valores del resto de los atributos. Por supuesto que esta equivalencia es arbitraria y es perfectamente válido que así sea. Idealmente esta arbitrariedad debería tener sentido respecto de lo que la clase representa. Como la nuestra representa usuarios es razonable decir que dos instancias con el mismo nombre de usuario están hablando del mismo usuario (la misma persona). Si tuviésemos una clase **Device** con un atributo `serialNumber` sería razonable establecer que la equivalencia se basa en que el número de serie sea el mismo.

Entonces la comparación de la línea 19 ahora retornará verdadero. Porque nos estará hablando de la equivalencia entre las instancias referenciadas por las variables `a` y `b`. A pesar de tratarse de dos instancias diferentes.

## La confusión

Creo que la confusión se produce porque la implementación por defecto del `equals()` se comporta como el operador `==`. Y también debido a que es muy común que no se reemplace el método heredado de Object en muchas ocasiones. Cuando sabemos que la clase no necesita proveernos de la equivalencia entre sus instancias. Entonces aprendemos el lenguaje con muchos ejemplos donde aparecen clases y no se reemplaza el método.

## Reemplazo de hashCode()

Cuando reemplazamos `equals()` estamos obligados a reemplazar `hashCode()` para mantener el contrato entre estos métodos: el segundo tiene que retornar el mismo valor para dos instancias que al ser comparadas entre ellas por el primero sean equivalentes. Recomiendo que leas el artículos sobre el [contrato equals-hashCode]({{< relref path="/content/posts/2021/08/equals-hashcode.es.md" lang="es" >}}) para entender por qué.

---

[Vector de Tecnología creado por stories - www.freepik.es](https://www.freepik.es/vectores/tecnologia)
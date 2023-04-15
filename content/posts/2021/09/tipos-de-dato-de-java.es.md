---
title: Tipos de dato de Java
description: Detalle de los tipos de dato de Java
author: Leandro Fernandez
type: post
date: 2021-09-18
cover: "/logo/java.png"
categories:
  - Programación
tags:
  - java
  - tipos
---

## Tipos

- **byte**: es un tipo de datos numérico entero de **8 bits** que puede representar valores enteros en el rango de -128 a 127.
- **short**: es un tipo de datos numérico entero de **16 bits** que puede representar valores enteros en el rango de -32,768 a 32,767.
- **int**: es un tipo de datos numérico entero de **32 bits** que puede representar valores enteros en el rango de -2,147,483,648 a 2,147,483,647.
- **long**: es un tipo de datos numérico entero de **64 bits** que puede representar valores enteros en el rango de -9,223,372,036,854,775,808 a 9,223,372,036,854,775,807.
- **float**: es un tipo de datos numérico de punto flotante de **32 bits** que puede representar valores con decimales en el rango de aproximadamente ±1.4x10^-45 a ±3.4x10^38.
- **double**: es un tipo de datos numérico de punto flotante de **64 bits** que puede representar valores con decimales en el rango de aproximadamente ±4.9x10^-324 a ±1.8x10^308.
- **boolean**: es un tipo de datos booleano que puede tener dos valores posibles: _true_ o _false_.
- **char**: es un tipo de datos de carácter **Unicode** de **16 bits** que puede representar caracteres individuales en el rango de '\u0000' (valor 0) a '\uffff' (valor 65,535).
- **String**: no es técnicamente un tipo de datos primitivo, sino un objeto de la clase String. La clase `String` en Java representa cadenas de caracteres.
- **Array**: no es un tipo de datos primitivo, sino una estructura de datos que puede contener una colección de elementos del mismo tipo de datos.
- **Enum**: es un tipo de datos especial que permite definir un conjunto fijo de valores que se pueden asignar a una variable. Cada valor de un tipo de enumeración es una constante con un nombre único.
- **Class**: es un tipo de datos especial que representa una definición de clase en Java. Una clase puede tener campos (variables) y métodos (funciones) que se pueden llamar desde otras partes del programa.
- **Interface**: es un tipo de datos especial que define una lista de métodos que una clase debe implementar. Las interfaces se utilizan comúnmente para definir contratos entre diferentes partes del programa.
- **Null**: no es técnicamente un tipo de datos, sino un valor especial que se puede asignar a cualquier variable de objeto para indicar que no tiene ningún valor.

## Casos especiales

### String

En Java una cadena de texto se representa mediante el tipo de datos **String**, que es una clase del lenguaje. La clase String es inmutable, es decir, una vez que se crea un objeto de tipo String, no se puede modificar su contenido.

Cuando se crea un objeto **String** en Java, se reserva un espacio en la memoria para almacenar la cadena de texto. En el caso de cadenas cortas y frecuentes, esto puede resultar en un gran número de objetos String creados, lo que a su vez puede ralentizar el rendimiento y aumentar el uso de memoria del programa.

Para abordar este problema, la clase **String** en Java utiliza una técnica llamada `caching`. Cuando se crea un objeto String, se almacena en una caché interna conocida como "_String pool_". Si se crea un nuevo objeto String con el mismo contenido, en lugar de crear un nuevo objeto en la memoria, se devuelve una referencia al objeto existente en la pool de cadenas. Esto ahorra memoria y mejora el rendimiento del programa.

La caché de cadenas se aplica solo a los literales de cadenas y no a las cadenas creadas con el constructor **String**, porque los literales de cadenas son constantes y, por lo tanto, no pueden ser modificados. En cambio, los objetos String creados con el constructor String pueden ser modificados, por lo que no se pueden almacenar en la pool de cadenas.

### Array

Es una estructura de datos que se utiliza para almacenar una colección de elementos del mismo tipo. Cada elemento del **array** se puede acceder mediante un índice, que es un valor entero que indica la posición del elemento en el mismo. A continuación se detallan algunos aspectos importantes sobre los arrays en **Java**:

**Declaración y creación**: para crear un array en Java, primero se debe declarar el tipo de los elementos que se almacenarán en el array, seguido de los corchetes [] y el nombre del array. Por ejemplo, para declarar un array de enteros de tamaño 5, se puede usar la siguiente sintaxis:

{{< highlight java "linenos=table" >}}
int[] miArray = new int[5];
{{< /highlight >}}

Esto crea un array de enteros con cinco elementos inicializados con el valor predeterminado cero (0).

**Acceso a elementos**: para acceder a un elemento de un array, se utiliza su índice dentro de corchetes después del nombre del array. Por ejemplo, para acceder al segundo elemento del array declarado anteriormente, se usa la siguiente sintaxis:

{{< highlight java "linenos=table" >}}
int segundoElemento = miArray[1];
{{< /highlight >}}

Es importante tener en cuenta que en Java (como en muchos otros lenguajes) los índices de los elementos en un array comienzan en cero.

**Longitud**: la longitud de un array se puede obtener utilizando la propiedad `length`. Por ejemplo, para obtener la longitud del array declarado anteriormente, se usa la siguiente sintaxis:

{{< highlight java "linenos=table" >}}
int longitudArray = miArray.length;
{{< /highlight >}}

La longitud de un array es fija después de su creación y no se puede cambiar.

**Inicialización**: un array se puede inicializar con valores utilizando una lista de inicialización. Por ejemplo, para crear un array de enteros con valores iniciales, se puede usar la siguiente sintaxis:

{{< highlight java "linenos=table" >}}
int[] miArray = {1, 2, 3, 4, 5};
{{< /highlight >}}

Esto crea un array de enteros con cinco elementos inicializados con los valores 1, 2, 3, 4 y 5.

**Arrays multidimensionales**: en Java, también es posible crear arrays multidimensionales. Para crear un array bidimensional de enteros, se puede usar la siguiente sintaxis:

{{< highlight java "linenos=table" >}}
int[][] miArray = new int[3][4];
{{< /highlight >}}

Esto crea un array de enteros con tres filas y cuatro columnas, inicializado con el valor predeterminado (0). Los elementos se pueden acceder utilizando dos índices, uno para la fila y otro para la columna.

**Clonación**: un array se puede clonar para crear una copia exacta utilizando el método `clone()`. Por ejemplo, para clonar el array de enteros declarado anteriormente, se puede usar la siguiente sintaxis:

{{< highlight java "linenos=table" >}}
int[] miArrayCopia = miArray.clone();
{{< /highlight >}}

Esto crea una copia exacta del array original.

### Enum

**Enum** es un tipo de datos especial que se utiliza para representar un conjunto de constantes nombradas. Una enumeración es una lista de valores predefinidos que se pueden utilizar en un programa para representar un conjunto de opciones, estados o categorías.

Las **enumeraciones** se definen como una clase especial en Java y se pueden considerar como un conjunto de constantes con nombre. Cada constante en una enumeración es una instancia de la clase `Enum`, lo que significa que puede tener métodos y campos definidos en su definición.

Entre las características más relevantes de las enumeraciones en Java, podemos mencionar:

**Tipos de datos seguros**: las enumeraciones en Java son tipos de datos seguros, lo que significa que el compilador garantiza que solo se pueden utilizar valores válidos en la enumeración. Esto evita errores comunes de programación, como el uso de valores no válidos o la comparación de valores de diferentes tipos.

**Constantes nombradas**: una de las principales ventajas de las enumeraciones es que permiten definir un conjunto de constantes nombradas que se pueden utilizar en un programa. Las constantes en una enumeración se definen en la clase Enum y se pueden utilizar en todo el programa para representar valores específicos.

**Funcionalidades de clase**: las enumeraciones en Java son clases y, por lo tanto, pueden tener métodos y campos definidos en su definición. Esto significa que cada constante en una enumeración puede tener su propia lógica de implementación y comportamiento.

**Iteración**: las enumeraciones también proporcionan funcionalidades de iteración que permiten recorrer todos los valores de la enumeración. Por ejemplo, se puede utilizar el método `values()` para obtener un array de todos los valores de una enumeración y luego iterar sobre ellos para realizar operaciones.

**Uso en switch**: las enumeraciones se pueden utilizar en instrucciones switch, lo que facilita el proceso de programación y mejora la legibilidad del código.

### Class

**Class** es un tipo de dato especial que se utiliza para representar una clase o interfaz en tiempo de ejecución. Es decir, un objeto de tipo Class representa la definición de una clase o interfaz, en lugar de una instancia de esa clase o interfaz.

El tipo de dato **Class** se utiliza comúnmente para realizar reflexión en Java, es decir, para obtener información sobre una clase o interfaz y manipularla en tiempo de ejecución. Por ejemplo, se puede utilizar el objeto Class para obtener información sobre los métodos, campos y constructores de una clase, y para crear nuevas instancias de la misma.

Para obtener un objeto de tipo Class que represente una clase o interfaz en Java, se pueden utilizar dos métodos principales:

El método `getClass()`: este método se utiliza para obtener el objeto Class de una instancia de una clase. Por ejemplo:

{{< highlight java "linenos=table" >}}
Object obj = new String("Hola");
Class<?> clazz = obj.getClass();
{{< /highlight >}}

En este ejemplo, se obtiene el objeto Class de la instancia de String "Hola" utilizando el método `getClass()`.

El método `forName()`: este método se utiliza para obtener el objeto Class de una clase o interfaz por su nombre completo. Por ejemplo:

{{< highlight java "linenos=table" >}}
Class<?> clazz = Class.forName("java.lang.String");
{{< /highlight >}}

En este ejemplo, se obtiene el objeto Class de la clase String utilizando el método `forName()` y especificando su nombre completo.

Una vez que se tiene un objeto de tipo Class que representa una clase o interfaz en Java, se pueden realizar diversas operaciones con él utilizando los métodos proporcionados por la _API_ de reflexión de Java. Por ejemplo, se pueden obtener los métodos de la clase, acceder a los campos, obtener información sobre los constructores, entre otras cosas.

#### Referencias

Una referencia es un tipo de dato que se utiliza para almacenar la dirección de memoria de un objeto. En otras palabras, una referencia es un nombre que se le da a un objeto y que permite acceder a él desde otras partes del programa.

Cuando se crea un objeto en Java utilizando la palabra clave `new`, se reserva un bloque de memoria para almacenar el objeto en el **Heap**. El objeto en sí mismo es un conjunto de datos y métodos, y se puede acceder a ellos mediante una referencia a ese objeto. La referencia se utiliza para acceder a los datos y métodos del objeto, pero no contiene los datos en sí mismos.

Es importante tener en cuenta que en Java las referencias son siempre de objetos y no de tipos primitivos como int, float, etc. Cuando se trabaja con tipos primitivos, se utilizan valores en lugar de referencias.

Las referencias en Java son importantes porque permiten la creación de estructuras de datos complejas, como colecciones, árboles y grafos, y también permiten la programación orientada a objetos, donde los objetos interactúan entre sí mediante referencias.

Es importante tener en cuenta que las referencias en Java son variables y se pueden asignar, pasar como parámetros a métodos y devolver desde métodos. Por ejemplo:

{{< highlight java "linenos=table" >}}
Object obj = new Object(); // Crear un nuevo objeto y asignarlo a una referencia
System.out.println(obj.toString()); // Llamar al método toString() del objeto utilizando la referencia
{{< /highlight >}}

En este ejemplo, se crea un nuevo objeto utilizando la palabra clave new y se asigna a una referencia llamada obj. Luego se llama al método toString() del objeto utilizando la referencia.
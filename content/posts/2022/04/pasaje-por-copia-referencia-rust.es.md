---
title: Pasaje por copia o referencia en Rust
description: Cómo funcionan las dos formas de pasar argumentos en Rust
author: Leandro Fernandez
type: post
date: 2022-04-16
cover: "/2022/04/rust_programming_language_black_logo.png"
categories:
  - Programación
tags:
  - programación
  - educación
---

La mayoría de los lenguajes de programación pasan la información de los argumentos de una función por copia o por referencia.
Es decir, creando una copia de los datos o pasando una referencia a los datos originales respectivamente.
Y esto es muy importante dependiendo del caso y del lenguaje podrá haber consecuencias de performance o hacer el código menos robusto.

## Por copia

El pasaje por copia hace que el código sea más funcional y menos propenso a errores.
Ya que la función puede internamente modificar los argumentos sin afectar las variables que contienen los datos originales en el entorno de la llamada a función.
Pero tiene la desventaja de que es necesario duplicar la cantidad de memoria utilizada por cada dato pasado por copia.
Y esto puede afectar la complejidad temporal y espacial, si se trata de una estructura de datos que contiene mucha información.

Veamos un ejemplo en **C**:

{{< highlight c "linenos=table" >}}
#include <stdio.h>

void change(int value) {
  value = 10;
}

int main()
{
  int a = 5;
  change(a);
  printf("%d", a);
}
{{< /highlight >}}

Si ejecutamos el código veremos el número `5`  a la salida.
Ya que la llamada de la **línea 10** pasa una copia de la variable `a` cuando llama a la función `change()`.
La asignación de la **línea 4** se realiza sobre un espacio de memoria distinto del que contiene el valor de la variable `a`.

## Por referencia

Este tipo de pasaje envía una referencia (o puntero) a la función.
Y ésta tiene entonces acceso directo al espacio de memoria referido.
Claramente esto evita copiar información y será más rápido y óptimo que el pasaje por copia.
Pero introduce un problema nuevo ya que ahora la función puede modificar el espacio de memoria referido provocando lo que llamamos efecto secundario (side effect).

Veamos un ejemplo en **Javascript**:

{{< highlight javascript "linenos=table" >}}
function change(value) {
  value[0] = 10;
}

let a = [5, 6, 7];
change(a);
console.log(a);
{{< /highlight >}}

Al ejecutar este programa veremos a la salida:

```
[ 10, 6, 7 ]
```

Y esto se debe a que Javascript (y la mayoría de los lenguajes) pasar los _arrays_ como referencia automáticamente.
Porque un array puede almacenar mucha información, se diseña el lenguaje de esta forma.
Lo mismo ocurre con los objetos.
Y todo esto es común a mucho lenguajes modernos.

## Cómo funciona en Rust

En **Rust** el programador debe indicar explícitamente el tipo de pasaje que utilizará.
Igual que ocurre con **C++**.

{{< highlight rust "linenos=table" >}}
fn main() {
    let a: u8 = 5;
    change(a);
    println!("a = {}", a);
}

fn change(mut value: u8) {
    value += 10;
    println!("value = {}", value);
}
{{< /highlight >}}

Al ejecutar este programa no se afectará el valor de a en la **línea 2** porque se pasa por copia.
Adicionalmente se debe especificar explícitamente que el argumento `value` puede ser modificado dentro de la función, utilizando la palabra clave `mut`.

Lo que me sorprendió fue que los _arrays_ se pasen por copia.
Esto es algo que incluso lenguajes como **C/C++** no permiten.

{{< highlight rust "linenos=table" >}}
fn main() {
    let a: [u8; 3] = [1, 2, 3];
    change(a);
    println!("a = {:?}", a);
}

fn change(mut arr: [u8; 3]) {
    arr[0] += 10;
    println!("value = {:?}", arr);
}
{{< /highlight >}}

El argumento `arr` de la **línea 7** recibe una copia del array de la **línea 2**.
Y por lo tanto la variable `a` sigue conteniendo el dato original después de la llamada de la **línea 3**.

Finalmente si queremos pasar un dato por referencia en **Rust** podemos hacerlo.
Incluso con valores escalares.

{{< highlight rust "linenos=table" >}}
fn main() {
    let mut a: u8 = 5;
    change(&mut a);
    println!("{}", a);
}

fn change(value: &mut u8) {
    *value = 10;
}
{{< /highlight >}}

Es importante notar que debemos declarar el argumento como una referencia mutable (**línea 7**) para poder modificarlo en la **línea 8** desreferenciándolo.
Lo bueno es que el pasaje por referencia ocurre en forma explícita y no puede ser algo que el programador ignore.
También es posible pasar una referencia inmutable y de esa forma ganar en performance pero manteniendo imposible la ocurrencia de un _side effect_.
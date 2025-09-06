---
title: Para qué sirve equals en Java (actualizado)
description: Por qué en Java las clases tienen un método equals si existe un comparador nativo también
author: Leandro Fernandez
type: post
date: 2025-09-06
cover: "/2021/09/equals.jpg"
categories:
  - Programación
tags:
  - java
  - equals
---

## ¿Qué es equals() y por qué existe?

En **Java**, `==` compara identidad de referencia; sirve para tipos primitivos y referencias, pero para validar equivalencia de contenido (por ejemplo, que dos Strings tengan el mismo texto o que dos instancias representen al mismo usuario), existe `equals()` —heredado de Object—. Por defecto actúa como `==`,comparando referencias.

### ¿Cómo sobreescribir correctamente equals()?

{{< highlight java "linenos=table" >}}
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return Objects.equals(username, user.username);
}
{{< /highlight >}}

* `@Override`: evita errores silenciosos si firmás mal el método.
* `this == o`: rápido y seguro.
* `null` + tipo con `getClass()`: garantiza que sean de la misma clase.
* Uso de `Objects.equals()`: null-safe.
* Siempre override también hashCode() según el contrato.

### Java 17+: record hace tu vida más fácil

{{< highlight java "linenos=table" >}}
public record User(String username, String group) { }
{{< /highlight >}}

Este record automáticamente define equals(), hashCode() y toString() basados en todos los componentes (en este caso, username y group). Ideal para datos inmutables — sin necesidad de escribir código manual.

### Comparaciones en el mundo real de Java

#### Strings

`String s1 = "hola"; String s2 = "hola";`
`s1 == s2` puede ser `true` (internación), pero confiar solo en eso es riesgoso. Mejor siempre:

{{< highlight java "linenos=table" >}}
if (s1.equals(s2)) { ... }
{{< /highlight >}}

O null-safe:

{{< highlight java "linenos=table" >}}
Objects.equals(s1, s2)
{{< /highlight >}}

#### Arrays

`arrays.equals(a, b)` vs. `a.equals(b)` (compara contenido vs referencia):

{{< highlight java "linenos=table" >}}
Arrays.equals(arr1, arr2);
Arrays.deepEquals(nested1, nested2);
{{< /highlight >}}

#### Enums

Comparar con `==` ya es seguro, porque los enums son singleton en la JVM.

### Cuando no override equals()

* DTOs triviales en transferencias donde no se guardan en Collections.
* Entidades JPA (por su ciclo de vida y proxies) — usarlo con cuidado.
* Objetos mutables donde los valores clave pueden cambiar causando comportamiento inesperado.

### Buenas prácticas modernas

Usa `EqualsVerifier` en pruebas:

{{< highlight java "linenos=table" >}}
EqualsVerifier.forClass(User.class).verify();
{{< /highlight >}}

Anota con `@EqualsAndHashCode` **(Lombok)** para que el IDE genere métodos consistentes.

### Resonancia con colecciones

Un mal override de `equals()` sin `hashCode()` correspondiente puede provocar errores en **HashMap**, **HashSet** e incluso `contains()` que devuelven false inesperadamente.

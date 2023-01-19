---
title: Passing argument by value and by reference in Rust
description: How arguments passing works in Rust
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

Most programming languages pass information from function arguments by value or by reference. This means creating a copy of the data or passing a reference to the original data respectively. This is very important depending on the case and the language, as it can have performance consequences or make the code less robust.

## By value

Passing by value makes the code more functional and less prone to errors. Since the function can internally modify the arguments without affecting the variables that contain the original data in the function call environment. But it has the disadvantage that it is necessary to duplicate the amount of memory used by each data passed by value. And this can affect the temporal and spatial complexity, if it is a data structure that contains a lot of information.

Let's see an example in **C**:

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

If we run the code we will see the number 5 at the output. Since the call on **line 10** passes a copy of the variable `a` when it calls the `change()` function. The assignment on **line 4** is made on a different memory space than the one containing the value of variable `a`.

## By reference

This type of passing sends a reference (or pointer) to the function. And then the function has direct access to the referred memory space. Clearly this avoids copying information and will be faster and more optimal than passing by copy. But it introduces a new problem since now the function can modify the referred memory space causing what we call a side effect.

Let's see an example in **Javascript**:

{{< highlight javascript "linenos=table" >}}
function change(value) {
  value[0] = 10;
}

let a = [5, 6, 7];
change(a);
console.log(a);
{{< /highlight >}}

When running this program we will see the following output:

```
[ 10, 6, 7 ]
```
And this is because Javascript (and most languages) pass arrays as a reference automatically. Because an array can store a lot of information, the language is designed this way. The same happens with objects. And all this is common to many modern languages.

## How it works in Rust

In **Rust** the programmer must explicitly indicate the type of passing that will be used. Like **C++**.

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

when running this program, the value of a in **line 2** will not be affected because it is passed by copy. Additionally, it must be explicitly specified that the argument `value` can be modified inside the function, using the `mut` keyword.

What surprised me was that arrays are passed by copy. This is something that even languages like **C/C++** do not allow..

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

The argument `arr` on **line 7** receives a copy of the array on **line 2**. And therefore the variable `a` still contains the original data after the call on **line 3**.

Finally, if we want to pass a data by reference in **Rust** we can do it, even with scalar values.

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

It is important to note that we must declare the argument as a mutable reference (**line 7**) in order to modify it on **line 8** by dereferencing it. The good thing is that the passing by reference occurs explicitly and cannot be something that the programmer ignores. It is also possible to pass an immutable reference and in this way gain in performance but keeping the occurrence of a _side effect_ impossible.

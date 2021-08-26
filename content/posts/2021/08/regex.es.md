---
title: ¡Basta de temerle a las regex!
author: Leandro Fernandez
type: post
date: 2021-08-25
cover: "/2021/08/stop-fearing-regex.png"
categories:
  - Programación
tags:
  - regex
  - java
---

> ¡No es chiste! Los desarrolladores le temen a las **expresiones regulares**. Y sí, lo entiendo. Se ven horrible. Pero son poderosas.

Y es mucho más difícil leerlas que escribirlas. Lo que no es ideal. Pero al menos te podés beneficiar escribiendo **regex** aquí y allá. Posiblemente sea buena idea documentarlas con un comentario significativo en el código para tu futuro yo. Aprender a escribir algunas regex simples y, aún así, poderosas no es imposible y estoy escribiendo este artículo para probarlo.

## Prefacio

Hay al menos cuatro estándares en uso para **regex**:

- POSIX BRE (_Basic Regular Expressions_)
- POSIX ERE (_Extended Regular Expressions_)
- Perl
- _Perl Compatible Regular Expressions_

Hasta donde sé todos estos tienen diferencias pero también son muy similares y basado en mi experiencia, cada lenguaje o herramienta utiliza uno de estos o una variante de los mismos. Nunca traté de aprender cada uno. Usé **PCRE** (Perl Compatible Regular Expressions) por años y siempre me las arreglé para hacer funcionar los otros cuando lo necesité, leyendo la documentación. Por eso no voy a entrar en detalles sobre los estándares y usaré para este articulo las que funcionan con **Java** ya que mucho del contenido del este sitio se refiere a **Java**.

Para seguir este artículo ter recomiendo tener una herramienta para probar el conocimiento que adquirís mientras leés. Si querés aprender **regex** para una herramienta o lenguaje específicos tal vez quieras usar eso. Pero puede que el estándar que soporte no coincida con el usado aquí. Podés buscar "online regex" en _Google_ y obtendrás un montón de opciones. Usá la que más te guste.

## Empecemos

En Perl tenes que escribir las regex encerradas entre barras como `/[0-9]+/`, lo que implica que nada antes de la primera barra o después de la última son parte de la regex. Podés escribir hasta siete indicadores después de la última barra `/[0-9]+/gmisxuU` donde, por ejemplo, `m` quiere decir multilínea y permitirá que la regex coincida más de una línea (lo que no es el comportamiento por defecto). Algunas herramientas o lenguajes hacen que estas barras sean opcionales y reciben los indicadores por otro lado.

### La regex más simple

La **expresión regular** más simple que podé escribir es un literal. Una regex va a coincidir literalmente si escribís cualquier cosa que no sea significativa para el motor de expresiones regulares. Si querés encontrar la palabra ejemplo podés escribir `/ejemplo/` y esto coincidirá la palabra en una cadena como `"Esto es un ejemplo"` y también en `"unejemplosinespacios"`.



You have just learnt your very first regular expression. And you may argue you don't need to learn regex in order to match a literal. You can easily write an algorithm that will find a word in a string in your programming language or you can use a tool that will let you look for a word. And that is correct. You will use a regex when your search logic is more complex. You don't want the overhead the regex engine will add if you are looking for something like a literal.

This is a very important point. Regex are expensive CPU wise. You need to be aware of that. All that power comes at some price. If you are going to use a regex inside a loop that will be executing many times per second you may want to look for an alternative.

### A more useful one

We have sene how the `/example/` regex would match the _example_ word as a character sequence in a string like `"nospaceexamples"`. What if we only want to match the example word. In the sense of a word in a text. There is a precise regex for this case but let's get to it learning as we go. We could naively add spaces before and after the work in the regex because we know literals are going to be matched. Then we would get the `/ example /` which would not match `"nospaceexamples"`. It would match `"another example here"` but what if we had tabulation characters instead of spaces. At this point the literal matching becomes useless. Regular expressions provide **meta sequences** that will match more than one character with a specific criteria. In order to match white spaces in the most general sense we can put `\s` in our regex whenever we want to match anything that can be interpreted as a white space. Changing our regex to `/\sexample\s/` will match the example word preceded and followed by one white space, or tabulation, or even a new line.

We have got our very first useful regex but it can be further improved because that one won't match `example` in strings like `an example.` or `example of`. The dot and the string boundaries are not matched as white spaces. Fortunately, there is another **meta sequence** `\b` which specifically matches word boundaries. And turning our regex into `/\bexample\b/` will do the trick. Now, you should admit programming this kind of search by ourselves is still doable but will take more than a simple sequence match.

> Up to this point we've learnt two reserved symbols for regular expressions: slash `/` and back-slash `\`. Whenever we need to match these or other reserved symbols we need to escape them using a back-slash. To match a slash or a back-slash literally we will write `/\/\\/` (remember the I'm enclosing all the regex into `/.../`).

#### Some commonly used meta sequences

| Meta sequence | Match |
| --- | --- |
| `.` | Any character |
| `a\|b` | Either `a` or `b` (literal) |
| `\s` | Any whitespace character |
| `\S` | Any non-whitespace character |
| `\d` | Any digit |
| `\D` | Any non-digit |
| `\w` | Any word character |
| `\W` | Any non-word character |

## Wrap up

This is intended to be the first of several posts covering regular expressions. Depending on when you are reading this post the follow ups might be already published or not. Let's see what we can do with what we've learnt up to now.

Take the following string as an example:

> Albert Einstein; (14 March 1879 – 18 April 1955) was a German-born theoretical physicist, widely acknowledged to be one of the greatest physicists of all time.

And let's write some regex to match arbitrary parts.

| Capture... | Regex |
| --- | --- |
| Years | `/\d\d\d\d/` |
| Days | `/\D\d\d\D/` |
| The `the` word | `/\bthe\b/` |
| Any `the` sequence | `/the/` |
| Any day in April | `/\d\d\sApril/` |
| All the words with three letters | `/\b\w\w\w\b/` |

Later we'll see many of these regex can be expressed in a more concise and flexible manner. Stay tuned.

---
[Image from xkcd](https://xkcd.com/208/)

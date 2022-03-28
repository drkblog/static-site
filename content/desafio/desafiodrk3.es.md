---
title: "#desafiodrk3"
description: "Validar llaves, corchetes y paréntesis"
date: 2022-03-01
type: post
slug: "desafiodrk3"
comments: false
---

## Enunciado

_Dada una cadena con llaves, corchetes y paréntesis validar que todas las aperturas y cierres son correctas y que el anidamiento cumple con que sólo puede haber corchetes dentro de llaves y paréntesis dentro de corchetes. Y se puede anidar cualquiera dentro de sí mismo. Complejidad temporal y espacial lineal O(n)._

## Detalles

- Se recibe una cadena que sólo tiene los símbolos de apertura y cierre de llaves, corchetes y paréntesis `{} [] ()`.
- La cadena es de largo variable y podrá tener hasta 50.000 caracteres.
- La cadena recibida puede o no ser válida y el algoritmo debe indicar esto.
- No es necesario pero indicar la posición donde se detecta el error es un plus.

## Videos

- [Enunciado](https://www.tiktok.com/@drkbugs/video/7070185300038929669)
- [Solución](https://www.youtube.com/watch?v=tAczqCPwmGo)
- [Análisis de solución propuesta por José Mohamed](https://www.youtube.com/watch?v=f-IQAj0kWfk)
- [Videos relacionados en TikTok](https://www.tiktok.com/search?lang=en&q=%23desafiodrk3)
- [Videos relacionados en YouTube](https://www.youtube.com/results?search_query=%23desafiodrk3)

## Ejemplos

### Cadenas válidas
```
"{()[]}"
"{(()())}{[(()())][]}"
"{[]}"
"{{}{}}"
"(())"
```

### Cadenas inválidas
```
"{(()}"
"{((()())}{[(()())][]}"
"[{}]"
"}"
"{"
```

## Cómo enviar respuestas

Para enviar respuestas largas o que contengan código (no sólo para este desafío sino en las redes sociales en general) se puede utilizar:

- https://pastebin.com/
- https://gist.github.com/

Luego pegar la URL en un comentario del video o enviar un mail.


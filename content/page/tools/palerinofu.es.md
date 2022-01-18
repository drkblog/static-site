---
title: "PALERINOFU"
description: "Encriptador y desencriptador PALERINOFU"
slug: "palerinofu"
comments: false
---

Escribí un mensaje para obtener el encriptado o simplemente el encriptado para obtener la versión sin encriptar.
Se procesarán hasta 512 caracteres.
No se procesarán vocales acentuadas.

{{< rawhtml >}}
<textarea id="input"></textarea>
<textarea id="output" disabled="true"></textarea>
<script type="text/javascript">
  const mapper = {
    'P': 'A',
    'L': 'E',
    'R': 'I',
    'N': 'O',
    'F': 'U',
    'p': 'a',
    'l': 'e',
    'r': 'i',
    'n': 'o',
    'f': 'u',
    'A': 'P',
    'E': 'L',
    'I': 'R',
    'O': 'N',
    'U': 'F',
    'a': 'p',
    'e': 'l',
    'i': 'r',
    'o': 'n',
    'u': 'f'
  }
  function doMap(character) {
    const result = mapper[character];
    if (result == undefined) {
      return character;
    } else {
      return result;
    }
  }
  function palerinofuTranslate(inputText) {
    var outputText = "";
    const limitedInputText = inputText.substring(0, 512);
    for (const character of limitedInputText) {
      outputText += doMap(character);
    }
    return outputText;
  } 
  const input = document.querySelector("#input");
  const output = document.querySelector("#output");

  handler = async (event) => {
      output.value = palerinofuTranslate(input.value.toString());
  }
  
  input.onchange = handler;
  input.onkeyup = handler;
</script>
{{< /rawhtml >}}
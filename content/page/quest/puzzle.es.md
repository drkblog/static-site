---
title: "#drkquest1 - Responder"
description: "Formulario de envío de respuesta #drkquest1"
slug: "drkquest1-answer-form"
comments: false
sitemapExclude: true
---

A través de este formulario podés enviar la respuesta que creas correcta.
Podés hacer el envío más de una vez si la respuesta que enviás es incorrecta.
No hay un límite de intentos pero es importante no abusar de este servicio porque podría bloquearte.

Luego de completar los datos vas a recibir un correo con un enlace para validar tu dirección de correo electrónico.
Tu respuesta no será considerada válida hasta que hayas utilizado el enlace.
Y es importante que lo hagas antes del plazo de vencimiento del mismo.

{{< rawhtml >}}
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<form id="form" accept-charset="UTF-8" action="https://puzzle.drkbugs.workers.dev/post" method="POST">
  <input name="email" type="email" placeholder="name@example.com">
  <input name="answer" type="text" placeholder="Respuesta...">
  <div id="recaptcha" class="g-recaptcha" data-sitekey="6LcG5f0SAAAAAPNN8gGEHzu07flHpuQqqkxaQM_W"></div>
  <button type="submit">Enviar</button>
</form>
<pre id="response"></pre>
<script type="text/javascript">
  function disable_form(form) {
    const elements = form.elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
      elements[i].disabled = true;
    }
  } 
  const form = document.querySelector("#form");
  const recaptcha = document.querySelector("#recaptcha");
  const response = document.querySelector("#response");
  form.onsubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const values = Object.fromEntries(data.entries());
      const json = JSON.stringify(values, null, 2);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', event.target.action, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
          response.innerHTML = this.responseText;
          disable_form(form);
          recaptcha.remove();
        }
      }
      xhr.send(json);
  }
</script>
{{< /rawhtml >}}
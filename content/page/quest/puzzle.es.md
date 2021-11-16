---
title: Puzzle
description: Puzzle
slug: "puzzle"
comments: false
---

{{< rawhtml >}}
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<form id="form" accept-charset="UTF-8" action="https://puzzle.drkbugs.workers.dev/post" method="POST">
  <input name="email" type="email" placeholder="name@example.com">
  <input name="answer" type="text" placeholder="Respuesta...">
  <div id="recaptcha" class="g-recaptcha" data-sitekey="6LcG5f0SAAAAAPNN8gGEHzu07flHpuQqqkxaQM_W"></div>
  <button type="submit">Enviar</button>
</form>
<div id="response"></div>
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
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log('Request submitted ok');
          response.innerHTML = this.responseText;
          disable_form(form);
          recaptcha.remove();
        }
      }
      xhr.send(json);
  }
</script>
{{< /rawhtml >}}
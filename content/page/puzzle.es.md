---
title: Puzzle
description: Puzzle
slug: "puzzle"
comments: false
---

{{< rawhtml >}}
<form id="form" accept-charset="UTF-8" action="https://puzzle.drkbugs.workers.dev/post" method="POST">
  <input name="email" type="email" placeholder="name@example.com">
  <input name="answer" type="text" placeholder="Respuesta...">
  <button type="submit">Enviar</button>
</form>
<script type="text/javascript">
    const form = document.querySelector("#form")
    form.onsubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const values = Object.fromEntries(data.entries())
        const json = JSON.stringify(values, null, 2)

        var xhr = new XMLHttpRequest()
        xhr.open("POST", event.target.action, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = function() {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this)
          }
        }
        xhr.send(json);
    }
</script>
{{< /rawhtml >}}
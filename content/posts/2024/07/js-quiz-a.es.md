---
title: Javascript Quiz - A
description: Preguntas para autoevaluar tus conocimientos sobre Javascript
author: Leandro Fernandez
type: post
date: 2024-07-01
slug: js-quiz-a
categories:
  - Learning
tags:
  - Learning
  - learning
  - javascript
---
{{< rawhtml >}}
<div id="quiz-container">
  <div id="score-container" class="score"></div>
  <div id="question-container" class="question"></div>
  <ul id="answers-container" class="answers"></ul>
  <div id="result-container" class="result"></div>
  <button id="next-button" style="display: none;">Siguiente...</button>
</div>
<style>
  .score {
    font-size: 1.4em;
    color: #d04a2b;
  }
  .question {
    font-size: 1.2em;
    margin-bottom: 20px;
  }
  .answers {
    font-size: .8em;
    list-style-type: none;
    padding: 0;
  }
  .answers li {
    margin-bottom: 10px;
  }
  .result {
    color: #d04a2b;
    margin-top: 20px;
    font-weight: bold;
  }
  .option-text-div {
    display: inline-block;
    margin: 6px;
  }
  .answer-button {
    display: inline-block;
    margin: 6px;
  }
  #next-button {
    font-size: .8em;
  }
</style>
<script src="/js/hljs/highlight.min.js"></script>
<script src="/js/proprietary/quiz-a.js"></script>
{{< /rawhtml >}}

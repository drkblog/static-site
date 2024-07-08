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
  <button id="next-button" style="display: none;">Siguiente ↩</button>
</div>
<style>
  .score {
    font-size: 1.4em;
    color: #d04a2b;
  }
  .question {
    font-size: 1.1em;
    margin-bottom: 20px;
  }
  .answers {
    font-size: .9em;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .answers li {
    margin-bottom: 10px;
  }
  .result {
    font-size: 1em;
    color: #d04a2b;
    margin-left: 30px;
    font-weight: bold;
  }
  .option-text-div {
    display: inline-block;
    margin: 6px;
  }
  .result-box {
    display: inline-block;
    min-height: 40px;
    padding: 0;
  }
  .result-icon {
    height: 40px;
    width: 40px;
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

---
title: Quiz
description: Quiz
author: Leandro Fernandez
type: post
date: 2024-07-01
slug: quiz
# cover: "/2023/09/redflag.jpg"
categories:
  - Learning
tags:
  - Learning
  - learning
---
{{< rawhtml >}}
<div id="quiz-container">
    <div id="question-container" class="question"></div>
    <ul id="answers-container" class="answers"></ul>
    <div id="result-container" class="result"></div>
    <button id="next-button" style="display: none;">Next Question</button>
</div>
<style>
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
  #next-button {
    font-size: .8em;
  }
</style>
<script src="/js/quiz-a.js"></script>
{{< /rawhtml >}}
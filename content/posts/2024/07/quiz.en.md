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
<script>
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome", "Lisbon"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn", "Venus"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Southern Ocean", "Pacific Ocean"],
        correctAnswer: 4
    }
];

async function fetchQuizQuestion() {
  const workerUrl = 'https://quiz-a.drkbugs.workers.dev/';
  
  try {
    const response = await fetch(workerUrl);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Quiz question not found');
      }
      throw new Error('Failed to fetch quiz question');
    }
    
    const quizQuestion = await response.json();
    
    return quizQuestion;
  } catch (error) {
    console.error('Error fetching quiz question:', error);
    throw error;
  }
}

let currentQuestionIndex = 0;
let correctResponses = 0;
let question;

async function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');
    const nextButton = document.getElementById('next-button');
    const resultContainer = document.getElementById('result-container');

    question = await fetchQuizQuestion();

    questionContainer.textContent = question.question;
    answersContainer.innerHTML = '';

    question.options.forEach((answer, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        li.appendChild(button);
        answersContainer.appendChild(li);
    });

    nextButton.style.display = 'none';
    resultContainer.textContent = '';
}

function checkAnswer(selectedIndex) {
    const resultContainer = document.getElementById('result-container');
    const nextButton = document.getElementById('next-button');

    if (selectedIndex === question.answer) {
        resultContainer.innerHTML = 'Correct!';
        correctResponses++;
    } else {
        resultContainer.innerHTML = `Incorrect!<br />The correct answer was: ${question.options[question.answer]}`;
    }

    nextButton.style.display = 'block';
}

document.getElementById('next-button').onclick = async () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < 3) {
        await showQuestion();
    } else {
        showFinalResult();
    }
};

function showFinalResult() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<div class="result">Quiz completed! You got ${correctResponses} out of ${questions.length} questions correct.</div>`;
}

// Start the quiz
showQuestion();
</script>
{{< /rawhtml >}}

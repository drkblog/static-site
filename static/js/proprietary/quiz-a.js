// Copyright Leandro Fernandez (drkbugs) 2024

const ANSWER_BUTTON_CLASS = 'answer-button';
const OPTION_DIV_CLASS = 'option-div';
const OPTION_TEXT_DIV_CLASS = 'option-text-div';
const NEXT_BUTTON_ID = 'next-button';
const QUIZA_STATE_COOKIE = 'quiza-state';
const RESULT_BOX_CLASS = 'result-box';
const PRESERVE_STATE_DAYS = 60;

class End {}

function getWorkerUrl() {
  return (window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.hostname === '[::1]') ? 'http://127.0.0.1:8787' : 'https://quiz-a.drkbugs.workers.dev/';
}

async function fetchQuizQuestion() {
  try {
    const response = await fetch(getWorkerUrl(), { credentials: 'include' });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new End();
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

let totalResponses = 0;
let correctResponses = 0;
let question;

function setup() {
  const state = JSON.parse(getCookie(QUIZA_STATE_COOKIE));
  if (state != null) {
    totalResponses = state.total;
    correctResponses = state.correct;
  }
}

function storeState() {
  const state = { total: totalResponses, correct: correctResponses };
  setCookie(QUIZA_STATE_COOKIE, JSON.stringify(state), PRESERVE_STATE_DAYS);
}

async function showQuestion() {
  const scoreContainer = document.getElementById('score-container');
  const questionContainer = document.getElementById('question-container');
  const answersContainer = document.getElementById('answers-container');
  const nextButton = document.getElementById(NEXT_BUTTON_ID);
  const resultContainer = document.getElementById('result-container');

  scoreContainer.textContent = `${correctResponses} / ${totalResponses}`;
  
  try {
    question = await fetchQuizQuestion();

    questionContainer.innerHTML = question.question;
    answersContainer.innerHTML = 'Selecciona una opción:';

    question.options.forEach((answer, index) => createOption(answer, index, answersContainer));

    nextButton.style.display = 'none';
    resultContainer.textContent = '';

    hljs.configure({ cssSelector: 'code' });
    hljs.highlightAll();
  } catch(error) {
    if (error instanceof End) {
      showFinalResult();
    } else {
      resultContainer.textContent = `Error: ${error.message}`;
    }
  }
}

function createOption(answer, index, answersContainer) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  div.className = OPTION_DIV_CLASS;
  const optionText = document.createElement('div');
  optionText.className = OPTION_TEXT_DIV_CLASS;
  optionText.innerHTML = answer;
  const button = document.createElement('button');
  button.className = ANSWER_BUTTON_CLASS;
  button.textContent = '🠊';
  button.onclick = () => checkAnswer(index);
  const resultBox = document.createElement('div');
  resultBox.id = getResultBoxId(index);
  resultBox.className = RESULT_BOX_CLASS;
  div.appendChild(button);
  div.appendChild(optionText);
  div.appendChild(resultBox);
  li.appendChild(div);
  answersContainer.appendChild(li);
}

function getResultBoxId(index) {
  return `quiz-result-box-${index}`;
}

function checkAnswer(selectedIndex) {
  const resultContainer = document.getElementById('result-container');
  const nextButton = document.getElementById(NEXT_BUTTON_ID);

  const buttons = document.getElementsByClassName(ANSWER_BUTTON_CLASS);
  for(let button of buttons) {
    button.disabled = true;
  }

  totalResponses++;
  if (selectedIndex === question.answer) {
    resultContainer.innerHTML = '¡Correcto!';
    correctResponses++;
  } else {
    resultContainer.innerHTML = '¡Incorrecto!';
  }

  const resultId = getResultBoxId(question.answer);
  const results = document.getElementsByClassName(RESULT_BOX_CLASS);
  for(let result of results) {
    result.innerHTML = (result.id === resultId) ? '<img src="/images/quiz-a/correct.png" class="result-icon">' : '<img src="/images/quiz-a/incorrect.png" class="result-icon">';
  }

  storeState();

  nextButton.style.display = 'block';
}

document.getElementById('next-button').onclick = async () => {
  await showQuestion();
};

function showFinalResult() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `<div class="result">¡Cuestionario finalizado! Tuviste ${correctResponses} respuestas correctas sobre un total de ${totalResponses} preguntas.</div>`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

// Start the quiz
setup();
showQuestion();
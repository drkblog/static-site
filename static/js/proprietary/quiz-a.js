// Copyright Leandro Fernandez (drkbugs) 2024

const ANSWER_BUTTON_CLASS = 'answer-button';
const OPTION_DIV_CLASS = 'option-div';
const OPTION_TEXT_DIV_CLASS = 'option-text-div';
const NEXT_BUTTON_ID = 'next-button';
const QUIZA_STATE_COOKIE = 'quiza-state';
const PRESERVE_STATE_DAYS = 60;

class End {}

async function fetchQuizQuestion() {
  const workerUrl = 'https://quiz-a.drkbugs.workers.dev/';
  
  try {
    const response = await fetch(workerUrl, { credentials: 'include' });
    
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
  div.appendChild(button);
  div.appendChild(optionText);
  li.appendChild(div);
  answersContainer.appendChild(li);
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
    resultContainer.innerHTML = `¡Incorrecto!<br />La respuesta era: ${question.options[question.answer]}`;
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
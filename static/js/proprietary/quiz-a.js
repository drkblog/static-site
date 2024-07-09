// Copyright Leandro Fernandez (drkbugs) 2024

const ANSWER_BUTTON_CLASS = 'answer-button';
const OPTION_DIV_CLASS = 'option-div';
const OPTION_TEXT_DIV_CLASS = 'option-text-div';
const NEXT_BUTTON_ID = 'next-button';
const RESULT_BOX_CLASS = 'result-box';
const PRESERVE_STATE_DAYS = 60;

function getWorkerUrl() {
  return (window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.hostname === '[::1]') ? 'http://127.0.0.1:8787' : 'https://quiz-a.drkbugs.workers.dev';
}

async function fetchQuizQuestion() {
  try {
    const response = await fetch(getWorkerUrl(), { credentials: 'include' });
    
    if (!response.ok) {
      throw new Error('Failed to fetch quiz question');
    }
    
    const quizQuestion = await response.json();
    
    return quizQuestion;
  } catch (error) {
    console.error('Error fetching quiz question:', error);
    throw error;
  }
}

async function putResult(result) {
  try {
    const requestOptions = {
      method: 'PUT',
      credentials: 'include'
    };
    const response = await fetch(getWorkerUrl() + '/' + result, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch quiz question');
    }
  } catch (error) {
    console.error('Error fetching quiz question:', error);
    throw error;
  }
}

let state;

async function showQuestion() {
  const scoreContainer = document.getElementById('score-container');
  const questionContainer = document.getElementById('question-container');
  const answersContainer = document.getElementById('answers-container');
  const nextButton = document.getElementById(NEXT_BUTTON_ID);
  const resultContainer = document.getElementById('result-container');
  
  try {
    state = await fetchQuizQuestion();

    if (state.completed) {
      showFinalResult();
      return;
    }

    scoreContainer.textContent = `${state.correct} / ${state.total}`;
    questionContainer.innerHTML = state.question.question;
    answersContainer.innerHTML = 'Selecciona una opción:';

    state.question.options.forEach((answer, index) => createOption(answer, index, answersContainer));

    nextButton.style.display = 'none';
    resultContainer.textContent = '';

    hljs.configure({ cssSelector: 'code' });
    hljs.highlightAll();
  } catch(error) {
    resultContainer.textContent = `Error: ${error.message}`;
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
  button.textContent = '➜';
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

async function checkAnswer(selectedIndex) {
  const resultContainer = document.getElementById('result-container');
  const nextButton = document.getElementById(NEXT_BUTTON_ID);

  const buttons = document.getElementsByClassName(ANSWER_BUTTON_CLASS);
  for(let button of buttons) {
    button.disabled = true;
  }

  const correct = selectedIndex === state.question.answer;
  if (correct) {
    resultContainer.innerHTML = '¡Correcto!';
  } else {
    resultContainer.innerHTML = '¡Incorrecto!';
  }

  const resultId = getResultBoxId(state.question.answer);
  const results = document.getElementsByClassName(RESULT_BOX_CLASS);
  for(let result of results) {
    result.innerHTML = (result.id === resultId) ? '<img src="/images/quiz-a/correct.png" class="result-icon">' : '<img src="/images/quiz-a/incorrect.png" class="result-icon">';
  }
  nextButton.style.display = 'block';

  await putResult((correct) ? 'correct' : 'incorrect');
}

document.getElementById('next-button').onclick = async () => {
  await showQuestion();
};

function showFinalResult() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `<div class="result">¡Cuestionario finalizado!<br>Tuviste ${state.correct} respuestas correctas sobre un total de ${state.total} preguntas.</div>`;
}

// Start the quiz
showQuestion();
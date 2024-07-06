// Copyright Leandro Fernandez (drkbugs) 2024

const ANSWER_BUTTON_CLASS = 'answer-button';
const OPTION_DIV_CLASS = 'option-div';
const OPTION_TEXT_DIV_CLASS = 'option-text-div';
const NEXT_BUTTON_ID = 'next-button';

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
let totalResponses = 0;
let correctResponses = 0;
let question;

async function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');
    const nextButton = document.getElementById(NEXT_BUTTON_ID);
    const resultContainer = document.getElementById('result-container');

    question = await fetchQuizQuestion();

    questionContainer.innerHTML = question.question;
    answersContainer.innerHTML = '';

    question.options.forEach((answer, index) => createOption(answer, index, answersContainer));

    nextButton.style.display = 'none';
    resultContainer.textContent = '';
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
    quizContainer.innerHTML = `<div class="result">¡Cuestionario finalizado! Tuviste ${correctResponses} respuestas correctas sobre un total de ${totalResponses} preguntas.</div>`;
}

// Start the quiz
showQuestion();
// Copyright Leandro Fernandez (drkbugs) 2024

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
    const nextButton = document.getElementById('next-button');
    const resultContainer = document.getElementById('result-container');

    question = await fetchQuizQuestion();

    questionContainer.textContent = question.question;
    answersContainer.innerHTML = '';

    question.options.forEach((answer, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.className = 'answer-button';
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
    const buttons = document.getElementsByClassName('my-class');
    
    buttons.forEach(button => button.disabled = true);
    totalResponses++;
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
    quizContainer.innerHTML = `<div class="result">Quiz completed! You got ${correctResponses} out of ${totalResponses} questions correct.</div>`;
}

// Start the quiz
showQuestion();
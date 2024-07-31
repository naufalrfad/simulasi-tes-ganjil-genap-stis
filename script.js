document.getElementById('start-button').addEventListener('click', startTest);
document.getElementById('retry-button').addEventListener('click', restartTest);

const options = document.querySelectorAll('.option-button');
options.forEach(option => {
    option.addEventListener('click', (e) => {
        checkAnswer(e.target.getAttribute('data-value'));
    });
});

let timer;
let timeLeft;
let currentSegment = 0;
let questionIndex = 0;
let questions = [];
let correctAnswers = 0;
let incorrectAnswers = 0;
let results = [];

function startTest() {
    const name = document.getElementById('name').value;
    if (!name) {
        alert('Silakan isi nama lengkap!');
        return;
    }
    
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('test-screen').classList.remove('hidden');
    document.getElementById('result-name').innerText = name;
    
    currentSegment = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    results = [];
    nextSegment();
}

function nextSegment() {
    if (currentSegment > 0) {
        results.push({ segment: currentSegment, correct: correctAnswers, incorrect: incorrectAnswers });
    }
    
    if (currentSegment >= 15) {
        endTest();
        return;
    }
    
    currentSegment++;
    questionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    
    document.getElementById('segment').innerText = `Bagian ${currentSegment}`;
    generateQuestions();
    startTimer();
    showNextQuestion();
}

function startTimer() {
    timeLeft = 60;
    document.getElementById('timer').innerText = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextSegment();
        }
    }, 1000);
}

function generateQuestions() {
    questions = [];
    for (let i = 0; i < 100; i++) {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const sum = num1 + num2;
        questions.push({ num1, num2, sum });
    }
}

function showNextQuestion() {
    if (questionIndex >= questions.length) {
        nextSegment();
        return;
    }
    
    const question = questions[questionIndex];
    document.getElementById('question').innerText = `${question.num1} + ${question.num2}`;
}

function checkAnswer(answer) {
    const question = questions[questionIndex];
    const correctAnswer = question.sum % 2 === 0 ? '0' : '1';
    
    if (answer === correctAnswer) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }
    
    questionIndex++;
    showNextQuestion();
}

function endTest() {
    clearInterval(timer);
    document.getElementById('test-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    results.push({ segment: currentSegment, correct: correctAnswers, incorrect: incorrectAnswers });
    renderChart();
}

function renderChart() {
    const ctx = document.getElementById('result-chart').getContext('2d');
    const labels = results.map(result => `Bagian ${result.segment}`);
    const correctData = results.map(result => result.correct);
    const incorrectData = results.map(result => result.incorrect);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Benar',
                    backgroundColor: 'blue',
                    data: correctData,
                },
                {
                    label: 'Salah',
                    backgroundColor: 'red',
                    data: incorrectData,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function restartTest() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

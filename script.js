document.getElementById('start-button').addEventListener('click', startTest);
document.getElementById('retry-button').addEventListener('click', retryTest);

let currentSegment = 0;
let currentQuestion = 0;
let correctAnswers = [];
let totalQuestions = 15 * 100;
let timer;
let timeRemaining = 60;

function startTest() {
    const name = document.getElementById('name').value;
    if (!name) {
        alert('Masukkan nama lengkap!');
        return;
    }
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'flex';
    startSegment();
}

function startSegment() {
    timeRemaining = 60;
    currentQuestion = 0;
    correctAnswers[currentSegment] = 0;
    document.getElementById('segment').innerText = `Bagian ${currentSegment + 1}`;
    updateTimer();
    nextQuestion();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeRemaining--;
    document.getElementById('timer').innerText = `0:${timeRemaining < 10 ? '0' : ''}${timeRemaining}`;
    if (timeRemaining <= 0) {
        clearInterval(timer);
        currentSegment++;
        if (currentSegment < 15) {
            startSegment();
        } else {
            showResult();
        }
    }
}

function nextQuestion() {
    if (currentQuestion >= 100) return;
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const sum = num1 + num2;
    const isEven = sum % 2 === 0 ? '0' : '1';
    document.getElementById('question').innerText = `${num1} + ${num2} = ?`;

    document.querySelectorAll('.answer-button').forEach(button => {
        button.onclick = () => {
            if (button.dataset.answer === isEven) {
                correctAnswers[currentSegment]++;
            }
            currentQuestion++;
            if (currentQuestion < 100) {
                nextQuestion();
            }
        };
    });
}

function showResult() {
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'flex';

    const ctx = document.getElementById('result-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: 15 }, (_, i) => `Bagian ${i + 1}`),
            datasets: [{
                label: 'Jumlah Benar',
                data: correctAnswers,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Jumlah Salah',
                data: correctAnswers.map(c => 100 - c),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
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

function retryTest() {
    currentSegment = 0;
    correctAnswers = [];
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
}

let currentSegment = 1;
let currentQuestion = 0;
let correctAnswers = [];
let incorrectAnswers = [];
let timer;
let name;

function startTest() {
    name = document.getElementById('name').value;
    if (name === "") {
        alert("Harap isi nama lengkap.");
        return;
    }

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'block';
    startSegment();
}

function startSegment() {
    currentQuestion = 0;
    generateQuestion();
    document.getElementById('segment').innerText = `Bagian ${currentSegment}`;
    document.getElementById('timer').innerText = 60;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let time = parseInt(document.getElementById('timer').innerText);
    if (time === 0) {
        clearInterval(timer);
        currentSegment++;
        if (currentSegment > 15) {
            showResults();
        } else {
            startSegment();
        }
    } else {
        document.getElementById('timer').innerText = time - 1;
    }
}

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const result = (num1 + num2) % 2 === 0 ? 0 : 1;
    document.getElementById('question').innerText = `${num1} + ${num2} = ?`;
    document.getElementById('question').dataset.answer = result;
}

function answer(userAnswer) {
    const correctAnswer = parseInt(document.getElementById('question').dataset.answer);
    if (userAnswer === correctAnswer) {
        correctAnswers.push(currentSegment);
    } else {
        incorrectAnswers.push(currentSegment);
    }

    currentQuestion++;
    if (currentQuestion < 100) {
        generateQuestion();
    } else {
        clearInterval(timer);
        currentSegment++;
        if (currentSegment > 15) {
            showResults();
        } else {
            startSegment();
        }
    }
}

function showResults() {
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    const ctx = document.getElementById('resultChart').getContext('2d');
    const results = [];
    for (let i = 1; i <= 15; i++) {
        results.push({
            segment: i,
            correct: correctAnswers.filter(seg => seg === i).length,
            incorrect: incorrectAnswers.filter(seg => seg === i).length
        });
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: results.map(r => `Segmen ${r.segment}`),
            datasets: [
                {
                    label: 'Benar',
                    data: results.map(r => r.correct),
                    backgroundColor: 'blue'
                },
                {
                    label: 'Salah',
                    data: results.map(r => r.incorrect),
                    backgroundColor: 'red'
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

function retry() {
    currentSegment = 1;
    correctAnswers = [];
    incorrectAnswer

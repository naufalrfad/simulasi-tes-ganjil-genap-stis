let currentSegment = 1;
let currentQuestion = 0;
let correctAnswers = [];
let incorrectAnswers = [];
let timer;
let name;

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('start-button').addEventListener('click', startTest);
    document.getElementById('retry-button').addEventListener('click', retry);

    document.addEventListener('keydown', (event) => {
        if (document.getElementById('test-screen').style.display === 'block') {
            if (event.key === '0' || event.key === '1') {
                answer(parseInt(event.key));
            }
        }
    });
});

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
    correctAnswers[currentSegment] = 0;
    incorrectAnswers[currentSegment] = 0;
    generateQuestion();
    document.getElementById('segment').innerText = `Bagian ${currentSegment}`;
    document.getElementById('timer').innerText = `Sisa waktu: 60 detik`;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let time = parseInt(document.getElementById('timer').innerText.split(' ')[2]);
    if (time === 0) {
        clearInterval(timer);
        currentSegment++;
        if (currentSegment > 15) {
            showResults();
        } else {
            startSegment();
        }
    } else {
        document.getElementById('timer').innerText = `Sisa waktu: ${time - 1} detik`;
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
        correctAnswers[currentSegment]++;
    } else {
        incorrectAnswers[currentSegment]++;
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

function skipTest() {
    clearInterval(timer);
    showResults();
}

function showResults() {
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';

    document.getElementById('name-display').innerText = `Nama: ${name}`;

    const results = document.getElementById('results');
    results.innerHTML = '';

    for (let i = 1; i <= 15; i++) {
        const correct = correctAnswers[i] || 0;
        const incorrect = incorrectAnswers[i] || 0;
        const total = correct + incorrect;
        const accuracy = total === 0 ? 0 : (correct / total * 100).toFixed(2);

        results.innerHTML += `
            <tr>
                <td>Bagian ${i}</td>
                <td>${correct}</td>
                <td>${incorrect}</td>
                <td>${accuracy}%</td>
            </tr>
        `;
    }
}

function retry() {
    currentSegment = 1;
    correctAnswers = [];
    incorrectAnswers = [];
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

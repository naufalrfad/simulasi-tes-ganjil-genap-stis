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
    correctAnswers[currentSegment] = 0;
    incorrectAnswers[currentSegment] = 0;
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

function showResults() {
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    const ctx = document.getElementById('resultChart').getContext('2d');
    const labels = [];
    const dataCorrect = [];
    const dataIncorrect = [];

    for (let i = 1; i <= 15; i++) {
        labels.push(`Segmen ${i}`);
        dataCorrect.push(correctAnswers[i]);
        dataIncorrect.push(incorrectAnswers[i]);
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Benar',
                    data: dataCorrect,
                    backgroundColor: 'blue'
                },
                {
                    label: 'Salah',
                    data: dataIncorrect,
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
    incorrectAnswers = [];
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

document.addEventListener('keydown', (event) => {
    if (document.getElementById('test-screen').style.display === 'block') {
        if (event.key === '0' || event.key === '1') {
            answer(parseInt(event.key));
        }
    }
});

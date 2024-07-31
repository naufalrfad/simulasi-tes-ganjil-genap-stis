document.getElementById('start-button').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    if (name) {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('test-screen').style.display = 'block';
        startTest(name);
    } else {
        alert('Masukkan nama lengkap!');
    }
});

let testData = [];
let currentSegment = 1;
const maxSegments = 15;
let segmentData = {};
let timerInterval;
let timeLeft = 60;

function startTest(name) {
    if (!segmentData[currentSegment]) {
        segmentData[currentSegment] = { correct: 0, incorrect: 0 };
    }
    testData = Array.from({ length: 10 }, generateQuestion);
    displayQuestion();
    startTimer();
}

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const isEven = (num1 + num2) % 2 === 0;
    return {
        question: `${num1} + ${num2}`,
        answer: isEven ? 0 : 1
    };
}

function displayQuestion() {
    if (testData.length > 0) {
        const currentQuestion = testData[0];
        document.getElementById('question').innerText = currentQuestion.question;
    }
}

function answer(answer) {
    const currentQuestion = testData[0];
    if (currentQuestion) {
        if (answer === currentQuestion.answer) {
            segmentData[currentSegment].correct++;
        } else {
            segmentData[currentSegment].incorrect++;
        }
        testData.shift();
        if (testData.length === 0) {
            clearInterval(timerInterval);
            nextSegment();
        } else {
            displayQuestion();
        }
    }
}

function startTimer() {
    timeLeft = 60;
    document.getElementById('timer').innerText = `Sisa waktu: ${timeLeft} detik`;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Sisa waktu: ${timeLeft} detik`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextSegment();
        }
    }, 1000);
}

function nextSegment() {
    clearInterval(timerInterval);
    timeLeft = 60;
    document.getElementById('timer').innerText = `Sisa waktu: ${timeLeft} detik`;

    if (currentSegment < maxSegments) {
        currentSegment++;
        document.getElementById('segment').innerText = `Bagian ${currentSegment}`;
        document.getElementById('test-screen').style.display = 'none';
        document.getElementById('test-screen').style.display = 'block';
        startTest(); // Restart test data for the new segment
    } else {
        skipTest();
    }
}

function skipTest() {
    clearInterval(timerInterval);
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    showResults();
}

function showResults() {
    const results = [];
    for (let i = 1; i <= maxSegments; i++) {
        if (segmentData[i]) {
            results.push({
                segment: i,
                correct: segmentData[i].correct,
                incorrect: segmentData[i].incorrect,
                accuracy: ((segmentData[i].correct / (segmentData[i].correct + segmentData[i].incorrect)) * 100).toFixed(1) + '%'
            });
        }
    }

    let resultsTable = '';
    results.forEach(result => {
        resultsTable += `
            <tr>
                <td>Bagian ${result.segment}</td>
                <td>${result.correct}</td>
                <td>${result.incorrect}</td>
                <td>${result.accuracy}</td>
            </tr>
        `;
    });

    document.getElementById('results').innerHTML = resultsTable;
    document.getElementById('name

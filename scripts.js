// Initialize test
document.getElementById('start-button').addEventListener('click', function() {
    var name = document.getElementById('name').value;
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
let maxSegments = 15;
let segmentData = {
    correct: 0,
    incorrect: 0
};

function startTest(name) {
    // Initialize variables for the test
    segmentData = { correct: 0, incorrect: 0 };
    testData = Array.from({ length: 100 }, (_, i) => generateQuestion());
    displayQuestion();
    // Start timer
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
        const currentQuestion = testData.shift();
        document.getElementById('question').innerText = currentQuestion.question;
    }
}

function answer(answer) {
    const currentQuestion = testData[0];
    if (currentQuestion) {
        if (answer === currentQuestion.answer) {
            segmentData.correct++;
        } else {
            segmentData.incorrect++;
        }
        testData.shift();
        displayQuestion();
    }
}

function startTimer() {
    let timeLeft = 60;
    const timerElement = document.getElementById('timer');
    const interval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Sisa waktu: ${timeLeft} detik`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            nextSegment();
        }
    }, 1000);
}

function nextSegment() {
    if (currentSegment < maxSegments) {
        currentSegment++;
        document.getElementById('segment').innerText = `Bagian ${currentSegment}`;
        document.getElementById('test-screen').style.display = 'none';
        document.getElementById('test-screen').style.display = 'block';
        // Restart test for new segment
        startTest();
    } else {
        skipTest();
    }
}

function skipTest() {
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    showResults();
}

function showResults() {
    const results = [];
    for (let i = 1; i <= maxSegments; i++) {
        results.push({
            segment: i,
            correct: segmentData.correct,
            incorrect: segmentData.incorrect,
            accuracy: ((segmentData.correct / (segmentData.correct + segmentData.incorrect)) * 100).toFixed(1) + '%'
        });
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
    document.getElementById('name-display').innerText = `Nama: ${document.getElementById('name').value}`;
}

function retryTest() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

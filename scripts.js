let currentSection = 1;
let timerInterval;
let totalSections = 15;
let answers = []; // Array to store answers for each section

document.getElementById('start-test').addEventListener('click', startTest);
document.getElementById('next-section').addEventListener('click', nextSection);
document.getElementById('finish-test').addEventListener('click', finishTest);
document.getElementById('retry-test').addEventListener('click', retryTest);

function startTest() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('test-screen').classList.remove('hidden');
    startSection(currentSection);
}

function startSection(section) {
    document.getElementById('next-section').classList.add('hidden');
    document.getElementById('finish-test').classList.add('hidden');
    document.getElementById('timer').textContent = 'Sisa waktu: 60 detik';

    // Reset the timer and disable previous timer
    clearInterval(timerInterval);
    let timeLeft = 60;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Sisa waktu: ${timeLeft} detik`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextSection();
        }
    }, 1000);

    loadQuestion(section);
}

function loadQuestion(section) {
    // Example question loader
    // Replace this with your actual question loading logic
    document.getElementById('question').textContent = `Contoh soal ${section}`;
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });
    document.addEventListener('keydown', handleKeyboardInput);
}

function handleAnswer(event) {
    // Handle answer click
    const answer = event.target.getAttribute('data-answer');
    recordAnswer(answer);
    nextSection();
}

function handleKeyboardInput(event) {
    // Handle keyboard input for answers
    if (event.key === '0' || event.key === '1') {
        recordAnswer(event.key);
        nextSection();
    }
}

function recordAnswer(answer) {
    // Record the answer
    answers[currentSection - 1] = answer;
}

function nextSection() {
    clearInterval(timerInterval);
    if (currentSection < totalSections) {
        currentSection++;
        startSection(currentSection);
    } else {
        finishTest();
    }
}

function finishTest() {
    document.getElementById('test-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    showResults();
}

function showResults() {
    const resultTableBody = document.querySelector('#result-table tbody');
    resultTableBody.innerHTML = ''; // Clear previous results

    for (let i = 1; i <= totalSections; i++) {
        // Replace with actual result data
        const correctAnswers = 0; // Placeholder
        const wrongAnswers = 0;   // Placeholder
        const accuracy = 0;       // Placeholder
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Bagian ${i}</td>
            <td>${correctAnswers}</td>
            <td>${wrongAnswers}</td>
            <td>${accuracy}%</td>
        `;
        resultTableBody.appendChild(row);
    }
}

function retryTest() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    currentSection = 1;
    clearInterval(timerInterval);
    answers = []; // Clear answers
}

let currentSection = 1;
let timerInterval;
const totalSections = 5; // Adjust to the number of sections you have
const answers = []; // Array to store answers for each section
const correctAnswers = [/* Correct answers for each section */];

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
    // Hide next section button and finish test button
    document.getElementById('next-section').classList.add('hidden');
    document.getElementById('finish-test').classList.add('hidden');
    
    // Reset and start timer
    clearInterval(timerInterval);
    let timeLeft = 60;
    document.getElementById('timer').textContent = `Sisa waktu: ${timeLeft} detik`;

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
    // Example question loader - Replace this with your actual question logic
    document.getElementById('question').textContent = `Contoh soal ${section}`;
    
    // Make answer buttons functional
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });
    document.addEventListener('keydown', handleKeyboardInput);
}

function handleAnswer(event) {
    const answer = event.target.getAttribute('data-answer');
    recordAnswer(answer);
    nextSection();
}

function handleKeyboardInput(event) {
    if (event.key === '0' || event.key === '1') {
        recordAnswer(event.key);
        nextSection();
    }
}

function recordAnswer(answer) {
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
        const sectionIndex = i - 1;
        const correct = (answers[sectionIndex] == correctAnswers[sectionIndex]) ? 1 : 0;
        const wrong = (answers[sectionIndex] == correctAnswers[sectionIndex]) ? 0 : 1;
        const accuracy = (correct / (correct + wrong)) * 100 || 0;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Bagian ${i}</td>
            <td>${correct}</td>
            <td>${wrong}</td>
            <td>${accuracy.toFixed(2)}%</td>
        `;
        resultTableBody.appendChild(row);
    }
}

function retryTest() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    currentSection = 1;
    clearInterval(timerInterval);
    answers.length = 0; // Clear answers
}

let currentSection = 1;
let timerInterval;
let totalSections = 15;

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

    // Reset the timer
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
    // Implement function to load and display a question based on the section
    // Ensure this function enables answer buttons and handles keyboard input
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
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Bagian ${i}</td>
            <td>Benar: 0</td>
            <td>Salah: 0</td>
            <td>Akurasi: 0%</td>
        `;
        resultTableBody.appendChild(row);
    }
}

function retryTest() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    currentSection = 1;
    clearInterval(timerInterval);
}

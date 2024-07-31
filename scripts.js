let currentSection = 1;
let timer;
const sectionsCount = 50;
const sectionElement = document.getElementById('section');
const questionElement = document.getElementById('question');
const timerElement = document.getElementById('timer');
const answer0Button = document.getElementById('answer0');
const answer1Button = document.getElementById('answer1');
const nextSectionButton = document.getElementById('nextSectionButton');
const finishEarlyButton = document.getElementById('finishEarly');
const warningElement = document.getElementById('warning');
const resultsSection = document.getElementById('resultsSection');
const retryButton = document.getElementById('retryButton');
const resultsTableBody = document.querySelector('#resultsTable tbody');

function startTimer() {
    clearInterval(timer);  // Hentikan timer yang sebelumnya berjalan
    let timeLeft = 60;
    timerElement.textContent = `Sisa waktu: ${timeLeft} detik`;
    timer = setInterval(function () {
        timeLeft--;
        timerElement.textContent = `Sisa waktu: ${timeLeft} detik`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            goToNextSection();
        }
    }, 1000);
}

function goToNextSection() {
    clearInterval(timer);  // Hentikan timer saat berpindah bagian
    currentSection++;
    if (currentSection <= sectionsCount) {
        currentQuestion = 0;
        startTimer();
        generateQuestion();
        document.getElementById('section').textContent = `Bagian ${currentSection}`;
    } else {
        showResults();
    }
}

function generateQuestion() {
    // Implementasi fungsi generateQuestion sesuai kebutuhan
}

function showResults() {
    resultsSection.style.display = 'block';
    document.getElementById('testSection').style.display = 'none';
    // Implementasi fungsi showResults untuk menampilkan hasil
}

document.getElementById('startTest').addEventListener('click', function () {
    document.getElementById('startSection').style.display = 'none';
    document.getElementById('testSection').style.display = 'block';
    document.getElementById('section').textContent = `Bagian ${currentSection}`;
    startTimer();
});

answer0Button.addEventListener('click', function () {
    // Implementasi logika untuk jawaban 0
    goToNextSection();
});

answer1Button.addEventListener('click', function () {
    // Implementasi logika untuk jawaban 1
    goToNextSection();
});

nextSectionButton.addEventListener('click', function () {
    clearInterval(timer);  // Hentikan timer saat berpindah bagian
    goToNextSection();
});

finishEarlyButton.addEventListener('click', function () {
    clearInterval(timer);  // Hentikan timer saat mengakhiri tes
    showResults();
});

retryButton.addEventListener('click', function () {
    location.reload();  // Reload halaman untuk memulai tes lagi
});

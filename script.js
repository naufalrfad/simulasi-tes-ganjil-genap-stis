document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const testSection = document.getElementById('test-section');
    const introSection = document.getElementById('intro');
    const resultSection = document.getElementById('result-section');
    const nameInput = document.getElementById('name');
    const timerDisplay = document.getElementById('timer');
    const questionDisplay = document.getElementById('question');
    const segmentTitle = document.getElementById('segment-title');
    const options = document.querySelectorAll('.option');
    const skipButton = document.getElementById('skip');
    const nextButton = document.getElementById('next');
    const retryButton = document.getElementById('retry');
    const resultNameDisplay = document.getElementById('result-name');
    const resultTableBody = document.querySelector('#result-table tbody');

    let currentSegment = 1;
    let timer;
    let questionsAnswered = 0;
    let correctAnswers = 0;
    let results = [];

    function startTest() {
        introSection.classList.add('hidden');
        testSection.classList.remove('hidden');
        startSegment();
    }

    function startSegment() {
        segmentTitle.textContent = `Bagian ${currentSegment}`;
        questionsAnswered = 0;
        correctAnswers = 0;
        startTimer();
        generateQuestion();
    }

    function startTimer() {
        let timeLeft = 60;
        timerDisplay.textContent = `Sisa waktu: ${timeLeft} detik`;
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Sisa waktu: ${timeLeft} detik`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endSegment();
            }
        }, 1000);
    }

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const answer = (num1 + num2) % 2 === 0 ? 0 : 1;
        questionDisplay.textContent = `${num1} + ${num2} = ?`;

        options.forEach(option => {
            option.onclick = () => {
                checkAnswer(parseInt(option.getAttribute('data-value')), answer);
            };
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === '0' || e.key === '1') {
                checkAnswer(parseInt(e.key), answer);
            }
        });
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        if (selectedAnswer === correctAnswer) {
            correctAnswers++;
        }
        questionsAnswered++;
        generateQuestion();
    }

    function endSegment() {
        results.push({ segment: currentSegment, correct: correctAnswers, total: questionsAnswered });
        if (currentSegment < 15) {
            currentSegment++;
            testSection.classList.add('hidden');
            nextButton.onclick = () => {
                testSection.classList.remove('hidden');
                startSegment();
            };
        } else {
            showResults();
        }
    }

    function showResults() {
        resultNameDisplay.textContent = nameInput.value;
        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.segment}</td>
                <td>${result.correct}</td>
                <td>${result.total - result.correct}</td>
            `;
            resultTableBody.appendChild(row);
        });
        testSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }

    function retryTest() {
        resultSection.classList.add('hidden');
        introSection.classList.remove('hidden');
        nameInput.value = '';
        currentSegment = 1;
        results = [];
    }

    startButton.addEventListener('click', startTest);
    skipButton.addEventListener('click', showResults);
    retryButton.addEventListener('click', retryTest);
});

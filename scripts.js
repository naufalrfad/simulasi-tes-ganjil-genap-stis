document.addEventListener("DOMContentLoaded", function() {
    let currentSection = 1;
    let totalSections = 15;
    let sectionData = [];
    let timerInterval;
    let totalTime = 60;
    
    function startTimer() {
        let timeLeft = totalTime;
        document.getElementById("timer").innerText = `Sisa waktu: ${timeLeft} detik`;
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").innerText = `Sisa waktu: ${timeLeft} detik`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                goToNextSection();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function showResults() {
        const resultsTableBody = document.querySelector("#results-table tbody");
        resultsTableBody.innerHTML = "";

        sectionData.forEach((section, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>Bagian ${index + 1}</td>
                <td>${section.correct}</td>
                <td>${section.incorrect}</td>
                <td>${section.accuracy.toFixed(2)}%</td>
            `;
            resultsTableBody.appendChild(row);
        });

        document.getElementById("result-screen").classList.remove("hidden");
        document.getElementById("test-screen").classList.add("hidden");
    }

    function goToNextSection() {
        stopTimer();
        recordResults();
        currentSection++;
        if (currentSection <= totalSections) {
            document.getElementById("test-screen").classList.remove("hidden");
            document.getElementById("start-screen").classList.add("hidden");
            document.getElementById("result-screen").classList.add("hidden");
            startTimer();
            loadQuestion();
        } else {
            showResults();
        }
    }

    function recordResults() {
        const correct = parseInt(document.getElementById("question").dataset.correct) || 0;
        const incorrect = parseInt(document.getElementById("question").dataset.incorrect) || 0;
        const total = correct + incorrect;
        const accuracy = total ? (correct / total) * 100 : 0;

        sectionData.push({ correct, incorrect, accuracy });
    }

    function loadQuestion() {
        // Logic for generating and displaying a new question.
        // For now, just a placeholder question.
        document.getElementById("question").innerText = `Soal ${currentSection}`;
        document.getElementById("question").dataset.correct = Math.floor(Math.random() * 10);
        document.getElementById("question").dataset.incorrect = Math.floor(Math.random() * 10);
    }

    document.getElementById("start-test").addEventListener("click", function() {
        document.getElementById("start-screen").classList.add("hidden");
        document.getElementById("test-screen").classList.remove("hidden");
        startTimer();
        loadQuestion();
    });

    document.getElementById("next-section").addEventListener("click", goToNextSection);

    document.getElementById("skip-test").addEventListener("click", function() {
        stopTimer();
        recordResults();
        showResults();
    });

    document.getElementById("retry-test").addEventListener("click", function() {
        location.reload();
    });

    document.querySelectorAll("#answers .answer").forEach(button => {
        button.addEventListener("click", function() {
            const isCorrect = this.dataset.answer === document.getElementById("question").dataset.correct.toString();
            recordResults();
            goToNextSection();
        });
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === '0' || event.key === '1') {
            const isCorrect = event.key === document.getElementById("question").dataset.correct.toString();
            recordResults();
            goToNextSection();
        }
    });
});

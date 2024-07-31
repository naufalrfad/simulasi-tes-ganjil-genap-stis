body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#start-screen, #test-screen, #result-screen {
    text-align: center;
    width: 100%;
    max-width: 1200px; /* Ensure a maximum width for readability */
}

#start-button-container {
    margin-top: 10px;
    text-align: center;
}

#start-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 24px;
    cursor: pointer;
}

#header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}

#timer {
    font-size: 24px;
    margin-top: 10px;
}

#segment {
    font-size: 24px;
}

#question-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    margin-bottom: 20px;
}

#question {
    font-size: 32px;
}

#answers {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
}

button {
    font-size: 24px;
    padding: 10px 20px;
}

#skip-button, #next-segment-button {
    margin-top: 20px;
}

#warning {
    font-size: 14px;
    color: red;
    margin-top: 10px;
    text-align: right;
    margin-right: 20px;
}

#result-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
}

#results-container {
    width: 100%;
    max-width: 1000px; /* Max width to prevent overflow */
    overflow-x: auto; /* Allow horizontal scrolling if needed */
    padding: 10px; /* Add some padding */
    box-sizing: border-box;
}

#results-table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
}

#results-table th, #results-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    box-sizing: border-box;
}

#results-table th {
    background-color: #f2f2f2;
}

#results-table td:first-child {
    width: 250px; /* Increased width for 'Bagian' column */
}

#retry-button {
    margin-top: 20px;
}

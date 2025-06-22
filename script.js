// *******************************
// Quiz Application Script
// *******************************

// Example question set (could be expanded or loaded from an external source)
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which HTML tag is used for a line break?",
        options: ["<br>", "<lb>", "<break>", "<ln>"],
        answer: "<br>"
    }
    // More questions can be added here
];

// Keep track of current state
let currentQuestionIndex = 0;
let score = 0;
let username = "";

// Grab references to DOM elements
const loginScreen = document.getElementById("login-screen");
const quizScreen = document.getElementById("quiz-screen");
const usernameInput = document.getElementById("usernameInput");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const welcomeMessage = document.getElementById("welcomeMessage");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const nextButton = document.getElementById("nextButton");

// When the page loads, check for existing login
document.addEventListener('DOMContentLoaded', () => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
        // If a username is stored, skip login
        username = storedUser;
        startQuiz();
    } else {
        // Show login screen if not logged in
        loginScreen.style.display = "block";
        quizScreen.style.display = "none";
    }
});

// Event listener for login button
loginButton.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    if (name !== "") {
        username = name;
        // Store username in localStorage (no expiration)
        localStorage.setItem('username', username);
        startQuiz();
    }
});

// Event listener for logout button
logoutButton.addEventListener('click', () => {
    // Clear stored username and reload the page to show login
    localStorage.removeItem('username');
    location.reload();
});

// Initialize the quiz UI after login
function startQuiz() {
    loginScreen.style.display = "none";
    quizScreen.style.display = "block";
    welcomeMessage.textContent = `Welcome, ${username}!`;
    logoutButton.style.display = "inline-block";
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    showQuestion();
}

// Display the current question and its answer options
function showQuestion() {
    // Clear previous feedback and options
    feedbackEl.textContent = "";
    nextButton.style.display = "none";
    optionsEl.innerHTML = "";

    // If no more questions, end the quiz
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    // Get current question object
    const currentQ = questions[currentQuestionIndex];
    questionEl.textContent = currentQ.question;

    // Create a button for each answer option
    currentQ.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener('click', selectAnswer);
        optionsEl.appendChild(btn);
    });
}

// Handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const selectedAnswer = selectedBtn.textContent;
    const correctAnswer = questions[currentQuestionIndex].answer;

    // Disable all option buttons after an answer is chosen
    Array.from(optionsEl.children).forEach(button => {
        button.disabled = true;
    });

    // Check the answer and give feedback
    if (selectedAnswer === correctAnswer) {
        selectedBtn.classList.add("correct");
        feedbackEl.textContent = "Correct!";
        score++;
        scoreEl.textContent = score;
    } else {
        selectedBtn.classList.add("wrong");
        feedbackEl.textContent = `Wrong! The correct answer is "${correctAnswer}".`;
    }

    // Show the next button after answering
    nextButton.style.display = "inline-block";
}

// Move to the next question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

// Called when all questions have been answered
function endQuiz() {
    // Hide quiz elements
    questionEl.textContent = "";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = `Quiz completed! Final score: ${score} out of ${questions.length}.`;
    nextButton.style.display = "none";
    // Optionally, reset or allow restart here
}

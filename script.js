const questions = [
    {
        question: "He is very weak to lift the heavy box.",
        answers: [
            { text: "very weak for", correct: false },
            { text: "so weak to", correct: false },
            { text: "too weak to", correct: true },
            { text: "too weak for", correct: false },
        ]
    },
    {
        question: "The company has already _________ the new policy.",
        answers: [
            { text: "implemented", correct: true },
            { text: "imagining", correct: false },
            { text: "suggesting", correct: false },
            { text: "considering", correct: false },
        ]
    },
    {
        question: "The company is planning to ___________ a new product line next year.",
        answers: [
            { text: "evalute", correct: false },
            { text: "discontinue", correct: false },
            { text: "launch", correct: true },
            { text: "maintain", correct: false },
        ]
    }, {
        question: " The manager is expected to scrutinize the new policy, but he seems to be unwilling to give it a thorough assessment.",
        answers: [
            { text: "implement", correct: false },
            { text: "endorse", correct: false },
            { text: "disregard", correct: false },
            { text: "assess", correct: true },
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function StartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
} 


function selectanswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
     handleNextButton();
    }else{
        StartQuiz();
    }
})
StartQuiz();
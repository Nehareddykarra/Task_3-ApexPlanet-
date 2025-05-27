const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");

let correctAnswer = "";

async function fetchProgrammingQuestion() {
  questionDiv.innerText = "Loading...";
  answersDiv.innerHTML = "";
  const response = await fetch("https://quizapi.io/api/v1/questions?category=code&limit=1", {
    headers: {
      "X-Api-Key": "dBK2PJCnvq1bsEiZijhcBbXiZlJDnVJOIdk7qkLa"  // Replace this with your actual key
    }
  });

  const data = await response.json();
  if (!data.length) {
    questionDiv.innerText = "No questions found.";
    return;
  }

  const question = data[0];
  correctAnswer = question.correct_answers[Object.keys(question.correct_answers).find(k => question.correct_answers[k] === "true")];
  
  questionDiv.innerText = question.question;
  for (let [key, value] of Object.entries(question.answers)) {
    if (!value) continue;
    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.innerText = value;
    btn.addEventListener("click", () => selectAnswer(btn, key));
    answersDiv.appendChild(btn);
  }
}

function selectAnswer(button, selectedKey) {
  const allButtons = document.querySelectorAll(".answer-btn");
  allButtons.forEach(btn => btn.disabled = true);

  const correctKey = Object.keys(correctAnswer)[0];
  if (selectedKey === correctKey) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }
}

nextBtn.addEventListener("click", fetchProgrammingQuestion);


fetchProgrammingQuestion();
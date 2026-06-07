const questions = [
  {
    title: "今日、一番あなたの気持ちに近いのは？",
    lead: "選んだ気持ちを、良い・悪いで分けなくて大丈夫です。",
    options: ["充実した", "嬉しかった", "楽しかった", "モヤモヤした", "疲れた", "悲しかった"],
  },
  {
    title: "今日一番、印象に残っていることは？",
    lead: "心に浮かんだものを、そのまま選んでください。",
    options: ["子どもとの時間", "仕事", "家族", "自分のこと", "特にない"],
  },
  {
    title: "その時の自分の状態に一番近いのは？",
    lead: "今日を過ごしていた自分を、責めずに思い出してみましょう。",
    options: ["気にしないようにした", "考えた", "頑張った", "我慢した", "楽しんだ"],
  },
  {
    title: "その時、本当はどうしてほしかった？",
    lead: "小さな願いも、ここではそのまま選んで大丈夫です。",
    options: ["話を聞いてほしかった", "わかってほしかった", "少し休みたかった", "自分でやりたかった", "一緒にいてほしかった"],
  },
  {
    title: "今の自分に一言かけるなら？",
    lead: "今日の終わりに、そっと手渡したい言葉を選んでください。",
    options: ["ありがとう", "よく頑張った", "大丈夫", "そのままでいい", "また明日"],
  },
];

const answers = [];
let currentQuestionIndex = 0;

const progressBar = document.querySelector("#progress-bar");
const stepLabel = document.querySelector("#step-label");
const questionTitle = document.querySelector("#question-title");
const questionLead = document.querySelector("#question-lead");
const optionsContainer = document.querySelector("#options");
const restartButton = document.querySelector("#restart-button");

function renderIntro() {
  progressBar.style.width = "0";
  stepLabel.textContent = "眠る前の3分";
  questionTitle.textContent = "今日の自分に、そうだったんだねを。";
  questionLead.textContent = "診断も、正解もありません。5つの問いに答えながら、今日ここまで来た自分を少しだけ受け止める時間です。";
  optionsContainer.innerHTML = "";
  restartButton.hidden = true;

  const button = document.createElement("button");
  button.className = "option-button option-button--primary";
  button.type = "button";
  button.textContent = "そっとはじめる";
  button.addEventListener("click", renderQuestion);
  optionsContainer.appendChild(button);
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
  stepLabel.textContent = `質問 ${questionNumber} / ${questions.length}`;
  questionTitle.textContent = question.title;
  questionLead.textContent = question.lead;
  optionsContainer.innerHTML = "";
  restartButton.hidden = true;

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => selectOption(option));
    optionsContainer.appendChild(button);
  });
}

function selectOption(option) {
  answers[currentQuestionIndex] = option;
  currentQuestionIndex += 1;

  if (currentQuestionIndex >= questions.length) {
    renderResult();
    return;
  }

  renderQuestion();
}

function renderResult() {
  progressBar.style.width = "100%";
  stepLabel.textContent = "今日のミラー";
  questionTitle.textContent = "今日も、ここまで来ましたね。";
  questionLead.textContent = "答えてくれたことを、静かに映すだけの仮メッセージです。";
  optionsContainer.innerHTML = `
    <div class="result-card">
      <p>今日は「${answers[0]}」という気持ちがありました。「${answers[1]}」のことも、今夜は急いで意味づけしなくて大丈夫です。</p>
      <p>「${answers[2]}」自分がいて、「${answers[3]}」という願いもありました。どれも、今日を過ごしてきたあなたの一部です。</p>
      <p>最後に「${answers[4]}」を、そっと自分へ。もう十分です。あとは少し力を抜いて、今日は休みましょう。</p>
    </div>
  `;
  restartButton.hidden = false;
}

restartButton.addEventListener("click", () => {
  answers.length = 0;
  currentQuestionIndex = 0;
  renderIntro();
});

renderIntro();

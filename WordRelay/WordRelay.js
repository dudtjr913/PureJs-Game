const makeScreen = () => {
  const title = document.createElement("div");
  const wordTitle = document.createElement("span");
  const firstWord = document.createElement("span");
  const form = document.createElement("form");
  const userInput = document.createElement("input");
  const life = document.createElement("div");
  title.innerHTML = "<h1>끝말잇기</h1>";
  wordTitle.innerText = "단어 : ";
  firstWord.classList.add("word");
  firstWord.innerText = "프론트엔드";
  userInput.placeholder = "단어를 입력해주세요.";
  userInput.type = "text";
  life.innerText = "목숨 : 5";
  document.body.append(title);
  title.append(wordTitle);
  title.append(firstWord);
  document.body.append(form);
  form.append(userInput);
  document.body.append(life);
};

const rightAnswer = () => {
  console.log("정답입니다.");
};

const wrongAnswer = () => {
  console.log("오답입니다.");
};

const handleOnUserInput = (e) => {
  e.preventDefault();
  const userInput = document.querySelector("input");
  const word = document.querySelector(".word");
  word.innerText[word.innerText.length - 1] === userInput.value[0]
    ? rightAnswer()
    : wrongAnswer();
};

const gameStart = () => {
  makeScreen();
  const form = document.querySelector("form");
  form.addEventListener("submit", handleOnUserInput);
};

gameStart();

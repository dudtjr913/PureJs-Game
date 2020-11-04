const makeScreen = () => {
  document.body.firstElementChild &&
    document.body.removeChild(document.body.firstElementChild);
  const title = document.createElement("div");
  const wordTitle = document.createElement("span");
  const firstWord = document.createElement("span");
  const form = document.createElement("form");
  const userInput = document.createElement("input");
  const life = document.createElement("div");
  const answer = document.createElement("div");
  title.innerHTML = "<h1>끝말잇기</h1>";
  wordTitle.innerText = "단어 : ";
  firstWord.classList.add("word");
  firstWord.innerText = "프론트엔드";
  userInput.placeholder = "단어를 입력해주세요.";
  userInput.type = "text";
  life.classList.add("life");
  life.innerText = "목숨 : 5";
  document.body.append(title);
  title.append(wordTitle);
  title.append(firstWord);
  document.body.append(form);
  form.append(userInput);
  document.body.append(life);
  answer.classList.add("answer");
  document.body.append(answer);
};

const cleanScreen = () => {
  while (document.body.firstElementChild) {
    document.body.removeChild(document.body.firstElementChild);
  }
  return gameStart();
};

const rightAnswer = (userInput) => {
  const answer = document.querySelector(".answer");
  answer.innerText = "정답입니다.";
  const word = document.querySelector(".word");
  word.innerText = userInput;
};

const reStart = () => {
  const button = document.createElement("button");
  button.type = "submit";
  button.innerText = "다시하기";
  document.body.append(button);
  button.onclick = cleanScreen;
};

const wrongAnswer = (lifeNumber) => {
  const answer = document.querySelector(".answer");
  const life = document.querySelector(".life");
  if (lifeNumber === 0) {
    const form = document.querySelector("form");
    answer.innerText = "";
    document.body.removeChild(form);
    life.innerText = "탈락하셨습니다.";
    return reStart();
  }
  answer.innerText = "오답입니다.";
  life.innerText = `목숨 : ${lifeNumber}`;
};

const handleOnUserInput = (life) => (e) => {
  e.preventDefault();
  const userInput = document.querySelector("input");
  const word = document.querySelector(".word");
  if (userInput.value.match(/[^가-힣]/g) || userInput.value === "")
    return alert("단어가 아닙니다.");
  word.innerText[word.innerText.length - 1] === userInput.value[0]
    ? rightAnswer(userInput.value)
    : wrongAnswer(--life);
  userInput.value = "";
};

const gameStart = () => {
  makeScreen();
  const life = 5;
  const form = document.querySelector("form");
  form.addEventListener("submit", handleOnUserInput(life));
};

const gameStartButton = () => {
  const button = document.createElement("button");
  button.innerText = "끝말잇기 시작";
  document.body.append(button);
  button.addEventListener("click", gameStart);
};

gameStartButton();

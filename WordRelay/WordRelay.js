const makeScreen = () => {
  const title = document.createElement("div");
  const word = document.createElement("span");
  const firstWord = document.createElement("span");
  const userInput = document.createElement("input");
  const life = document.createElement("div");
  title.innerHTML = "<h1>끝말잇기</h1>";
  word.innerText = "단어 : ";
  firstWord.innerText = "프론트엔드";
  userInput.placeholder = "단어를 입력해주세요.";
  life.innerText = "목숨 : 5";
  document.body.append(title);
  title.append(word);
  title.append(firstWord);
  document.body.append(userInput);
  document.body.append(life);
};

makeScreen();

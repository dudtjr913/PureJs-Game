"use strict";
{
  const makeScreen = () => {
    const wordRelayWrapper = document.createElement("section");
    const title = document.createElement("div");
    const wordTitle = document.createElement("span");
    const firstWord = document.createElement("span");
    const form = document.createElement("form");
    const userInput = document.createElement("input");
    const life = document.createElement("div");
    const answer = document.createElement("div");
    wordRelayWrapper.classList.add("wordRelay");
    document.body.append(wordRelayWrapper);
    title.innerHTML = "<h1>끝말잇기</h1>";
    wordTitle.innerText = "단어 : ";
    firstWord.classList.add("word");
    firstWord.innerText = "프론트엔드";
    userInput.placeholder = "단어를 입력해주세요.";
    userInput.type = "text";
    life.classList.add("life");
    life.innerText = "목숨 : 5";
    wordRelayWrapper.append(title);
    title.append(wordTitle);
    title.append(firstWord);
    wordRelayWrapper.append(form);
    form.append(userInput);
    wordRelayWrapper.append(life);
    answer.classList.add("answer");
    wordRelayWrapper.append(answer);
  };

  const finishGame = () => {
    const wordRelayWrapper = document.querySelector(".wordRelay");
    const replayButton = wordRelayWrapper.querySelector("button");
    if (replayButton) {
      // 다시하기를 눌렀을 때
      document.body.removeChild(wordRelayWrapper);
      return gameStart();
    }
    document.body.removeChild(wordRelayWrapper); // 게임종료를 눌렀을 때
    return gameStartButton();
  };

  const rightAnswer = (userInput) => {
    const answer = document.querySelector(".answer");
    answer.innerText = "정답입니다.";
    const word = document.querySelector(".word");
    word.innerText = userInput;
  };

  const reStart = (wordRelayWrapper) => {
    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "다시하기";
    wordRelayWrapper.append(button);
    button.onclick = finishGame;
  };

  const wrongAnswer = (lifeNumber, wordRelayWrapper) => {
    const answer = wordRelayWrapper.querySelector(".answer");
    const life = wordRelayWrapper.querySelector(".life");
    if (lifeNumber === 0) {
      const form = wordRelayWrapper.querySelector("form");
      answer.innerText = "";
      wordRelayWrapper.removeChild(form);
      life.innerText = "탈락하셨습니다.";
      return reStart(wordRelayWrapper);
    }
    answer.innerText = "오답입니다.";
    life.innerText = `목숨 : ${lifeNumber}`;
  };

  const handleOnUserInput = (life, wordRelayWrapper) => (e) => {
    e.preventDefault();
    const userInput = wordRelayWrapper.querySelector("input");
    const word = wordRelayWrapper.querySelector(".word");
    if (userInput.value.match(/[^가-힣]/g) || userInput.value === "")
      return alert("단어가 아닙니다.");
    word.innerText[word.innerText.length - 1] === userInput.value[0]
      ? rightAnswer(userInput.value)
      : wrongAnswer(--life, wordRelayWrapper);
    userInput.value = "";
  };

  const gameStart = () => {
    gameFinishButton();
    makeScreen();
    const wordRelayWrapper = document.querySelector(".wordRelay");
    const life = 5;
    const form = wordRelayWrapper.querySelector("form");
    form.addEventListener("submit", handleOnUserInput(life, wordRelayWrapper));
  };

  const gameStartButton = () => {
    let button = document.querySelector(".wordRelay-btn");
    if (!button) {
      button = document.createElement("button");
      button.classList.add("wordRelay-btn");
      document.body.append(button);
    }
    button.innerText = "끝말잇기 시작";
    button.removeEventListener("click", finishGame);
    button.addEventListener("click", gameStart);
  };

  const gameFinishButton = () => {
    const button = document.querySelector(".wordRelay-btn");
    button.innerText = "끝말잇기 종료";
    button.removeEventListener("click", gameStart);
    button.addEventListener("click", finishGame);
  };

  gameStartButton();
}

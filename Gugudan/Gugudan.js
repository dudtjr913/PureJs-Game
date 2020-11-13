"use strict";
{
  let timeInterval = null;

  const makeScreen = () => {
    const gugudanWrapper = document.createElement("section");
    const title = document.createElement("h1");
    const multipleDiv = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const life = document.createElement("div");
    const answer = document.createElement("div");
    const timeDiv = document.createElement("div");

    gugudanWrapper.classList.add("gugudan");
    document.body.append(gugudanWrapper);
    title.innerText = "구구단";
    multipleDiv.innerText = `${Math.ceil(Math.random() * 19)} X ${Math.ceil(Math.random() * 19)}`;
    multipleDiv.classList.add("multiple");
    input.placeholder = "정답을 입력해주세요.";
    input.type = "number";
    life.innerText = "목숨 : 5";
    life.classList.add("life");
    answer.classList.add("answer");
    gugudanWrapper.append(title);
    gugudanWrapper.append(multipleDiv);
    gugudanWrapper.append(form);
    form.append(input);
    gugudanWrapper.append(life);
    gugudanWrapper.append(answer);
    timeDiv.classList.add("time");
    timeDiv.innerText = "남은시간 : 5초";
    gugudanWrapper.append(timeDiv);
  };

  const gameFinish = () => {
    const gugudanWrapper = document.querySelector(".gugudan");
    const replayButton = gugudanWrapper.querySelector("button");
    if (replayButton) {
      document.body.removeChild(gugudanWrapper);
      return gameStart();
    }
    document.body.removeChild(gugudanWrapper);
    return gameStartButton();
  };

  const reStart = (gugudanWrapper) => {
    const form = gugudanWrapper.querySelector("form");
    const reStartButton = document.createElement("button");
    reStartButton.innerText = "다시하기";
    gugudanWrapper.removeChild(form);
    gugudanWrapper.append(reStartButton);
    reStartButton.addEventListener("click", gameFinish);
  };

  const rightAnswer = (gugudanWrapper) => {
    const multipleDiv = gugudanWrapper.querySelector(".multiple");
    const answer = gugudanWrapper.querySelector(".answer");
    answer.innerText = "정답입니다.";
    multipleDiv.innerText = `${Math.ceil(Math.random() * 19)} X ${Math.ceil(Math.random() * 19)}`;
  };

  const wrongAnswer = (lifeNumber, gugudanWrapper) => () => {
    const time = gugudanWrapper.querySelector(".time");
    const life = gugudanWrapper.querySelector(".life");
    life.innerText = `목숨 : ${--lifeNumber}`;
    const answer = gugudanWrapper.querySelector(".answer");
    answer.innerText = "오답입니다 목숨이 1 감소합니다.";
    if (lifeNumber === 0) {
      gugudanWrapper.removeChild(time);
      clearInterval(timeInterval);
      return reStart(gugudanWrapper);
    }
  };

  const convertAnswer = (gugudanWrapper) => {
    const multipleDiv = gugudanWrapper.querySelector(".multiple");
    const multipleNumber = multipleDiv.innerText;
    const X = multipleNumber.indexOf("X");
    return multipleNumber.slice(0, X - 1) * multipleNumber.slice(X + 2);
  };

  const handleOnTime = (time, gugudanWrapper, wrong) => () => {
    const timeDiv = gugudanWrapper.querySelector(".time");
    timeDiv.innerText = `남은시간 : ${--time}초`;
    if (time === 0) {
      time = 5;
      return wrong();
    }
  };

  const handleOnUserInput = (wrong, gugudanWrapper, time) => {
    return (e) => {
      e.preventDefault();
      clearInterval(timeInterval);
      time = 5;
      timeInterval = setInterval(handleOnTime(time, gugudanWrapper, wrong), 1000);
      const input = gugudanWrapper.querySelector("input");
      const answer = convertAnswer(gugudanWrapper);
      parseInt(input.value, 10) === answer ? rightAnswer(gugudanWrapper) : wrong();
      input.value = "";
    };
  };

  const gameStart = () => {
    gameFinishButton();
    makeScreen();
    const gugudanWrapper = document.body.querySelector(".gugudan");
    const life = 5;
    const time = 5;
    const form = gugudanWrapper.querySelector("form");
    const wrong = wrongAnswer(life, gugudanWrapper); // 시간초과 됐을 때
    timeInterval = setInterval(handleOnTime(time, gugudanWrapper, wrong), 1000);
    form.addEventListener("submit", handleOnUserInput(wrong, gugudanWrapper, time, timeInterval));
  };

  const gameStartButton = () => {
    let button = document.querySelector(".gugudan-btn");
    if (!button) {
      button = document.createElement("button");
      button.classList.add("gugudan-btn");
      document.body.append(button);
    }
    button.innerText = "구구단 시작";
    button.removeEventListener("click", gameFinish);
    button.addEventListener("click", gameStart);
  };

  const gameFinishButton = () => {
    const button = document.querySelector(".gugudan-btn");
    button.innerText = "구구단 종료";
    button.removeEventListener("click", gameStart);
    button.addEventListener("click", gameFinish);
  };

  gameStartButton();
}

"use strict";
{
  const makeScreen = () => {
    gameFinishButton();

    const rapidWrapper = document.createElement("section");
    const rapidDiv = document.createElement("div");
    const resultSpan = document.createElement("span");

    rapidWrapper.classList.add("rapid");
    rapidDiv.innerText = "클릭하면 시작!";
    rapidDiv.classList.add("wait");

    rapidWrapper.appendChild(rapidDiv);
    rapidWrapper.appendChild(resultSpan);
    document.body.appendChild(rapidWrapper);

    gameStart(rapidDiv);
  };

  const clearScreen = () => {
    const rapidWrapper = document.querySelector(".rapid");

    document.body.removeChild(rapidWrapper);
    gameStartButton();
  };

  const reStart = (hurry) => {
    const rapidWrapper = document.querySelector(".rapid");
    const rapidDiv = rapidWrapper.querySelector("div");
    if (hurry) {
      clearTimeout(hurry);
      const resultSpan = rapidWrapper.querySelector("span");
      resultSpan.innerText = "너무 성급했습니다. 화면이 완전히 바뀌면 클릭하세요!";
    }

    if (rapidDiv.className === "going") {
      rapidDiv.classList.replace("going", "wait");
    } else if (rapidDiv.className === "start") {
      rapidDiv.classList.replace("start", "wait");
    }
    rapidDiv.innerText = "클릭하면 시작!";
  };

  const gameStart = (rapidDiv) => {
    let startTime = null;
    let hurry = null;
    const average = [];
    rapidDiv.addEventListener("click", () => {
      if (rapidDiv.className === "wait") {
        rapidDiv.classList.replace("wait", "start");
        const time = Math.ceil(Math.random() * 5) * 1000;
        rapidDiv.innerText = "기다리십시오.";
        hurry = setTimeout(() => {
          rapidTestOnStart(rapidDiv);
          startTime = new Date().getTime();
        }, time);
      } else if (!startTime) {
        reStart(hurry);
      } else if (rapidDiv.className === "going") {
        gameFinish(startTime, average);
        startTime = null;
        console.log(average);
      }
    });
  };

  const gameFinish = (startTime, average) => {
    const finishTime = new Date().getTime();

    const rapidWrapper = document.querySelector(".rapid");
    const resultSpan = rapidWrapper.querySelector("span");

    const rapidTime = (finishTime - startTime) / 1000;
    average.push(rapidTime);
    const averageTime = average.reduce((pre, cur) => pre + cur) / average.length;

    resultSpan.innerText = `현재${rapidTime.toFixed(3)}초 / 평균${averageTime.toFixed(3)}초 / 총${
      average.length
    }번 시도`;

    reStart();
  };

  const rapidTestOnStart = (rapidDiv) => {
    rapidDiv.classList.replace("start", "going");
    rapidDiv.innerText = "클릭하세요!!!!!";
  };

  const gameStartButton = () => {
    let button = document.querySelector(".rapid-btn");
    if (!button) {
      button = document.createElement("button");
      button.classList.add("rapid-btn");
      document.body.appendChild(button);
    }
    button.innerText = "반응속도 테스트 시작";
    button.removeEventListener("click", clearScreen);
    button.addEventListener("click", makeScreen);
  };

  const gameFinishButton = () => {
    const button = document.querySelector(".rapid-btn");
    button.innerText = "반응속도 테스트 종료";
    button.removeEventListener("click", makeScreen);
    button.addEventListener("click", clearScreen);
  };

  gameStartButton();
}

"use strict";
{
  const makeScreen = () => {
    const rapidWrapper = document.createElement("section");
    const rapidDiv = document.createElement("div");
    const resultSpan = document.createElement("span");

    rapidWrapper.classList.add("rapid");
    rapidDiv.innerText = "클릭하면 시작!";
    rapidDiv.classList.add("wait");

    rapidWrapper.appendChild(rapidDiv);
    rapidWrapper.appendChild(resultSpan);
    document.body.appendChild(rapidWrapper);

    rapidDiv.addEventListener("click", gameStart, {
      once: true,
    });
  };

  const reStart = () => {
    const rapidWrapper = document.querySelector(".rapid");
    const rapidDiv = rapidWrapper.querySelector("div");

    if (rapidDiv.className === "going") {
      rapidDiv.classList.replace("going", "wait");
    } else if (rapidDiv.className === "start") {
      rapidDiv.classList.replace("start", "wait");
    }
    rapidDiv.innerText = "클릭하면 시작!";

    rapidDiv.addEventListener("click", gameStart, {
      once: true,
    });
  };

  const gameStart = () => {
    const time = Math.ceil(Math.random() * 5) * 1000;

    const rapidWrapper = document.querySelector(".rapid");
    const rapidDiv = rapidWrapper.querySelector("div");

    rapidDiv.classList.replace("wait", "start");
    rapidDiv.innerText = "기다리십시오.";

    setTimeout(rapidTestOnStart, time);
  };

  const gameFinish = (startTime) => {
    const finishTime = new Date().getTime();

    const rapidWrapper = document.querySelector(".rapid");
    const resultSpan = rapidWrapper.querySelector("span");

    resultSpan.innerText = `${(finishTime - startTime) / 1000}초 걸리셨습니다.`;

    reStart();
  };

  const rapidTestOnStart = () => {
    const startTime = new Date().getTime();

    const rapidWrapper = document.querySelector(".rapid");
    const rapidDiv = rapidWrapper.querySelector("div");

    rapidDiv.classList.replace("start", "going");
    rapidDiv.innerText = "클릭하세요!!!!!";

    rapidDiv.addEventListener(
      "click",
      () => {
        gameFinish.call(this, startTime);
      },
      {
        once: true,
      }
    );
  };

  const gameStartButton = () => {
    const button = document.createElement("button");
    button.innerText = "반응속도 테스트 시작";
    button.addEventListener("click", makeScreen);
    document.body.appendChild(button);
  };

  gameStartButton();
}

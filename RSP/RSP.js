"use strict";
{
  const changeRSP = (image) => {
    // 가위바위보 순서대로 출력하기 위해 className을 바꿔줌
    switch (image.className) {
      case "rock":
        image.classList.replace("rock", "scissors");
        break;
      case "scissors":
        image.classList.replace("scissors", "paper");
        break;
      case "paper":
        image.classList.replace("paper", "rock");
        break;
    }
  };

  const makeScreen = () => {
    const RSPWrapper = document.createElement("section");
    const title = document.createElement("h1");
    const imageWrapper = document.createElement("div");
    const image = document.createElement("img");

    RSPWrapper.classList.add("RSP-wrapper");
    title.innerText = "가위바위보";
    imageWrapper.style.maxWidth = "200px";
    imageWrapper.style.overflow = "hidden";

    image.src = "RSP/RSP.jpeg";
    image.classList.add("rock");

    const changing = setInterval(changeRSP.bind(null, image), 1000); // 가위바위보 순서대로 화면에 출력

    document.body.appendChild(RSPWrapper);
    RSPWrapper.appendChild(title);
    RSPWrapper.appendChild(imageWrapper);
    imageWrapper.appendChild(image);

    return changing;
  };

  const cleanScreen = () => {
    const RSPWrapper = document.querySelector(".RSP-wrapper");
    document.body.removeChild(RSPWrapper);
    return gameStartButton();
  };

  const gameStart = () => {
    const intervalValue = makeScreen(); // 게임 화면 만들면서 setInterval 가져옴 - 나중에 clear해주기 위함
    gameFinishButton();
  };

  const gameStartButton = () => {
    let button = document.querySelector(".RSP-btn");
    if (!button) {
      button = document.createElement("button");
      button.classList.add("RSP-btn");
      document.body.appendChild(button);
    }
    button.innerText = "가위바위보 시작";
    button.removeEventListener("click", cleanScreen);
    button.addEventListener("click", gameStart);
  };

  const gameFinishButton = () => {
    const button = document.querySelector(".RSP-btn");
    button.innerText = "가위바위보 종료";
    button.removeEventListener("click", gameStart);
    button.addEventListener("click", cleanScreen);
  };

  gameStartButton();
}

"use strict";
{
  const makeScreen = (row, column) => {
    const mineWrapper = document.createElement("section");
    const table = document.createElement("table");

    table.style.borderCollapse = "collapse";
    table.style.marginTop = "30px";

    for (let i = 1; i <= row; i++) {
      // 테이블 만들기
      const tr = document.createElement("tr");
      table.appendChild(tr);
      for (let j = 1; j <= column; j++) {
        const td = document.createElement("td");
        td.classList.add(j);
        td.style.border = "1px solid black";
        td.style.width = "60px";
        td.style.height = "60px";
        tr.appendChild(td);
      }
    }

    mineWrapper.classList.add("mine");
    mineWrapper.appendChild(table);
    document.body.appendChild(mineWrapper);
  };

  const clearScreen = () => {
    const mineWrapper = document.body.querySelector(".mine");
    document.body.removeChild(mineWrapper);
  };

  const gameStart = () => {
    makeScreen(3, 3);
    gameFinishButton();
  };

  const gameFinish = () => {
    clearScreen();
    gameStartButton();
  };

  const gameStartButton = () => {
    let startBtn = document.querySelector(".mineBtn");
    if (!startBtn) {
      startBtn = document.createElement("button");
      startBtn.classList.add("mineBtn");
      document.body.appendChild(startBtn);
    }
    startBtn.innerText = "지뢰찾기 시작";
    startBtn.addEventListener("click", gameStart, {
      once: true,
    });
  };

  const gameFinishButton = () => {
    const finishBtn = document.querySelector(".mineBtn");
    finishBtn.innerText = "지뢰찾기 종료";
    finishBtn.addEventListener("click", gameFinish, {
      once: true,
    });
  };

  gameStartButton();
}

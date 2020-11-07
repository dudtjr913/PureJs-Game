"use strict";
{
  const makeScreen = () => {
    const exWrapper = document.body.querySelector(".tictactoe");
    if (exWrapper) {
      // 이미 ticWrapper가 존재할 경우 없애고 새로 만듦
      document.body.removeChild(exWrapper);
    }
    const ticWrapper = document.createElement("section");
    const title = document.createElement("h1");
    const table = document.createElement("table");

    for (let i = 0; i < 3; i++) {
      // 3*3 테이블 만들기
      table.innerHTML += `
            <tr style="height : 10vh" id=${i}>
            <td style="border : 1px solid black; width : calc(100%/3)" id="0"></td>
            <td style="border : 1px solid black; width : calc(100%/3)" id="1"></td>
            <td style="border : 1px solid black; width : calc(100%/3)" id="2"></td>
            </tr>
            `;
    }
    table.style.width = "250px";
    table.style.borderCollapse = "collapse";
    table.style.textAlign = "center";

    ticWrapper.classList.add("tictactoe");
    title.innerText = "틱택토";
    document.body.append(ticWrapper);
    ticWrapper.append(title);
    ticWrapper.append(table);
  };

  const gameClose = () => {
    const ticWrapper = document.querySelector(".tictactoe");
    document.body.removeChild(ticWrapper);
    return gameStartButton();
  };

  const reStartButton = () => {
    const ticWrapper = document.querySelector(".tictactoe");
    const button = document.createElement("button");
    button.innerText = "다시하기";
    button.style.transform = "translate(90px, 10px)";
    ticWrapper.append(button);
    button.addEventListener("click", gameStart);
  };

  const showOnWinner = (turn) => {
    const ticWrapper = document.querySelector(".tictactoe");
    const table = document.querySelector("table");
    const winner = document.createElement("div");
    const result = document.createElement("div");
    winner.innerText = `${turn}`;
    winner.style.fontSize = "100px";
    winner.style.width = "250px";
    winner.style.textAlign = "center";
    result.style.fontSize = "30px";
    result.innerText = "승리";
    winner.append(result);
    ticWrapper.append(winner);
    ticWrapper.removeChild(table);
    return reStartButton();
  };

  const showOnDraw = () => {
    const ticWrapper = document.querySelector(".tictactoe");
    const draw = document.createElement("div");
    draw.innerText = "무승부입니다.";
    ticWrapper.append(draw);
    return reStartButton();
  };

  const checkWinner = (ticArray, clickedTd, fullArray) => {
    const td = parseInt(clickedTd.id, 10);
    const tr = parseInt(clickedTd.parentNode.id, 10);
    fullArray.push(td);
    if (ticArray[tr][0] === ticArray[tr][1] && ticArray[tr][1] === ticArray[tr][2]) {
      // 가로줄 3칸 일치할 경우
      return showOnWinner(clickedTd.innerText);
    }
    if (ticArray[0][td] === ticArray[1][td] && ticArray[1][td] === ticArray[2][td]) {
      // 세로줄 3칸 일치할 경우
      return showOnWinner(clickedTd.innerText);
    }
    if (td === tr) {
      if (ticArray[0][0] === ticArray[1][1] && ticArray[1][1] === ticArray[2][2]) {
        // 대각선 왼쪽 위에서 아래로 3칸 일치할 경우
        return showOnWinner(clickedTd.innerText);
      }
    }
    if ((td === 1 && tr === 1) || (td === 2 && tr === 0) || (td === 0 && tr === 2)) {
      if (ticArray[0][2] === ticArray[1][1] && ticArray[1][1] === ticArray[2][0]) {
        // 대각선 오른쪽 위에서 아래로 3칸 일치할 경우
        return showOnWinner(clickedTd.innerText);
      }
    }
    if (fullArray.length === 9) {
      // 셀이 모두 선택된 경우
      return showOnDraw();
    }
  };

  const handleOnGaming = (myTurn, ticArray, fullArray) => (e) => {
    if (e.target.innerText === "") {
      e.target.innerText = myTurn ? "O" : "X"; // turn 번갈아가면서 진행
      myTurn = !myTurn;
      ticArray[e.target.parentNode.id][e.target.id] = e.target.innerText; // row, column 순서
      checkWinner(ticArray, e.target, fullArray); // 배열과 클릭된 target을 인자로 넣어줌
    }
  };

  const gameStart = () => {
    gameFinishButton();
    makeScreen();
    const ticWrapper = document.querySelector(".tictactoe");
    const table = ticWrapper.querySelector("table");
    const myTurn = true;
    const ticArray = [
      // 게임의 3*3 배열을 미리 만듦
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    const fullArray = []; // 이 배열의 length가 9가 되면 게임 종료
    table.addEventListener("click", handleOnGaming(myTurn, ticArray, fullArray));
  };

  const gameStartButton = () => {
    let button = document.querySelector(".tic-btn");
    if (!button) {
      button = document.createElement("button");
      button.classList.add("tic-btn");
      document.body.append(button);
    }
    button.innerText = "틱택토 시작";
    button.removeEventListener("click", gameClose);
    button.addEventListener("click", gameStart);
  };

  const gameFinishButton = () => {
    const button = document.querySelector(".tic-btn");
    button.innerText = "틱택토 종료";
    button.removeEventListener("click", gameStart);
    button.addEventListener("click", gameClose);
  };

  gameStartButton();
}

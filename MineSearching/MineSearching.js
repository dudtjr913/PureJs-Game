"use strict";
{
  const makeScreen = (row, column, mine) => {
    const mineWrapper = document.createElement("section");
    const table = document.createElement("table");

    table.style.borderCollapse = "collapse";
    table.style.marginTop = "30px";

    if (row * column < mine) {
      gameStart();
      return alert("마인이 칸 수보다 많습니다.");
    }

    for (let i = 0; i < row; i++) {
      // 테이블 만들기
      const tr = document.createElement("tr");
      tr.classList.add(i);
      table.appendChild(tr);
      for (let j = 0; j < column; j++) {
        const td = document.createElement("td");
        td.classList.add(j);
        td.style.border = "1px solid black";
        td.style.width = "60px";
        td.style.height = "60px";
        tr.appendChild(td);
      }
    }

    const minePosition = makeOnGame(row, column, mine); // 지뢰 심기

    mineWrapper.classList.add("mine");
    mineWrapper.appendChild(table);
    document.body.appendChild(mineWrapper);
    table.style.textAlign = "center";

    table.addEventListener("click", handleOnTableLeftClick(minePosition)); // 마우스 왼쪽 클릭
    table.oncontextmenu = handleOnTableRightClick; // 마우스 오른쪽 클릭
  };

  const makeOnGame = (row, column, mine) => {
    const tableArray = [];
    for (let i = 1; i <= row; i++) {
      const rowArray = [];
      for (let j = 1; j <= column; j++) {
        rowArray.push(0);
      }
      tableArray.push(rowArray);
    }

    for (let k = 1; k <= mine; ) {
      // 마인 심기
      const randomRow = Math.floor(Math.random() * row);
      const randomCol = Math.floor(Math.random() * column);
      if (tableArray[randomRow][randomCol] === 0) {
        tableArray[randomRow][randomCol] = -7; // -7 = 마인
        k++;
      }
    }
    console.log(tableArray);
    return tableArray;
  };

  const clearScreen = () => {
    const mineWrapper = document.body.querySelector(".mine");
    document.body.removeChild(mineWrapper);
  };

  const handleOnSubmit = (row, col, mine) => (e) => {
    e.preventDefault();
    if (!row.value || !col.value || !mine.value) {
      return alert("모든 칸을 입력해주세요.");
    }
    clearScreen();
    makeScreen(row.value, col.value, mine.value);
  };

  const handleOnUserInput = () => {
    const mineWrapper = document.createElement("section");
    const form = document.createElement("form");

    mineWrapper.classList.add("mine");

    form.innerHTML = `
    <input type="number" placeholder = "행 개수" class="row"/>
    <input type="number" placeholder = "열 개수" class="col"/>
    <input type="number" placeholder = "지뢰 개수" class="mine"/>
    <button type="submit">시작</button>
    `;

    mineWrapper.appendChild(form);
    document.body.appendChild(mineWrapper);

    const row = form.querySelector(".row");
    const col = form.querySelector(".col");
    const mine = form.querySelector(".mine");
    const button = form.querySelector("button");

    button.addEventListener("click", handleOnSubmit(row, col, mine));
  };

  const handleOnTableLeftClick = (minePosition) => (e) => {
    const row = e.target.parentNode.className;
    const column = e.target.className;
    e.target.innerText = minePosition[row][column];
  };

  const handleOnTableRightClick = (e) => {
    e.preventDefault();
    if (!e.target.style.backgroundColor) {
      e.target.style.backgroundColor = "red";
    } else if (e.target.style.backgroundColor === "red") {
      e.target.style.backgroundColor = "yellow";
    } else {
      e.target.style.backgroundColor = null;
    }
  };

  const gameStart = () => {
    handleOnUserInput();
    gameFinishButton();
  };

  const gameFinish = () => {
    clearScreen();
    gameStartButton();
  };

  const gameStartButton = () => {
    let button = document.querySelector(".mineBtn");
    if (!button) {
      button = document.createElement("button");
      button.classList.add("mineBtn");
      document.body.appendChild(button);
    }
    button.innerText = "지뢰찾기 시작";
    button.removeEventListener("click", gameFinish);
    button.addEventListener("click", gameStart);
  };

  const gameFinishButton = () => {
    const button = document.querySelector(".mineBtn");
    button.innerText = "지뢰찾기 종료";
    button.removeEventListener("click", gameStart);
    button.addEventListener("click", gameFinish);
  };

  gameStartButton();
}

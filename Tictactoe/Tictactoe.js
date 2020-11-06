{
  const makeScreen = () => {
    const ticWrapper = document.createElement("section");
    const title = document.createElement("h1");
    const table = document.createElement("table");

    for (let i = 1; i <= 3; i++) {
      // 3*3 테이블 만들기
      table.innerHTML += `
            <tr style="height : 10vh" id=${i}>
            <td style="border : 1px solid black" id=${i * 3 - 2}></td>
            <td style="border : 1px solid black" id=${i * 3 - 1}></td>
            <td style="border : 1px solid black" id=${i * 3}></td>
            </tr>
            `;
    }
    table.style.width = "250px";
    table.style.textAlign = "center";

    ticWrapper.classList.add("tictactoe");
    title.innerText = "틱택토";
    document.body.append(ticWrapper);
    ticWrapper.append(title);
    ticWrapper.append(table);
  };

  const gameStart = () => {
    makeScreen();
  };

  const gameStartButton = () => {
    const button = document.createElement("button");
    button.innerText = "틱택토 시작";
    document.body.append(button);
    button.addEventListener("click", gameStart);
  };

  gameStartButton();
}

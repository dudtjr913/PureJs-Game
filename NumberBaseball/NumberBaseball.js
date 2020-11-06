"use strict";
{
  const makeNumbers = () => {
    // 랜덤한 중복되지 않는 숫자 4개 만들기
    const numbers = [];
    while (numbers.length < 4) {
      const number = Math.ceil(Math.random() * 9);
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return numbers;
  };

  const makeScreen = () => {
    // 숫자야구 게임 화면 띄우기
    const numberBaseballWrapper = document.createElement("section");
    const title = document.createElement("h1");
    const example = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const life = document.createElement("div");
    life.classList.add("life");

    numberBaseballWrapper.classList.add("number-baseball");
    title.innerText = "숫자야구";
    example.innerHTML = `중복되지 않는 숫자 4개를 입력하십시오. ex)1234 
                         <div></div>
                         숫자와 자리 모두 맞을 경우 1S, 숫자만 맞을 경우 1B, 둘 다 아닐 경우 1O입니다. `;
    input.placeholder = "숫자를 입력하세요.";
    input.type = "number";
    life.innerText = "목숨 : 10";
    document.body.append(numberBaseballWrapper);
    numberBaseballWrapper.append(title);
    numberBaseballWrapper.append(example);
    numberBaseballWrapper.append(form);
    form.append(input);
    numberBaseballWrapper.append(life);
  };

  const showOnResult = (numberBaseballWrapper, userInput, result, myLife) => {
    const div = document.createElement("div");
    const life = document.querySelector(".life");
    life.innerText = `목숨 : ${myLife}`;
    div.innerText = `${userInput} : ${result.strike}S ${result.ball}B ${result.out}O`;
    numberBaseballWrapper.append(div);
  };

  const repCheck = (value) => {
    // 숫자가 겹치는지 확인
    const check = value.split("");
    for (const num of check) {
      if (check.filter((v) => v === num).length !== 1) return false;
      //배열을 돌면서 겹치는 숫자가 있으면 length가 2, 3, 4로 증가될 것임. 이를 이용하여 length가 1이 아니라면 겹치는 것이라고 판단
    }
    return true;
  };

  const handleOnUserInput = (numberBaseballWrapper, numbers, life) => (e) => {
    // 유저의 input을 받아 S,B,O 또는 에러에 대한 결과를 다루기
    e.preventDefault();
    const result = {
      strike: 0,
      ball: 0,
      out: 0,
    };
    const input = numberBaseballWrapper.querySelector("input");
    const inputValue = input.value.toString(); // input이 숫자이기 때문에 비교를 위해 문자열로 바꾸기
    if (inputValue.length !== 4) {
      // 4자리의 숫자가 아닐 시 에러
      return alert("4자리의 숫자가 아닙니다.");
    }
    if (!repCheck(inputValue)) {
      // 중복 시 에러
      return alert("숫자가 중복됩니다.");
    }
    for (let i = 0; i < 4; i++) {
      if (
        numbers.includes(parseInt(inputValue[i], 10)) &&
        numbers[i] === parseInt(inputValue[i], 10)
      ) {
        // strike일 경우
        result.strike++;
        continue;
      }
      if (numbers.includes(parseInt(inputValue[i], 10))) {
        // ball일 경우
        result.ball++;
        continue;
      }
      // out일 경우
      result.out++;
    }
    console.log(numbers);
    return showOnResult(numberBaseballWrapper, input.value, result, --life);
  };

  const gameStart = () => {
    // 게임 시작
    makeScreen();
    const numbers = makeNumbers();
    const numberBaseballWrapper = document.querySelector(".number-baseball");
    const life = 10; // 목숨 10
    const form = numberBaseballWrapper.querySelector("form");
    form.addEventListener("submit", handleOnUserInput(numberBaseballWrapper, numbers, life));
  };

  const gameStartButton = () => {
    // 게임 시작 버튼
    const button = document.createElement("button");
    button.innerText = "숫자야구 시작";
    button.classList.add("number-baseball-btn");
    document.body.append(button);
    button.addEventListener("click", gameStart);
  };

  gameStartButton();
}

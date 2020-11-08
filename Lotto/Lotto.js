"use strict";
{
  const lottoSelect = () => {
    const numbers = []; // 로또 번호 6자리
    const allNumbers = Array(45) // 1~45
      .fill()
      .map((v, i) => i + 1);
    while (numbers.length < 6) {
      const selectIndex = Math.floor(Math.random() * allNumbers.length); // 로또 번호 index 뽑기
      numbers.push(allNumbers[selectIndex]); // 로또 번호 결과에 넣기
      allNumbers.splice(selectIndex, 1); // 뽑힌 숫자 1~45에서 삭제하기
    }
    const bonusNumberIndex = Math.floor(Math.random() * allNumbers.length); // 보너스 숫자 index 뽑기
    const lottoBonusNumber = allNumbers[bonusNumberIndex]; // 보너스 숫자 1개 뽑기

    return {
      numbers: numbers.sort((a, b) => a - b),
      lottoBonusNumber,
    };
  };

  const handleOnNumberClick = (e) => {
    const lottowrapper = document.querySelector(".lotto-wrapper");
    const clickedNumbers = lottowrapper.querySelectorAll(".clicked"); // 클릭된 숫자
    if (!e.target.className) {
      // 클릭하려는 숫자가 이미 클릭이 되었는지 확인
      // 클릭이 되어있으면 아래 검사를 하지 않고 클릭 취소를 하기 위함
      if (clickedNumbers.length > 5) {
        // 숫자 7개 이상 클릭 시 에러메시지
        return alert("숫자는 6개까지만 선택가능합니다.");
      }
    }
    // 숫자 클릭하면 class를 붙여줌
    e.target.classList.toggle("clicked");
  };

  const makeScreen = () => {
    const prevWrapper = document.body.querySelector(".lotto-wrapper");
    if (prevWrapper) {
      // 처음 게임 시작할 때 이미 게임이 시작되어 있으면 삭제하고 다시 시작
      document.body.removeChild(prevWrapper);
    }
    const lottoWrapper = document.createElement("section");
    const title = document.createElement("h1");
    const div = document.createElement("div");
    const numbersUl = document.createElement("ul");
    const form = document.createElement("form");
    const button = document.createElement("button");

    lottoWrapper.classList.add("lotto-wrapper");
    title.innerText = "로또 추첨기";
    div.innerText = "로또 추첨기입니다. 숫자 6자리를 골라주세요.";
    button.type = "submit";
    button.innerText = "제출하기";
    button.classList.add("submit-btn");

    document.body.appendChild(lottoWrapper);
    lottoWrapper.appendChild(title);
    lottoWrapper.appendChild(div);
    lottoWrapper.appendChild(numbersUl);

    for (let i = 0; i < 5; i++) {
      // 1 ~ 45까지의 숫자 화면에 표시
      const numbersList = document.createElement("li");
      for (let j = 1; j <= 9; j++) {
        const number = document.createElement("span");
        number.innerText = j + 9 * i; // 1 ~ 45
        number.addEventListener("click", handleOnNumberClick); // 숫자 클릭 시 콜백함수 호출
        numbersList.appendChild(number);
      }
      numbersUl.appendChild(numbersList);
    }

    lottoWrapper.appendChild(form);
    form.appendChild(button);
  };

  const clearScreen = () => {
    const lottoWrapper = document.body.querySelector(".lotto-wrapper");
    document.body.removeChild(lottoWrapper);
    return gameStartButton();
  };

  const handleOnResult = (lottoNumbers, clickedNumbers) => {
    // user 선택과 비교한 마지막 결과
    const userNumbers = []; // 유저가 선택한 6개의 숫자만 넣기
    let result = 0; // 몇 개 맞았는지
    let bonus = false; // 보너스 맞았는지?
    let rating = null; // 등수
    clickedNumbers.forEach((v) => userNumbers.push(parseInt(v.innerText, 10)));
    userNumbers.forEach((userNumber) => {
      // user 선택이 당첨 숫자에 들어있는지 확인, 들어있으면 당첨 숫자 + 1
      if (lottoNumbers.numbers.find((answerNumber) => answerNumber === userNumber)) {
        result++;
      }
    });
    if (userNumbers.find((v) => v === lottoNumbers.lottoBonusNumber)) {
      // 보너스 숫자가 맞았는지?
      bonus = true;
    }

    if (result === 6) {
      rating = 1;
    } else if (result === 5 && bonus) {
      rating = 2;
    } else if (result === 5) {
      rating = 3;
    } else if (result === 4) {
      rating = 4;
    }

    const lottoWrapper = document.querySelector(".lotto-wrapper");
    const userDiv = document.createElement("div");
    const resultDiv = document.createElement("div");
    const reStartBtn = document.createElement("button");
    userDiv.innerText = `선택한 번호 : ${userNumbers.toString()}`;

    if (rating && rating !== 2) {
      resultDiv.innerText = `총 ${result}개 일치해 ${rating}등 입니다.`;
    } else if (rating === 2 && bonus) {
      resultDiv.innerText = `보너스를 맞추시고 나머지 5개 일치해 2등 입니다.`;
    } else {
      resultDiv.innerText = "안타깝지만 당첨되지 않았습니다.";
    }

    reStartBtn.innerText = "다시하기";
    lottoWrapper.appendChild(userDiv);
    lottoWrapper.appendChild(resultDiv);
    lottoWrapper.appendChild(reStartBtn);

    reStartBtn.addEventListener("click", gameStart);
  };

  const paintNumber = (number) => {
    if (number.innerText >= 1 && number.innerText <= 10) {
      // 숫자별로 배경색 바꿔주기
      number.style.backgroundColor = "yellow";
    } else if (number.innerText >= 11 && number.innerText <= 20) {
      number.style.backgroundColor = "blue";
    } else if (number.innerText >= 21 && number.innerText <= 30) {
      number.style.backgroundColor = "red";
    } else if (number.innerText >= 31 && number.innerText <= 40) {
      number.style.backgroundColor = "black";
      number.style.color = "white";
    } else {
      number.style.backgroundColor = "green";
    }
  };

  const handleOnNumber = (index, numbers) => () => {
    const lottoWrapper = document.body.querySelector(".lotto-wrapper");
    const li = lottoWrapper.querySelector("li");
    // setInterval로 화면에 숫자 한 개씩 띄워주기
    if (index === 6) {
      return clearInterval();
    }
    const number = document.createElement("span");
    number.innerText = numbers[index];
    paintNumber(number);
    li.appendChild(number);
    index++;
  };

  const showOnNumbers = (lottoNumbers) => (e) => {
    e.preventDefault();
    const { numbers, lottoBonusNumber } = lottoNumbers;
    const lottoWrapper = document.body.querySelector(".lotto-wrapper");
    let index = 0; // 로또 번호의 index를 0부터 5까지 가져오게 하기 위함
    const clickedNumbers = Array.from(lottoWrapper.querySelectorAll(".clicked")); // 클릭된 숫자들

    while (lottoWrapper.firstChild) {
      // 기존의 화면을 지워준다.
      lottoWrapper.removeChild(lottoWrapper.firstChild);
    }

    lottoWrapper.innerHTML = "<h1>결과</h1><ul><li></li></ul>";
    const li = lottoWrapper.querySelector("li");
    setInterval(handleOnNumber(index, numbers), 100);

    setTimeout(function () {
      const bonusNumber = document.createElement("span");
      const div = document.createElement("div");
      bonusNumber.innerText = lottoBonusNumber;
      div.innerText = "+";
      paintNumber(bonusNumber);
      li.appendChild(div);
      li.appendChild(bonusNumber);
      handleOnResult(lottoNumbers, clickedNumbers);
    }, 700);
  };

  const gameStart = () => {
    makeScreen();
    gameFinishButton();
    const lottoNumbers = lottoSelect();
    const lottoWrapper = document.body.querySelector(".lotto-wrapper");
    const form = lottoWrapper.querySelector("form");
    form.addEventListener("click", showOnNumbers(lottoNumbers));
  };

  const gameStartButton = () => {
    let button = document.querySelector(".lotto-btn");
    if (!button) {
      button = document.createElement("button");
      button.classList.add("lotto-btn");
      document.body.appendChild(button);
    }
    button.innerText = "로또 추첨기 시작";
    button.removeEventListener("click", clearScreen);
    button.addEventListener("click", gameStart);
  };

  const gameFinishButton = () => {
    const button = document.querySelector(".lotto-btn");
    button.innerText = "로또 추첨기 종료";
    button.removeEventListener("click", gameStart);
    button.addEventListener("click", clearScreen);
  };

  gameStartButton();
}

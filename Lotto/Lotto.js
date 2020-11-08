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
    const clickednumbers = lottowrapper.querySelectorAll(".clicked"); // 클릭된 숫자
    if (!e.target.className) {
      // 클릭하려는 숫자가 이미 클릭이 되었는지 확인
      // 클릭이 되어있으면 아래 검사를 하지 않고 클릭 취소를 하기 위함
      if (clickednumbers.length > 5) {
        // 숫자 7개 이상 클릭 시 에러메시지
        return alert("숫자는 6개까지만 선택가능합니다.");
      }
    }
    // 숫자 클릭하면 class를 붙여줌
    e.target.classList.toggle("clicked");
  };

  const makeScreen = () => {
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

  const showOnNumbers = (lottoNumbers) => {
    const { numbers, lottoBonusNumber } = lottoNumbers;
    const lottoWrapper = document.body.querySelector(".lotto-wrapper");
    let index = 0; // 로또 번호의 index를 0부터 5까지 가져오게 하기 위함

    while (lottoWrapper.firstChild) {
      // 기존의 화면을 지워준다.
      lottoWrapper.removeChild(lottoWrapper.firstChild);
    }

    lottoWrapper.innerHTML = "<h1>결과</h1>";

    const show = setInterval(function () {
      // setInterval로 화면에 숫자 한 개씩 띄워주기
      if (index === 6) {
        return clearInterval(show);
      }
      const number = document.createElement("span");
      number.innerText = numbers[index];
      lottoWrapper.appendChild(number);
      index++;
    }, 1000);

    setTimeout(function () {
      const bonusNumber = document.createElement("span");
      bonusNumber.innerHTML = `<span>보너스 숫자 : </span>${lottoBonusNumber}`;
      lottoWrapper.appendChild(bonusNumber);
    }, 7000);
  };

  const handleOnResult = (lottoNumbers) => (e) => {
    e.preventDefault();
    showOnNumbers(lottoNumbers);
  };

  const gameStart = () => {
    makeScreen();
    const lottoNumbers = lottoSelect();
    const lottoWrapper = document.body.querySelector(".lotto-wrapper");
    const form = lottoWrapper.querySelector("form");
    form.addEventListener("click", handleOnResult(lottoNumbers));
  };

  const gameStartButton = () => {
    const button = document.createElement("button");
    button.innerText = "로또 추첨기 시작";
    button.classList.add("lotto-btn");
    document.body.appendChild(button);
    button.addEventListener("click", gameStart);
  };

  gameStartButton();
}

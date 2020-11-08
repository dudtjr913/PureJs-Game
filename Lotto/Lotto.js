"use strict";
{
  const lottoSelect = () => {
    const lottoNumbers = []; // 로또 번호 6자리
    const allNumbers = Array(45) // 1~45
      .fill()
      .map((v, i) => i + 1);
    while (lottoNumbers.length < 6) {
      const selectIndex = Math.floor(Math.random() * allNumbers.length); // 로또 번호 index 뽑기
      lottoNumbers.push(allNumbers[selectIndex]); // 로또 번호 결과에 넣기
      allNumbers.splice(selectIndex, 1); // 뽑힌 숫자 1~45에서 삭제하기
    }
    const bonusNumberIndex = Math.floor(Math.random() * allNumbers.length); // 보너스 숫자 index 뽑기
    const lottoBonusNumber = allNumbers[bonusNumberIndex]; // 보너스 숫자 1개 뽑기

    return {
      lottoNumbers,
      lottoBonusNumber,
    };
  };

  const handleOnNumberClick = (e) => {
    // 숫자 클릭하면 class를 붙여줌
    console.log(e.target.innerText);
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

  makeScreen();
}

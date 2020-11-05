"use strict";
{
  const makeNumbers = () => {
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
    const numberBaseball = document.createElement("section");
    const title = document.createElement("h1");
    const example = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const life = document.createElement("div");

    title.innerText = "숫자야구";
    example.innerHTML = `중복되지 않는 숫자 4개를 입력하십시오. ex)1234 
                         <div></div>
                         숫자와 자리 모두 맞을 경우 1S, 숫자만 맞을 경우 1B, 둘 다 아닐 경우 1O입니다. `;
    input.placeholder = "숫자를 입력하세요.";
    life.innerText = "목숨 : 10";
    document.body.append(numberBaseball);
    numberBaseball.append(title);
    numberBaseball.append(example);
    numberBaseball.append(form);
    form.append(input);
    numberBaseball.append(life);
  };

  makeScreen();
}

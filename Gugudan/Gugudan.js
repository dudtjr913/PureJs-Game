'use strict';
{
  const makeScreen = () => {
    const gugudanWrapper = document.createElement('section');
    const title = document.createElement('h1');
    const multipleDiv = document.createElement('div');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const life = document.createElement('div');
    const answer = document.createElement('div');

    gugudanWrapper.classList.add('gugudan');
    document.body.append(gugudanWrapper);
    title.innerText = '구구단';
    multipleDiv.innerText = `${Math.ceil(Math.random() * 19)} X ${Math.ceil(Math.random() * 19)}`;
    multipleDiv.classList.add('multiple');
    input.placeholder = '정답을 입력해주세요.';
    input.type = 'number';
    life.innerText = '목숨 : 5';
    life.classList.add('life');
    answer.classList.add('answer');
    gugudanWrapper.append(title);
    gugudanWrapper.append(multipleDiv);
    gugudanWrapper.append(form);
    form.append(input);
    gugudanWrapper.append(life);
    gugudanWrapper.append(answer);
  };

  const gameFinish = () => {
    const gugudanWrapper = document.querySelector('.gugudan');
    const replayButton = gugudanWrapper.querySelector('button');
    if (replayButton) {
      document.body.removeChild(gugudanWrapper);
      return gameStart();
    }
    document.body.removeChild(gugudanWrapper);
    return gameStartButton();
  };

  const reStart = (gugudanWrapper) => {
    const form = gugudanWrapper.querySelector('form');
    const reStartButton = document.createElement('button');
    reStartButton.innerText = '다시하기';
    gugudanWrapper.removeChild(form);
    gugudanWrapper.append(reStartButton);
    reStartButton.addEventListener('click', gameFinish());
  };

  const rightAnswer = (gugudanWrapper) => {
    const multipleDiv = gugudanWrapper.querySelector('.multiple');
    const answer = gugudanWrapper.querySelector('.answer');
    answer.innerText = '정답입니다.';
    multipleDiv.innerText = `${Math.ceil(Math.random() * 19)} X ${Math.ceil(Math.random() * 19)}`;
  };

  const wrongAnswer = (lifeNumber, gugudanWrapper) => {
    const life = gugudanWrapper.querySelector('.life');
    life.innerText = `목숨 : ${lifeNumber}`;
    const answer = gugudanWrapper.querySelector('.answer');
    answer.innerText = '오답입니다 목숨이 1 감소합니다.';
    if (lifeNumber === 0) return reStart(gugudanWrapper);
  };

  const convertAnswer = (gugudanWrapper) => {
    const multipleDiv = gugudanWrapper.querySelector('.multiple');
    const multipleNumber = multipleDiv.innerText;
    const X = multipleNumber.indexOf('X');
    return multipleNumber.slice(0, X - 1) * multipleNumber.slice(X + 2);
  };

  const handleOnUserInput = (life, gugudanWrapper) => (e) => {
    e.preventDefault();
    const input = gugudanWrapper.querySelector('input');
    const answer = convertAnswer(gugudanWrapper);
    parseInt(input.value, 10) === answer ? rightAnswer(gugudanWrapper) : wrongAnswer(--life, gugudanWrapper);
    input.value = '';
  };

  const gameStart = () => {
    gameFinishButton();
    makeScreen();
    const life = 5;
    const gugudanWrapper = document.querySelector('.gugudan');
    const form = gugudanWrapper.querySelector('form');
    form.addEventListener('submit', handleOnUserInput(life, gugudanWrapper));
  };

  const gameStartButton = () => {
    let button = document.querySelector('.gugudan-btn');
    if (!button) {
      button = document.createElement('button');
      button.classList.add('gugudan-btn');
      document.body.append(button);
    }
    button.innerText = '구구단 시작';
    button.removeEventListener('click', gameFinish);
    button.addEventListener('click', gameStart);
  };

  const gameFinishButton = () => {
    const button = document.querySelector('.gugudan-btn');
    button.innerText = '구구단 종료';
    button.removeEventListener('click', gameStart);
    button.addEventListener('click', gameFinish);
  };

  gameStartButton();
}

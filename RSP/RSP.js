'use strict';
{
  const changeRSP = (image) => {
    // 가위바위보 순서대로 출력하기 위해 className을 바꿔줌
    switch (image.className) {
      case 'rock':
        image.classList.replace('rock', 'scissors');
        break;
      case 'scissors':
        image.classList.replace('scissors', 'paper');
        break;
      case 'paper':
        image.classList.replace('paper', 'rock');
        break;
    }
  };

  const makeScreen = () => {
    const RSPWrapper = document.createElement('section');
    const title = document.createElement('h1');
    const imageWrapper = document.createElement('div');
    const image = document.createElement('img');

    RSPWrapper.classList.add('RSP-wrapper');
    title.innerText = '가위바위보';
    imageWrapper.style.maxWidth = '200px';
    imageWrapper.style.overflow = 'hidden';

    image.src = 'RSP/RSP.jpeg';
    image.classList.add('rock');

    const changing = setInterval(changeRSP.bind(null, image), 100); // 가위바위보 순서대로 화면에 출력

    document.body.appendChild(RSPWrapper);
    RSPWrapper.appendChild(title);
    RSPWrapper.appendChild(imageWrapper);
    imageWrapper.appendChild(image);

    return changing;
  };

  const cleanScreen = () => {
    const RSPWrapper = document.querySelector('.RSP-wrapper');
    document.body.removeChild(RSPWrapper);
    return gameStartButton();
  };

  const debounce = (func, time) => {
    let setTime = null;
    return (e) => {
      clearTimeout(setTime);
      setTime = setTimeout(func.bind(null, e), time);
    };
  };

  const handleOnResult = (image, RSPWrapper, e) => {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    RSPWrapper.appendChild(resultDiv);

    if (image.className === 'rock') {
      switch (e.target.innerText) {
        case '바위':
          resultDiv.innerText = '비겼습니다.';
          break;
        case '가위':
          resultDiv.innerText = '패배하셨습니다.';
          break;
        case '보':
          resultDiv.innerText = '이겼습니다.';
          break;
      }
    } else if (image.className === 'scissors') {
      switch (e.target.innerText) {
        case '바위':
          resultDiv.innerText = '이겼습니다.';
          break;
        case '가위':
          resultDiv.innerText = '비겼습니다.';
          break;
        case '보':
          resultDiv.innerText = '패배하셨습니다.';
          break;
      }
    } else {
      switch (e.target.innerText) {
        case '바위':
          resultDiv.innerText = '패배하셨습니다.';
          break;
        case '가위':
          resultDiv.innerText = '이겼습니다.';
          break;
        case '보':
          resultDiv.innerText = '비겼습니다.';
          break;
      }
    }
  };

  const handleOnStop = (intervalValue) => {
    const RSPWrapper = document.querySelector('.RSP-wrapper');
    const image = RSPWrapper.querySelector('img');
    let setTime = null;
    const resultDebounce = debounce(handleOnResult.bind(null, image, RSPWrapper), 300); // 결과 0.3초 후에 보여주기 - 0.3초 동안 클릭하는 것은 debounce처리 됨
    return (e) => {
      const resultDiv = RSPWrapper.querySelector('.result');
      if (resultDiv) {
        RSPWrapper.removeChild(resultDiv);
      }
      resultDebounce(e);
      clearInterval(intervalValue);
      clearTimeout(setTime);
      setTime = setTimeout(() => {
        intervalValue = setInterval(changeRSP.bind(null, image), 100);
      }, 300);
    };
  };

  const userSelectButton = (intervalValue) => {
    const RSPWrapper = document.querySelector('.RSP-wrapper');
    const buttonWrapper = document.createElement('div');
    buttonWrapper.innerHTML = `
    <div class="buttons-wrapper">
    <button class="rock-btn" type="submit">바위</button>
    <button class="scissors-btn" type="submit">가위</button>
    <button class="paper-btn" type="submit">보</button>
    </div>
    `;
    RSPWrapper.appendChild(buttonWrapper);

    const buttons = RSPWrapper.querySelector('.buttons-wrapper');
    buttons.addEventListener('click', handleOnStop(intervalValue));
  };

  const gameStart = () => {
    const intervalValue = makeScreen(); // 게임 화면 만들면서 setInterval 가져옴 - 나중에 clear해주기 위함
    gameFinishButton();
    userSelectButton(intervalValue);
  };

  const gameStartButton = () => {
    let button = document.querySelector('.RSP-btn');
    if (!button) {
      button = document.createElement('button');
      button.classList.add('RSP-btn');
      document.body.appendChild(button);
    }
    button.innerText = '가위바위보 시작';
    button.removeEventListener('click', cleanScreen);
    button.addEventListener('click', gameStart);
  };

  const gameFinishButton = () => {
    const button = document.querySelector('.RSP-btn');
    button.innerText = '가위바위보 종료';
    button.removeEventListener('click', gameStart);
    button.addEventListener('click', cleanScreen);
  };

  gameStartButton();
}

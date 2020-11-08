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
}

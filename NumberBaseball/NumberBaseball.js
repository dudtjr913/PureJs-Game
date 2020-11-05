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

function reverseNumber(number) {
  let reverseNumber = 0;

  while (number !== 0) {
    reverseNumber *= 10;
    reverseNumber += number % 10;
    number -= number % 10;
    number /= 10;
  }

  return reverseNumber;
}

reverseNumber(123); // 321
reverseNumber(-456); // -654
reverseNumber(10000); // 1
const max = process.argv[2];
let fizzBuzz = function*() {
  let counter = 1;
  while (counter <= max) {
    let value = counter;
    if (value % 15 === 0) {
      value = "FizzBuzz";
    } else if (value % 3 === 0) {
      value = "Fizz";
    } else if (value % 5 === 0) {
      value = "Buzz";
    }
    counter++;
    yield value;

  }
}();

for (var n of fizzBuzz) {
  console.log(n);
}

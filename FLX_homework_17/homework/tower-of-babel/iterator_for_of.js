const max = process.argv[2];

let fizzBuzz = {
  [Symbol.iterator]() {
    let counter = 1;
    return {
      next() {
        if (counter > max) {
          return { done: true };
        }
        let value = counter;
        if (value % 15 === 0) {
          value = "FizzBuzz";
        } else if (value % 3 === 0) {
          value = "Fizz";
        } else if (value % 5 === 0) {
          value = "Buzz";
        }
        counter++;
        return { done: false, value: value };
      }
    }
  }
};

for (var n of fizzBuzz) {
  console.log(n);
}

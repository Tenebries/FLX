function addOne(x) {
  return x + 1;
}

function pipe(number) {
  for (let i = 1; i < arguments.length; i++) {
    number = arguments[i](number);
  }

  return number;
}

pipe(1, addOne); // 2
pipe(1, addOne, addOne); // 3
let log = [];

$(document).ready(function () {
  let result = 0;
  let prevEntry = 0;
  let operation = null;
  let currentEntry = '0';
  let buttonPressed = '';
  updateScreen(result);

  $(document).bind('keypress', function (e) {
    let buttonPressedByKey = e.keyCode || e.which;

    if (buttonPressedByKey === 13) {
      buttonPressed = '=';
      console.log(`User press: ${buttonPressedByKey}, Button pressed: ${buttonPressed}`);
    } else if (buttonPressedByKey === 99) {
      buttonPressed = 'C';
      $('.result').html('0');
      $('.log').html = '';
      result = 0;
      currentEntry = '0';
      log = [];
      console.log(`User press: ${buttonPressedByKey}, Button pressed: ${buttonPressed}`);
    } else if (buttonPressedByKey === 77) {
      buttonPressed = 'M';
      /*TODO*/
    } else if (buttonPressedByKey === 17) {
      /* TODO+ 77 (m)*/
    }
  });

  $('button').on('click', function (e) {
    buttonPressed = $(this).html();
    console.log(buttonPressed);

    if (buttonPressed === "C") {
      result = 0;
      currentEntry = '0';
      log = [];
    } else if (buttonPressed === "MC") {

    } else if (buttonPressed === "MC+") {

    } else if (buttonPressed === '.') {
      currentEntry += '.';
    } else if (isNumber(buttonPressed)) {
      if (currentEntry === '0') {
        currentEntry = buttonPressed;
      } else {
        currentEntry = currentEntry + buttonPressed;
      }
    } else if (isOperator(buttonPressed)) {
      prevEntry = parseFloat(currentEntry);
      operation = buttonPressed;
      currentEntry = '';
      $('.result').html = `${currentEntry} ${operation} `;
    } else if (buttonPressed === '=') {
      currentEntry = operate(prevEntry, currentEntry, operation);
      operation = null;
    }

    updateScreen(currentEntry, operation);
  });
});

updateScreen = function (displayValue, operation) {
  displayValue = displayValue.toString();
  $('.result').html(`${displayValue.substring(0, 10)}`);
};

isNumber = function (value) {
  return !isNaN(value);
};

isOperator = function (value) {
  return value === '/' || value === '*' || value === '+' || value === '-';
};

operate = function (a, b, operation) {
  a = parseFloat(a);
  b = parseFloat(b);
  console.log(a, operation, b);
  log.push(a, operation, b);
  $('.log').text(log.join(' ') + ';\n');
  if (operation === '+') return a + b;
  if (operation === '-') return a - b;
  if (operation === '*') return a * b;
  if (operation === '/') return a / b;
};

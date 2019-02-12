function isInteger(number) {
    return (number ^ 0) === number;
}

isInteger(5); // true
isInteger(5.1); // false
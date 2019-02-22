const data = [
  {
    "_id": "5b5e3168c6bf40f2c1235cd6",
    "index": 0,
    "age": 39,
    "eyeColor": "green",
    "name": "Stein",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e3168e328c0d72e4f27d8",
    "index": 1,
    "age": 38,
    "eyeColor": "blue",
    "name": "Cortez",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5b5e3168cc79132b631c666a",
    "index": 2,
    "age": 2,
    "eyeColor": "blue",
    "name": "Suzette",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e31682093adcc6cd0dde5",
    "index": 3,
    "age": 19,
    "eyeColor": "green",
    "name": "George",
    "favoriteFruit": "banana"
  }
];

/*
* Function 1
* Write function, which returns types of passed parameters (one and more parameters).
* */
function findTypes(...args) {
  const types = [];
  for (let i = 0; i < args.length; i++) {
    types.push(typeof args[i]);
  }

  return types;
}
findTypes('number'); // returns ["string"]
findTypes(null, 5, 'hello'); // returns ["object", "number", "string"]

/*
* Function 2
* Write function, which iterates over array and executes function on each element.
* */
function executeForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, this);
  }
}
executeForEach([1, 2, 3], function (el) {
  console.log(el);
}); // 1 2 3

/*
* Function 3
* Write function, which returns transformed array based on function, which passed as a parameter. Reuse function from task 2.
* */
function mapArray(array, callback) {
  const transformedArray = [];
  executeForEach(array, element => transformedArray.push(callback(element)));
  return transformedArray;
}
mapArray([2, 5, 8], function (el) {
  return el + 3;
}); // returns [5, 8, 11]

/*
* Function 4
* Write function, which returns filtered array based on function, which passed as a parameter. Reuse function from task 2.
* */
function filterArray(array, callback) {
  const filteredArray = [];
  executeForEach(array, element => {
    if (callback(element)) {
      filteredArray.push(element);
    }
  });

  return filteredArray;
}
filterArray([2, 5, 8], function (el) {
  return el > 3;
}); // returns [5, 8]

/*
* Function 5
* Write function, which returns amount of people, who are over 18. Reuse function from task 4.
* */
function getAmountOfAdultPeople(data) {
  return filterArray(data, person => person.age > 18).length;
}
getAmountOfAdultPeople(data); // returns 3

/*
* Function 6
* Write function, which returns array of names of people, who are over 18 , their favorite fruit is banana and their eye
* color is green. Reuse functions from task 3 and 4.
* */
function getGreenAdultBananaLovers(data) {
  const result = filterArray(data, person => {
    return person.age > 18 && person.favoriteFruit === 'banana' && person.eyeColor === 'green';
  });
  return mapArray(result, personName => personName.name);
}
getGreenAdultBananaLovers(data); // returns [‘George]

/*
* Function 7
* Write function, which returns array of keys of an object.
* */
function keys(object) {
  const array = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      array.push(key);
    }
  }

  return array;
}
keys({keyOne: 1, keyTwo: 2, keyThree: 3}); // returns [“keyOne”, “keyTwo”, “keyThree”]

/*
* Function 8
* Write function, which returns array of values of an object.
* */
function values(object) {
  const array = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      array.push(object[key]);
    }
  }

  return array;
}
values({keyOne: 1, keyTwo: 2, keyThree: 3}); // returns [1, 2, 3]

/*
* Function 9
* Write function, which returns formatted date.
* */
function showFormattedDate(date) {
  let monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return `Date: ${date.getDate()} of ${monthNames[date.getMonth()]}, ${date.getFullYear()}`
}
showFormattedDate(new Date('2019-01-27T01:10:00')); // returns "Date: 27 of Jan, 2019"

/*
* Function 10
* Write function, which returns true if Year is even, otherwise returns false.
* */
function isEvenYear(date) {
  return date.getFullYear() % 2 === 0;
}
isEvenYear(new Date('2019-01-27T01:10:00')); // false

/*
* Function 11
* Write function, which returns true if Month is even, otherwise returns false.
* */
function isEvenMonth(date) {
  return (date.getMonth() + 1) % 2 === 0;
}
isEvenMonth(new Date('2019-02-27T01:10:00')); // true
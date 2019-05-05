let car;
let data = require('../../db/data');

getCars = () => {
  return {
    status: 200,
    message: data
  }
};

putById = (id, brand, model, engineVolume, year) => {
  car = data.find((car) => {
    return car.id === +id;
  });

  if (car) {
    car.brand = brand;
    car.model = model;
    car.engineVolume = engineVolume;
    car.year = year;

    return {
      status: 200,
      body: car
    };
  } else {
    return {
      status: 404,
      body: 'Car has not been found.'
    };
  }
};

getById = (id) => {
  car = data.find((car) => {
    return car.id === +id;
  });

  if (car) {
    return {
      status: 200,
      body: car
    };
  } else {
    return {
      status: 404,
      body: 'Car has not been found.'
    };
  }
};

newCar = (id, brand, model, engineVolume, year) => {
  const carObj = {
    id: id,
    brand: brand,
    model: model,
    engineVolume: engineVolume,
    year: year
  };

  car = data.find((car) => {
    return car.id === carObj.id;
  });

  if (car) {
    return {
      status: 409,
      body: {
        message: 'Car exists.'
      }
    };
  } else {
    data.push(carObj);

    return {
      status: 201,
      body: carObj
    };
  }
};

deleteCarById = (id) => {
  car = data.find((car) => {
    return car.id === Number(id);
  });

  if (car) {
    data = data.filter((cars) => {
      return cars.id !== Number(id);
    });

    return {
      status: 200,
      body: {
        message: 'Car has been removed.'
      }
    };
  } else {
    return {
      status: 404,
      body: {
        message: 'Car has not been found.'
      }
    };
  }
};

module.exports = {
  'getCars': getCars,
  'newCar': newCar,
  'putById': putById,
  'getById': getById,
  'deleteCarById': deleteCarById
};

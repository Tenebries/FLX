// Task 1
function assign(target, ...args) {
  let to = Object(target);

  for (let i = 0; i < args.length; i++) {
    if (args[i]) {
      for (let key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          to[key] = args[i][key];
        }
      }
    }
  }

  return to;
}

// var defaults = {a: 123, b: 777};
// var options = {a: 456};
// var configs = assign({}, defaults, options); // {a: 456, b: 777}

// Task 2
function Bot({name, speed, x, y}) {
  this.name = name;
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.defaultSpeed = this.speed;
  this.type = 'Bot';
}

Bot.prototype.getSpeed = function () {
  return this.speed;
};

Bot.prototype.setSpeed = function (speed) {
  if (!isNaN(+speed) && isFinite(speed)) {
    this.speed = speed;
  } else {
    console.error('You enter invalid data!');
  }
};

Bot.prototype.getDefaultSpeed = function () {
  return this.defaultSpeed;
};

Bot.prototype.getCoordinates = function () {
  return {x: this.x, y: this.y};
};

Bot.prototype.setCoordinates = function (_x, _y) {
  if (isFinite(_x) && isFinite(_y)) {
    this.x = +_x;
    this.y = +_y;
  } else {
    console.error('You enter invalid data!');
  }
};

Bot.prototype.move = function (to) {
  switch (to) {
    case 'up':
      this.y += this.getSpeed();
      break;
    case 'down':
      this.y -= this.getSpeed();
      break;
    case 'left':
      this.x -= this.getSpeed();
      break;
    case 'right':
      this.x += this.getSpeed();
      break;
    default:
      console.info('Enter valid direction: up, down, left, right');
  }
};

Bot.prototype.showPosition = function () {
  console.log(`I am ${this.type} ${this.name}. I am located at ${this.x}: ${this.y}.`);
};

function Racebot({name, speed, x, y}) {
  Bot.call(this, {name, speed, x, y});
  this.type = `Racebot`;
  this.lastMove = null;
}

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Bot;

Racebot.prototype.move = function (direction) {
  direction === this.lastMove ? this.speed++ : this.speed = this.defaultSpeed;

  Bot.prototype.move.call(this, direction);
  this.lastMove = direction;
};

function Speedbot({name, speed, x, y} = {}) {
  Bot.call(this, {name, speed, x, y});
  this.type = 'Speedbot';
}

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Bot;

Speedbot.prototype.prepareEngine = function () {
  this.setSpeed(this.getSpeed() + 2);
};

Speedbot.prototype.move = function (direction) {
  Bot.prototype.move.call(this, direction);

  if (this.speed > this.defaultSpeed) {
    this.setSpeed(this.getSpeed() - 1);
  }
};

// let Botty = new Bot({name: "Betty", speed: 2, x: 0, y: 1});
// Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:1.
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:3.
// Botty.move('left');
// Botty.move('down');
// Botty.move('up');
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:5.
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:7.
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:9.
//
// let Zoom = new Racebot({name: "Lightning", speed: 2, x: 0, y: 1});
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:1.
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:3.
// Zoom.move('left');
// Zoom.move('down');
// Zoom.move('up');
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:6.
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:10.
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:15.
//
// let Broom = new Speedbot({name: "Thunder", speed: 2, x: 0, y: 1});
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:1.
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:3.
// Broom.prepareEngine();
// Broom.move('left');
// Broom.move('down');
// Broom.move('up');
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:4.
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:6.
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:8.

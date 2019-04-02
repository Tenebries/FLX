class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health_ = 100;
  }

  getHealth() {
    return this.health_;
  }

  damage() {
    this.health_ -= 10;
  }

  toString() {
    return `x: ${this.x} y: ${this.y} health: ${this.health_}`;
  }
}

let x = process.argv[2];
let y = process.argv[3];
let character = new Character(+x, +y);
character.damage();
console.log(character.toString());

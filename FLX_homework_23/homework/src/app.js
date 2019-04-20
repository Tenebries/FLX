class User {
  constructor(name, orderTotalPrice = 0, weekendDiscount = 10, nightDiscount = 25, bonus = 0) {
    this.name = name;
    this.orderTotalPrice = orderTotalPrice;
    this.weekendDiscount = weekendDiscount;
    this.nightDiscount = nightDiscount;
    this.bonus = bonus;
  }

  makeOrder(price) {
    if (this.nightDiscount) {
      price = price / 100 * (100 - this.nightDiscount);
    } else if (this.weekendDiscount) {
      price = price / 100 * (100 - this.weekendDiscount);
    }

    this.orderTotalPrice += price;

    if (this.bonus > price) {
      this.bonus = this.bonus - price;
      price = 0;
    } else {
      price = price - this.bonus;
      this.bonus = 0;
    }

    return `Price after discount and including bonuses is ${price}.`;
  }
}

getDiscount = (user) => {
  let hours = new Date().getHours();
  let day = new Date().getDay();

  if (hours >= 23 || hours <= 6) {
    user.nightDiscount = 25;
  } else if (day > 5) {
    user.weekendDiscount = 10;
  }
};

setBonus = (user) => {
  user.bonus = user.orderTotalPrice / 20;
  user.orderTotalPrice = user.orderTotalPrice % 20;
};

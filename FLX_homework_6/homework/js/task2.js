let amount = prompt(`Input amount of money:`);
let discount = prompt(`Input your discount:`);
let message = "";
if (amount < 0 || amount > 9999999 || discount < 0 || discount > 99 || isNaN(amount) || isNaN(discount)) {
    message = `Invalid input data!`;
} else {
    message = " Price without discount: " + amount + "\n" +
                " Discount: " + discount + "%\n" +
                " Price with discount: " + (amount / 100 * (100 - discount)).toFixed(2) + "\n" +
                " Saved: " + ((amount / 100) * 30).toFixed(2);
}

alert(message);
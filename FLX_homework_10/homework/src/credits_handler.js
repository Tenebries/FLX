function userCard(index) {
  let balance = 100,
    transactionLimit = 100,
    historyLogs = [],
    tax = 0.005;

  return {
    getCardOptions: function () {
      return {balance, transactionLimit, historyLogs, key: index};
    },

    putCredits: function (amount) {
      if (amount < 1) {
        console.log(`Amount can't be less then 1$!`);
      } else {
        balance += amount;
        historyLogs.push({
          operationType: `Received credits`,
          credits: amount,
          operationTime: new Date().toLocaleString('en-GB')
        });
      }
    },

    takeCredits: function (amount) {
      if (amount < 1) {
        console.log(`Amount can't be less then 1$!`);
      } else if (transactionLimit < amount || balance < amount) {
        console.log(`You can't handle this!`);
      } else {
        balance -= amount;
        historyLogs.push({
          operationType: `Withdrawal of credits`,
          credits: amount,
          operationTime: new Date().toLocaleString('en-GB')
        });
      }
    },

    setTransactionLimit: function (amount) {
      if (amount < 1) {
        console.log(`Amount can't be less then 1$!`)
      } else {
        transactionLimit = amount;
        historyLogs.push({
          operationType: `Transaction limit change`,
          credits: amount,
          operationTime: new Date().toLocaleString()
        });
      }
    },

    transferCredits: function (amount, card) {
      const amountWithTax = tax * amount + amount;

      if (balance < amountWithTax) {
        console.log(`You don't have so much on the card.`);
      } else if (transactionLimit < amount) {
        console.log(`Limit exceeded`);
      } else {
        this.takeCredits(amountWithTax);
        card.putCredits(amount);
      }
    }
  }
}

class UserAccount {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.MAX_CARDS = 3;
  }

  addCard() {
    if (this.cards.length < this.MAX_CARDS) {
      this.cards.push(userCard(this.cards.length + 1));
    } else {
      console.log(`You can't create more cards.`);
    }
  }

  getCardByKey(key) {
    return this.cards[key - 1];
  }
}
'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};


let money;
let start = function () {
  do {
    money = (prompt("Ваш месячный доход?", 50000));
  }
  while (!isNumber(money));

};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  budget: money,
  asking: function () {
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "НоутБУК, СТРАховка, ПРОЕЗДНОЙ");
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    let expenses = [];
    appData.getExpenses = function () {
      let sum = 0;
      for (let i = 0; i < 2; i++) {
        expenses[i] = prompt("Введите обязательную статью расходов?", "raz");
        sum = prompt("Во сколько это обойдется?", 20000)
        appData.expenses[expenses[i]] = +sum;
        while (!isNumber(sum)) {
          sum = prompt("Во сколько это обойдется?", 20000);
          if (isNumber(sum)) {
            appData.expenses[expenses[i]] = +sum;
          };
        };

      };

      return appData.expenses;
    };

    appData.getExpensesMonth = function () {
      for (let key in appData.expenses) {
        appData.expensesMonth += appData.expenses[key];
      }
      return appData.expensesMonth;
    }
    appData.getExpenses();
    // console.log(appData.getExpenses());
    // console.log(appData.getExpensesMonth());
    console.log("Расходы за месяц: " + appData.getExpensesMonth());
    appData.getBudget = function () {
      return appData.budget - appData.expensesMonth;
    };

    appData.budgetMonth = appData.getBudget();


    //логи

    //Cрок достижения цели в месяцах(округление в большую сторону)
    appData.getTargetMonth = function () {
      return Math.ceil(appData.mission / appData.budgetMonth);
    };

    if (appData.getTargetMonth() < 0) {
      console.log("Цель не будет достигнута");
    } else {
      console.log("Цель будет достигнута через: " + appData.getTargetMonth() + " месяцев");
    }

    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    // console.log("Бюджет на день: " + Math.floor(appData.budgetDay));


    //уровень дохода, исходя из дневного бюджета
    appData.getStatusIncome = function () {
      if (appData.budgetDay > 1200) {
        return ("У вас высокий уровень дохода");
      } else if (appData.budgetDay > 600 & appData.budgetDay < 1200) {
        return ("У вас средний уровень дохода");
      } else if (appData.budgetDay >= 0 & appData.budgetDay < 600) {
        return ("К сожалению у вас уровень дохода ниже среднего");
      } else {
        return ("Что то пошло не так");
      };
    };
    appData.getTargetMonth();
    console.log(appData.getStatusIncome());

    console.log("Наша программа включает в себя данные: ")
    for (let prop in appData) {

      console.log("Cвойство: " + prop + " со значением " + appData[prop]);
    };


  },
};
appData.asking();




//вызов модальных окон

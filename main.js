'use strict';
let money = (prompt("Ваш месячный доход?")) * 1;
let income = "вторая работа";
let expenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let expenses2 = prompt("Перечислите возможные расходы за рассчитываемый период через запятую(2)");
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let amount = prompt("Во сколько это обойдется?") * 1;
let amount2 = prompt("Во сколько это обойдется?(2)") * 1;
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 50000;
let period = 12;
let getExpensesMonth = function (a, b) {
  return a + b;
};
let expensesMonth = getExpensesMonth(amount, amount2);

let getAccumulatedMonth = function (a, b) {
  return a - b;
};
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

const getTargetMonth = function (a, b) {
  return Math.ceil(a / b);
};
let targetMonth = getTargetMonth(mission, accumulatedMonth)

function showTypeOf(data) {
  console.log(typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log("Расходы за месяц: " + expensesMonth)
console.log(addExpenses.split(", "));
console.log("Цель будет достигнута через: " + targetMonth + " месяцев");
let budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));

let getStatusIncome = function () {
  if (budgetDay > 1200) {
    return ("У вас высокий уровень дохода");
  } else if (budgetDay > 600 & budgetDay < 1200) {
    return ("У вас средний уровень дохода");
  } else if (budgetDay >= 0 & budgetDay < 600) {
    return ("К сожалению у вас уровень дохода ниже среднего");
  } else {
    return ("Что то пошло не так");
  };
};
console.log(getStatusIncome());
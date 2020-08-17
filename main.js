'use strict';
let money = (prompt("Ваш месячный доход?")) * 1;
let income = "вторая работа";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let addExpenses2 = prompt("Перечислите возможные расходы за рассчитываемый период через запятую(2)");
let amount = prompt("Во сколько это обойдется?") * 1;
let amount2 = prompt("Во сколько это обойдется?(2)") * 1;
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 50000;
let period = 12;
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log((addExpenses.length + addExpenses2.length) * 1);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " долларов");
console.log((addExpenses.toLowerCase() + ", " + addExpenses2.toLowerCase()).split(", "));
let budgetMonth = money - (amount + amount2);
let budgetDay = budgetMonth / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));
console.log("Бюджет на месяц: " + budgetMonth);
let missionAccIn = mission / budgetMonth;
console.log("Цель будет достигнута через: " + Math.ceil(missionAccIn) + " месяцев");
if (budgetDay > 1200) {
  console.log("У вас высокий уровень дохода")
} else if (budgetDay > 600 & budgetDay < 1200) {
  console.log("У вас средний уровень дохода")
} else if (budgetDay >= 0 & budgetDay < 600) {
  console.log("К сожалению у вас уровень дохода ниже среднего")
} else {
  console.log("Что то пошло не так")
};

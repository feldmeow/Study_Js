'use strict';
let money = (prompt("Ваш месячный доход?")) * 1;
let money2 = (prompt("Ваш месячный доход?(2)")) * 1;
let income = "вторая работа";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let addExpenses2 = prompt("Перечислите возможные расходы за рассчитываемый период через запятую(2)");
let amount = prompt("Во сколько это обойдется?") * 1;
let amount2 = prompt("Во сколько это обойдется?(2)") * 1;
let deposit = confirm("Есть ли у вас депозит в банке?");
let deposit2 = confirm("Есть ли у вас депозит в банке?(2)");
let mission = 50000;
let period = 12;
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(addExpenses2.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(", "));
console.log(addExpenses2.toLowerCase().split(", "));
let budgetMonth = money - amount;
let budgetMonth2 = money2 - amount2;
let budgetDay = budgetMonth / 30;
let budgetDay2 = budgetMonth2 / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));
console.log("Бюджет на день(2): " + Math.floor(budgetDay2));
console.log("Бюджет на месяц: " + budgetMonth);
console.log("Бюджет на месяц(2): " + budgetMonth2);
let missionAccIn = mission / budgetMonth;
let missionAccIn2 = mission / budgetMonth2;
console.log("Цель будет достигнута через: " + Math.ceil(missionAccIn) + " месяцев");
console.log("Цель(2) будет достигнута через: " + Math.ceil(missionAccIn2) + " месяцев");
if (budgetDay > 1200) {
  console.log("У вас высокий уровень дохода")
} else if (budgetDay > 600 & budgetDay < 1200) {
  console.log("У вас средний уровень дохода")
} else if (budgetDay >= 0 & budgetDay < 600) {
  console.log("К сожалению у вас уровень дохода ниже среднего")
} else {
  console.log("Что то пошло не так")
};
if (budgetDay2 > 1200) {
  console.log("У вас высокий уровень дохода(2)")
} else if (budgetDay2 > 600 & budgetDay2 < 1200) {
  console.log("У вас средний уровень дохода(2)")
} else if (budgetDay2 >= 0 & budgetDay2 < 600) {
  console.log("К сожалению у вас уровень дохода ниже среднего(2)")
} else {
  console.log("Что то пошло не так(2)")
}
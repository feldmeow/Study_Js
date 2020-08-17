'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};




let money,
  income = "вторая работа",
  addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 50000,
  period = 12;

//проверка входящих данных
let start = function () {
  do {
    money = (prompt("Ваш месячный доход?"));
  }
  while (!isNumber(money));

};
start();

//вызов модальных окон
let expenses = [];
let getExpensesMonth = function () {
  let sum = 0;
  let amount = 0;
  for (let i = 0; i < 4; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов?");
    sum = prompt("Во сколько это обойдется?");
    amount += +sum
    while (!isNumber(sum)) {
      sum = prompt("Во сколько это обойдется?");
      if (isNumber(sum)) {
        amount += +sum;
      };
    };

  };

  console.log(expenses);
  return amount;
};

let expensesAmount = getExpensesMonth();
//Накопления за месяц
let getAccumulatedMonth = function (a, b) {
  return a - b;
};
let accumulatedMonth = getAccumulatedMonth(+money, expensesAmount);



//описание и вызов функции по определению типа данных
function showTypeOf(data) {
  console.log(typeof data);
};
showTypeOf(+money);
showTypeOf(income);
showTypeOf(deposit);

//логи
console.log("Расходы за месяц: " + expensesAmount)
console.log(addExpenses.toLowerCase().split(", "));

//Cрок достижения цели в месяцах(округление в большую сторону)
const getTargetMonth = function (a, b) {
  return Math.ceil(a / b);
};
let targetMonth = getTargetMonth(mission, accumulatedMonth)
if (targetMonth < 0) {
  console.log("Цель не будет достигнута");
} else {
  console.log("Цель будет достигнута через: " + targetMonth + " месяцев");
}

let budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));


//уровень дохода, исходя из дневного бюджета
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
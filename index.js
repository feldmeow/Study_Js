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
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  mission: 50000,
  percentDeposit: 0,
  moneyDeposit: 0,
  period: 3,
  asking: function () {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      let cashIncome
      do {
        itemIncome = prompt('Какой у вас дополнительный источник заработка?', 'выгул собак');
      } while (isNumber(itemIncome) || itemIncome === '' || itemIncome === null);
      do {
        cashIncome = prompt('Cколько в месяц вы на этом зарабатываете?', 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'ноутБУК, сТРАховка, пРОЕЗДНОЙ');
    addExpenses = addExpenses.toLowerCase();

    function UpperFirstLetter() {
      return addExpenses.replace(/(^|\s)\S/g, function (a) { return a.toUpperCase() })
    };

    console.log(UpperFirstLetter());
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let cashExpenses;
      let itemExpenses;
      do {
        itemExpenses = prompt('Введите обязательную статью расходов?', 'Коммуналка');

      } while (isNumber(itemExpenses) || itemExpenses === '' || itemExpenses === null);
      do {
        cashExpenses = prompt('Во сколько это обойдётся?', 20000)
      }
      while (!isNumber(cashExpenses));

      appData.expenses[itemExpenses] = cashExpenses;

    };

  },
  //Рассчёт обязательных месячных расходов
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }

  },
  //Рассчёт бюджета на месяц и на день
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  //Cрок достижения цели в месяцах(округление в большую сторону)
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },

  //Уовень дохода, исходя из дневного бюджета
  getStatusIncome: function () {
    if (appData.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay > 600 & appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0 & appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    };
  },
  // Депозит
  getInfoDeposit: function () {
    if (appData.deposit) {

      do {
        appData.percentDeposit = promt('Какой годовой процент?', 10);
      } while (100 >= +appData.percentDeposit >= 0);
      do {
        appData.moneyDeposit = promt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  // Собранные за период деньги
  calcSavedMoney: function () {
    return appData.budgetMonth * this.period;
  }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
  let num = appData.getTargetMonth();
  // функция изменения окончаний, в зависимости от количества месяцев, в результате возвращает порядковый элемент массива
  function enumerate(num, month) {
    if (num > 100) num = num % 100;
    if (num <= 20 && num >= 10) return month[2];
    if (num > 20) num = num % 10;
    return num === 1 ? month[0] : num > 1 && num < 5 ? month[1] : month[2];

  };
  console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' ' + enumerate(num, ['месяц', 'месяца', 'месяцев']));
} else {
  console.log('Цель не будет достигнута');
}
console.log(appData.getStatusIncome());

console.log()
for (let prop in appData) {

  console.log('Наша программа включает в себя данные: ' + prop + ' - ' + appData[prop]);
};

// Записываем элементы DOM-дерева в переменные
// кнопки
const calcButton = document.getElementById('start');
const incomeAddButton = document.getElementsByTagName('button')[0];
const expensesAddButton = document.getElementsByTagName('button')[1];
// чекбокс ДЕПОЗИТ
const checkDeposit = document.querySelector('#deposit-check');
// поля для ввода ВОЗМОЖНЫХ источников заработка
const additionalIncomeInput = document.querySelectorAll('.additional_income-item');
// переменные результатов (левая сторона)
const budgetMonthResult = document.getElementsByClassName('budget_month-value');
const budgetDayResult = document.getElementsByClassName('budget_day-value');
const expensesMonthResult = document.getElementsByClassName('expenses_month-value');
const additionalIncomeResult = document.getElementsByClassName('additional_income-value');
const additionalExpensesResult = document.getElementsByClassName('additional_expenses-value');
const incomePeriodResult = document.getElementsByClassName('income_period-value"');
const targetMonthResult = document.getElementsByClassName('target_month-value');
// оставшиеся поля (правая сторона)
const inputMoney = document.querySelector('.salary-amount');
// дополнительный доход
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
// обязательные расходы
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
// возможные расходы
const additionalExpenses = document.querySelector('.additional_expenses-item');
// цель
const targetAmount = document.querySelector('.target-amount');
// период
const periodValue = document.querySelector('.period-select');




'use strict';

// Записываем элементы DOM-дерева в переменные
// кнопки
let start = document.getElementById('start'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  // чекбокс ДЕПОЗИТ
  depositCheck = document.querySelector('#deposit-check'),
  // поля для ввода ВОЗМОЖНЫХ источников заработка
  additionalIncome = document.querySelectorAll('.additional_income-item'),
  // переменные результатов (правая сторона)
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  // оставшиеся поля (левая сторона)
  salaryAmount = document.querySelector('.salary-amount'),
  // дополнительный доход
  incomeTitle = document.querySelector('.income-title'),
  incomeItems = document.querySelectorAll('.income-items'),
  // обязательные расходы
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  // возможные расходы
  additionalExpenses = document.querySelector('.additional_expenses-item'),

  // цель
  targetAmount = document.querySelector('.target-amount'),
  // период
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');


let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  incomeMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    appData.budget = +salaryAmount.value;
    // Вызовы функций
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  // Запись данных в инпуты справа(результаты)
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', this.showResult);
  },
  // добавление блока с ОБЯЗАТЕЛЬНЫМИ РАСХОДАМИ
  addExpensesBlock: function () {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  // добавление блока с ДОПОЛОНИТЕЛЬНЫМИ ДОХОДАМИ
  addIncomeBlock: function () {

    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  // добавление значения дополнительных расходов в объект appData.expenses
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }

    });
  },
  // создание массива из строки с возможными расходами
  getAddExpenses: function () {
    let addExpenses = additionalExpenses.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  // создание массива из строки с возможными доходами
  getAddIncome: function () {
    additionalIncome.forEach(function (item) {
      let itemValue = item.value.trim();
      if (item !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  // добавление значения дополнительных доходов в объект appData.income
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }

    });
  },

  //Рассчёт обязательных месячных расходов
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  //Рассчёт дополнительных месячных доходов
  getIncomeMonth: function () {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  //Рассчёт бюджета на месяц и на день
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  //Cрок достижения цели в месяцах(округление в большую сторону)
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  }
};

periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);


start.addEventListener("mouseenter", function () {
  if (salaryAmount.value !== '') {
    start.addEventListener('click', appData.start);
  } else {
    start.removeEventListener('click', appData.start);
  };
});



// if (appData.getTargetMonth() > 0) {
//   let num = appData.getTargetMonth();
//   // функция изменения окончаний, в зависимости от количества месяцев, в результате возвращает порядковый элемент массива
//   function enumerate(num, month) {
//     if (num > 100) num = num % 100;
//     if (num <= 20 && num >= 10) return month[2];
//     if (num > 20) num = num % 10;
//     return num === 1 ? month[0] : num > 1 && num < 5 ? month[1] : month[2];

//   };
//   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' ' + enumerate(num, ['месяц', 'месяца', 'месяцев']));
// } else {
//   console.log('Цель не будет достигнута');
// }

// console.log()
// for (let prop in appData) {

//   console.log('Наша программа включает в себя данные: ' + prop + ' - ' + appData[prop]);
// };






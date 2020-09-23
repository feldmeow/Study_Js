'use strict';

// Записываем элементы DOM-дерева в переменные
// кнопки
let start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  dataBlock = document.querySelector('.data'),

  allInputs = document.querySelectorAll('input'),
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
    this.budget = +salaryAmount.value;
    // Вызовы функций
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    setDisabled();
    setButtonCancel();
  },
  reset: function () {

    setButtonStart();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    resetData();
    this.budget = +salaryAmount.value;
    removeInputs(incomeItems);
    removeInputs(expensesItems);
    addBtn(incomePlus);
    addBtn(expensesPlus);
  },
  // Запись данных в инпуты справа(результаты)
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function () {
      periodAmount.textContent = periodSelect.value;
      if (appData.budget > 0) {
        targetMonthValue.value = appData.getTargetMonth();
      }
    });

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
        this.addExpenses.push(item);
      }
    }, appData);
  },
  // создание массива из строки с возможными доходами
  getAddIncome: function () {
    additionalIncome.forEach(function (item) {

      if (item.value !== '') {
        let itemValue = item.value.trim();
        this.addIncome.push(itemValue);
      }

    }, appData);
  },
  // добавление значения дополнительных доходов в объект appData.income
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }

    }, appData);
  },

  //Рассчёт обязательных месячных расходов
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }

  },

  //Рассчёт дополнительных месячных доходов
  getIncomeMonth: function () {
    for (let key in appData.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  //Рассчёт бюджета на месяц и на день
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },

  //Cрок достижения цели в месяцах(округление в большую сторону)
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },

  //Уовень дохода, исходя из дневного бюджета
  getStatusIncome: function () {
    if (this.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay > 600 & this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0 & this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    };
  },
  // Депозит
  getInfoDeposit: function () {
    if (this.deposit) {

      do {
        this.percentDeposit = promt('Какой годовой процент?', 10);
      } while (100 >= +this.percentDeposit >= 0);
      do {
        this.moneyDeposit = promt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },

  // Собранные за период деньги
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },


};

// отключение инпутов

function setDisabled() {
  const dataInputs = dataBlock.querySelectorAll('input');
  for (let i = 0; i < dataInputs.length - 1; i++) {
    dataInputs[i].setAttribute('disabled', 'disabled');
  };
};
// замена кнопок
function setButtonCancel() {
  start.style.display = 'none';
  cancel.style.display = 'block';
};
function setButtonStart() {
  start.style.display = 'block';
  cancel.style.display = 'none';
};
// сброс инпутов
function resetData() {
  const dataInputs = dataBlock.querySelectorAll('input');
  dataInputs.forEach(function (elem) {
    elem.removeAttribute('disabled');
  });
  allInputs.forEach(function (elem) {
    elem.value = '';
  });
  periodSelect.value = 1;
};

// удаление полей при надобности
function removeInputs(data) {
  for (let i = 1; i < data.length; i++) {
    data[0].parentNode.removeChild(data[i]);
  };

};
function addBtn(btn) {
  btn.style.display = 'block';
}

appData.start = appData.start.bind(appData);
appData.reset = appData.reset.bind(appData);
appData.showResult = appData.showResult.bind(appData);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

salaryAmount.addEventListener('focusout', function () {
  if (salaryAmount.value !== '') {
    start.addEventListener('click', appData.start);
  } else {
    start.removeEventListener('click', appData.start);
  };
});
cancel.addEventListener('click', function () {
  appData.reset();
  start.removeEventListener('click', appData.start);
});

periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value
  if (appData.budget > 0) {
    appData.calcPeriod();
    incomePeriodValue.value = appData.calcPeriod();

  }
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
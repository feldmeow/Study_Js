'use strict';

// Записываем элементы DOM-дерева в переменные
// кнопки
let startBtn = document.getElementById('start'),
  cancelBtn = document.getElementById('cancel'),
  dataBlock = document.querySelector('.data'),
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
const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.expensesMonth = 0;
  this.incomeMonth = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;

};
AppData.prototype.starting = function () {
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
  this.setDisabled();
  this.setButtonCancel();
};
AppData.prototype.reset = function () {
  startBtn.removeEventListener('click', appData.starting);
  this.expenses = {};
  this.expensesMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addExpenses = [];
  this.resetData();
  this.getExpenses();
  this.budget = +salaryAmount.value;
  this.setButtonStart();
  this.removeInputs(incomeItems);
  this.removeInputs(expensesItems);
  this.getIncome();
  this.getExpensesMonth();
  this.getIncomeMonth();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  this.addBtn(incomePlus);
  this.addBtn(expensesPlus);

};
// Запись данных в инпуты справа(результаты)
AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();


};
// добавление блока с ОБЯЗАТЕЛЬНЫМИ РАСХОДАМИ
AppData.prototype.addExpensesBlock = function () {

  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
};
// добавление блока с ДОПОЛОНИТЕЛЬНЫМИ ДОХОДАМИ
AppData.prototype.addIncomeBlock = function () {

  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};
// добавление значения дополнительных расходов в объект appData.expenses
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
// создание массива из строки с возможными расходами
AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpenses.value.split(', ');
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};
// создание массива из строки с возможными доходами
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncome.forEach(function (item) {

    if (item.value !== '') {
      let itemValue = item.value.trim();
      _this.addIncome.push(itemValue);
    } else {
      _this.addIncome = [];
    }

  });
};
// добавление значения дополнительных доходов в объект appData.income
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }

  });
};

//Рассчёт обязательных месячных расходов
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }

};

//Рассчёт дополнительных месячных доходов
AppData.prototype.getIncomeMonth = function () {
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

//Рассчёт бюджета на месяц и на день
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

//Cрок достижения цели в месяцах(округление в большую сторону)
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

//Уовень дохода, исходя из дневного бюджета
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay > 600 & this.budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay >= 0 & this.budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  };
};
// Депозит
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {

    do {
      this.percentDeposit = promt('Какой годовой процент?', 10);
    } while (100 >= +this.percentDeposit >= 0);
    do {
      this.moneyDeposit = promt('Какая сумма заложена?', 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};

// Собранные за период деньги
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};


// отключение инпутов

AppData.prototype.setDisabled = function () {
  const dataInputs = dataBlock.querySelectorAll('input');
  for (let i = 0; i < dataInputs.length - 1; i++) {
    dataInputs[i].setAttribute('disabled', 'disabled');
  };
};
// замена кнопок
AppData.prototype.setButtonCancel = function setButtonCancel() {
  startBtn.style.display = 'none';
  cancelBtn.style.display = 'block';
};
AppData.prototype.setButtonStart = function setButtonStart() {
  startBtn.style.display = 'block';
  cancelBtn.style.display = 'none';
};
// сброс инпутов
AppData.prototype.resetData = function () {
  const dataInputs = dataBlock.querySelectorAll('input');
  dataInputs.forEach(function (elem) {
    elem.value = '';
  });
  dataInputs.forEach(function (elem) {
    elem.removeAttribute('disabled');
  });
  periodSelect.value = 1;
};

// удаление полей при надобности
AppData.prototype.removeInputs = function (data) {
  for (let i = 1; i < data.length; i++) {
    data[0].parentNode.removeChild(data[i]);
  };

};
AppData.prototype.addBtn = function (btn) {
  btn.style.display = 'block';
}
// Слушатели событий
AppData.prototype.eventListeners = function () {
  expensesPlus.addEventListener('click', appData.addExpensesBlock);
  incomePlus.addEventListener('click', appData.addIncomeBlock);

  salaryAmount.addEventListener('focusout', function () {
    if (salaryAmount.value !== '') {
      startBtn.addEventListener('click', appData.starting.bind(appData), { once: true });
    } else {
      startBtn.removeEventListener('click', appData.starting.bind(appData));
    };
  });
  cancelBtn.addEventListener('click', function () {
    appData.reset();
    start.removeEventListener('click', appData.starting);
  });
  periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
    if (appData.budget > 0) {
      targetMonthValue.value = appData.getTargetMonth();
      incomePeriodValue.value = appData.calcPeriod();
    }
  });
};

const appData = new AppData();
appData.eventListeners();



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
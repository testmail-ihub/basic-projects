const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('money-plus');
const expenseDisplay = document.getElementById('money-minus');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const list = document.getElementById('list');
const clearBtn = document.getElementById('clear-btn');

// Load data from localStorage
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Render transactions
const renderTransactions = () => {
  list.innerHTML = '';
  transactions.forEach((transaction) => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(
      transaction.amount < 0 ? 'minus' : 'plus',
      'transaction'
    );
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;

    list.appendChild(item);
  });
};

// Calculate totals
const calculateTotals = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0);

  updateDisplay(total, income, expense);
};

// Update display
const updateDisplay = (total, income, expense) => {
  balanceDisplay.textContent = `${total}`;
  incomeDisplay.textContent = `${income}`;
  expenseDisplay.textContent = `${expense}`;
};

// Remove transaction by ID
const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  renderTransactions();
};

// Add transaction
const addTransaction = (text, amount) => {
  const transaction = {
    id: generateId(),
    text,
    amount,
  };

  transactions.push(transaction);

  updateLocalStorage();
  renderTransactions();
};

// Generate random ID
const generateId = () =>
  Math.floor(Math.random() * 10000000000000000);

// Update localStorage
const updateLocalStorage = () =>
  localStorage.setItem('transactions', JSON.stringify(transactions));

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = textInput.value.trim();
  const amount = parseInt(amountInput.value.trim());

  if (text && amount) {
    addTransaction(text, amount);

    textInput.value = '';
    amountInput.value = '';
  }
});

clearBtn.addEventListener('click', () => {
  transactions = [];
  updateLocalStorage();
  renderTransactions();
});

// Initial render
calculateTotals();
renderTransactions();
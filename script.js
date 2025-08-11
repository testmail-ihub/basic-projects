,{
  const transactions = getTransactionsFromLocalStorage();
  const balance = calculateBalance(transactions);
  updateBalanceUI(balance);
  renderTransactionHistory(transactions);
}

// Function to get transactions from localStorage
function getTransactionsFromLocalStorage() {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  return transactions;
}

// Function to save transactions to localStorage
function saveTransactionsToLocalStorage(transactions) {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Function to calculate the balance
function calculateBalance(transactions) {
  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
}

// Function to update the balance in the UI
function updateBalanceUI(balance) {
  const balanceElement = document.getElementById('balance');
  balanceElement.textContent = `Balance: ${balance.toFixed(2)}`;
}

// Function to render transaction history in the UI
function renderTransactionHistory(transactions) {
  const transactionList = document.getElementById('transaction-list');
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const transactionItem = document.createElement('li');
    transactionItem.textContent = `${transaction.description}: ${transaction.amount.toFixed(2)}`;
    transactionList.appendChild(transactionItem);
  });
}

// Function to handle adding a new transaction
function addTransaction(description, amount) {
  const transactions = getTransactionsFromLocalStorage();
  const newTransaction = { description, amount };

  if (amount < 0) {
    const balance = calculateBalance(transactions);
    if (balance + amount < 0) {
      alert('Insufficient balance for this expense!');
      return;
    }
  }

  transactions.push(newTransaction);
  saveTransactionsToLocalStorage(transactions);
  updateBalanceUI(calculateBalance(transactions));
  renderTransactionHistory(transactions);
}

// Event listener for the transaction form submission
document.getElementById('transaction-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (description && !isNaN(amount)) {
    addTransaction(description, amount);
    document.getElementById('transaction-form').reset();
  } else {
    alert('Please provide valid inputs for description and amount.');
  }
});

// Initialize the application
init();
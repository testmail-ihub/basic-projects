,{
  // Selectors
  const balanceElement = document.getElementById('balance');
  const transactionListElement = document.getElementById('transaction-list');
  const formElement = document.getElementById('transaction-form');
  const nameInputElement = document.getElementById('transaction-name');
  const amountInputElement = document.getElementById('transaction-amount');

  // State
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  // Initialize the application
  const init = () => {
    formElement.addEventListener('submit', addTransaction);
    renderTransactions();
    updateBalance();
  };

  // Add a new transaction
  const addTransaction = (event) => {
    event.preventDefault();
    const name = nameInputElement.value.trim();
    const amount = parseFloat(amountInputElement.value.trim());

    if (name === '' || isNaN(amount)) {
      alert('Please enter valid transaction details.');
      return;
    }

    const transaction = {
      id: generateId(),
      name,
      amount
    };

    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();
    updateBalance();
    formElement.reset();
  };

  // Generate a unique ID for each transaction
  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  // Render transactions to the DOM
  const renderTransactions = () => {
    transactionListElement.innerHTML = '';
    transactions.forEach(transaction => {
      const transactionElement = document.createElement('li');
      transactionElement.classList.add('transaction');
      transactionElement.innerHTML = `
        ${transaction.name} <span>${transaction.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="ExpenseTracker.deleteTransaction('${transaction.id}')">x</button>
      `;
      transactionListElement.appendChild(transactionElement);
    });
  };

  // Update the balance
  const updateBalance = () => {
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    balanceElement.innerText = `Balance: ${total.toFixed(2)}`;
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);
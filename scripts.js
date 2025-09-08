,{
  let balance = 0;
  const expenses = [];

  // Function to add a new expense
  const addExpense = (description, amount) => {
    const expense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
    };
    expenses.push(expense);
    updateBalance(-expense.amount);
    displayExpenses();
  };

  // Function to update the balance
  const updateBalance = (amount) => {
    balance += amount;
    document.getElementById('balance').textContent = `Balance: ${balance.toFixed(2)}`;
  };

  // Function to display the expense history
  const displayExpenses = () => {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear existing list

    expenses.forEach(expense => {
      const expenseItem = document.createElement('li');
      expenseItem.textContent = `${expense.description}: ${expense.amount.toFixed(2)}`;
      expenseList.appendChild(expenseItem);
    });
  };

  // Initialize event listeners
  const init = () => {
    document.getElementById('expense-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const description = document.getElementById('expense-name').value;
      const amount = document.getElementById('expense-amount').value;
      if (description && amount) {
        addExpense(description, amount);
        document.getElementById('expense-form').reset();
      }
    });
  };

  return {
    init,
  };
})();

// Initialize the expense tracker
document.addEventListener('DOMContentLoaded', () => {
  ExpenseTracker.init();
});
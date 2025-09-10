,{
  let expenses = [];
  let balance = 0;

  // DOM Elements
  const amountInput = document.getElementById('amount');
  const descriptionInput = document.getElementById('description');
  const categoryInput = document.getElementById('category');
  const expenseForm = document.getElementById('expense-form');
  const expenseTableBody = document.getElementById('expense-table-body');
  const balanceDisplay = document.getElementById('balance');

  // Initialize Event Listeners
  const initEventListeners = () => {
    expenseForm.addEventListener('submit', handleFormSubmit);
  };

  // Handle Form Submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value.trim();
    const category = categoryInput.value.trim();

    if (isValidExpense(amount, description, category)) {
      addExpense(amount, description, category);
      updateBalance();
      renderExpenseTable();
      clearForm();
    }
  };

  // Validate Expense Inputs
  const isValidExpense = (amount, description, category) => {
    return !isNaN(amount) && amount > 0 && description && category;
  };

  // Add Expense
  const addExpense = (amount, description, category) => {
    expenses.push({ amount, description, category });
  };

  // Update Balance
  const updateBalance = () => {
    balance = expenses.reduce((acc, expense) => acc - expense.amount, 0);
    balanceDisplay.textContent = `Balance: ${balance.toFixed(2)}`;
  };

  // Render Expense Table
  const renderExpenseTable = () => {
    expenseTableBody.innerHTML = '';
    expenses.forEach((expense, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${expense.amount.toFixed(2)}</td>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
      `;
      expenseTableBody.appendChild(row);
    });
  };

  // Clear Form Inputs
  const clearForm = () => {
    amountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';
  };

  // Initialize the Module
  const init = () => {
    initEventListeners();
  };

  return { init };
})();

// Initialize Expense Tracker
ExpenseTracker.init();
,{
    constructor() {
        this.expenses = [];
        this.balance = 0;
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
    }

    cacheDOM() {
        this.expenseForm = document.getElementById('expense-form');
        this.expenseNameInput = document.getElementById('expense-name');
        this.expenseAmountInput = document.getElementById('expense-amount');
        this.expenseList = document.getElementById('expense-list');
        this.balanceDisplay = document.getElementById('balance');
    }

    bindEvents() {
        this.expenseForm.addEventListener('submit', this.addExpense.bind(this));
    }

    addExpense(event) {
        event.preventDefault();
        const name = this.expenseNameInput.value.trim();
        const amount = parseFloat(this.expenseAmountInput.value.trim());

        if (name && !isNaN(amount) && amount > 0) {
            const expense = { name, amount };
            this.expenses.push(expense);
            this.updateBalance();
            this.render();
            this.clearForm();
        }
    }

    updateBalance() {
        const totalExpenses = this.expenses.reduce((total, expense) => total + expense.amount, 0);
        this.balance = totalExpenses;
    }

    render() {
        this.expenseList.innerHTML = '';
        this.expenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.name}: ${expense.amount.toFixed(2)}`;
            this.expenseList.appendChild(li);
        });
        this.balanceDisplay.textContent = `Total Expenses: ${this.balance.toFixed(2)}`;
    }

    clearForm() {
        this.expenseNameInput.value = '';
        this.expenseAmountInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ExpenseTracker();
});
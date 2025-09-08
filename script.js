document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const balanceDisplay = document.getElementById('balance');
    let balance = 0;

    const updateBalance = (amount) => {
        balance += amount;
        balanceDisplay.textContent = `Balance: ${balance.toFixed(2)}`;
    };

    const addExpenseToList = (description, amount) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${description}: ${amount.toFixed(2)}`;
        expenseList.appendChild(listItem);
    };

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(expenseForm);
        const description = formData.get('description');
        const amount = parseFloat(formData.get('amount'));

        if (description && !isNaN(amount)) {
            addExpenseToList(description, amount);
            updateBalance(-amount);
            expenseForm.reset();
        } else {
            alert('Please enter a valid description and amount.');
        }
    });

    // Initial balance display
    updateBalance(0);
});
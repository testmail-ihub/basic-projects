const balanceDisplay = document.getElementById('balance');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionBody = document.getElementById('transaction-body');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const renderTransactions = () => {
    transactionBody.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td><button onclick="deleteTransaction(${index})">Delete</button></td>
        `;
        transactionBody.appendChild(row);
    });
};

const calculateBalance = () => {
    const total = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    balanceDisplay.textContent = total;
};

const addTransaction = (e) => {
    e.preventDefault();
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (description && !isNaN(amount) && type) {
        transactions.push({ description, amount, type });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
        calculateBalance();
        descriptionInput.value = '';
        amountInput.value = '';
    }
};

const deleteTransaction = (index) => {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    calculateBalance();
};

form.addEventListener('submit', addTransaction);
renderTransactions();
calculateBalance();
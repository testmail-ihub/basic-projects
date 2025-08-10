const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('money-plus');
const expenseDisplay = document.getElementById('money-minus');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const list = document.getElementById('list');
const clearBtn = document.getElementById('clear-btn');

// const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));
let localStorageTransaction = localStorage.getItem('transactions') !== null ? JSON.parse(localStorage.getItem('transactions')) : [];

// Add transaction to localStorage
function addTransactionToLocalStorage(transaction) {
    localStorageTransaction.push(transaction);

    localStorage.setItem('transactions', JSON.stringify(localStorageTransaction));
}

// Add transactions to DOM list
function addTransactionToDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> 
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// Update the balance incomes and expense
function updateValues() {
    const amounts = localStorageTransaction.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    // Update balance incomes and expense
    balanceDisplay.textContent = `£${total}`;
    incomeDisplay.textContent = `£${income}`;
    expenseDisplay.textContent = `£${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    localStorageTransaction = localStorageTransaction.filter(transaction => transaction.id !== id);

    localStorage.setItem('transactions', JSON.stringify(localStorageTransaction));

    init();
}

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        // Get the form data
        const transaction = {
            id: generateID(),
            text: textInput.value,
            amount: +amountInput.value
        };

        // Add transaction to localStorage
        addTransactionToLocalStorage(transaction);

        // Add transaction to DOM list
        addTransactionToDOM(transaction);

        // Clear the form
        textInput.value = '';
        amountInput.value = '';

        // Update values
        updateValues();
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Init app
function init() {
    // Clear the list
    list.innerHTML = '';

    // Re-populate transactions
    localStorageTransaction.forEach(addTransactionToDOM);
    updateValues();
}

init();

// Event listeners
form.addEventListener('submit', addTransaction);
clearBtn.addEventListener('click', () => {
    // Clear all transactions from localStorage
    localStorage.clear();
    init();
});
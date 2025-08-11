,{
    loadTransactions();
    updateBalance();
}

// Function to add a transaction (income or expense)
function addTransaction(type, description, amount) {
    const transaction = {
        id: Date.now(),
        type,
        description,
        amount: parseFloat(amount)
    };

    const transactions = getTransactions();
    transactions.push(transaction);
    saveTransactions(transactions);
    updateTransactionHistory();
    updateBalance();
}

// Function to calculate and update the total balance
function updateBalance() {
    const transactions = getTransactions();
    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);

    document.getElementById('balance').textContent = `Total Balance: ${balance.toFixed(2)}`;
}

// Function to update the transaction history table
function updateTransactionHistory() {
    const transactions = getTransactions();
    const transactionTable = document.getElementById('transaction-history');
    transactionTable.innerHTML = ''; // Clear existing rows

    transactions.forEach(transaction => {
        const row = transactionTable.insertRow();
        row.insertCell(0).textContent = transaction.description;
        row.insertCell(1).textContent = transaction.type;
        row.insertCell(2).textContent = `${transaction.amount.toFixed(2)}`;
    });
}

// Function to get transactions from localStorage
function getTransactions() {
    const transactions = localStorage.getItem('transactions');
    return transactions ? JSON.parse(transactions) : [];
}

// Function to save transactions to localStorage
function saveTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Function to load transactions from localStorage and update UI
function loadTransactions() {
    updateTransactionHistory();
}

// Event listeners for form submission
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    if (description && amount) {
        addTransaction(type, description, amount);
        document.getElementById('transaction-form').reset();
    }
});

// Initialize the application
init();
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Fetch expenses from localStorage or initialize empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render expenses
function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      Name:-${expense.name}, Price:-${expense.amount}, Date:-${expense.date}
      <div>
        <button onclick="editExpense(${index})">Edit</button>
        <button onclick="deleteExpense(${index})">Delete</button>
      </div>
    `;
    expenseList.appendChild(li);
  });
}

// Function to add or edit expense
function addExpense(e) {
  e.preventDefault();
  const name = document.getElementById('expense-name').value;
  const amount = document.getElementById('expense-amount').value;
  const date = document.getElementById('expense-date').value;

  // Add new expense
  expenses.push({ name, amount, date });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  expenseForm.reset();
}

// Function to edit expense
function editExpense(index) {
  const expense = expenses[index];
  document.getElementById('expense-name').value = expense.name;
  document.getElementById('expense-amount').value = expense.amount;
  document.getElementById('expense-date').value = expense.date;
  expenses.splice(index, 1); // Remove the expense being edited
}

// Function to delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

// Event Listener
expenseForm.addEventListener('submit', addExpense);

// Initial Render
renderExpenses();

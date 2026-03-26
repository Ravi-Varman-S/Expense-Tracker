let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");

    li.classList.add(t.amount > 0 ? "income" : "expense");

    li.innerHTML = `
      ${t.text} <span>₹${t.amount}</span>
      <button onclick="deleteTransaction(${index})">X</button>
    `;

    list.appendChild(li);

    if (t.amount > 0) income += t.amount;
    else expense += t.amount;
  });

  document.getElementById("income").innerText = "₹" + income;
  document.getElementById("expense").innerText = "₹" + Math.abs(expense);
  document.getElementById("balance").innerText = "₹" + (income + expense);
}

function addTransaction() {
  const text = document.getElementById("text").value.trim();
  const amount = +document.getElementById("amount").value;

  if (text === "" || amount === 0) return;

  transactions.push({ text, amount });

  saveData();
  updateUI();

  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveData();
  updateUI();
}

updateUI();
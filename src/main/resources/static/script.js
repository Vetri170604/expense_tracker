// ================= STORAGE =================

let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = localStorage.getItem("currentUser");

let pieChart;
let monthlyChart;
let editIndex = -1;


// ================= CATEGORY LIMIT =================

const limits = {
Food:Infinity,
Medical:Infinity,
Education:Infinity,
Transport:3000,
Shopping:2000,
Bills:5000,
Entertainment:1500,
Others:1000
};


// ================= SAVE USERS =================

function saveUsers(){
localStorage.setItem("users", JSON.stringify(users));
}


// ================= REGISTER =================

function register(){

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

if(!username || !password){
alert("Enter username and password");
return;
}

if(users[username]){
alert("User already exists");
return;
}

users[username] = {
password: password,
profile: null,
expenses: []
};

saveUsers();

alert("Register success! Now login.");

}


// ================= LOGIN =================

function login(){

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

if(!users[username]){
alert("User not found");
return;
}

if(users[username].password !== password){
alert("Wrong password");
return;
}

localStorage.setItem("currentUser", username);

window.location.href = "index.html";

}


// ================= LOGOUT =================

function logout(){

localStorage.removeItem("currentUser");

window.location.href = "login.html";

}


// ================= PAGE LOAD CHECK =================

document.addEventListener("DOMContentLoaded", function(){

let page = window.location.pathname.split("/").pop();

if(page === "login.html"){
return;
}

currentUser = localStorage.getItem("currentUser");

if(!currentUser){
window.location.href = "login.html";
return;
}

initApp();

});


// ================= INIT APP =================

function initApp(){

let user = users[currentUser];

if(!user.profile){

let name = prompt("Enter your name");
let income = prompt("Enter monthly income");

user.profile = {
name: name,
income: Number(income)
};

saveUsers();

}

document.getElementById("welcome").innerText =
"Welcome " + user.profile.name;

updateUI();

}


// ================= ADD / UPDATE EXPENSE =================

function addExpense(){

let name = document.getElementById("expenseName").value;
let amount = Number(document.getElementById("amount").value);
let category = document.getElementById("category").value;
let payment = document.getElementById("payment").value;

let user = users[currentUser];

let totalCategory = 0;

user.expenses.forEach(e=>{
if(e.category === category){
totalCategory += e.amount;
}
});

if(totalCategory + amount > limits[category]){

document.getElementById("limitMessage").innerText =
"Category limit exceeded";

document.getElementById("aiSuggestion").innerText =
"Reduce " + category + " spending";

return;

}

let expense = {
name,
amount,
category,
payment,
date: new Date().toLocaleString()
};

if(editIndex === -1){
user.expenses.push(expense);
}else{
user.expenses[editIndex] = expense;
editIndex = -1;
}

saveUsers();

document.getElementById("expenseName").value="";
document.getElementById("amount").value="";

updateUI();

}


// ================= UPDATE DASHBOARD =================

function updateUI(){

let user = users[currentUser];

let total = 0;

user.expenses.forEach(e => total += e.amount);

let income = user.profile.income;

let balance = income - total;

let saving = balance > 0 ? balance : 0;
let debt = balance < 0 ? Math.abs(balance) : 0;

document.getElementById("expenseTotal").innerText = "₹"+total;
document.getElementById("balance").innerText = "₹"+balance;
document.getElementById("saving").innerText = "₹"+saving;
document.getElementById("debt").innerText = "₹"+debt;

renderList();
renderPie();
renderMonthly();

expensePrediction();
financialScore();

}


// ================= EXPENSE LIST =================

function renderList(){

let user = users[currentUser];

let tbody = document.getElementById("expenseList");

tbody.innerHTML="";

user.expenses.forEach((e,i)=>{

tbody.innerHTML += `
<tr>
<td>${e.name}</td>
<td>₹${e.amount}</td>
<td>${e.category}</td>
<td>${e.payment}</td>
<td>${e.date}</td>
<td>
<button onclick="editExpense(${i})">Edit</button>
<button onclick="deleteExpense(${i})">Delete</button>
</td>
</tr>
`;

});

}


// ================= EDIT (FIXED) =================

function editExpense(i){

let e = users[currentUser].expenses[i];

document.getElementById("expenseName").value = e.name;
document.getElementById("amount").value = e.amount;
document.getElementById("category").value = e.category;
document.getElementById("payment").value = e.payment;

editIndex = i;

// scroll to form
window.scrollTo({ top: 0, behavior: "smooth" });

}


// ================= DELETE =================

function deleteExpense(i){

users[currentUser].expenses.splice(i,1);

saveUsers();

updateUI();

}


// ================= PIE CHART =================

function renderPie(){

let user = users[currentUser];

let data = {};

user.expenses.forEach(e=>{
if(!data[e.category]) data[e.category]=0;
data[e.category]+=e.amount;
});

if(pieChart) pieChart.destroy();

pieChart = new Chart(document.getElementById("pieChart"),{
type:"pie",
data:{
labels:Object.keys(data),
datasets:[{ data:Object.values(data) }]
}
});

}


// ================= MONTHLY CHART =================

function renderMonthly(){

let user = users[currentUser];

let months = {};

user.expenses.forEach(e=>{
let m = new Date(e.date).getMonth()+1;
if(!months[m]) months[m]=0;
months[m]+=e.amount;
});

if(monthlyChart) monthlyChart.destroy();

monthlyChart = new Chart(document.getElementById("monthlyChart"),{
type:"bar",
data:{
labels:Object.keys(months),
datasets:[{
label:"Monthly Expense",
data:Object.values(months)
}]
}
});

}


// ================= EXPENSE PREDICTION =================

function expensePrediction(){

let user = users[currentUser];

if(!user.expenses.length){
document.getElementById("prediction").innerText="No data";
return;
}

let total = 0;
user.expenses.forEach(e=> total += e.amount);

let avg = total / user.expenses.length;
let predicted = Math.round(avg * 30);

document.getElementById("prediction").innerText = "₹"+predicted;

}


// ================= FINANCIAL SCORE =================

function financialScore(){

let user = users[currentUser];

let income = user.profile.income;

let total = 0;
user.expenses.forEach(e=> total += e.amount);

let ratio = total / income;

let score;

if(ratio <= 0.5) score = "Excellent";
else if(ratio <= 0.7) score = "Good";
else if(ratio <= 0.9) score = "Warning";
else score = "Danger";

document.getElementById("healthScore").innerText = score;

}


// ================= REPORT =================

function generateReport(){

let user = users[currentUser];

let total=0;
let category={};

user.expenses.forEach(e=>{
total+=e.amount;
if(!category[e.category]) category[e.category]=0;
category[e.category]+=e.amount;
});

let html="<h4>Monthly Report</h4>";
html+="Total Expense: ₹"+total+"<br><br>";

for(let c in category){
html+=c+" : ₹"+category[c]+"<br>";
}

document.getElementById("reportOutput").innerHTML=html;

}


// ================= PDF DOWNLOAD (FIXED) =================

function downloadPDF(){

generateReport();

let content = document.getElementById("reportOutput").innerHTML;

if(!content || content.trim() === ""){
alert("Generate report first!");
return;
}

let win = window.open("", "", "height=700,width=700");

win.document.write("<html><head><title>Report</title></head><body>");
win.document.write("<h2>Expense Report</h2>");
win.document.write(content);
win.document.write("</body></html>");

win.document.close();

setTimeout(() => {
win.print();
}, 500);

}


// ================= EXCEL DOWNLOAD (FIXED) =================

function downloadExcel(){

let user = users[currentUser];

let csv = "Name,Amount,Category,Payment,Date\n";

user.expenses.forEach(e=>{

let formattedDate = new Date(e.date).toLocaleString();

csv += `"${e.name}",${e.amount},"${e.category}","${e.payment}","${formattedDate}"\n`;

});

let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

let url = window.URL.createObjectURL(blob);

let a = document.createElement("a");
a.href = url;
a.download = "expenses.csv";

document.body.appendChild(a);
a.click();
a.remove();

}


// ================= DARK MODE =================

function toggleDark(){
document.body.classList.toggle("dark");
}
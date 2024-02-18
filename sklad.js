let stock = [
    { name: "Protein", price: 789, quantity: 450 },
    { name: "Trhačky", price: 229, quantity: 400 },
    { name: "Bandáže na zápěstí", price: 279, quantity: 520 },
    { name: "Nakopávač", price: 1199, quantity: 200 },
    { name: "Pás", price: 1299, quantity: 150 },
];

function initializeTable() {
    let tbody = document.getElementById("stockBody");
    stock.forEach(product => {
        let row = tbody.insertRow();
        row.insertCell().innerText = product.name;
        row.insertCell().innerText = product.price;
        row.insertCell().innerText = product.quantity;
    });
}

initializeTable();

function applyFilters() {
    let sortPrice = document.getElementById("sortPrice").value;
    let sortQuantity = document.getElementById("sortQuantity").value;
    
    let sortedStock = [...stock]; 
    
    if (sortPrice !== "none") {
        sortedStock.sort((a, b) => {
            if (sortPrice === "asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }
    
    if (sortQuantity !== "none") {
        sortedStock.sort((a, b) => {
            if (sortQuantity === "asc") {
                return a.quantity - b.quantity;
            } else {
                return b.quantity - a.quantity;
            }
        });
    }
    
    updateTable(sortedStock);
}

function resetFilters() {
    document.getElementById("sortPrice").value = "none";
    document.getElementById("sortQuantity").value = "none";
    updateTable(stock);
}

function updateTable(products) {
    let tbody = document.getElementById("stockBody");
    tbody.innerHTML = "";
    products.forEach(product => {
        let row = tbody.insertRow();
        row.insertCell().innerText = product.name;
        row.insertCell().innerText = product.price;
        row.insertCell().innerText = product.quantity;
    });
}
function showProductsBelowThreshold() {
    let threshold = parseInt(document.getElementById("quantityThreshold").value);
    let filteredProducts = stock.filter(product => product.quantity < threshold);
    let tbody = document.getElementById("stockBody");
    tbody.innerHTML = "";
    filteredProducts.forEach(product => {
        let row = tbody.insertRow();
        row.insertCell().innerText = product.name;
        row.insertCell().innerText = product.price;
        row.insertCell().innerText = product.quantity;
    });
}

function calculateTotalValue() {
    let totalValue = stock.reduce((total, product) => total + (product.price * product.quantity), 0);
    alert("Celková hodnota zásob: " + totalValue + " Kč");
}

function updateQuantity() {
    let productName = document.getElementById("productNameToUpdate").value;
    let newQuantity = parseInt(document.getElementById("newQuantity").value);
    let product = stock.find(product => product.name === productName);
    if (product) {
        product.quantity = newQuantity;
        updateTable(stock);
    } else {
        alert("Produkt s názvem '" + productName + "' nebyl nalezen.");
    }
}


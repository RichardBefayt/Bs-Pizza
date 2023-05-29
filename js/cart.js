// Récupère le panier et le montant total
const cart = document.getElementById("cart");
const totalCart = document.getElementById("total-cart");
const cartContainer = document.getElementById("cart-container");

// Charge les produits du panier lors du chargement de la page
loadCart();

// Charge les produits du panier dans le HTML
function loadCart() {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

    while (cart.firstChild) {
        cart.removeChild(cart.firstChild);
    }

    let total = 0;

    cartStorage.forEach(function(item) {
        const totalPrice = item.quantity * item.price;

        total += totalPrice;

        const li = document.createElement("li");
        li.setAttribute("class", "cart-item");

        const spanTitle = document.createElement("span");
        spanTitle.setAttribute("class", "span-title");
        spanTitle.textContent = item.title;

        const inputQuantity = document.createElement("input");
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("value", item.quantity);
        inputQuantity.addEventListener("change", function() {
            modifQuantity(item.id, this.value);
        });

        const spanTotalPrice = document.createElement("span");
        spanTotalPrice.setAttribute("class", "total-price");
        spanTotalPrice.textContent = totalPrice.toFixed(2) + " €";

        const suppButton = document.createElement("button");
        suppButton.setAttribute("class", "supp-button");
        suppButton.textContent = "Supprimer";
        suppButton.addEventListener("click", function() {
            suppProduct(item.id);
        });

        li.appendChild(spanTitle);
        li.appendChild(inputQuantity);
        li.appendChild(spanTotalPrice);
        li.appendChild(suppButton);

        cart.appendChild(li);
    });

    totalCart.textContent = total.toFixed(2);
}

// Modifie la quantité d'un produit dans le panier
function modifQuantity(id, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart') || []);

    cart.forEach(function(item) {
        if(item.id === id) {
            item.quantity = quantity;
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    loadCart();
}

// Supprime un produit du panier
function suppProduct(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Retire l'élément correspond à l'ID du produit
    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    loadCart();
}
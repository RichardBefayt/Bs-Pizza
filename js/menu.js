// Récupère tous les boutons qui ont la classe ".add-cart"
const addButton = document.querySelectorAll(".add-button");

// Ajoute un écouteur d'événement à chaque bouton ".add-cart"
addButton.forEach(function(button) {
    button.addEventListener("click", function(event) {
        const clickElement = event.target;
        const product = clickElement.parentElement;
        const title = product.querySelector("h4").textContent;
        const price = product.querySelector(".price").textContent;
        const id = product.getAttribute("data-id");
        addCart(id, title, price);
    })
})

// Ajoute un produit au panier ou incrémente la quantité si le produit est déjà dans le panier
function addCart(id, title, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let findItem = false;

    cart.forEach(function(item) {
        if(item.id === id) {
            item.quantity++;
            findItem = true;
        }
    })

    if(!findItem) {
        cart.push({id, title, price, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}
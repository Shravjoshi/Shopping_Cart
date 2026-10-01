// Product data

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },
    {
        id: 6,
        name: "Laptop",
        price: 54999,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    }
];


// Get HTML elements

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const cart = document.getElementById("cart");
const cartButton = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const checkoutButton = document.getElementById("checkout-btn");


// Load cart from localStorage

let cartData = JSON.parse(localStorage.getItem("cart")) || [];


// Display products

function displayProducts() {

    productList.innerHTML = "";

    products.forEach(product => {

        const productHTML = `
            <div class="product">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>₹${product.price.toLocaleString("en-IN")}</p>

                <button 
                    class="add-btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

        productList.innerHTML += productHTML;
    });
}


// Add product to cart

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    const existingProduct = cartData.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cartData.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    displayCart();
}


// Increase quantity

function increaseQuantity(productId) {

    const item = cartData.find(
        item => item.id === productId
    );

    if (item) {
        item.quantity++;
    }

    saveCart();
    displayCart();
}


// Decrease quantity

function decreaseQuantity(productId) {

    const item = cartData.find(
        item => item.id === productId
    );

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {
            cartData = cartData.filter(
                item => item.id !== productId
            );
        }
    }

    saveCart();
    displayCart();
}


// Remove product

function removeFromCart(productId) {

    cartData = cartData.filter(
        item => item.id !== productId
    );

    saveCart();
    displayCart();
}


// Display cart

function displayCart() {

    cartItems.innerHTML = "";

    if (cartData.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <p>Add some products to your cart.</p>
            </div>
        `;

        cartTotal.textContent = "0";
        cartCount.textContent = "0";

        return;
    }


    let total = 0;
    let totalItems = 0;


    cartData.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        totalItems += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>₹${item.price.toLocaleString("en-IN")}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                </div>

            </div>

            <button 
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;


        cartItems.appendChild(cartItem);
    });


    cartTotal.textContent = total.toLocaleString("en-IN");

    cartCount.textContent = totalItems;
}


// Save cart

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cartData)
    );
}


// Open cart

cartButton.addEventListener("click", () => {

    cart.classList.add("active");

});


// Close cart

closeCart.addEventListener("click", () => {

    cart.classList.remove("active");

});


// Checkout

checkoutButton.addEventListener("click", () => {

    if (cartData.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert("Thank you for your purchase! 🎉");

    cartData = [];

    saveCart();
    displayCart();

});


// Initial display

displayProducts();
displayCart();
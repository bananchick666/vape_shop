// Products Data
const products = [
    {
        id: 1,
        name: "Жидкость Podonki V2 (30 ml)",
        description: "со вкусом банановое молоко",
        price: 15,
        image: "images/product1.jpg"
    },
    {
        id: 2,
        name: "Жидкость Анархия (30ml)",
        description: "со вкусом малина-личи",
        price: 16,
        image: "images/product2.jpg"
    },
    {
        id: 3,
        name: "Вейп xros 3",
        description: "в черном цвете",
        price: 70,
        image: "images/product3.jpg"
    },
    {
        id: 4,
        name: "Снюс Isterika Lethal",
        description: "со вкусом клубничный коктель",
        price: 17,
        image: "images/product4.jpg"
    },
    {
        id: 5,
        name: "Жидкость Husky (60ml)",
        description: "со вкусом ледяной гранат",
        price: 20,
        image: "images/product5.jpg"
    },
    {
        id: 6,
        name: "Катридж на xros",
        description: "0.6 ом",
        price: 13,
        image: "images/product6.jpg"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPrice = document.querySelector('.total-price');
const navLinks = document.querySelectorAll('nav a');
const sections = {
    home: document.getElementById('home-section'),
    products: document.getElementById('products-section'),
    about: document.getElementById('about-section'),
    contact: document.getElementById('contact-section')
};

// Display products
function displayProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="price">Byn ${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification(product.name);
}

// Show notification when item is added to cart
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} добавлен в корзину`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">Byn ${(item.price * item.quantity).toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Удалить</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    // Update total price
    totalPrice.textContent = `Byn ${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Increase quantity
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    updateCart();
}

// Decrease quantity
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

// Remove item
function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Toggle cart modal
function toggleCart() {
    cartModal.classList.toggle('active');
}

// Navigation functionality
function handleNavClick(e) {
    e.preventDefault();
    const section = e.target.getAttribute('data-section');
    
    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Scroll to section
    if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sections[section]) {
        sections[section].scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close cart if open
    if (cartModal.classList.contains('active')) {
        toggleCart();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Cart icon click
    cartIcon.addEventListener('click', toggleCart);
    
    // Close cart button
    closeCart.addEventListener('click', toggleCart);
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Checkout button
    document.querySelector('.checkout-btn')?.addEventListener('click', () => {
        alert('Спасибо за ваш заказ! Это демонстрационный сайт, реальных покупок не будет.');
        cart = [];
        updateCart();
        toggleCart();
    });
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartModal.contains(e.target) && e.target !== cartIcon && !cartIcon.contains(e.target)) {
        cartModal.classList.remove('active');
    }
});

// Add cart notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: #1a1a2e;
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transition: transform 0.3s ease;
    }
    
    .cart-notification.show {
        transform: translateX(-50%) translateY(0);
    }
`;
document.head.appendChild(style);
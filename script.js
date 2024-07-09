document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    const renderHome = () => {
        content.innerHTML = `
            <h2>Welcome to Farmers' Medicine Shop</h2>
            <p>Your one-stop shop for all plant medicines.</p>
        `;
    };

    const renderProducts = () => {
        const products = [
            { id: 1, name: 'Fertilizer A', price: '$10', description: 'Description for Fertilizer A' },
            { id: 2, name: 'Pesticide B', price: '$15', description: 'Description for Pesticide B' },
            { id: 3, name: 'Herbicide C', price: '$20', description: 'Description for Herbicide C' },
        ];

        content.innerHTML = '<h2>Products</h2>';
        products.forEach(product => {
            content.innerHTML += `
                <div class="product-card">
                    <h2>${product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>${product.description}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
        });
    };

    const renderCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        content.innerHTML = '<h2>Shopping Cart</h2>';
        if (cart.length === 0) {
            content.innerHTML += '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                content.innerHTML += `
                    <div class="product-card">
                        <h2>${item.name}</h2>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                `;
            });
            content.innerHTML += '<button onclick="checkout()">Checkout</button>';
        }
    };

    const renderLogin = () => {
        content.innerHTML = `
            <h2>Login</h2>
            <form id="loginForm">
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        `;

        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Logged in successfully!');
        });
    };

    const addToCart = (productId) => {
        const products = [
            { id: 1, name: 'Fertilizer A', price: '$10', description: 'Description for Fertilizer A' },
            { id: 2, name: 'Pesticide B', price: '$15', description: 'Description for Pesticide B' },
            { id: 3, name: 'Herbicide C', price: '$20', description: 'Description for Herbicide C' },
        ];

        const product = products.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
    };

    const checkout = () => {
        alert('Checked out successfully!');
        localStorage.removeItem('cart');
        renderCart();
    };

    document.querySelector('nav ul').addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const section = e.target.getAttribute('href').substring(1);
            if (section === 'home') renderHome();
            else if (section === 'products') renderProducts();
            else if (section === 'cart') renderCart();
            else if (section === 'login') renderLogin();
        }
    });

    renderHome();
});

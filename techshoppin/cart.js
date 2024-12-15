document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const checkoutSummaryContainer = document.getElementById("checkout-summary-container");
    const customerInfoForm = document.getElementById("customer-info-form");
    const searchInput = document.getElementById("search-input");

    // Fetch product data
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            const products = Object.keys(data).map(key => ({
                name: key,
                ...data[key]
            }));

            // Function to display cart items
            function displayCartItems() {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                cartItemsContainer.innerHTML = "";

                if (cart.length === 0) {
                    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
                } else {
                    cart.forEach(item => {
                        const product = products.find(p => p.name === item);
                        const cartItemElement = document.createElement("div");
                        cartItemElement.classList.add("cart-item");
                        cartItemElement.innerHTML = `
                            <p>${product.name}</p>
                            <button class="remove-from-cart" data-item="${product.name}">Remove</button>
                        `;
                        cartItemsContainer.appendChild(cartItemElement);
                    });

                    // Adds event listeners to "Remove" buttons
                    const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
                    removeFromCartButtons.forEach(button => {
                        button.addEventListener("click", function() {
                            const itemName = this.getAttribute("data-item");
                            removeFromCart(itemName);
                        });
                    });
                }
            }

            // Function to display checkout summary
            function displayCheckoutSummary() {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                let total = 0;
                let shipping = 10.50;
                let tax = 0;

                checkoutSummaryContainer.innerHTML = "";

                if (cart.length === 0) {
                    checkoutSummaryContainer.innerHTML = "<p>No items to checkout.</p>";
                } else {
                    cart.forEach(item => {
                        const product = products.find(p => p.name === item);
                        total += product.cost;
                        const summaryItemElement = document.createElement("div");
                        summaryItemElement.classList.add("summary-item");
                        summaryItemElement.innerHTML = `
                            <p>${product.name}: $${product.cost.toFixed(2)}</p>
                        `;
                        checkoutSummaryContainer.appendChild(summaryItemElement);
                    });

                    tax = total * 0.05; // Example tax calculation
                    total += shipping + tax;

                    const shippingElement = document.createElement("div");
                    shippingElement.classList.add("summary-item");
                    shippingElement.innerHTML = `<p>Shipping: $${shipping.toFixed(2)}</p>`;
                    checkoutSummaryContainer.appendChild(shippingElement);

                    const taxElement = document.createElement("div");
                    taxElement.classList.add("summary-item");
                    taxElement.innerHTML = `<p>Tax: $${tax.toFixed(2)}</p>`;
                    checkoutSummaryContainer.appendChild(taxElement);

                    const totalElement = document.createElement("div");
                    totalElement.classList.add("summary-item");
                    totalElement.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
                    checkoutSummaryContainer.appendChild(totalElement);
                }
            }

            // Function to remove item from cart
            function removeFromCart(itemName) {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart = cart.filter(item => item !== itemName);
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCartItems();
                displayCheckoutSummary();
                updateCartNumber();
            }

            // Function to update cart number in header
            function updateCartNumber() {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const cartNumber = document.querySelector(".cart span");
                cartNumber.textContent = cart.length;
            }

            // First display of cart items and checkout summary
            displayCartItems();
            displayCheckoutSummary();

            // First update of cart number
            updateCartNumber();

            // Checkout button functionality
            customerInfoForm.addEventListener("submit", function(event) {
                event.preventDefault();
                alert("Proceeding to checkout...");
            });

            // Scroll to About Us section
            const aboutUsLink = document.getElementById("about-us-link");
            aboutUsLink.addEventListener("click", function(event) {
                event.preventDefault();
                document.getElementById("about-us").scrollIntoView({ behavior: "smooth" });
            });

            // Search functionality
            searchInput.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    const searchTerm = searchInput.value.toLowerCase();
                    window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
                }
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});

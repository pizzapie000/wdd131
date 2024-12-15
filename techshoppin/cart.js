document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const checkoutSummaryContainer = document.getElementById("checkout-summary-container");
    const customerInfoForm = document.getElementById("customer-info-form");
    const searchInput = document.getElementById("search-input");

    // Function to display cart items
    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement("div");
                cartItemElement.classList.add("cart-item");
                cartItemElement.innerHTML = `
                    <p>${item}</p>
                    <button class="remove-from-cart" data-item="${item}">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });

            // Add event listeners to "Remove" buttons
            const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
            removeFromCartButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const itemName = this.getAttribute("data-item");
                    removeFromCart(itemName);
                });
            });
        }
    }

    // Function to show checkout summary
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
                const itemPrice = 499.99; // Example price
                total += itemPrice;
                const summaryItemElement = document.createElement("div");
                summaryItemElement.classList.add("summary-item");
                summaryItemElement.innerHTML = `
                    <p>${item}: $${itemPrice.toFixed(2)}</p>
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

    // Initial display of cart items and checkout summary
    displayCartItems();
    displayCheckoutSummary();

    // Initial update of cart number
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
});

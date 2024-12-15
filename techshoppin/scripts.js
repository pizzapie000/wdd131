document.addEventListener("DOMContentLoaded", function() {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            const products = Object.keys(data).map(key => ({
                name: key,
                ...data[key]
            }));

            // Function to display products
            function displayProducts(productsToDisplay) {
                const columns = [document.getElementById("column1"), document.getElementById("column2"), document.getElementById("column3"), document.getElementById("column4")];
                columns.forEach(column => column.innerHTML = ""); // Clear existing products

                productsToDisplay.forEach((product, index) => {
                    const productElement = document.createElement("div");
                    productElement.classList.add("product");
                    productElement.innerHTML = `
                        <img src="images/${product.image}" alt="${product.name}" />
                        <div class="product-details">
                            <h3><a href="#">${product.name}</a></h3>
                            <p>$${product.cost.toFixed(2)}</p>
                            <div class="rating">${getStars(product.rating)}</div>
                            <a href="#" class="add-to-cart" data-product="${product.name}">Add to Cart</a>
                        </div>
                    `;
                    columns[index % 4].appendChild(productElement);
                });

                // Add event listeners to "Add to Cart" buttons
                const addToCartButtons = document.querySelectorAll(".add-to-cart");
                addToCartButtons.forEach(button => {
                    button.addEventListener("click", function(event) {
                        event.preventDefault();
                        const productName = this.getAttribute("data-product");
                        addToCart(productName);
                    });
                });
            }

            // Function to get 4 random products
            function getRandomProducts(products) {
                const shuffledProducts = products.sort(() => 0.5 - Math.random());
                return shuffledProducts.slice(0, 4);
            }

            // Function to add item to cart
            function addToCart(productName) {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push(productName);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartNumber();
            }

            // Function to update cart number in header
            function updateCartNumber() {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const cartNumber = document.querySelector(".cart span");
                cartNumber.textContent = cart.length;
            }

            // Initial display of 4 random products
            displayProducts(getRandomProducts(products));

            // Initial update of cart number
            updateCartNumber();

            // Search functionality
            const searchInput = document.getElementById("search-input");
            searchInput.addEventListener("input", function() {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
                displayProducts(filteredProducts);
            });

            // Check for search term in URL
            const urlParams = new URLSearchParams(window.location.search);
            const searchTerm = urlParams.get("search");
            if (searchTerm) {
                const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
                displayProducts(filteredProducts);
            }
        })
        .catch(error => console.error("Error fetching products:", error));
});

function getStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? "★" : "☆";
    }
    return stars;
}

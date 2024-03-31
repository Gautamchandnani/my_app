
document.addEventListener("DOMContentLoaded", function () {
    const featuredProductContainer = document.querySelector(".featured-products .product-grid");

    if (featuredProductContainer.children.length === 0) {
        addProducts(featuredProducts, featuredProductContainer);
    }

    // Register service worker when the DOM content is loaded
    registerSW();

    function registerSW() {
        if ('serviceWorker' in navigator) {
            try {
                navigator.serviceWorker.register('service.js');
                console.log('Service Worker registered successfully');
            } catch (e) {
                console.log('SW registration failed');
            }
        }
    }

    function addProducts(products, container) {
        products.forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });
    }

    function createProductCard(product) {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <img src="images/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        // Add click event listener to each button
        const addToCartButton = productCard.querySelector(".add-to-cart-btn");
        addToCartButton.addEventListener("click", async () => {
            try {
                const swRegistration = await navigator.serviceWorker.ready;
                await swRegistration.sync.register("helloSync");
                console.log("Sync registered successfully");
            } catch (error) {
                console.error("Error registering sync:", error);
            }
        });

        return productCard;
    }
});



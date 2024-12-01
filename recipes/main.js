import recipes from './recipes.mjs';

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

function ratingTemplate(rating) {
    let html = `
        <span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
    `;
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `
        <section class="recipe">
            <img class="recipe-image" src="${recipe.image}" alt="image of ${recipe.name}" />
            <figcaption class="content">
                <h2 class="type">${recipe.tags.join(', ')}</h2>
                <h2 class="recipe_name"><a href="#">${recipe.name}</a></h2>
                ${ratingTemplate(recipe.rating)}
                <p class="description">${recipe.description}</p>
            </figcaption>
        </section>
    `;
}

// Renders the Functions
function renderRecipes(recipeList) {
    const outputElement = document.querySelector('main');
    const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    outputElement.innerHTML = recipesHTML;
}

// Function for the search
function searchHandler(event) {
    event.preventDefault();

    console.log('Search button clicked');
    const query = document.querySelector('#search-input').value.toLowerCase();
    const filteredRecipes = filterRecipes(query);

    renderRecipes(filteredRecipes);
}

// Function to filter recipes based on search
function filterRecipes(query) {
    return recipes
        .filter(recipe => {
            return (
                recipe.name.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
                recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query))
            );
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}

// Defines and Calls the `init` Function
function init() {
    console.log("Init function executed");
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

// Ensures the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Checks to see if search input is in the DOM
    const searchInput = document.querySelector('#search-input');
    const searchForm = document.querySelector('.search-form');
    console.log('Search input:', searchInput);
    console.log('Search form:', searchForm);

    // Attaches event listener to search button
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        console.log('Search button found, attaching event listener');
        searchButton.addEventListener('click', searchHandler);
    }

    init();

    const allRecipeImages = document.querySelectorAll('.recipe img');
    allRecipeImages.forEach(image => {
        image.style.borderRadius = '10px';
    });
});

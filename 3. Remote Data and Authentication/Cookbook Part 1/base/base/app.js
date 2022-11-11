async function getRecipes() {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    const recipes = await response.json()

    return Object.values(recipes)
}

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/details/' + id)
    const recipe = await response.json();
    return recipe
}

function createRecipeCard(recipe) {
    let preview = document.createElement('article');
    preview.classList.add('preview');

    let divTittle = document.createElement("div");
    divTittle.classList.add('title');

    let title = document.createElement("h2");
    title.textContent = recipe.name;

    let imageDiv = document.createElement("div");
    imageDiv.classList.add('small');

    let img = document.createElement("img");
    img.src = recipe.img

    imageDiv.appendChild(img);
    divTittle.appendChild(title);
    preview.appendChild(divTittle);
    preview.appendChild(imageDiv);

    preview.addEventListener('click', toggleCard);

    return preview;

    async function toggleCard() {
        const toggleRecipe = await getRecipeById(recipe._id);
        preview.replaceWith(createToggleRecipePreview(toggleRecipe))
    }

}

window.addEventListener('load', async () => {
    const main = document.querySelector("main");

    const recipes = await getRecipes();
    const cards = recipes.map(createRecipeCard)

    main.innerHTML = '';

    cards.forEach(card => main.appendChild(card));
});


function createToggleRecipePreview(recipe) {
    let article = document.createElement("article");
    let tittle = document.createElement("h2");
    tittle.textContent = recipe.name

    let bandClass = document.createElement('div');
    bandClass.classList.add('band');

    let thumbClass = document.createElement("div");
    thumbClass.classList.add("thumb");

    let thumbImg = document.createElement("img");
    thumbImg.src = recipe.img;


    let ingredientDiv = document.createElement('div');
    ingredientDiv.classList.add("ingredients");

    let ingredientHeader = document.createElement("h3");
    ingredientHeader.textContent = "Ingredients:"


    let ingredientUl = document.createElement("ul");
    recipe.ingredients.forEach(ingredient => {
        let li = document.createElement('li');
        li.textContent = ingredient;
        ingredientUl.appendChild(li);
    })

    ingredientDiv.appendChild(ingredientHeader)
    ingredientDiv.appendChild(ingredientUl);
    
    let description = document.createElement("div");
    description.classList.add("description");

    let h3 = document.createElement("h3");
    h3.textContent = "Preparation:";

    description.appendChild(h3);

    recipe.steps.forEach(step => {
        let p = document.createElement("p");
        p.textContent = step;
        description.appendChild(p);
    })

    article.appendChild(tittle);
    thumbClass.appendChild(thumbImg);
    bandClass.appendChild(thumbClass);
    bandClass.appendChild(ingredientDiv);
    article.appendChild(bandClass);
    article.appendChild(description)

    return article;

}
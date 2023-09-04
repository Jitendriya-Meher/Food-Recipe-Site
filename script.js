
const result = document.querySelector("#result");
const searchBtn = document.querySelector("#search-btn");
const userInp= document.querySelector("#user-inp");

let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

searchBtn.addEventListener("click", () => {
    const userData = userInp.value;

    if( userData.length == 0){
        result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`
        return;
    }

    fetchUrl(userData)

})

async function fetchUrl(userData ){

    try{
        const Url = `${url}${userData}`;
        const response = await fetch(Url);
        const data = await response.json();

        console.log(data);

        const myMeal = data.meals[0];

        console.log(myMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strInstructions);

        let count = 1;
        let ingredients  = [];
        
        for( i in myMeal){
            let ingredient = "";
            let measure = "";
            if( i.startsWith("strIngredient") && myMeal[i]){
                ingredient = myMeal[i];
                measure = myMeal['strMeasure' + count];
                count++;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }

        console.log(ingredients);
        
        result.innerHTML = `
        <img src=${myMeal.strMealThumb}>
        <div class="details">
            <h2>${myMeal.strMeal}</h2>
            <h4>${myMeal.strArea}</h4>
        </div>
        <div id="ingredient-con"></div>
        <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instruction">${myMeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
        `;

        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        const recipe = document.getElementById("recipe");
        const hideRecipe = document.getElementById("hide-recipe");
        const showRecipe = document.getElementById("show-recipe");

        ingredients.forEach( (i) => {
            let child = document.createElement("li");
            child.innerText = i;
            parent.appendChild(child);
        })
        ingredientCon.appendChild(parent);

        hideRecipe.addEventListener("click", () => {
            recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
            recipe.style.display = "block";
        });
    }
    catch(e){
        result.innerHTML = `<h3>Invalid Input</h3>`
    }

}

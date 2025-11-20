
const recipeForm = document.getElementById("recipe-form");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const ingredientsInput = document.getElementById("ingredients");
const cookingTimeInput = document.getElementById("cooking-time");
const recipelist = document.getElementById("recipelist");
const filtercategory = document.getElementById("filtercategory");
const sortTimeBtn = document.getElementById("sort-time");
const clearAllBtn = document.getElementById("clear-all");



sortTimeBtn.addEventListener("click",
    () =>{
        const allRecipes= JSON.parse(localStorage.getItem("recipes")) || [];
        allRecipes.sort((a,b) => a.cookingTime-b.cookingTime);
        renderRecipes(allRecipes);
    }
)

clearAllBtn.addEventListener("click", () => {
    localStorage.removeItem("recipes"); 
    renderRecipes(); 
});
filtercategory.addEventListener("input", () => {
    const filterValue=filtercategory.value.toLowerCase();
      const allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    
    const filtered = allRecipes.filter(recipe =>
        recipe.category.toLowerCase().includes(filterValue)
    );

    renderRecipes(filtered);
});



recipeForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const newRecipe = {
        title: titleInput.value,
        category: categoryInput.value,
        ingredients: ingredientsInput.value,
        cookingTime: Number(cookingTimeInput.value),
        favourite: false
    };

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(newRecipe);

    localStorage.setItem("recipes", JSON.stringify(recipes));

    renderRecipes();
    recipeForm.reset();
});



function renderRecipes(recipesArray) {
    const recipes = recipesArray || JSON.parse(localStorage.getItem("recipes")) || [];
    recipelist.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${recipe.title}</strong>  
            <b>${recipe.category}</b><br>
            Ingredients: <b>${recipe.ingredients}</b><br>
            Time: ${recipe.cookingTime} min
            <button class="fav-btn">${recipe.favourite ? "⭐favorite": "☆ mark favorite"}</button>
            <button class="delete-btn">Delete</button>
        `;
        li.querySelector(".fav-btn").addEventListener("click", () => {
            recipe.favourite = !recipe.favourite; 
            localStorage.setItem("recipes", JSON.stringify(recipes)); 
            renderRecipes(); 
        });

        li.querySelector(".delete-btn").addEventListener("click", ()=> {
            recipes.splice(index, 1);
            localStorage.setItem("recipes", JSON.stringify(recipes)
            
            );
            renderRecipes();
        });

      
        recipelist.appendChild(li);
    });
}


renderRecipes();

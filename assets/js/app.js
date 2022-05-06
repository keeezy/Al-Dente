//Variable for button with last searches to be d
var notPresentRecipe = document.querySelector(".old-recipes")

//functions to get data from the api
var recipes = {
  fetchRecipes: function (recipe) {
    console.log(recipe);
    fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        recipe +
        "&app_id=69cf7082&app_key=844db0530aecb5987dfe95007e77dfa9&imageSize=THUMBNAIL&random=true"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No recipe found");
        }
        return response.json();
      })
      .then((data) => {
        this.displayResults(data.hits);
        this.saveToStorage(recipe)
        this.storedRecipes()

      });
  },

  //search button function
  search: function () {
    this.fetchRecipes(document.querySelector(".search-bar").value);
  },

  //It display results and create element to so
  displayResults: function (data) {
    console.log(data);
    let displayResults = document.querySelector("#container");
    displayResults.innerHTML = "";

    for (i = 0; i < 9; i++) {
      let cusine = data[i].recipe.cuisineType[0];
            cusine.replace(/\w\S*/g, (w) =>
              w.replace(/^\w/, (c) => c.toUpperCase())
            );
      let link = data[i].recipe.url;
      const { label } = data[i].recipe;
      const { ingredientLines } = data[i].recipe;
      let listItemEl = this.ingredientsRecipe(ingredientLines);
      let containerRecipeEl = document.createElement("div");
      let fotoEl = document.createElement("img");
      fotoEl.src = data[i].recipe.images.SMALL.url;
      let nameEl = document.createElement("h5");
      nameEl.textContent = "Recipe: " + label;
      let cuisineTypeEl = document.createElement("h5");
      cuisineTypeEl.textContent = "Cuisine : " + cusine;
      let ingredientsEl = document.createElement("section");
      ingredientsEl.innerHTML = listItemEl;
      let getUrlEl = document.createElement("a");
      getUrlEl.setAttribute("class", "col-4");
      getUrlEl.href = link;

      containerRecipeEl.append(fotoEl, nameEl, cuisineTypeEl, ingredientsEl);

      getUrlEl.append(containerRecipeEl);
      displayResults.append(getUrlEl);
    }
  },
  
  //Function to loop on ingredient array
  ingredientsRecipe: function (recipes) {
    let recetas = "<h4>List of Ingredients</h4>";
    for (let i = 0; i < recipes.length; i++) {
      recetas += `<p>${recipes[i]}</p>`;
    }
    return recetas;
  },
//function to save the searches and avoid duplicates
  saveToStorage: function (oldRecipe) {
    console.log(oldRecipe)
    let storedRecipes = JSON.parse(localStorage.getItem("old-recipes")) || [];
    if (storedRecipes.includes(oldRecipe)) return;
    storedRecipes.push(oldRecipe);
    localStorage.setItem("old-recipes", JSON.stringify(storedRecipes));

  },

 //Function to get old recipes and display them to user.
  storedRecipes: function () {
    notPresentRecipe.innerHTML ="";
    let oldRecipes = JSON.parse(localStorage.getItem("old-recipes")) || [] ;
    for (let i = 0; i < oldRecipes.length; i++) {
      const pastRecipe = document.createElement("button");
      pastRecipe.textContent = oldRecipes[i];
      pastRecipe.addEventListener("click", function() {
        recipes.fetchRecipes(oldRecipes[i])
      });
      notPresentRecipe.append(pastRecipe)
    }
  },
};

//If I call the functions here, it throws an error. Check into that later. 
// recipes.storedRecipes();

//EVENTSSSSSS
//This event listener does not work. Do not add it.
//Event listener for search button
// document.querySelector("#button-search").addEventListener("click", function () {
//   recipes.search();
// });

//Kisten to enter or other key events
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      recipes.search();
    }
  });

  recipes.storedRecipes();

//Trying to create a way to delete elements from array from old searches
  // document
  // .querySelector(".fa-times")
  // .addEventListener("click", function() {
  // });

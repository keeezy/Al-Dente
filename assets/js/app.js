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


    for (i = 0; i < 6; i++) {
      let cusine = data[i].recipe.cuisineType[0];
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
      cuisineTypeEl.textContent = "Cusine : " + cusine;
      let ingredientsEl = document.createElement("section");
      ingredientsEl.innerHTML = listItemEl;
      let getUrlEl = document.createElement("a");
      getUrlEl.setAttribute("class", "col-4")
      getUrlEl.href = link;
     
      containerRecipeEl.append(
        fotoEl,
        nameEl,
        cuisineTypeEl,
        ingredientsEl
      );

      getUrlEl.append(containerRecipeEl)
      displayResults.append(getUrlEl);
    }
  },

//Function to loop on ingredient array
  ingredientsRecipe: function(recipes) {
    let recetas = "<h4>List of Ingredients</h4>"
    for (let i = 0; i < recipes.length; i++) {
      recetas += `<p>${recipes[i]}</p>`

    }
    return recetas
  }
};


//EVENTSSSSSS
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


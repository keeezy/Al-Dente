//functions to get data from the api
var recipes = {
  fetchRecipes: function (recipe) {
    console.log(recipe);
    fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        recipe +
        "&app_id=69cf7082&app_key=844db0530aecb5987dfe95007e77dfa9&imageSize=REGULAR"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No recipe found");
        }
        return response.json();
      })

      .then((data) => {
        console.log(data);
        this.displayResults(data.hits);
      });
  },

  //search button function
  search: function () {
    this.fetchRecipes(document.querySelector(".search-bar").value);
  },
  //It display results and create element to so
  displayResults: function (data) {
    let displayResults = document.querySelector(".recipes-result");
    displayResults.innerHTML = "";
    for (i = 1; i < 5; i++) {
      let containerRecipeEl = document.createElement("div");
      console.log([i]);
      let fotoEl = document.createElement("img");
      fotoEl.textContent = data[i].recipe.images;
      let nameEl = document.createElement("div");
      nameEl.textContent = "Dish name: " + data[i].recipe.ingredients.label;
      let cuisineTypeEl = document.createElement("div");
      cuisineTypeEl.textContent = "Cusine : " + data[i].recipe.cuisineType[0];
      displayResults.append(containerRecipeEl)
      containerRecipeEl.append(fotoEl, nameEl, cuisineTypeEl);
    }
  },
};

//Event listener for search button
document.querySelector("#button-search").addEventListener("click", function () {
  recipes.search();
});

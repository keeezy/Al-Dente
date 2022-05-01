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
        this.displayResults(data.hits);
      });
  },

  //search button function
  search: function () {
    this.fetchRecipes(document.querySelector(".search-bar").value);
  },

  //It display results and create element to so
  displayResults: function (data) {
    console.log(data)
    let displayResults = document.querySelector(".recipes-result");
    displayResults.innerHTML = "";

    for (i = 0; i < 5; i++) {
      const { label} = data[i].recipe;
      let containerRecipeEl = document.createElement("div");
      console.log([i]);
      let fotoEl = document.createElement("img");
      fotoEl.src = data[i].recipe.images.SMALL.url;
      let nameEl = document.createElement("div");
      nameEl.textContent = "Recipe: " + label;
      let cuisineTypeEl = document.createElement("div");
      cuisineTypeEl.textContent = "Cusine : " + data[i].recipe.cuisineType[0];
      let getUrlEl = document.createElement("a")
      getUrlEl.href = data[i].recipe.url;
       console.log(data[i].recipe.url)
       
      containerRecipeEl.append(fotoEl, nameEl, cuisineTypeEl);
      displayResults.append(containerRecipeEl, getUrlEl);
    }
  },
};

//Event listener for search button
document.querySelector("#button-search").addEventListener("click", function () {
  recipes.search();
});
//Event to listen to enter or other keypress
//document.querySelector(".search-bar").addEventListener("keypress", function () {
  //recipes.search();
//});

//$(".search-bar").off('keyup').on('keyup')

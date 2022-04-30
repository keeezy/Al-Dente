

//functions to get data from the api 
var recipes = {
    fetchRecipes: function(recipe){
        console.log(recipe)
    fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        recipe +
        "&app_id=69cf7082&app_key=844db0530aecb5987dfe95007e77dfa9"
    ).then((response) => {
      if (!response.ok) {
        throw new Error("No recipe found");
      }
      return response.json();
    }) .then((data) => {
        console.log(data)

    })
    console.log(recipe)
    

},

//search button function
  search: function () {
    this.fetchRecipes(document.querySelector(".search-bar").value);
  }, 
    
};

//Event listener for search button
document.querySelector("#button-search").addEventListener("click", function () {
  recipes.search();
});

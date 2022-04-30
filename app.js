

//functions to get data from the api 
let recipes = {
    fetchRecipes: function(recipe) {
    fetch(
      "https://api.edamam.com/api/recipes/v2?q=" +
        recipe +
        "&app_id=2f4e2d93&app_key=383ad0ac5839254aad627d80d6afdaeb&mealType=Dinner"
    ).then((response) => {
      if (!response.ok) {
        throw new Error("No recipe found");
      }
      return response.json();
    });
    console.log(recipe)

},

//search button function
  search: function () {
    this.fetchRecipes(document.querySelector(".search").value);
    console.log(function)
  }, 
    
};


//Event listener for search button
document.querySelector(".search button").addEventListener("click", function () {
  recipes.search();
});

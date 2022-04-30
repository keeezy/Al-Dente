


let recipes = {
apiKey: "383ad0ac5839254aad627d80d6afdaeb",
apiId: "2f4e2d93",

fetchRecipes: function(recipe) {
    fetch(
        "https://api.edamam.com/api/recipes/v2q=" + 
        recipe + 
        "app_id=" + 
        this.apiId + "api_key" +
        this.apiKey
    )
},

  search: function () {
    this.fetchRecipes(document.querySelector(".search").value);
  }, 
    
};



document.querySelector(".search button").addEventListener("click", function () {
  recipes.search();
});

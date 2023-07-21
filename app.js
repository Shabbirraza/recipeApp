var inputVal;
var meal_info = document.getElementById("meal-info");
var meal_popup = document.getElementById("meal-popup");
var favMealsContainer = document.getElementById("favMealsContainer")
var favoriteMeals = []
var mealContainer = document.getElementById("meal-container")
var btnInput = document.getElementById("inputBtn")
showFavMeals()



btnInput.addEventListener("click", getRecipe)

function getInputval() {
    inputVal = document.getElementById("inputVal").value
    console.log(inputVal)
}

async function showFavMeals() {

    favMealsContainer.innerHTML = ` <h1 class="heading">Favorite Meals</h1> `

    for (var item of favoriteMeals) {
        let FavMealChild = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + item)
        let FavMealChild2 = await FavMealChild.json()
        console.log(FavMealChild2)

        const FavMealBox = document.createElement("div");
        FavMealBox.classList.add("favMealItem");
        FavMealBox.setAttribute("id", FavMealChild2.meals[0].idMeal)
        FavMealBox.setAttribute("onClick", "openPopUp(this)")

        FavMealBox.innerHTML = `
        <span onClick="removeFavItem(this)" class="close"><i class="fa-solid fa-xmark"></i></span>
        <img class="favMealImage" src=${FavMealChild2.meals[0].strMealThumb} />
        <p>${FavMealChild2.meals[0].strMeal}</p>
        `
        favMealsContainer.appendChild(FavMealBox)

    }

}



async function openPopUp(e) {
    var ingredientsArray = []
    console.log(e.id)
    let FavMealChild = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + e.id)
    let FavMealChild2 = await FavMealChild.json()
    console.log(FavMealChild2)
    for (let i = 1; i < 21; i++) {
        var newIngre = "strIngredient" + i;

        console.log(newIngre.toString())
        let ingre = FavMealChild2.meals[0][newIngre]
        console.log(ingre)
        if (FavMealChild2.meals[0][newIngre]) {

            ingredientsArray.push(FavMealChild2.meals[0][newIngre])
        }

        console.log(ingredientsArray)
    }


    meal_info.innerHTML = `
        <h1>${FavMealChild2.meals[0].strMeal}</h1>
        <img class="popImg" src=${FavMealChild2.meals[0].strMealThumb} />
        
        <p>${FavMealChild2.meals[0].strInstructions}</p>
        <div style="width:100%;">
        <ul class="ingredientsList">
        ${ingredientsArray.map((e) => { return `<li >${e}</li>` })}
        </ul>
        </div>
      
                     
`
   
    meal_popup.classList.remove("hidden")

}
function closePopUp(){
    let close_popup = document.getElementById("close-popup");
    let mealPopUp = document.getElementById("meal-popup")
    mealPopUp.classList.add("hidden")

}



function removeFavItem(x) {
    console.log(x.parentElement.id)
    favoriteMeals = favoriteMeals.filter(e => e !== x.parentElement.id);
    console.log(favoriteMeals)
    showFavMeals()
}




async function getRecipe() {
    getInputval();
    mealContainer.innerHTML = ""

    const recipe = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + inputVal);

    const recipeJson = await recipe.json();
    console.log(recipeJson);
    for (var recipe1 of recipeJson.meals) {
        const newDiv = document.createElement("div")
        newDiv.classList.add("recipeDiv")
        newDiv.setAttribute("id", recipe1.idMeal)
        newDiv.setAttribute("onClick", "openPopUp(this)")
        newDiv.innerHTML = `
    <div div class="mealItem" >
    <img class="mealImage" src=${recipe1.strMealThumb}  />
         <div class="content">
              <h1>
            ${recipe1.strMeal}
              </h1>
              <i id=${recipe1.idMeal} onClick="favMeal(this)" class="fa-solid fa-heart heartIcon"></i>
         </div>
   
    </div >
    `
        console.log(newDiv)
        mealContainer.appendChild(newDiv)
    }

}

function favMeal(e) {
    console.log(favoriteMeals)
    if (favoriteMeals.length > 0) {
        for (var favoriteMeal of favoriteMeals) {
            if (favoriteMeal == e.id) {
                return
            }
        }

        console.log(e.id)
        favoriteMeals.push(e.id)
        console.log(favoriteMeals)

    } else {
        favoriteMeals.push(e.id)
    }

    showFavMeals()
}

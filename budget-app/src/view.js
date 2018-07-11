import { getRecipes, findRecipe } from './recipes'
import { deleteIngredient, toggleIngredient } from './ingredients'
import { getFilters } from './filters'

const recipeList = document.getElementById('recipe-list')

const createSubText = (recipe) => {
    const collectedIng = recipe.ingredients.filter( (ingredient) => ingredient.hasIngredient === true).length
    const ingLength = recipe.ingredients.length

    if (ingLength === 0) {
        return `You didn't add any ingredient so far.`
    } else if (collectedIng === ingLength) {
        return `You have collected all ingredients for this recipe. (${collectedIng} of ${ingLength})`
    } else if (collectedIng > 0) {
        return `You have collected a few ingredients for this recipe. (${collectedIng} of ${ingLength})`
    } else if (collectedIng === 0) {
        return `You have not collected any ingredients for this recipe. (${collectedIng} of ${ingLength})`
    }
}

const showEmptyMessage = () => {
    const emptyMessageEl = document.createElement('p')
    emptyMessageEl.textContent = `You don't have any recipes added.`
    emptyMessageEl.classList.add('empty-message')

    recipeList.innerHTML = ''
    recipeList.appendChild(emptyMessageEl)
}

// Render Recipes to DOM
const renderRecipesDom = () => {
    recipeList.innerHTML = '';
    const filteredRecipes = getRecipes().filter( (recipe) => {
        return recipe.title.toLowerCase().includes(getFilters().searchText.toLowerCase())
    })

    if (filteredRecipes.length > 0) {
        renderRecipes(filteredRecipes)  
    } else {
        showEmptyMessage()
    }
}

const renderRecipes = (filteredRecipes) => {
    filteredRecipes.forEach( (recipe) => {
        const recipeEl = document.createElement('a')
        const recipeTitleEl = document.createElement('p')
        const recipeSubtitleEl = document.createElement('p')
        const subtitleText = createSubText(recipe)

        recipeEl.setAttribute('href', `edit.html#${recipe.id}`)
        recipeEl.classList.add('list-item')
        recipeTitleEl.classList.add('list-item__title')

        recipeTitleEl.textContent = recipe.title === '' ? 'Recipe Title' : recipe.title
        recipeEl.appendChild(recipeTitleEl)
        
        recipeSubtitleEl.textContent = subtitleText
        recipeEl.appendChild(recipeSubtitleEl)    
        
        recipeList.appendChild(recipeEl)
    })
}

const initializeEditPage = (recipeId) => {
    const recipe = findRecipe(recipeId)

    if (!recipe) {
        location.assign('index.html')
    }

    const recipeTitle = document.getElementById('recipe-title')
    const recipeDescription = document.getElementById('recipe-description')

    recipeTitle.value = recipe.title
    recipeDescription.value = recipe.description

    renderIngredients(recipe)
}

const renderIngredients = (recipe) => {
    const ingredients = recipe.ingredients
    const ingredientList = document.getElementById('ingredient-list')
    ingredientList.innerHTML = ''
    
    if (!ingredients || ingredients.length < 1) {
        const emptyIngredientList = document.createElement('p')
        emptyIngredientList.textContent = `No ingredients added`
        emptyIngredientList.classList.add('empty-message')

        ingredientList.appendChild(emptyIngredientList)
    } else {
        ingredients.forEach( (ingredient, index) => {
            const ingredientEl = document.createElement('div')
            ingredientEl.classList.add('list-item')
            ingredientEl.classList.add('list-item--ingredient')
            ingredientEl.classList.toggle('list-item--ingredient-collected', ingredient.hasIngredient) 

            const ingredientLabelEl = document.createElement('label')
            ingredientLabelEl.classList.add('ingredient__label')
            ingredientLabelEl.textContent = ingredient.ingredientName

            const checkboxEl = document.createElement('input')
            checkboxEl.setAttribute('type', 'checkbox')
            checkboxEl.setAttribute('checked', ingredient.hasIngredient)
            checkboxEl.classList.add('ingredient__checkbox')
            checkboxEl.checked = ingredient.hasIngredient
            checkboxEl.addEventListener('change', () => {
                toggleIngredient(index, recipe)
                ingredientEl.classList.toggle('list-item--ingredient-collected', ingredient.hasIngredient) 
            })

            const deleteButton = document.createElement('button')
            deleteButton.classList.add('button')
            deleteButton.classList.add('button--remove-ingredient')
            deleteButton.textContent = 'X'
            deleteButton.addEventListener('click', () => {
                deleteIngredient(index, recipe)
                ingredientList.removeChild(ingredientEl)
            })

            ingredientEl.appendChild(ingredientLabelEl)
            ingredientLabelEl.appendChild(checkboxEl)
            ingredientEl.appendChild(deleteButton)
            ingredientList.appendChild(ingredientEl)
        })
    }
}


export { renderRecipesDom, renderIngredients, initializeEditPage }
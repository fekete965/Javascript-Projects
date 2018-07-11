import { initializeEditPage, renderIngredients } from './view'
import { updateRecipes, loadRecipes, removeRecipe, findRecipe } from './recipes'
import { addIngredient } from './ingredients'

const recipeTitle = document.getElementById('recipe-title')
const recipeDescription = document.getElementById('recipe-description')
const removeButton = document.getElementById('remove-recipe')
const ingredientForm = document.getElementById('ingredient-form')
const ingredient = document.getElementById('new-ingredient')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)

recipeTitle.addEventListener('input', (e) => {
    updateRecipes(recipeId, { title: e.target.value})
})

recipeDescription.addEventListener('input', (e) => {
    updateRecipes(recipeId, { description: e.target.value})
})

ingredientForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newIngredient = ingredient.value.trim()
    if (newIngredient.length > 0) {
        addIngredient(recipeId, newIngredient)
        ingredient.value = ''
    }
    renderIngredients(findRecipe(recipeId))
})

removeButton.addEventListener('click', () => {
    removeRecipe(recipeId)
    location.assign('index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        initializeEditPage(recipeId)
    }
})
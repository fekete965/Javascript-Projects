import { renderRecipesDom } from './view'
import { createRecipe, loadRecipes } from './recipes'
import { updateFilters } from './filters';

const createRecipeButton = document.getElementById('create-recipe')
const searchBar = document.getElementById('search-text')

renderRecipesDom()

searchBar.addEventListener('input', (e) => {
    updateFilters(e.target.value.trim())
    renderRecipesDom()
})

createRecipeButton.addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        renderRecipesDom()
    }
})
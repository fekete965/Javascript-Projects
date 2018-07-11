import { findRecipe, saveRecipes } from './recipes'

const addIngredient = (id, ingredient) => {
    const recipe = findRecipe(id)

    recipe.ingredients.push({
        ingredientName: ingredient,
        hasIngredient: false
    })
    saveRecipes()
}

const deleteIngredient = (id, recipe) => {
    recipe.ingredients.splice(id, 1)
    saveRecipes()
}

const toggleIngredient = (id, recipe) => {
    recipe.ingredients[id].hasIngredient = !recipe.ingredients[id].hasIngredient
    saveRecipes()
}

export { addIngredient, deleteIngredient, toggleIngredient }
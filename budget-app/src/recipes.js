import uuid from 'uuid/v4'

let recipes = []

const getRecipes = () => recipes

const findRecipe = (id) => recipes.find( (recipe) => recipe.id === id)

const loadRecipes = () => {
    const recipeJSON = localStorage.getItem('recipes')

    try {
        recipes = recipeJSON ? JSON.parse(recipeJSON) : []
    } catch(e) {
        recipes = []
    }
}

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const createRecipe = () => {
    const id = uuid()
    
    recipes.push({
        id: id,
        title: '',
        description: '',
        ingredients: []
    })
    saveRecipes()

    return id
}

const removeRecipe = (id) => {
    const recipeId = recipes.findIndex( (recipe) => recipe.id = id)

    if (recipeId > -1) {
        recipes.splice(recipeId, 1)
        saveRecipes()
    }
}

const updateRecipes = (id, updates) => {
    const recipe = recipes.find( (recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }

    if (typeof updates.description === 'string') {
        recipe.description = updates.description
    }
    saveRecipes()
}

loadRecipes()

export { loadRecipes, getRecipes, findRecipe, saveRecipes, createRecipe, updateRecipes, removeRecipe  }
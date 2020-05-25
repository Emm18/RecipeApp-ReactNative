import createDataContext from './createDataContext'

import jsonServer from '../api/jsonServer'

const recipeReducer = (state, action) => {

    if (action.type == 'get_all_recipes') {
        return action.payload
    }

    return state
};

//DISPATCH FUNCTIONS
const createRecipe = dispatch => async (recipeName, difficultyLevel, numOfPeople, mealType, ingredients, instructions, callback) => {
    await jsonServer.post('/recipes', { recipeName, difficultyLevel, numOfPeople, mealType, ingredients, instructions });
    if (callback) {
        callback();
    }
}

const updateRecipe = dispatch => async (id, recipeName, difficultyLevel, numOfPeople, mealType, ingredients, instructions, callback) => {
    await jsonServer.put(`/recipes/${id}`, { recipeName, difficultyLevel, numOfPeople, mealType, ingredients, instructions })
    if (callback) {
        callback();
    }
}

const deleteRecipe = dispatch => async (id, callback) => {
    await jsonServer.delete(`/recipes/${id}`)
    if (callback) {
        callback();
    }
}

const getAllRecipes = dispatch => () => {
    dispatch({ type: "get_all_recipes", payload: 'data' })
}

export const { Context, Provider } = createDataContext(
    recipeReducer,
    {
        createRecipe,
        updateRecipe,
        deleteRecipe,
        getAllRecipes
    },
    [])
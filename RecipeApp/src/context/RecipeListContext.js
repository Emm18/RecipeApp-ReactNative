import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const recipeListReducer = (state, action) => {

    if (action.type == 'get_all_recipes') {
        return { ...state, recipeList: action.payload, searchResult: [] };
    }

    if (action.type == 'change_search') {
        return { ...state, search: action.payload };
    }

    if (action.type == 'search_recipes') {
        const newRecipes = state.recipeList.filter(x => x.recipeName.toUpperCase() == action.payload.toUpperCase());

        return { ...state, searchResult: newRecipes }
    }

    if (action.type == 'get_recipe') {
        return { ...state, recipe: action.payload }
    }

    return state
};

//DISPATCH FUNCTIONS
const changeSearch = dispatch => async (val) => {
    dispatch({ type: 'change_search', payload: val })
}

const getAllRecipes = dispatch => async () => {
    const response = await jsonServer.get('/recipes')
    dispatch({ type: 'get_all_recipes', payload: response.data });
}

const searchRecipes = dispatch => async (recipeName) => {
    if (recipeName) {
        dispatch({ type: 'search_recipes', payload: recipeName });
    } else {
        const response = await jsonServer.get('/recipes')
        dispatch({ type: 'get_all_recipes', payload: response.data })
    }
}

const getRecipe = dispatch => async (id) => {
    const response = await jsonServer.get(`/recipes/${id}`);
    dispatch({ type: 'get_recipe', payload: response.data });
}

export const { Context, Provider } = createDataContext(
    recipeListReducer,
    {
        getAllRecipes,
        changeSearch,
        searchRecipes,
        getRecipe
    },
    {
        search: '',
        recipeList: [],
        searchResult: [],
        recipe: {}
    })
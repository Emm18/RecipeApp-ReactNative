import createDataContext from './createDataContext'

const recipeFormReducer = (state, action) => {

    if (action.type == 'change_recipe_name') {
        return { ...state, recipeName: action.payload }
    }

    if (action.type == 'change_difficulty_level') {
        return { ...state, difficultyLevel: action.payload }
    }

    if (action.type == 'change_meal_type') {
        return { ...state, mealType: action.payload }
    }

    if (action.type == 'change_num_of_people') {
        return { ...state, numOfPeople: action.payload }
    }

    if (action.type == 'change_option_ing_ins') {
        return { ...state, optionIngIns: action.payload }
    }

    if (action.type == 'toggle_add_ingredient') {
        return { ...state, showAddIngredient: action.payload }
    }

    if (action.type == 'change_ingredient') {
        return { ...state, ingredient: action.payload }
    }

    if (action.type == 'ingredient_error') {
        return { ...state, ingredientError: action.payload }
    }

    if (action.type == 'add_ingredient') {
        return { ...state, ingredients: [...state.ingredients, action.payload] }
    }

    if (action.type == 'delete_ingredient') {
        let newIngredients = state.ingredients.filter(val => val.id != action.payload);
        return { ...state, ingredients: newIngredients };
    }

    if (action.type == 'toggle_add_instruction') {
        return { ...state, showAddInstruction: action.payload }
    }

    if (action.type == 'change_instruction') {
        return { ...state, instruction: action.payload }
    }

    if (action.type == 'instruction_error') {
        return { ...state, instructionError: action.payload }
    }

    if (action.type == 'add_instruction') {
        return { ...state, instructions: [...state.instructions, action.payload] }
    }

    if (action.type == 'delete_instruction') {
        let newInstructions = state.instructions.filter(val => val.id != action.payload);
        return { ...state, instructions: newInstructions };
    }

    if (action.type == 'ingredients_instruction_error') {
        return { ...state, showIngredientInstructionError: action.payload }
    }

    if (action.type == 'set_form') {
        const { recipeName,
            difficultyLevel,
            numOfPeople,
            mealType,
            ingredients,
            instructions
        } = action.payload;

        let difficulty;
        if (difficultyLevel == 'Beginner') {
            difficulty = 0;
        } else if (difficultyLevel == 'Intermediate') {
            difficulty = 1;
        } else if (difficultyLevel == 'Advanced') {
            difficulty = 2;
        }

        return {
            ...state,
            recipeName,
            difficultyLevel: difficulty,
            numOfPeople: numOfPeople.toString(),
            mealType: mealType.toLowerCase(),
            ingredients,
            instructions,
            recipeNameError: false,
            mealTypeError: false,
            numOfPeopleError: false
        }
    }

    if (action.type == 'reset_form') {
        return {
            ...state, recipeName: '',
            recipeNameError: false,
            difficultyLevel: 0,
            numOfPeople: '',
            numOfPeopleError: false,
            mealType: 'default',
            mealTypeError: false,
            optionIngIns: 0,
            showAddIngredient: false,
            ingredients: [],
            ingredient: '',
            ingredientError: false,
            showAddInstruction: false,
            instructions: [],
            instruction: '',
            instructionError: false
        }
    }

    if (action.type == 'recipe_name_error') {
        return { ...state, recipeNameError: action.payload }
    }

    if (action.type == 'meal_type_error') {
        return { ...state, mealTypeError: action.payload }
    }

    if (action.type == 'num_of_people_error') {
        return { ...state, numOfPeopleError: action.payload }
    }

    if (action.type == 'ingredient_instruction_error') {
        return { ...state, showIngredientInstructionError: action.payload }
    }

    return state
};

const changeRecipeName = dispatch => (recipeName) => {
    dispatch({ type: 'change_recipe_name', payload: recipeName })
}

const changeDifficultyLevel = dispatch => (index) => {
    dispatch({ type: 'change_difficulty_level', payload: index })
}

const changeMealType = dispatch => (index) => {
    dispatch({ type: 'change_meal_type', payload: index })
}

const changeNumOfPeople = dispatch => (numOfPeople) => {
    dispatch({ type: 'change_num_of_people', payload: numOfPeople })
}

const changeOptionIngIns = dispatch => (index) => {
    dispatch({ type: 'change_option_ing_ins', payload: index })
}

const toggleAddIngredient = dispatch => (val) => {
    dispatch({ type: 'toggle_add_ingredient', payload: val })
}

const changeIngredient = dispatch => (ingredient) => {
    dispatch({ type: 'change_ingredient', payload: ingredient })
}

const resetIngredientError = dispatch => () => {
    dispatch({ type: 'ingredient_error', payload: false });
}

const addIngredient = dispatch => async (ingredient) => {
    if (ingredient) {
        let newIngredient = await { id: Math.floor(Math.random() * 9999).toString(), ingredient }
        await dispatch({ type: 'add_ingredient', payload: newIngredient })
        await dispatch({ type: 'toggle_add_ingredient', payload: false })
        await dispatch({ type: 'ingredient_error', payload: false });
        await dispatch({ type: 'change_ingredient', payload: '' });
    } else {
        dispatch({ type: 'ingredient_error', payload: true });
    }
}

const deleteIngredient = dispatch => (id) => {
    dispatch({ type: 'delete_ingredient', payload: id })
}

const toggleAddInstruction = dispatch => (val) => {
    dispatch({ type: 'toggle_add_instruction', payload: val })
}

const changeInstruction = dispatch => (instruction) => {
    dispatch({ type: 'change_instruction', payload: instruction })
}

const resetInstructionError = dispatch => () => {
    dispatch({ type: 'instruction_error', payload: false });
}

const addInstruction = dispatch => async (instruction) => {
    if (instruction) {
        let newInstruction = await { id: Math.floor(Math.random() * 9999).toString(), instruction }
        await dispatch({ type: 'add_instruction', payload: newInstruction })
        await dispatch({ type: 'toggle_add_instruction', payload: false })
        await dispatch({ type: 'instruction_error', payload: false });
        await dispatch({ type: 'change_instruction', payload: '' });
    } else {
        dispatch({ type: 'instruction_error', payload: true });
    }
}

const deleteInstruction = dispatch => (id) => {
    dispatch({ type: 'delete_instruction', payload: id })
}

const resetIngredientsInstructionError = dispatch => () => {
    dispatch({ type: 'ingredients_instruction_error', payload: false });
}

const resetForm = dispatch => (callback) => {
    dispatch({ type: "reset_form" });
    if (callback) {
        callback();
    }
}

const setFormState = dispatch => (recipe) => {
    dispatch({ type: 'set_form', payload: recipe })
}

const toggleRecipeNameError = dispatch => (val) => {
    dispatch({ type: "recipe_name_error", payload: val });
}

const toggleMealTypeError = dispatch => (val) => {
    dispatch({ type: "meal_type_error", payload: val });
}

const toggleNumOfPeopleError = dispatch => (val) => {
    dispatch({ type: "num_of_people_error", payload: val });
}

const toggleIngredientInstructionError = dispatch => (val) => {
    dispatch({ type: "ingredient_instruction_error", payload: val });
}

export const { Context, Provider } = createDataContext(
    recipeFormReducer,
    {
        changeRecipeName,
        changeDifficultyLevel,
        changeNumOfPeople,
        changeMealType,
        changeOptionIngIns,
        toggleAddIngredient,
        changeIngredient,
        resetIngredientError,
        addIngredient,
        deleteIngredient,
        toggleAddInstruction,
        changeInstruction,
        resetInstructionError,
        addInstruction,
        deleteInstruction,
        resetIngredientsInstructionError,
        setFormState,
        resetForm,
        toggleRecipeNameError,
        toggleMealTypeError,
        toggleNumOfPeopleError,
        toggleIngredientInstructionError
    },
    {
        recipeName: '',
        recipeNameError: false,
        difficultyLevel: 0,
        numOfPeople: '',
        numOfPeopleError: false,
        mealType: 'default',
        mealTypeError: false,
        optionIngIns: 0,
        showAddIngredient: false,
        ingredients: [],
        ingredient: '',
        ingredientError: false,
        showAddInstruction: false,
        instructions: [],
        instruction: '',
        instructionError: false,
        showIngredientInstructionError: false
    })
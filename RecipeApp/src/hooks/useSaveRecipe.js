import { useContext } from 'react';
import { Context as RecipeContext } from '../context/RecipeContext'
import { Context as RecipeFormContext } from '../context/RecipeFormContext';

export default () => {
    const {
        state: {
            recipeName,
            difficultyLevel,
            mealType,
            numOfPeople,
            ingredients,
            instructions
        },
        toggleRecipeNameError,
        toggleMealTypeError,
        toggleNumOfPeopleError,
        toggleIngredientInstructionError } = useContext(RecipeFormContext);
    const { createRecipe } = useContext(RecipeContext);

    const create = async (cb) => {
        let dl;
        recipeName ? toggleRecipeNameError(false) : toggleRecipeNameError(true);
        mealType == 'default' ? toggleMealTypeError(true) : toggleMealTypeError(false);
        numOfPeople ? toggleNumOfPeopleError(false) : toggleNumOfPeopleError(true);
        ingredients.length > 0 && instructions.length > 0 ? toggleIngredientInstructionError(false) : toggleIngredientInstructionError(true);

        if (difficultyLevel == 0) {
            dl = 'Beginner';
        } else if (difficultyLevel == 1) {
            dl = 'Intermediate';
        } else if (difficultyLevel == 2) {
            dl = 'Advanced';
        }

        if (recipeName && mealType && numOfPeople && ingredients.length > 0 && instructions.length > 0) {
            createRecipe(recipeName, dl, numOfPeople, mealType, ingredients, instructions, cb)
        }
    }

    return [create];
}
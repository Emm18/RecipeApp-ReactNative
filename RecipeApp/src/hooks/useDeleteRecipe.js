import { useContext } from 'react';
import { Context as RecipeContext } from '../context/RecipeContext'

export default () => {
    const { deleteRecipe } = useContext(RecipeContext);

    const del = async (id, cb) => {
        deleteRecipe(id, cb)
    }

    return [del];
}
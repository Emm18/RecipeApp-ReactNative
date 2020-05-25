import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements'
import { Context as RecipeFormContext } from '../context/RecipeFormContext'
import { Context as RecipeListContext } from '../context/RecipeListContext';

import RecipeForm from '../components/RecipeForm'

import useUpdateRecipe from '../hooks/useUpdateRecipe';

const UpdateRecipeScreen = ({ navigation }) => {
    const id = navigation.getParam('id');

    const [update] = useUpdateRecipe();
    const callback = () => navigation.navigate('RecipeDetails', id);
    const { setFormState } = useContext(RecipeFormContext);
    const { state: { recipe } } = useContext(RecipeListContext)

    useEffect(
        () => {
            setFormState(recipe);
        }, []
    )

    return (
        <>
            <View style={{ flex: 1 }}>
                <RecipeForm
                    onCancel={callback}
                    onSubmit={() => update(id, callback)}
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({});

UpdateRecipeScreen.navigationOptions = {
    title: <Text>Edit Recipe</Text>
};


export default UpdateRecipeScreen;
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'

import { Context as RecipeFormContext } from '../context/RecipeFormContext';

import RecipeForm from '../components/RecipeForm'
import useSaveRecipe from '../hooks/useSaveRecipe';


const CreateRecipeScreen = ({ navigation, isFocused }) => {
    const { resetForm } = useContext(RecipeFormContext);
    const [create] = useSaveRecipe();
    const callback = () => navigation.navigate('RecipeList');

    return (
        <>
            <NavigationEvents
                onWillFocus={() => resetForm()}
            />
            <View style={{ flex: 1 }}>
                <RecipeForm
                    onCancel={callback}
                    onSubmit={() => create(callback)}
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    buttons: {
        margin: 20
    },
    titleText: {
        fontSize: 20
    }
});

CreateRecipeScreen.navigationOptions = {
    title: <Text>Add Recipe</Text>
};

export default CreateRecipeScreen;
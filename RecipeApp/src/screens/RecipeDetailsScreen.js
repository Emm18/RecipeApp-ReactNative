import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Button, Text, ListItem, ButtonGroup, Overlay } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation'

import { Context as RecipeListContext } from '../context/RecipeListContext';

import useDeleteRecipe from '../hooks/useDeleteRecipe'

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const RecipeDetailsScreen = ({ navigation, isFocused }) => {
    const [optionInsIng, setOptionInsIng] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const id = navigation.getParam('id');
    const { state: { recipe }, getRecipe } = useContext(RecipeListContext);
    const { recipeName, difficultyLevel, mealType, numOfPeople, ingredients, instructions } = recipe;

    const [del] = useDeleteRecipe();

    useEffect(
        () => {
            if (isFocused) {
                getRecipe(id);
                navigation.setParams({
                    id
                });
            }
        }, [isFocused]
    )

    return (
        <>
            {recipeName && difficultyLevel && mealType ?
                <View style={{ flex: 1, margin: 10 }}>

                    <Overlay isVisible={showDelete} height={'auto'} width={'auto'}>
                        <>
                            <Text style={{ fontSize: 18 }}>Are you sure you want to delete {recipeName.toUpperCase()}?</Text>
                            <View style={{ flexDirection: "row", justifyContent: 'flex-end', marginRight: 5 }}>
                                <Button
                                    title="Confirm"
                                    onPress={() => del(id, () => navigation.navigate('RecipeList'))}
                                />
                                <Button
                                    title="Cancel"
                                    onPress={() => {
                                        setShowDelete(false)
                                    }}
                                />
                            </View>
                        </>
                    </Overlay>

                    <Image source={require('../img/recipe.jpg')} style={{ flex: 2, height: 200, width: "100%" }} />

                    <View style={{ flex: 1.5, alignItems: 'center' }}>
                        <Text style={{ fontSize: 30 }}>{recipeName.toUpperCase()}</Text>
                        <Text style={{ fontSize: 20 }}>{difficultyLevel.toUpperCase()} - {mealType.toUpperCase()}</Text>
                        <Text>Up to {numOfPeople} person</Text>
                    </View>


                    <View style={{ flex: 4 }}>
                        <ButtonGroup
                            onPress={(index) => setOptionInsIng(index)}
                            selectedIndex={optionInsIng}
                            buttons={
                                [
                                    <Text><FontAwesome name="list-ul" size={18} color="black" /> Ingredients</Text>,
                                    <Text><FontAwesome name="list-ol" size={18} color="black" /> Instructions</Text>
                                ]}
                            containerStyle={{ height: 50 }}
                        />

                        {optionInsIng == 0
                            ?
                            <FlatList
                                data={ingredients}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => {
                                    return <TouchableOpacity>
                                        <ListItem
                                            bottomDivider
                                            title={
                                                <View>
                                                    <Text>{item.ingredient}</Text>
                                                </View>
                                            }

                                        />
                                    </TouchableOpacity>
                                }}
                            />
                            :
                            <FlatList
                                data={instructions}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => {
                                    return <TouchableOpacity>
                                        <ListItem
                                            bottomDivider
                                            title={
                                                <View>
                                                    <Text>{item.instruction}</Text>
                                                </View>
                                            }

                                        />
                                    </TouchableOpacity>
                                }}
                            />
                        }



                    </View>


                    <Button
                        buttonStyle={{ backgroundColor: 'red' }}
                        icon={<AntDesign name="delete" size={24} color="black" />}
                        title={'Delete'}
                        onPress={() => setShowDelete(true)}
                    />
                </View>
                :
                null}
        </>
    )
};

RecipeDetailsScreen.navigationOptions = ({ navigation }) => {
    const id = navigation.getParam('id');

    return {
        title: <Text>Recipe Details</Text>,
        headerRight: () => <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
            navigation.navigate('UpdateRecipe', { id })
        }}>
            <FontAwesome5 name="edit" size={32} color="black" />
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    buttons: {
        margin: 20
    },
    titleText: {
        fontSize: 20
    }
});

export default withNavigationFocus(RecipeDetailsScreen);
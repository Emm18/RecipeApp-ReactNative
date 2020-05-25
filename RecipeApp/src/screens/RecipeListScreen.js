import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation'

import { Context as RecipeListContext } from '../context/RecipeListContext';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import RecipeList from '../components/RecipeList';

const RecipeListScreen = ({ isFocused }) => {
    const { state: { search, searchResult, recipeList }, changeSearch, searchRecipes, getAllRecipes } = useContext(RecipeListContext);

    //DEFAULT LIST at first load
    useEffect(() => {
        if (isFocused) {
            getAllRecipes();
        }
    }, [isFocused])

    return (
        <>
            <View style={styles.backgroundStyle}>
                <Feather
                    name="search"
                    style={styles.iconStyle}
                />
                <View style={{ width: 300 }}>
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Search"
                        style={styles.inputStyle}
                        value={search}
                        onChangeText={val => changeSearch(val)}
                        onEndEditing={() => searchRecipes(search)}
                    />
                </View>
            </View>
            {
                searchResult.length > 0
                    ?
                    <RecipeList recipeList={searchResult} />
                    :
                    <RecipeList recipeList={recipeList} />
            }

        </>
    )
};

RecipeListScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('CreateRecipe')}>
            <Ionicons name="md-add-circle" size={32} color="black" />
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 15
    },
    buttons: {
        margin: 20
    },
    titleText: {
        fontSize: 20
    }
});

export default withNavigationFocus(RecipeListScreen);
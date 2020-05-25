import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

const RecipeList = ({ navigation, recipeList }) => {
    return <FlatList
        data={recipeList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
            return <TouchableOpacity>
                <ListItem
                    bottomDivider
                    title={
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('RecipeDetails', { id: item.id })}>
                                <Card
                                    title={item.recipeName.toUpperCase()}
                                    image={require('../img/recipe.jpg')}
                                    imageStyle={{ margin: 10, padding: 10 }}
                                >
                                </Card>
                            </TouchableOpacity>

                        </View>
                    }

                />
            </TouchableOpacity>
        }}
    />
};

export default withNavigation(RecipeList);
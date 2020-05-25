import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RecipeListScreen from './src/screens/RecipeListScreen';
import RecipeDetailsScreen from './src/screens/RecipeDetailsScreen';
import CreateRecipeScreen from './src/screens/CreateRecipeScreen';
import UpdateRecipeScreen from './src/screens/UpdateRecipeScreen';

import { Provider as RecipeProvider } from './src/context/RecipeContext';
import { Provider as RecipeFormProvider } from './src/context/RecipeFormContext';
import { Provider as RecipeListProvider } from './src/context/RecipeListContext';
const navigator = createStackNavigator({
  RecipeList: RecipeListScreen,
  RecipeDetails: RecipeDetailsScreen,
  CreateRecipe: CreateRecipeScreen,
  UpdateRecipe: UpdateRecipeScreen,
},
  {
    initialRouteName: 'RecipeList',
    defaultNavigationOptions: {
      title: 'Recipe List'
    }
  }); //2nd parameter is for setting default page when the app start up

const App = createAppContainer(navigator);

export default () => {
  return (
    <RecipeProvider>
      <RecipeListProvider>
        <RecipeFormProvider>
          <App />
        </RecipeFormProvider>
      </RecipeListProvider>
    </RecipeProvider>
  );
};



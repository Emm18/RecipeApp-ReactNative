import React, { useContext } from 'react';
import { View, Picker } from 'react-native';
import { Input, ButtonGroup, Overlay, Button, Text } from 'react-native-elements'

import { Context as RecipeFormContext } from '../context/RecipeFormContext';

import IngredientsInstruction from '../components/recipeForm/IngredientsInstructions'
import AddIngInsOverlay from '../components/recipeForm/AddIngInsOverlay'

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const RecipeForm = ({ onSubmit, onCancel }) => {
    const {
        state: {
            recipeName,
            recipeNameError,
            difficultyLevel,
            numOfPeople,
            numOfPeopleError,
            mealType,
            mealTypeError,
            optionIngIns,
            showAddIngredient,
            ingredients,
            ingredient,
            ingredientError,
            showAddInstruction,
            instructions,
            instruction,
            instructionError,
            showIngredientInstructionError
        },
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
        resetIngredientsInstructionError
    } = useContext(RecipeFormContext)

    return (
        <>
            <AddIngInsOverlay
                title='Ingredient'
                value={ingredient}
                showOverlay={showAddIngredient}
                add={() => addIngredient(ingredient)}
                change={changeIngredient}
                error={ingredientError}
                toggle={() => toggleAddIngredient(false)}
                resetError={() => resetIngredientError(false)}
            />

            <AddIngInsOverlay
                title='Instruction'
                value={instruction}
                showOverlay={showAddInstruction}
                add={() => addInstruction(instruction)}
                change={changeInstruction}
                error={instructionError}
                toggle={() => toggleAddInstruction(false)}
                resetError={() => resetInstructionError(false)}
            />

            {/* INSTRUCTION / INGREDIENTS ERROR OVERLAY MESSAGE */}
            <Overlay isVisible={showIngredientInstructionError} height={'auto'} width={'auto'}>
                <>
                    <Text style={{ fontSize: 15 }}>Make sure you add Ingredients and Instructions</Text>
                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', marginRight: 5 }}>
                        <Button
                            title="Got it!"
                            onPress={() => {
                                resetIngredientsInstructionError(false)
                            }}
                        />
                    </View>
                </>
            </Overlay>

            <View style={{ flex: 1 }} >

                <View style={{ flex: 1, padding: 5, marginTop: 5 }}>
                    <Input
                        placeholder='Recipe Name'
                        onChangeText={(val) => changeRecipeName(val)}
                        value={recipeName}
                    />
                    {recipeNameError ? <Text style={{ color: 'red', marginLeft: 10 }}>Recipe Name is required</Text> : null}
                </View>

                <View style={{ flex: 1, padding: 5 }}>
                    <ButtonGroup
                        onPress={(index) => changeDifficultyLevel(index)}
                        selectedIndex={difficultyLevel}
                        buttons={['Beginner', 'Intermediate', 'Advanced']}
                        containerStyle={{ height: 50 }}
                    />
                </View>

                <View style={{ flex: 1, padding: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Picker
                                selectedValue={mealType}
                                style={{ height: 50, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => changeMealType(itemValue)}>
                                <Picker.Item label="Select Meal Type" value="default" />
                                <Picker.Item label="Breakfast" value="breakfast" />
                                <Picker.Item label="Lunch" value="lunch" />
                                <Picker.Item label="Dinner" value="dinner" />
                                <Picker.Item label="Snack" value="snack" />
                            </Picker>
                            {mealTypeError ? <Text style={{ color: 'red', marginLeft: 10 }}>Select Meal Type</Text> : null}
                        </View>

                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Input
                                placeholder='Number of people'
                                onChangeText={(val) => changeNumOfPeople(val)}
                                value={numOfPeople}
                            />
                            {numOfPeopleError ? <Text style={{ color: 'red', marginLeft: 10 }}>Number of people is required</Text> : null}
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, padding: 5 }}>
                    <ButtonGroup
                        onPress={(index) => changeOptionIngIns(index)}
                        selectedIndex={optionIngIns}
                        buttons={
                            [
                                <Text><FontAwesome name="list-ul" size={18} color="black" /> Ingredients</Text>,
                                <Text><FontAwesome name="list-ol" size={18} color="black" /> Instructions</Text>
                            ]}
                        containerStyle={{ height: 50 }}
                    />
                </View>

                {
                    optionIngIns == 0
                        ?
                        <IngredientsInstruction
                            title={"Ingredient"}
                            toggleOverlay={() => { toggleAddIngredient(true) }}
                            items={ingredients}
                            deleteItem={deleteIngredient}
                        />
                        :
                        <IngredientsInstruction
                            title={"Instruction"}
                            toggleOverlay={() => { toggleAddInstruction(true) }}
                            items={instructions}
                            deleteItem={deleteInstruction}
                        />
                }

                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, margin: 5 }}>
                            <Button
                                icon={<AntDesign name="checkcircle" size={24} color="black" style={{ marginRight: 5 }} />}
                                title={'Save'}
                                onPress={onSubmit}
                            />
                        </View>

                        <View style={{ flex: 1, margin: 5 }}>
                            <Button
                                buttonStyle={{ backgroundColor: 'red' }}
                                icon={<MaterialIcons name="cancel" size={26} color="black" />}
                                title={'Cancel'}
                                onPress={onCancel}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default RecipeForm;
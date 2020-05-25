import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, ListItem } from 'react-native-elements'

import { MaterialIcons } from '@expo/vector-icons';

const IngredientsInstructions = ({ title, toggleOverlay, items, deleteItem }) => {
    return <>

        <View style={{ flex: 4, padding: 5 }}>
            <Button
                icon={<MaterialIcons name="playlist-add" size={26} color="black" style={{ marginRight: 5 }} />}
                title={"Add " + title}
                onPress={toggleOverlay}
            />

            {items.length > 0
                ?
                <FlatList
                    data={items}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        return <TouchableOpacity>
                            <ListItem
                                bottomDivider
                                title={
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 3 }}>
                                            <Text>{item[title.toLowerCase()]}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                                            <TouchableOpacity onPress={() => deleteItem(item.id)}>
                                                <MaterialIcons name="delete" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            />
                        </TouchableOpacity>
                    }}
                />
                :
                <View>
                    <Text style={{ color: 'red', textAlign: 'center' }}>0 {title} added</Text>
                </View>
            }
        </View>
    </>
};

export default IngredientsInstructions;
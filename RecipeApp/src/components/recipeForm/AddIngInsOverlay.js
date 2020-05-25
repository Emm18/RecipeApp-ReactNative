import React from 'react';
import { View } from 'react-native';
import { Input, Overlay, Button, Text } from 'react-native-elements'


const AddIngInsOverlay = ({ title, value, showOverlay, add, change, error, toggle, resetError }) => {
    return <>
        <Overlay isVisible={showOverlay} height={'auto'}>
            <>
                <View style={{ marginBottom: 10 }}>
                    <Input
                        placeholder={`Enter ${title}`}
                        onEndEditing={add}
                        onChangeText={(val) => change(val)}
                        value={value}
                    />
                    {error ? <Text style={{ color: 'red', marginLeft: 15 }}>Please enter {title}</Text> : null}
                </View>


                <View style={{ flexDirection: "row", justifyContent: 'flex-end', marginRight: 10 }}>
                    <Button
                        title="Submit"
                        onPress={add}
                    />
                    <View style={{ margin: 5 }} />
                    <Button
                        style={{ backgroundColor: "red" }}
                        title="Cancel"
                        onPress={() => {
                            change('')
                            toggle();
                            resetError();
                        }}
                    />
                </View>
            </>
        </Overlay>
    </>
};

export default AddIngInsOverlay;
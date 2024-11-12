import React,{useContext,useState} from 'react';
import { StyleContext } from '../../GlobalStyleProvider';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const style = StyleSheet.create({
    profilePage:{
        backgroundColor: "#ffffff",
        flex: 1,
    }

})

const Profile = (props) => {
    const { navigation } = props
    const globalStyle = useContext(StyleContext);
    return (
        <View style={style.profilePage}>
            <View style={{ flexGrow: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={{color:'#000000',fontSize:20}}>hello</Text>

            </ScrollView>


            </View>

        </View>
    );
};

export default Profile;
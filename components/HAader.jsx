import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Pressable,
    FlatList,
    Image,
  } from "react-native";
  import  { React,useEffect, useRef, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import COLORS from "../constants/colors";
  import { Ionicons } from "@expo/vector-icons";
  import Button from "../components/Button";
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { ItemNote, oneNote} from "../constants/ItemNote";
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  
  import BarButton from "../components/BarButton";
  
  

const HAader = ({ navigation }) => {

    const handleUserPress = () => {
        alert("User");
        navigation.navigate("user");
      };

      const handleCreatePress = () => {
        alert("Create");
        navigation.navigate("create");
      };

      const handleLogOutPress = () => {
        alert("welcome");
        navigation.navigate("welcome");
      };

    return( 
<View style={{ backgroundColor: COLORS.primary, justifyContent: "space-between" ,flexDirection: "row",alignItems: "center",height:50, borderBottomColor:COLORS.terceary, borderBottomWidth: 1,}}>

<TouchableOpacity onPress={handleLogOutPress}>
<Ionicons style={{marginVertical:5}}
name="log-out-outline" size={40}                
color={COLORS.secundary}/>
</TouchableOpacity>

 
<TouchableOpacity onPress={handleUserPress}>
<Ionicons style={{marginVertical:5}}
name="person-circle-outline" size={40}                
color={COLORS.secundary}/>
</TouchableOpacity>
        

<TouchableOpacity onPress={handleCreatePress}>
<Ionicons style={{marginVertical:5}}
name="add-circle" size={40}                
color={COLORS.secundary}/>
</TouchableOpacity>



</View>
          

        );
       

}

export default HAader;
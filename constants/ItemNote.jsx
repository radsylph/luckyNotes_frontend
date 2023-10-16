import {Text, View, TouchableOpacity} from "react-native";
import COLORS from "./colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const ItemNote = [
    {
        id:1,
        name: 'nota1',
        Descripcion:'raul es marico',
    },

    {
        id:2,
        name: 'nota2',
        Descripcion:'descripcion de nota 2',
    },

    {
        id:3,
        name: 'nota3',
        Descripcion:'dracripcion de nota 3',
    },

    {
        id:4,
        name: 'nota1',
        Descripcion:'raul es marico',
    },

    {
        id:5,
        name: 'nota2',
        Descripcion:'descripcion de nota 2',
    },

    {
        id:6,
        name: 'nota3',
        Descripcion:'dracripcion de nota 3',
    },
    {
        id:7,
        name: 'nota1',
        Descripcion:'raul es marico',
    },

    {
        id:8,
        name: 'nota2',
        Descripcion:'descripcion de nota 2',
    },

    {
        id:9,
        name: 'nota3',
        Descripcion:'dracripcion de nota 3',
    },


]

export const oneNote = ({item}) =>(
    
 // <Text>{item.id}</Text> ,
 //<Text>{item.Descripcion}</Text>
 <View style={{borderRadius: 20, backgroundColor: COLORS.secundary,marginVertical: 4,height:80, paddingLeft: "5%",justifyContent: "space-between" ,flexDirection: "row"}}>

    <View>
            <Text style={{ color: COLORS.terceary, fontSize: 20, fontWeight: "bold",marginVertical: 4}}>{item.name}</Text>
            <Text style={{ color: COLORS.terceary,}}>{item.Descripcion}</Text>
    </View>
   
    <View style={{justifyContent: "space-between" ,flexDirection: "row",marginVertical:8}}>
        
        <TouchableOpacity>
            <Ionicons style={{marginVertical:12,marginHorizontal:8,marginBottom:10}}
            name="trash-outline" size={30}                
            color={COLORS.terceary}/>
        </TouchableOpacity>
        
        <TouchableOpacity>
        <Ionicons style={{marginVertical:12,marginHorizontal:8,marginBottom:10}}
        name="bookmark" size={30}                
        color={COLORS.terceary}/>
        </TouchableOpacity>
        
        
    </View> 
    
    
    
 </View>
 

)

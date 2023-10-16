import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Pressable,
    FlatList
  } from "react-native";
import COLORS from '../constants/colors';
import { ItemNote } from "../constants/ItemNote";
import CardNote from "../components/CardNote";

const NoteList = () => {


  return (
    <FlatList 
    data={ItemNote}
    renderItem={({item})=> <CardNote item={item}/>}
    firstItem={1}
    slideStyle={{display: 'flex', alignItem: 'center'}}
  />
  );r
};

export default NoteList;
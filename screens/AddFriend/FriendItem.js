import { firebase } from '@react-native-firebase/database';
import React,{ useState, useEffect } from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';


const FriendItem = ({item}) =>{
    

return(
<View style={[{width:250,padding:10,borderRadius:8,marginLeft:25,marginTop:10}]}>
 <Text style={{color:'white',borderWidth:1,padding:11,borderColor:'#ccc',borderRadius:8,backgroundColor:'black'}}>{item.email}</Text>
</View>
)

}
export default FriendItem
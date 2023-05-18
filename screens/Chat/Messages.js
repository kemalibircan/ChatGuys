import { firebase } from '@react-native-firebase/database';
import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';

const Messages = ({item,index}) =>{
    
    const user = firebase.auth().currentUser;
      const userId = user.uid;
       
    return <View style={(userId != item.userId  ) ? style.other : style.me}>
                <TouchableOpacity>
                 <View style={[style.bubble,{backgroundColor:(userId != item.userId  ) ? '#34b7f1' : '#30B485'},{borderBottomRightRadius:(index %2 === 0 ) ? 8 : 0},{borderBottomLeftRadius:(index %2 === 1 ) ? 8 : 0}]}>
                
                 <Text style={{ fontSize:17,color:(userId != item.userId) ? 'white' : 'white'}}>{item.text}</Text>
                  <Text style={style.name}>{item.userName} </Text>
              </View>
              </TouchableOpacity>
           </View>
  };
  
  const style = StyleSheet.create({
      other:{
        
          flexDirection:'row',
          flex:1,
          justifyContent:'flex-start',
          
      },
      me:{
          flexDirection:'row',
          flex:1,
          justifyContent:'flex-end',
         
      },
      bubble:{
        backgroundColor:'#ccc',
          padding:20,
          width:150,
          marginBottom:10,
          borderRadius:10
          
      },
      name:{color:'black',fontSize:12 , flex:1, flexDirection:'row', justifyContent:'flex-end' }
  })
export default Messages;
import React from "react";
import { View, Text, SafeAreaView, StyleSheet,TextInput,TouchableOpacity,Button, Alert,FlatList} from "react-native";
import { firebase } from '@react-native-firebase/database';
import auth from "@react-native-firebase/auth";
import FriendItem from "./FriendItem";

 export default class FriendOptions extends React.Component {
  constructor(){
    super()
    this.state = {
        emailandid:[]
    }

} 
componentDidMount(){
  emailandid = [];

  const reference = firebase
  .app()
  .database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
  .ref('users/userProp/');

  reference.on('value', snapshot => {
    snapshot.forEach((item) => 
    emailandid.push({
      email:item.val().email,
      id:item.val().id,
      name:item.val().name
    })
    )
    this.setState({emailandid})
   
  
  });
}
    renderItem =({item}) =>{
          return <FriendItem item ={item}/>
          
  }





render(){


    return(
        <SafeAreaView style={{flex:1}}>
      <View style={style.capsule}>
      <Text style={{ fontSize:18,color:'black',marginBottom:11}}> UYGULAMAYI KULLANANLAR</Text>
      <FlatList
                    style={{width:300,borderRadius:11,borderWidth:1,borderColor:'#ddd'}}
                     data={this.state.emailandid}
                    renderItem={this.renderItem}></FlatList>
      </View>
     
          
          
    </SafeAreaView>


    )
}

} 
const style = StyleSheet.create({

    capsule:{flex:1, alignItems:"center", padding:60,backgroundColor:'#FFF'},
    form:{flex:1,paddingTop:100},
    form_input:{backgroundColor:'#f7f7f7',width:300,height:50,borderRadius:10,marginTop:15,color:'black'},
    forgot:{paddingTop:10,flexDirection:"row",justifyContent:"flex-end",},
    button:{marginTop:50,backgroundColor:'#5BC236',height:50,borderRadius:10,alignItems:"center",justifyContent:"center"},
    button_text:{color:"#fff",fontSize:18,fontWeight:'600',letterSpacing:2},
    bottom:{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10},
    bottom_text:{fontSize:17},
    bottom_opacity_text:{fontSize:17,fontWeight:'500'},
    error:{color:'red'}
    
  
  
  })

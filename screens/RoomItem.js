import React,{useState,useEffect} from "react";
import { View, Text, SafeAreaView, StyleSheet,TextInput,TouchableOpacity,Button, Alert} from "react-native";
import * as RootNavigation from  "./RootNavigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import { firebase } from '@react-native-firebase/database';




const roomItem = ({item}) =>{
        const   [disabled,Setdisabled] = useState(true)
        



        const roomReference = firebase
        .app()
        .database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref(`rooms/`+item.id);
        
        roomReference.once('value')
        .then(snapshot => {
          const roomCreatorUserId = snapshot.val().userId;
          const userbeta = firebase.auth().currentUser;
          const userId = userbeta.uid;
           if(userId==roomCreatorUserId){
            Setdisabled(false)}
        });


        
        useEffect(() => {
           
          }, []);

    const deleteitem = () =>{
        
        firebase.app().database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref('/rooms/'+item.id).remove();
         firebase.app().database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref('/messages/'+item.id) 
        .remove();
        
       
    
    }



return(

    <SwipeListView
            style={style.swipeList}
            data={[item]}
            renderItem={ (data ) => (
                <TouchableOpacity style={style.item} 
         onPress={() =>RootNavigation.navigate('ChatRoom',{
            name:item.name,
            id:item.id
        })
        
                    
        }>
            
            <View style={{flex:1 ,flexDirection:'row',alignItems:'center'}}>
        <Text style={style.text}>{item.name}</Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
        <Text style={{color:'black'}}>Oluşturan:{item.userName}</Text>
        </View>
        </View>  
        </TouchableOpacity>
            )}
            renderHiddenItem ={(data,rowMap) => (
                <View style={style.rowBack}>
                    <TouchableOpacity disabled={disabled} onPress={deleteitem} style={[style.backLeftbtn,{backgroundColor:(disabled == false ) ? 'red' : '#EAEAEA'}]}>
                        <Text style={{color:'white'}}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
            leftOpenValue={75}
           

   /* <TouchableOpacity style={style.item} 
    onPress={()=> RootNavigation.navigate('ChatRoom',{
        name:item.name,
        id:item.id
        
                    })
}/>
            <View style={{flex:1}}>
        <Text style={style.text}>{item.name}</Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
        <Text style={{color:'black'}}>Oluşturan:{item.userName}</Text>
        </View>
        </View>  
            </TouchableOpacity>
            */
           />
)

}

const style = StyleSheet.create({
    rowBack:{alignItems:'center',flex:1,flexDirection:'row'},
    swipeList:{
    backgroundColor:'white',
    padding:20,
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
      },

    item:{
        backgroundColor:'white',
       
    },

    text:{
            fontSize:20,
            color:'black'

    },
    backRightBtn:{
        paddingVertical:10,backgroundColor:'#5BC236', width:60, alignItems:'center',justifyContent:'center',height:50,right:0,position:'absolute'
    },

    backLeftbtn:{paddingVertical:10,backgroundColor:'red', width:60, alignItems:'center',justifyContent:'center',height:50,left:0
}
})
export default roomItem;


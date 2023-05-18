import React from 'react';
import {View,Text, Touchable, TouchableOpacity, Button, StyleSheet, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { SafeAreaView } from 'react-native-safe-area-context';
import RoomItem from "../RoomItem"


export default class Home extends React.Component{
        constructor(){
                super();
                this.state = {
                    rooms:[],
                    isMeCreated:false,
                    roomid:[]
                    
                };
                

        }
    componentDidMount(){
        const user = firebase.auth().currentUser;

        const reference = firebase
        .app()
        .database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref('rooms');
    
        reference.on('value',snapshot => {
            var rooms =[];

          snapshot.forEach((item) => 
          rooms.push({
            name:item.val().name,
            id:item.key,
            userName:item.val().userName
          })
          )
          this.setState({rooms})
        });

       
       
    
    }
    signOut = () =>{
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        this.props.navigation.navigate('Auth');
        

    };

    arkadasEkle = () =>{
        this.props.navigation.navigate("FriendOptions");


    }

    odaOlustur = () =>{

            this.props.navigation.navigate("ChatCreater");


    };
    renderItem =({item}) =>{
        
            return <RoomItem item ={item}/>
    }
    
   
    

    render(){

        return(
            <SafeAreaView style={{flex:1}}>
                <View style={style.title}>
                    <Text style={style.text}>
                        ChatApp
                    </Text>
                </View>
                
                    <FlatList
                    style={{flex:1,padding:5}}
                     data={this.state.rooms} 
                    renderItem={this.renderItem}></FlatList>
                

                <View style={style.capsule}>
                <Button color={'#34b7f1'} title='Who using app' onPress={this.arkadasEkle}/>
                <Button  color={'#34b7f1'} title='Create Room' onPress={this.odaOlustur}/>
                <Button  color={'#34b7f1'} title='Sign out' onPress={this.signOut}/>
                </View>
                

            </SafeAreaView>
            
        )
    }
}

const style = StyleSheet.create ({
    capsule:{justifyContent:'flex-end'},
    title:{ backgroundColor:'#34b7f1',justifyContent:'center',flexDirection:'row',paddingBottom:15,alignItems:'center'},
    text:{paddingTop:11,fontSize:15,fontWeight:'600',color:'white'}
})
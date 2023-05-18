import React,{Component} from "react";
import {View,Text, Touchable, TouchableOpacity, Button, StyleSheet, FlatList, TextInput,Alert} from 'react-native';
import { navigate, navigationRef } from "../RootNavigation";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Messages from "./Messages";
import { firebase } from '@react-native-firebase/database';



 class ChatRoomCreate extends React.Component {
  constructor(){
    super();
    this.state ={
        messages:[],
        text:'',
        roomCreatorUserId:null,
        disabled:true
        

    }
  }
  componentDidMount(){
    const {name,id} = this.props.route.params;
    const reference = firebase
        .app()
        .database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref(`/messages/${id}`);
    
        reference.on('value',snapshot => {
            var messages =[];

          snapshot.forEach((item) => 
          messages.push({
            roomId:item.val().roomId,
            name:item.val().name,
            id:item.key,
            userId:item.val().userId,
            userName:item.val().userName,
            text:item.val().text
          })
          )
          this.setState({messages})
         
          
        });

     
        
        const roomReference = firebase
        .app()
        .database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref(`rooms/`+id);
        roomReference.once('value')
        .then(snapshot => {
          const disabled = false
          const roomCreatorUserId = snapshot.val().userId;
          const userbeta = firebase.auth().currentUser;
          const userId = userbeta.uid;
           if(userId==roomCreatorUserId){
            this.setState({disabled})}
        });
      
        
 

  }

  delete = async() =>{
   /* const {name,id} = this.props.route.params;

    await firebase.app().database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
    .ref('/rooms/'+id).remove();
    await firebase.app().database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
    .ref('/messages/'+id).remove();

    this.props.navigation.navigate("Home");
*/

  }

  createThreeButtonAlert = () =>
  Alert.alert('Silme işlem.','Silmeyi onaylıyor musunuz?' ,[
    {
      style:'default',
      text: 'Sil',
      onPress: () => {
      const {name,id} = this.props.route.params;
       firebase.app().database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
      .ref('/rooms/'+id).remove();
       firebase.app().database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
      .ref('/messages/'+id).remove();
  
      this.props.navigation.navigate("Home");},
    },
    {
      text: 'İptal',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    }
  ]);


    handleSubmit=()=>{
      this.props.navigation.navigate("Home");

    }
    renderItem = ({item,index}) =>{
      return(<Messages item={item} index={index}/>
      )
    }

      handleSend = (item) =>{
          const {name,id} = this.props.route.params;
          console.log(item.userId);
          const text = this.state.text;
          
          const user = firebase.auth().currentUser;
      const userId = user.uid;
      console.log(userId);

      const userName = user.displayName;
      const reference = firebase
  .app()
  .database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
  .ref(`/messages/${id}`);
      reference.push({
        id,
        text,
        userId,
        userName

      }).then((result) =>{this.setState({text:''})})
      .catch((error) => console.log(error))

      }


render(){
  const {name,id} = this.props.route.params;
  const { text,messages } = this.state;
    return(
            <SafeAreaView style={{flex:1}}>
             
                <View style={style.container}>
              <TouchableOpacity onPress={ this.handleSubmit}style={{paddingLeft:10,flexDirection:'row',justifyContent:'flex-start'}}>
                <Icon name={'arrow-back-circle-outline'} size ={30} color='black'/>
              </TouchableOpacity>
              <View>
              <Text style={style.roomname}>{name}</Text>
              </View>
              <TouchableOpacity disabled={this.state.disabled}
              style={{paddingRight:10}}onPress={ this.createThreeButtonAlert}>
                <Icon name={'md-trash'} size ={27} color={(this.state.disabled == false) ? 'red' : 'white'}/>
              </TouchableOpacity>
              </View>
              <View style={{flex:1}}>
                <FlatList style={style.FlatList} renderItem={this.renderItem} data={messages}/>
              </View>
              <View style={{ flexDirection:'row'}}>
                <TextInput placeholderTextColor={'purple'}
                placeholder="Bir şeyler yaz"
                style={{width:'90%',color:'purple'}}
                 value={text}
                 onChangeText={(text) => this.setState({text})}>
                </TextInput >
                <TouchableOpacity onPress={this.handleSend}><Icon name ={'arrow-forward-circle-outline'} size={30} color='purple' style={{paddingTop:5}}/></TouchableOpacity>
                
              </View>
            </SafeAreaView>


    )
}

} 
export default ChatRoomCreate

const style = StyleSheet.create({
    roomname:{fontSize:25,fontWeight:'400',letterSpacing:2,color:'black'},
    container:{height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'black'},
    FlatList:{backgroundColor:'#ddd',padding:10},
   
    



})

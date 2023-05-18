import React from "react";
import { View, Text, SafeAreaView, StyleSheet,TextInput,TouchableOpacity,Button, Alert} from "react-native";
import { Formik } from "formik";
import * as  Yup from 'yup';
import { firebase } from '@react-native-firebase/database';



 class ChatRoomCreate extends React.Component {
    constructor(){
            super();
            this.state={
            name:'',
            }

    }

  
    handleSubmit = (values) =>{
      const user = firebase.auth().currentUser;
      const userId = user.uid;
      const userName = user.displayName;
      const reference = firebase
  .app()
  .database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
  .ref('rooms');
      reference.push({
        name:values.name,
        userId,
        userName

      }).then((result) =>this.props.navigation.navigate("Home"))
      .catch((error) => console.log(error))

    };



render(){


    return(
        <SafeAreaView style={{flex:1}}>
      <View style={style.capsule}>
       
        <Formik
      initialValues={{
        name:'',
      }}
      onSubmit={this.handleSubmit}
      validationSchema={Yup.object().shape({
        name:Yup.string().required('Name is requiered'),

      })}>
        {
          ({values,
            handleSubmit,
            isValid,
            isSubmitting,
            errors,
            handleChange}) => (
         
      <View style={style.form}>
         

        <TextInput placeholderTextColor={'black'} placeholder={"Chat Room Name"} style={style.form_input} onChangeText={handleChange('name')} values={values.name}/>
        {(errors.name) && <Text style={style.error}>{errors.name}</Text>}
        <View>
                </View>
        <TouchableOpacity style={style.button}   disabled={!isValid } onPress={handleSubmit}>
              <Text style={style.button_text} >Create Room</Text>
        </TouchableOpacity>
        <View style={style.bottom}>
        </View>
      </View>
      )
          }
      </Formik>
      </View>
      
      
    </SafeAreaView>


    )
}

} 
const style = StyleSheet.create({

    welcome:{color:'#1C1939', fontSize:30, fontWeight:'600'},
    capsule:{flex:1, alignItems:"center", padding:60,backgroundColor:'#FFF'},
    welcome_countinue:{fontSize:17,paddingTop:15},
    form:{flex:1,paddingTop:100},
    form_input:{backgroundColor:'#f7f7f7',width:300,height:50,borderRadius:10,marginTop:15,color:'black'},
    forgot:{paddingTop:10,flexDirection:"row",justifyContent:"flex-end",},
    button:{marginTop:50,backgroundColor:'black',height:50,borderRadius:10,alignItems:"center",justifyContent:"center"},
    button_text:{color:"#fff",fontSize:18,fontWeight:'600',letterSpacing:2},
    bottom:{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10},
    bottom_text:{fontSize:17},
    bottom_opacity_text:{fontSize:17,fontWeight:'500'},
    error:{color:'red'}
    
  
  
  })
  export default ChatRoomCreate;

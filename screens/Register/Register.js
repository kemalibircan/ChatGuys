import React, {Component} from 'react'
import { View, Text, SafeAreaView, StyleSheet,TextInput,TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as  Yup from 'yup';
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/Ionicons"; 
import { firebase } from '@react-native-firebase/database';


class Register extends React.Component {
 
  constructor(){

    super();  
    this.state={
      name:'',
      checkbox:false,
      email:'',
      password:'',
      hidePassword:true,

    }
    
  }
  handleSubmit = (values) =>{
    if(this.state.checkbox == true){

      auth().createUserWithEmailAndPassword(values.email,values.password)
      .then(() =>{
      const update ={displayName : values.name};
      auth().currentUser.updateProfile(update);
      
     
      this.props.navigation.navigate('App');
      alert('Başarıyla kaydedildi!');
      this.doSomething(values);

      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Sisteme kayıtlı e-mail adresi. Lütfen giriş yapınız.');
        }
    
        if (error.code === 'auth/invalid-email') {
          alert('Bu e-mail adresi geçersiz');
        }
    




      });
  
    } else{
      alert('Lutfen şartları onaylayınız.')
    }

    
    
    
  }

doSomething = (values) => {
  const user = auth().currentUser;
  const userId = user.uid;

  console.log(userId)

  const reference = firebase
        .app()
        .database('https://chatguysrn-default-rtdb.europe-west1.firebasedatabase.app/')
        .ref('users/userProp');
        reference.push({
            name:values.name,
            email:values.email,
            id:userId
        })
    
}


  render() {

    return (
      <SafeAreaView style={{flex:1}}>
    <View style={style.capsule}>
      <View style={{alignItems:"center"}}>
          <Text style={style.welcome}>Welcome!</Text>
          <Text style={style.welcome_countinue}>Create your new account.</Text>
      </View>
      <Formik
      initialValues={{
        name:'',
        email:'',
        password:'',
      }}
      onSubmit={this.handleSubmit}
      validationSchema={Yup.object().shape({
        name:Yup.string(),
        email:Yup.string().email('Invalid email').required('Email address is requiered'),
        password:Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')

      })}>
        {
          ({values,
            handleSubmit,
            isValid,
            isSubmitting,
            errors,
            handleChange}) => (
         
      <View style={style.form}>
        <TextInput placeholderTextColor={'black'} placeholder={"Name"} style={style.form_input} onChangeText={handleChange('name')} values={values.name}/>
        <TextInput placeholderTextColor={'black'} textContentType="emailAddress" placeholder={"E-mail"} style={style.form_input} onChangeText={handleChange('email')} values={values.email}/>
        {(errors.email) && <Text style={style.error}>{errors.email}</Text>}
        <View>
        <TextInput placeholderTextColor={'black'} secureTextEntry={this.state.hidePassword}
        textContentType="password" placeholder={"Password"} style={style.form_input} onChangeText={handleChange('password') }values={values.password}/>
        {(errors.password) && <Text style={style.error}>{errors.password}</Text>}
        <TouchableOpacity style = {{position:'absolute',right:5,top:25}}onPress={() => this.setState({hidePassword:!this.state.hidePassword})}>
          <Icon name ={(this.state.hidePassword) ? 'eye' : 'eye-off-outline'}
          color="black"
          size={25}></Icon>
        </TouchableOpacity>

        </View>
        
        <View style={style.checkbox_container}>
            <TouchableOpacity style={style.checkbox} onPress ={()=>this.setState({checkbox:!this.state.checkbox})} > 
            { this.state.checkbox &&
            <Text style={{fontSize:22}}>✓</Text> 
            }
            </TouchableOpacity>
            
            <Text style={{color:'black'}}>You will create account but we are taking your all data are you sure?</Text>

        </View>
        
        <TouchableOpacity style={style.button}   disabled={!isValid} onPress={handleSubmit}>

          <Text style={style.button_text}>Sign Up</Text>
        </TouchableOpacity>
        <View style={style.bottom}>
        <Text style={style.bottom_text}>Already have an account? - <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")} ><Text style={style.bottom_opacity_text}>Sign In</Text></TouchableOpacity></Text>

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
export default Register;




const style = StyleSheet.create({

  welcome:{color:'#1C1939', fontSize:30, fontWeight:'600'},
  capsule:{flex:1, alignItems:"center", padding:60,backgroundColor:'#FFF'},
  welcome_countinue:{fontSize:17,paddingTop:15,color:'black'},
  form:{flex:1,paddingTop:100},
  form_input:{backgroundColor:'#f7f7f7',width:300,height:50,borderRadius:10,marginTop:15,color:'black'},
  forgot:{paddingTop:10,flexDirection:"row",justifyContent:"flex-end",},
  button:{marginTop:50,backgroundColor:'#00ff00',height:50,borderRadius:10,alignItems:"center",justifyContent:"center"},
  button_text:{color:"#fff",fontSize:18,fontWeight:'600',letterSpacing:2},
  bottom:{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10},
  bottom_text:{fontSize:17,color:'black'},
  bottom_opacity_text:{fontSize:17,fontWeight:'500',color:'black'},
  checkbox:{alignItems:'center',justifyContent:'center', width:30,height:30,borderRadius:5,marginRight:5,backgroundColor:'rgba(113,101,227,0.2)',borderWidth:2,borderColor:"#7163e3"},
  checkbox_container:{flexDirection:"row",marginTop:15},
  checkbox_text:{color:'black',},
  error:{color:'red'},
  
  
  


 
})
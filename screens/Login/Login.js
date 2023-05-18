import React from "react";
import { View, Text, SafeAreaView, StyleSheet,TextInput,TouchableOpacity,Button, Alert} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Formik } from "formik";
import * as  Yup from 'yup';
import Icon from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';


class Login extends React.Component {
  constructor( ) {
      super();
      this.state = {
          hidePassword:true,
          email:'',
          password:''

      }


  }

  handleSubmit = (values) =>{
    
    const Stack = createNativeStackNavigator();
    auth().signInWithEmailAndPassword(values.email,values.password)
    .then((user) =>
    {alert('Başarıyla girildi')
    this.props.navigation.navigate('App');

    })
    .catch(error => {
      if (error.code === 'auth/wrong-password') {
        alert('Şifre Yanlış');
      }
      if (error.code === 'auth/invalid-email') {
        alert('Bu e-mail adresi geçersiz');
      }
  
      console.error(error);
    });
  }
  
  render() {
   

    
        return (
      <SafeAreaView style={{flex:1}}>
      <View style={style.capsule}>
        <View style={{alignItems:"center"}}>
            <Text style={style.welcome}>Welcome to ChatGuys</Text>
            <Text style={style.welcome_countinue}>Sign in to continue</Text>
        </View>
        <Formik
      initialValues={{
        email:'',
        password:'',
      }}
      onSubmit={this.handleSubmit}
      validationSchema={Yup.object().shape({
        email:Yup.string().email('Invalid email').required('Email address is requiered'),
        password:Yup.string().min(6, 'Password must be at least 6 characters').required('Password is requ ired')

      })}>
        {
          ({values,
            handleSubmit,
            isValid,
            isSubmitting,
            errors,
            handleChange}) => (
         
      <View style={style.form}>
         

        <TextInput placeholderTextColor={'black'} textContentType="emailAddress" placeholder={"E-mail"} style={style.form_input} onChangeText={handleChange('email')} values={values.email}/>
        {(errors.email) && <Text style={style.error}>{errors.email}</Text>}
        <View>
        <TextInput placeholderTextColor={'black'} textContentType="password" placeholder={"Password"} style={style.form_input} onChangeText={handleChange('password') }values={values.password} secureTextEntry={this.state.hidePassword}/>
        <TouchableOpacity style = {{position:'absolute',right:5,top:25}} onPress={() => this.setState({hidePassword:!this.state.hidePassword})}>
        <Icon
          name={(this.state.hidePassword)  ? 'eye' : 'eye-off-outline'}
          color="black"
          size={25}
            /> 
        </TouchableOpacity>
        {(errors.password) && <Text style={style.error}>{errors.password}</Text>}
        </View>
        <TouchableOpacity style={style.forgot}><Text style={{color:'black'}}>Forgot Password?</Text></TouchableOpacity>
        <TouchableOpacity style={style.button}   disabled={!isValid } onPress={handleSubmit}>
              <Text style={style.button_text} >Sign In </Text>
        </TouchableOpacity>
        <View style={style.bottom}>
        <Text style={style.bottom_text}>Don't have an account - <TouchableOpacity onPress={()=> this.props.navigation.navigate("Register")} ><Text style={style.bottom_opacity_text}>Sign Up</Text></TouchableOpacity></Text>

        </View>
      </View>
      )
          }
      </Formik>
      </View>
      
      
    </SafeAreaView>
      
    );
  }
}
export default Login;


const style = StyleSheet.create({

  welcome:{color:'#1C1939', fontSize:30, fontWeight:'600'},
  capsule:{flex:1, alignItems:"center", paddingTop:60,paddingBottom:60,backgroundColor:'#FFF'},
  welcome_countinue:{fontSize:17,paddingTop:15,color:'black'},
  form:{flex:1,paddingTop:100},
  form_input:{backgroundColor:'#f7f7f7',width:300,height:50,borderRadius:10,marginTop:15,color:'black'},
  forgot:{paddingTop:10,flexDirection:"row",justifyContent:"flex-end"},
  button:{marginTop:50,backgroundColor:'#00ff00',height:50,borderRadius:10,alignItems:"center",justifyContent:"center"},
  button_text:{color:"#fff",fontSize:18,fontWeight:'600',letterSpacing:2},
  bottom:{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10},
  bottom_text:{fontSize:17,color:'black'},
  bottom_opacity_text:{fontSize:17,fontWeight:'500',color:'black'},
  error:{color:'red'}
  


})
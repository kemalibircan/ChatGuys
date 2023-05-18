import React from "react";
import { View, Text, SafeAreaView, StyleSheet} from "react-native";
import { firebase } from "@react-native-firebase/auth";



export default class AuthLoading extends React.Component{

    constructor(){
            super();


    }

    componentDidMount(){
        const user = firebase.auth().currentUser
        const isLogged = true;
        if(user){

            this.props.navigation.navigate('App')
        }else{

            this.props.navigation.navigate('Auth')
        }




    }

    render(){
            return(
                <View><Text>Yükleniyor...</Text></View>
            )




    }
           
    






}
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import Login from './screens/Login/Login'
import Register from './screens/Register/Register' 
import Home from './screens/Home/Home'
import ChatRoomCreate from './screens/Chat/ChatRoomCreate'
import ChatRoom from './screens/Chat/ChatRoom'
import { navigationRef } from './screens/RootNavigation'
import FriendOptions from "./screens/AddFriend/FriendOptions";
import AuthLoading from "./screens/AuthLoading/AuthLoading";
import { createSwitchNavigator } from "@react-navigation/compat";
const Stack = createNativeStackNavigator();

const AuthStack = () =>{
  return( 
     <Stack.Navigator initialRouteName="Login" >
    <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
    <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
    
    </Stack.Navigator>)
  

}

const AppStack = () =>{

return(
   <Stack.Navigator initialRouteName="Home" >
    <Stack.Screen name ='Home' component={Home} options={{headerShown:false}}/>
  <Stack.Screen name="ChatCreater" component={ChatRoomCreate} options={{headerShown:false}}/>
  <Stack.Screen name="ChatRoom" component={ChatRoom} options={{headerShown:false}}/>
  <Stack.Screen name="FriendOptions" component={FriendOptions} options={{headerShown:false}}/>
  </Stack.Navigator>

)
   

}

const AuthLoadingStack = () =>{

return(

  <Stack.Navigator>
      <Stack.Screen name="AuthLoading" component={AuthLoading} />


  </Stack.Navigator>


)

}

const SwitchStack = createSwitchNavigator({
            "App" : AppStack,
            "Auth": AuthStack,
            "AuthLoading":AuthLoadingStack
},

{
  initialRouteName:'AuthLoading'
}


)


 
const NavigationContainerApp = () =>{ 

 
    return(
      <NavigationContainer ref={navigationRef}>
          <SwitchStack />
        </NavigationContainer>
    )
   

  

    
  

}


export default NavigationContainerApp;


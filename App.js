
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import loginScreen from './loginScreen';
import postScreen from './postScreen';
import getScreen from './getScreen';

const Stack = createStackNavigator();

function NavStack() {
  return (
     <Stack.Navigator
        initialRouteName="loginScreen"
        screenOptions={{
              headerShown: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'gray',
          },
          headerTintColor: 'red',
          headerTitleStyle :{
            fontWeight: 'bold',
          },
        }}
      >
      <Stack.Screen 
        name="getScreen" 
        component={getScreen} 
        options={{ title: 'getScreen' }}
      />
       <Stack.Screen 
        name="postScreen" 
        component={postScreen} 
        options={{ title: 'postScreen' }}
      />
      <Stack.Screen 
        name="loginScreen" 
        component={loginScreen} 
        options={{ title: 'loginScreen' }}
      />
       
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import Register from './src/pages/Register'
import Desc from './src/pages/Desc';
const Stack = createStackNavigator();

const App = () => {
  return (
    // <View>
    //   <Text>
    //     sadklnalsnk
    //   </Text>
    // </View>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        animationEnabled: false
      }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Desc" component={Desc} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({})

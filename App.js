import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home';
import CharDetail from './src/pages/CharDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            headerStyle: {
              elevation: 0
            },
            cardStyle: {
              backgroundColor: 'white'
            }
          }}
        />
        <Stack.Screen
          name="Char Detail"
          component={CharDetail}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#8bbe8a',
              elevation: 0
            },
            cardStyle: {
              backgroundColor: 'white'
            }
          }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
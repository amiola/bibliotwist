import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import BookPage from './pages/BookPage'
import Provider from './context/Provider'

const Stack = createNativeStackNavigator()


const App = () => {
  return (
    <>
    <Provider>
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Home'
      screenOptions={
        {headerStyle: {
          backgroundColor: "#3f48cc"
        },
        contentStyle: {
          backgroundColor: "#3f48cc"
        }}
      }
      >
        <Stack.Screen 
        name='Home' 
        component={Home}
        options={{
          title: 'Welcome to Bibliotwist!',
        }}
        />
        <Stack.Screen
         name='Search'
          component={SearchPage}
          options={{
            title: 'Search:'
          }}
          />
          <Stack.Screen
         name='Book'
          component={BookPage}
          options={({route})=>({
            title: route.params.name
          })}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </>
  )
}

export default App
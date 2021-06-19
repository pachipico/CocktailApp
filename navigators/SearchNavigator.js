import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../pages/Search';
import Details from '../pages/Details';

const Stack = createStackNavigator();

const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default SearchNavigator;

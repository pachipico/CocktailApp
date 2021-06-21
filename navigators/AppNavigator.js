import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import CocktailNavigator from './CocktailNavigator';
import styled from 'styled-components';
import SearchNavigator from './SearchNavigator';

const Input = styled.TextInput`
  border: 1px solid #e5e5e5;
`;

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        headerTitle: 'Cocktail',
      }}
      initialRouteName="Search">
      <Drawer.Screen name="Home" component={CocktailNavigator} />
      <Drawer.Screen name="Search Cocktail" component={SearchNavigator} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;

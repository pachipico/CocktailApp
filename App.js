/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import styled from 'styled-components';
import {KEY} from './key';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigators/AppNavigator';

const Button = styled.Button``;
const Container = styled.SafeAreaView`
  flex: 1;
`;

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

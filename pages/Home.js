import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Button = styled.Button``;

const Home = ({navigation}) => {
  return (
    <Container>
      <Button title="Details" onPress={() => navigation.navigate('Details')} />
    </Container>
  );
};

export default Home;

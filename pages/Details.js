import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {searchById} from '../net/search';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const HeaderImg = styled.Image``;

const HeaderBox = styled.View``;

const HeaderText = styled.Text`
  font-size: 24px;
`;

const Details = ({navigation, route}) => {
  const [data, setData] = useState({});
  const getData = async id => {
    setData(await searchById(id));
  };
  navigation.setOptions({title: route.params.name});
  useEffect(() => {
    getData(route.params.id);
  }, []);
  return (
    <Container>
      <HeaderBox>
        <HeaderText>{route.params.name}</HeaderText>
      </HeaderBox>
    </Container>
  );
};

export default Details;

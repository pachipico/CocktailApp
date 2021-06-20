import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {searchById} from '../net/search';

import {Button} from 'react-native';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const HeaderImg = styled.Image`
  width: 50%;
  height: 200px;
  margin: 12px;
  border-radius: 10px;
`;
const Center = styled.View`
  align-items: center;
`;

const HeaderBox = styled.View`
  padding-top: 12px;
  background: #e5e5e5;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
const Row = styled.View`
  flex-direction: row;
`;
const ListBox = styled.View`
  flex-direction: row;
`;
const List = styled.View`
  padding-top: 40px;
  padding-left: 8px;
`;

const ListItem = styled.Text`
  font-style: italic;
  font-size: 14px;
  line-height: 24px;
`;
const Details = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    searchById(Number(route.params.id)).then(
      result => setData(result.data.drinks[0]),
      setIsLoading(false),
    );
  }, []);
  const renderIngredients = obj => {
    let ingredients = [];
    let measurements = [];

    for (const [key, value] of Object.entries(obj)) {
      if (key.slice(0, 13) === `strIngredient`) {
        ingredients.push(value);
      }
      if (key.slice(0, 10) === `strMeasure`) {
        measurements.push(value);
      }
    }
    return (
      <ListBox>
        <List>
          {ingredients.map((each, i) => (
            <ListItem key={i}>{each}</ListItem>
          ))}
        </List>
        <List>
          {measurements.map((each, i) => (
            <ListItem key={i}>{each}</ListItem>
          ))}
        </List>
      </ListBox>
    );
  };
  return (
    <Container>
      {!isLoading && (
        <>
          <HeaderBox>
            <Center>
              <HeaderText>{data.strDrink}</HeaderText>
            </Center>

            <HeaderImg source={{uri: data.strDrinkThumb}} />
          </HeaderBox>
          {renderIngredients(data)}
        </>
      )}
    </Container>
  );
};

export default Details;

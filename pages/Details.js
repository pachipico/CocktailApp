import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';
import {searchById} from '../net/search';
import {ActivityIndicator} from 'react-native';

const Row = styled.View`
  flex-direction: row;
`;
const Container = styled.SafeAreaView`
  flex: 1;
`;
const ScrollView = styled.ScrollView``;
const HeaderImg = styled.Image`
  height: 200px;
  margin: 12px;
  border-radius: 10px;
  flex: 1;
`;
const Center = styled.View`
  align-items: center;
`;
const HeaderBox = styled.ImageBackground`
  padding-top: 12px;
`;
const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
const TagsBox = styled.View`
  flex: 1;
  padding: 12px;
`;
const Tags = styled.Text`
  font-size: 14px;
`;
const Content = styled.View`
  padding: 12px;
`;
const BigText = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;
const ListBox = styled.View`
  flex-direction: row;
`;
const List = styled.View`
  padding-top: 20px;
  padding-left: 8px;
  margin-left: 12px;
`;
const ListItem = styled.Text`
  font-style: italic;
  font-size: 14px;
  line-height: 24px;
`;
const Instructions = styled.Text`
  padding: 20px;
  font-size: 16px;
  line-height: 26px;
`;

const Details = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchById(Number(route.params.id))
      .then(result => setData(result.data.drinks[0]))
      .then(setIsLoading(false));
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
          {ingredients.map((each, i) => {
            if (each) {
              return <ListItem key={i}>{each}</ListItem>;
            }
          })}
        </List>
        <List>
          {measurements.map((each, i) => {
            if (each) {
              return <ListItem key={i}>{each}</ListItem>;
            }
          })}
        </List>
      </ListBox>
    );
  };
  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <ScrollView>
            <HeaderBox blurRadius={20} source={{uri: data.strDrinkThumb}}>
              <Center>
                <HeaderText>{data.strDrink}</HeaderText>
              </Center>
              <Row>
                <HeaderImg source={{uri: data.strDrinkThumb}} />
                <TagsBox>
                  <Tags>{data.strCategory}</Tags>
                </TagsBox>
              </Row>
            </HeaderBox>
            <Content>
              <BigText>Ingredients?</BigText>

              {renderIngredients(data)}
            </Content>
            <Content>
              <BigText>How To?</BigText>

              <Instructions>{data?.strInstructions}</Instructions>
            </Content>
          </ScrollView>
        </>
      )}
    </Container>
  );
};

export default Details;
